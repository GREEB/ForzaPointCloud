import throttle from 'lodash.throttle'
import Position from './models/position.model.js' // Mongo Model
import { users, lastSeen } from './user.js' // Mongo Model
import { io } from './index.js'

// Send fake data
// Create fake data

let fakeChords = []
const createFakeData = () => {
  fakeChords = []

  for (let index = 0; index < 1000; index++) {
    const x = Math.random() * 2 * index
    const y = Math.random() * 2 * index
    const z = Math.random() * 2 * index
    const s = 0
    fakeChords.push({
      x: index * x,
      y: index * y,
      z: index * z,
      s
    })
  }
  sendFakeDataInterval()
  console.log('created 1000 fake points')
}

// io.sockets.on('connection', (socket) => {
//   socket.emit('chordPack', fakeChords)

// })
let index = 0
const sendFakeDataInterval = () => {
  const interval = setInterval(() => {
    if (index === 1000) {
      console.log('send 1000 nodes restart')
      clearInterval(interval)
      fakeData()
      index = 0
    } else {
      // console.log('sending', fakeChords[index]);
      io.emit('chord', fakeChords[index])
      index++
    }
  }, 500)
}

const fakeData = () => {
  createFakeData()
}

// FIXME:Nuxt.Server: Fix all of this user session logic, use something real like express-sessions
// const addUDPuser = async (ip) => {
//   console.log(`adding user with ip: ${ip}`)
//   createUser(ip)
// }

const throttledWrite = throttle((x, y, z, surface, flying, ip, size, userID) => {
  // import users
  // match ip with user _id
  // maybe give socket to push from users
  if (users[userID] === undefined) { return }
  if ('ip' in users[userID]) {
    if ('socketID' in users[userID]) {
      // console.log(`${ip} also connected with sockets`);

    } else {
      // console.log(`${ip} not connected to sockets`);
    }
  } else {
    // console.log('only socket or something not good');
  }
  lastSeen(users[userID])
  if (flying === 0) { return } // Abort if flying
  if (x === 0 && y === 0 && z === 0) { return } // Abort if 000 chord
  const newPos = new Position({
    x,
    y,
    z,
    surface,
    user: users[userID].mongodb_id
  })
  newPos.save((err) => {
    if (err) { console.log('DUPLICATE FIXME') } // TODO:Nuxt.Server: Check duplicates in cache?
  })
  io.to(users[userID].socketID).emit('chord', {
    x, y, z, s: surface
  })
}, 0)

export { throttledWrite, addUDPuser, fakeData }
