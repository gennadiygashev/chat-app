const express = require('express')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const mongoose = require('mongoose')
const Users = require('./UserSchema')
const Chats = require('./ChatSchema')
const url = require('./mongoDBURL')

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET, PUT, PATCH, POST, DELETE')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  next()
})

app.use(express.json())

app.post('/users', async (req, res) => {
  const { userName } = req.body
  const user = new Users({
    userName,
  })
  const findUserHandler = await Users.findOne({ userName })
  if (!findUserHandler) {
    await user.save()
  }
  res.sendStatus(200)
})

app.get('/users/:id', async (req, res) => {
  const { id: userName } = req.params
  const userData = await Users.findOne({ userName })
  res.json(userData)
})

io.on('connection', (socket) => {
  let currentUserName = ''
  let currentChatID = ''

  socket.on('socket:join-to-userpage', ({ userName }) => {
    currentUserName = userName
    socket.join(currentUserName)
  })

  socket.on('socket:join-to-chat', async ({ prevChatID, newChatID }) => {
    currentChatID = newChatID
    socket.leave(prevChatID)
    socket.join(newChatID)
    const data = await Chats.findById(newChatID, 'messages')
    io.to(currentChatID).emit('socket:set-messages', data.messages)
  })

  socket.on('socket:send-message', async ({ message }) => {
    const req = await Chats.findByIdAndUpdate(currentChatID, {
      $push: { messages: message },
    })
    io.to(currentChatID).emit('socket:set-message', message)
  })

  socket.on('socket:add-chat-request', async ({ potentialFriendName }) => {
    const user = await Users.findOne({ userName: currentUserName })
    const findExistencePotentialUser = await Users.findOne({ userName: potentialFriendName })
    const result = user.chats.find(chat => chat.userName === potentialFriendName)
    if (result) {
      io.to(currentUserName).emit('socket:add-chat-response', 'HAS_ALREADY')
    } else if (!findExistencePotentialUser) {
      io.to(currentUserName).emit('socket:add-chat-response', 'NOT_FOUND')
    } else {
      await Users.findOneAndUpdate(
        { userName: potentialFriendName },
        { $push: { requests: currentUserName } }
      )
      io.to(potentialFriendName).emit('socket:add-chat-message', currentUserName)
      io.to(currentUserName).emit('socket:add-chat-response', 'SUCCESS')
    }
  })

  socket.on(
    'socket:add-chat-request-success',
    async ({ potentialFriendName }) => {
      const chat = new Chats()
      const chatObj = {
        userName: currentUserName,
        chatID: '',
      }
      await chat.save(() => {
        chatObj.chatID = chat._id
      })
      await Users.findOneAndUpdate(
        { userName: currentUserName },
        {
          $pull: { requests: potentialFriendName },
        }
      )
      await Users.findOneAndUpdate(
        { userName: currentUserName },
        {
          $push: {
            chats: { chatID: chatObj.chatID, userName: potentialFriendName },
          },
        }
      )
      await Users.findOneAndUpdate(
        { userName: potentialFriendName },
        {
          $push: {
            chats: { chatID: chatObj.chatID, userName: currentUserName },
          },
        }
      )
      io.to(currentUserName).emit('socket:set-new-chat', {
        chatID: chatObj.chatID,
        userName: potentialFriendName,
      })
      io.to(potentialFriendName).emit('socket:set-new-chat', chatObj)
    }
  )
})

async function start() {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })

    server.listen(3001, (err) => {
      if (err) {
        throw Error(err)
      }
      console.log('Server is started on port: 3001')
    })
  } catch (e) {
    console.error(e)
  }
}

start()
