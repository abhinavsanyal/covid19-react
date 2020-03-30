const io = require('socket.io')(require('../server'))
let { User } = require('../utils/user')
let { generateMessage, generateLocationMessage } = require('../utils/message')
let { isRealString } = require('../utils/validation')



let users = new User()

io.on('connection', socket => {
  console.log('new user connected')

  socket.on('join', (param, callback) => {
    if (!isRealString(param.name) || !isRealString(param.room)) {
      return callback({ message: 'invalid room' })
    }

    socket.join(param.room)

    users.removeUser(socket.id)
    users.addUser(socket.id, param.name, param.room)

    io.to(param.room).emit('updateUserList', users.getUserList(param.room))

    socket.emit(
      'newMessage',
      generateMessage('Admin', 'Welcome to the chat room')
    )

    socket.broadcast
      .to(param.room)
      .emit(
        'newMessage',
        generateMessage('Admin', `${param.name} has joined the room`)
      )

    callback()
  })

  socket.on('createMessage', (message, callback) => {
    let currentUser = users.getUser(socket.id)

    if (currentUser && isRealString(message.text)) {
      console.log(
        `${currentUser.name} just created a message which is now being broadcasted`
      )

      io.to(currentUser.room).emit(
        'newMessage',
        generateMessage(currentUser.name, message.text)
      )
      return callback()
    }
    callback('error')
  })

  socket.on('createLocation', (coordinates, callback) => {
    let currentUser = users.getUser(socket.id)

    io.to(currentUser.room).emit(
      'newLocationMessage',
      generateLocationMessage(
        currentUser.name,
        coordinates.latitude,
        coordinates.longitude
      )
    )
  })

  socket.on('disconnect', () => {
    let user = users.removeUser(socket.id)

    if (user) {
      io.to(user.room).emit('updateUserList', users.getUserList(user.room))
      socket.broadcast
        .to(user.room)
        .emit(
          'newMessage',
          generateMessage('Admin', `${user.name} has left the room`)
        )
    }
    console.log('Client Disconnected ')
  })
})
