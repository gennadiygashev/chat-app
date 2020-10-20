const express = require('express')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const mongoose = require('mongoose')
const Rooms = require('./model')
const url = require('./mongoDBURL')

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET, PUT, PATCH, POST, DELETE')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  next()
})

app.use(express.json())

app.get('/rooms/:id', async (req, res) => {
  const { id: roomID } = req.params
  const roomData = await Rooms.findOne({ roomID: roomID })
  res.json(roomData)
})

app.post('/rooms', async (req, res) => {
  const { roomID } = req.body
  const room = new Rooms({
    roomID,
  })
  const findRes = await Rooms.findOne({ roomID: roomID })
  if (!findRes) {
    await room.save()
  }
  res.sendStatus(200)
})

io.on('connection', (socket) => {
  let thisRoomID = ''
  let thisUserName = ''

  socket.on('socket:join', async ({ roomID, userName }) => {
    thisRoomID = roomID
    thisUserName = userName

    socket.join(thisRoomID)
    await Rooms.updateOne(
      { roomID: thisRoomID },
      { $push: { users: thisUserName } }
    )
    const roomData = await Rooms.findOne({ roomID: thisRoomID }, 'users')
    socket.to(thisRoomID).emit('socket:set_users', roomData)
  })

  socket.on('socket:new_message', async ({ roomID, userName, text, date }) => {
    const message = {
      userName,
      text,
      date,
    }
    await Rooms.updateOne(
      { roomID: thisRoomID },
      { $push: { messages: message } }
    )
    socket.to(roomID).emit('socket:new_message', message)
  })

  socket.on('disconnect', async () => {
    await Rooms.updateOne(
      { roomID: thisRoomID },
      { $pull: { users: thisUserName } }
    )
    const roomData = await Rooms.findOne({ roomID: thisRoomID }, 'users')
    socket.to(thisRoomID).emit('socket:set_users', roomData)
  })
})

async function start() {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
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
