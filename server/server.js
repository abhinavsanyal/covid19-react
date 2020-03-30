let express = require('express')
let app = express()
let server = require('http').createServer(app)
let bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const socketHandler = require('./socketHandler/socket')

//My own Modules
let constants = require('./constants')
const routes = require('./routes')

//path is used to go back a directory neatly by __dirname , '../public'
const path = require('path')
const publicPath = path.join(__dirname, '../build')

const mongo_uri = constants.mongoURL
mongoose.connect(mongo_uri, function(err) {
  if (err) {
    throw err
  } else {
    console.log(`Successfully connected to ${mongo_uri}`)
  }
})

const port = process.env.PORT || 3000

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

// parse application/json
app.use(bodyParser.json())
//setup the server to serve static files from the public folder
app.use(express.static(publicPath))

// app.get('/api/home', function(req, res) {
//   res.send('Welcome!');
// });

// app.get('/api/secret', function(req, res) {
//   res.send('The password is potato');
// });

//redirect routes modules
app.use('/api', routes)

server.listen(port, err => {
  if (err) return console.log(err)

  console.log(`server started at port ${port}`)
})

module.exports = server
