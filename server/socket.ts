import { Server } from 'http'
import io from 'socket.io'

const initSocket = (server: Server) => {
  const socketIO = io(server)

  socketIO.on('connection', socket => {
    const chatID = socket.handshake.query.chatID

    if (chatID === undefined || chatID === null) {
      socket.disconnect()
      return
    }

    socket.join(chatID)

    socket.on('update', data => {
      socketIO.to(chatID).emit('update', data)
    })
  })

  return { socketIO }
}

export default initSocket
