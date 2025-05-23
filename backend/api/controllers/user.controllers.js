import User from '../models/user.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { uploadOnCloudinary } from '../services/cloudinary.js'
import Profile from '../models/profile.js'

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key'


// Register user
export const registerUser = async (req, res) => {
  try {
    const { name, username, email, password } = req.body

    // Check for existing user
    const existingUser = await User.findOne({ $or: [{ email }, { username }] })
    if (existingUser) {
      return res
        .status(400)
        .json({ error: 'Email or username already exists.' })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user
    const newUser = new User({
      ...req.body,
      password: hashedPassword
    })

    const savedUser = await newUser.save()

    // Create empty profile for this user
    const newProfile = new Profile({
      userId: savedUser._id
    })
    await newProfile.save()

    // Response
    res.status(201).json({
      message: 'User registered successfully and profile created',
      data: {
        _id: savedUser._id,
        name: savedUser.name,
        username: savedUser.username,
        email: savedUser.email
      }
    })
  } catch (err) {
    console.error('Registration error:', err)
    res.status(500).json({
      message: 'Internal server error during user registration',
      error: err.message
    })
  }
}


// Login user
export const loginUser = async (req, res) => {
  try {
    const { emailOrUsername, password } = req.body
    const user = await User.findOne({
      $or: [{ email: emailOrUsername }, { username: emailOrUsername }]
    })

    if (!user) return res.status(404).json({ error: 'User not found' })

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' })

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
      expiresIn: '7d'
    })

    res.status(200).json({
      message: 'Login successful',
      user: {
        _id: user._id,
        name: user.name,
        username: user.username,
        email: user.email
      },
      token
    })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// Get all users (admin only)
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password')
    res.status(200).json(users)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// Get single user by ID
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password')
    if (!user) return res.status(404).json({ error: 'User not found' })
    res.status(200).json(user)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// Update user (excluding password)
export const updateUser = async (req, res) => {
  try {
    const updates = req.body
    if (updates.password) delete updates.password // Don't allow password updates here

    const updatedUser = await User.findByIdAndUpdate(req.params.id, updates, {
      new: true
    }).select('-password')

    if (!updatedUser) return res.status(404).json({ error: 'User not found' })

    res.status(200).json(updatedUser)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

// Delete user
export const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id)
    if (!deletedUser) return res.status(404).json({ error: 'User not found' })
    res.status(200).json({ message: 'User deleted successfully' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export async function profilePhotoUpload (req, res) {
  const { id } = req.user
  const imagePath = req.files?.media?.[0]?.path

  if (!id) {
    return res.status(401).json({
      success: false,
      message: 'User not logged in'
    })
  }

  if (!imagePath) {
    return res.status(400).json({
      success: false,
      message: 'No file uploaded'
    })
  }

  try {
    const media = await uploadOnCloudinary(imagePath)

    if (!media?.secure_url) {
      return res.status(500).json({
        success: false,
        message: 'Failed to upload image to Cloudinary'
      })
    }

    const user = await User.findByIdAndUpdate(
      id,
      { profileUrl: media.secure_url },
      { new: true } // returns the updated document
    )

    return res.status(200).json({
      success: true,
      message: 'Profile photo uploaded successfully',
      profileUrl: user.profileUrl
    })
  } catch (error) {
    console.error('Profile photo upload error:', error.message)
    return res.status(500).json({
      success: false,
      message: 'Internal server error during profile photo upload'
    })
  }
}
