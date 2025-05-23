// models/User.js
import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true },
    username: { type: String, trim: true,  },
    email: { type: String, trim: true, },
    password: { type: String }, // Can be optional if you support OAuth
    mediaCount: { type: Number, default: 0 },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user'
    },
    isVerified: { type: Boolean, default: false }
  },
  { timestamps: true }
)

const User = mongoose.model('User', userSchema)
export default User
