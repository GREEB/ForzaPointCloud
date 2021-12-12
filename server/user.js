import throttle from 'lodash.throttle'
import onChange from 'on-change'
import User from './models/user.model.js'
import { age } from './defaults.js'

export const users = {} // Main user obj to look at

const maxClientTimeout = 10 // UDP client "timeout" in seconds

const udpClients = {}

// FIXME:Nuxt.Server: Dumbass loop, Looks for ips that have not send data in a while and delete them
setInterval(() => {
  console.log(users)
  Object.keys(users).forEach((id) => {
    if (age(users[id]) > maxClientTimeout) { delete users[id] }
  })
}, 3000)

export const lastSeen = (obj) => {
  const user = obj
  user.udp.lastSeen = Date.now()
}
export const registerUser = async (userID) => {
  // On first login register user

  // TODO: Probably need to recheck discord auth here for security and pass id from there
  // category=Server

  const findUser = await User.find({ mid: userID }).exec()
  let createUser
  if (!(userID in users)) { users[userID] = {} }
  if (findUser.length === 0) {
    const newUser = new User({ mid: userID })
    createUser = await newUser.save()
  } else {
    // User already created pass data to user
    const [a] = findUser
    createUser = a
  }
  users[userID].mongodb_mid = createUser.mid
  users[userID].mongodb_id = createUser._id
  users[userID].firstSeen = Date.now()
}
export const addUDPUser = (ip, userID) => {
  // Add udp details to user object
  users[userID].udp = {}
  users[userID].udp.firstSeen = Date.now()
}
export const addIOuser = (socket) => {
  const dc = JSON.parse(socket.handshake.headers.dc) // Discord Auth
  const userID = createIDfromSocket(socket) // Create ID
  if (!(userID in users)) { users[userID] = {} } // If empty create
  users[userID].dc = {}
  users[userID].dc.username = dc.username
  users[userID].dc.avatar = dc.avatar
  users[userID].dc.id = dc.id
  users[userID].dc.token = dc['auth._token.discord']
  users[userID].dc.token_expiration = dc['auth._token_expiration.discord']
  users[userID].dc.refresh_token = dc['auth._refresh_token.discord']
  users[userID].dc.token_expiration = dc['auth._refresh_token_expiration.discord']
  users[userID].socketID = socket.id
}

const watchedObject = onChange(udpClients, (path, value, previousValue) => {
  if (previousValue === undefined) {
    console.log(`${path} connected to UDP`)
    addUDPUser(path, value)
  }
  // if previousValue != undefined && value === unix then update
  // if (value != undefined)
  // defudpClients[path] = value
})

// Basically add user on first connect
export const makeUDPuser = throttle((ip, userID) => {
  watchedObject[ip] = userID
}, 3000)

export const createIDfromSocket = (socket) => {
  let clientIp = '0.0.0.0'
  if ('x-real-ip' in socket.handshake.headers) {
    clientIp = socket.handshake.headers['x-real-ip']
  } else {
    clientIp = socket.handshake.address.split(':').pop().toString()
  }
  return parseInt(clientIp.split('.').reduce((a, b) => a + b, 0))
}
