
let express = require('express');
let app = express();
let server = require('http').createServer(app);
let bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
let io = require('socket.io')(server);
const mongoose = require('mongoose');

//My own Modules
let {generateMessage,generateLocationMessage} = require('./utils/message');
let constants = require('./constants');
let {isRealString} = require('./utils/validation');
let {User} = require('./utils/user');

const Patient = require('./models/Patient.js');
const Doctor = require('./models/Doctor.js');

let users = new User();

//path is used to go back a directory neatly by __dirname , '../public'
const path = require('path');
const publicPath = path.join(__dirname , '../build');

const mongo_uri = constants.mongoURL;
mongoose.connect(mongo_uri, function(err) {
  if (err) {
    throw err;
  } else {
    console.log(`Successfully connected to ${mongo_uri}`);
  }
});


const port = process.env.PORT || 3000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser());

// parse application/json
app.use(bodyParser.json())
//setup the server to serve static files from the public folder
app.use(express.static(publicPath));

// app.get('/api/home', function(req, res) {
//   res.send('Welcome!');
// });

// app.get('/api/secret', function(req, res) {
//   res.send('The password is potato');
// });

app.post('/api/register', function(req, res) {
  console.log("register is hit",req.body)
  const { email, password } = req.body;
  const patient = new Patient({ email, password });
  patient.save(function(err) {
    if (err) {
      res.status(500)
        .send("Error registering new patient please try again.");
    } else {
      res.status(200).send("Welcome to the club!");
    }
  });
});

app.post('/api/authenticate', function(req, res) {
  const { email, password } = req.body;
  Patient.findOne({ email }, function(err, patient) {
    if (err) {
      console.error(err);
      res.status(500)
        .json({
        error: 'Internal error please try again'
      });
    } else if (!patient) {
      res.status(401)
        .json({
          error: 'Incorrect email or password'
        });
    } else {
      patient.isCorrectPassword(password, function(err, same) {
        if (err) {
          res.status(500)
            .json({
              error: 'Internal error please try again'
          });
        } else if (!same) {
          res.status(401)
            .json({
              error: 'Incorrect email or password'
          });
        } else {
          // Issue token
          const payload = { email };
          const token = jwt.sign(payload, secret, {
            expiresIn: '1h'
          });
          res.cookie('token', token, { httpOnly: true })
            .sendStatus(200);
        }
      });
    }
  });
});


io.on('connection' , (socket) => {

   console.log('new user connected');

   
   socket.on('join', (param,callback) => {

        if(!isRealString(param.name) || !isRealString(param.room) ){
           return  callback({message:'invalid room'});
        }

        socket.join(param.room);

        users.removeUser(socket.id);
        users.addUser(socket.id,param.name,param.room);

        io.to(param.room).emit('updateUserList',users.getUserList(param.room))

        socket.emit('newMessage',generateMessage('Admin','Welcome to the chat room'));
    
        socket.broadcast.to(param.room).emit('newMessage',generateMessage('Admin',`${param.name} has joined the room`));

        callback();

   });

   socket.on('createMessage', (message,callback) => {

   
    let currentUser = users.getUser(socket.id);

    if(currentUser && isRealString(message.text))
    {
        console.log(`${currentUser.name} just created a message which is now being broadcasted`);
        
        io.to(currentUser.room).emit('newMessage',generateMessage(currentUser.name,message.text));
        return callback();
    }
        callback('error');
      
      
   });

   socket.on('createLocation', (coordinates,callback) => {
    let currentUser = users.getUser(socket.id);

    
        io.to(currentUser.room).emit('newLocationMessage',generateLocationMessage(currentUser.name,coordinates.latitude,coordinates.longitude));  
   });


   socket.on('disconnect' , () =>{
        let user = users.removeUser(socket.id);

        if(user){

            io.to(user.room).emit('updateUserList',users.getUserList(user.room));
            socket.broadcast.to(user.room).emit('newMessage',generateMessage('Admin',`${user.name} has left the room`));

        }
        console.log('Client Disconnected ');
   });

});


server.listen(port , (err) => {
    if(err) return console.log(err);

    console.log(`server started at port ${port}`);
});
