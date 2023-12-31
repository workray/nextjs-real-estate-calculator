import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a username'],
    unique: true
  },
  email: {
    type: String,
    required: [true, 'Please provide a email'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Please provide a password']
  }
})

UserSchema.set('toJSON', { virtuals: true })

const User = mongoose.models.users || mongoose.model('users', UserSchema)

export default User
