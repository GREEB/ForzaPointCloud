import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  mid: 'number'
})

const User = mongoose.models.User || mongoose.model('User', UserSchema) // This could fix dev hotreload mongoose overwrite error

export default User
