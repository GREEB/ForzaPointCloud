import http from 'http'
import dotenv from 'dotenv'
import { Server } from 'socket.io'
import jwt from 'jsonwebtoken'
import config from '../config/auth.config'
import { addIOuser, registerUDPUser } from '../controllers/userController'

dotenv.config()

export const httpServer = http.createServer()
httpServer.listen(process.env.IOPORT, () => {
  console.log(`Socket listening on ${process.env.IOPORT}`)
})
// const io = new Server()
// server-side
export const io = new Server(httpServer, {
  cors: {
    origin: 'http://192.168.0.42:3000',
    methods: ['GET', 'POST'],
    credentials: true
  }
})
io.use(function (socket, next) {
  // TODO: No idea if this is right way to do things or if we need to recheck this everytime with middleware
  const authtoken = socket.handshake.headers.cookie.split(' ')[1]
  const token = authtoken.split('=')[1].slice(0, -1)
  if (token === 'false') {
    console.log('token is false')
    socket.decoded = false
    next()
  } else {
    console.log('token found')

    jwt.verify(token.substring(9), config.secret, function (err, decoded) {
      if (err) { return next(new Error('Authentication error')) }
      socket.decoded = decoded
      next()
    })
  }
})
io.sockets.on('connection', (socket) => {
  addIOuser(socket)
  socket.on('sockets/game', (data) => {
    registerUDPUser(data, socket)
  })
})
