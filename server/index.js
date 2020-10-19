const express = require('express')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)

const rooms = new Map()

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Methods", "GET, PUT, PATCH, POST, DELETE")
  res.header("Access-Control-Allow-Headers", "Content-Type")
  next()
})
app.use(express.json())

app.get('/rooms/:id', (req, res) => {
  const { id: roomID } = req.params
  const obj = rooms.has(roomID) 
    ? {
        users: [...rooms.get(roomID).get('users').values()],
        messages: [...rooms.get(roomID).get('messages').values()],
      } 
    : {
        users: [], 
        messages: [] 
      }
  res.json(obj)
})

app.post('/rooms', (req, res) => {
  const { nickname, roomID } = req.body
  if(!rooms.has(roomID)) {
    rooms.set(roomID, new Map([
      ['users', new Map()], 
      ['messages', []], 
    ]))
  }
  res.json([...rooms.keys()])
})

io.on('connection', (socket) => {
  socket.on('socket:join', ({ roomID, nickname }) => {
    socket.join(roomID)
    rooms.get(roomID).get('users').set(socket.id, nickname)
    const users = [...rooms.get(roomID).get('users').values()]
    socket.to(roomID).emit('socket:set_users', users)
  })

  socket.on('socket:new_message', ({ roomID, nickname, text }) => {
    const obj = {
      nickname,
      text
    }
    rooms.get(roomID).get('messages').push(obj)
    socket.to(roomID).emit('socket:new_message', obj)
  })

  socket.on('disconnect', () => {
    rooms.forEach((value, roomID) => {
      if (value.get('users').delete(socket.id)) {
        const users = [...value.get('users').values()]
        socket.to(roomID).emit('socket:set_users', users)
      }
    })
  })
})

server.listen(3001, (err) => {
  if (err) {
    throw Error(err)
  }
  console.log('Server is started on port: 3001')
})