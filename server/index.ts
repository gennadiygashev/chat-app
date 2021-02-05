import express from 'express'
import server, { Server } from 'http'
import mongoose from 'mongoose'
import morgan from 'morgan'

import { url } from './mongoDBURL'
import router from './routes/index.route'
import initSocket from './socket'

const app = express()
const serverHTTP: Server = server.createServer(app)

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET, PUT, PATCH, POST, DELETE')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  next()
})

app.use(express.json())
app.use(morgan('tiny'))
app.use('/', router)

const start = async () => {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    })

    const { socketIO } = initSocket(serverHTTP)
    app.set('io', socketIO)

    serverHTTP.listen(3001, () => {
      console.log('Server is started on port: 3001')
    })
  } catch (e) {
    console.error(e)
  }
}

start()
