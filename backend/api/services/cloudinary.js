import fs from 'fs'
import { v2 as cloudinary } from 'cloudinary'

import dotenv from 'dotenv'
dotenv.config()

// Configure Cloudinary once
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

export async function uploadOnCloudinary (filepath) {
  if (!filepath) return null
  try {
    const response = await cloudinary.uploader.upload(filepath, {
      resource_type: 'auto' // supports images, videos, etc.
    })
    fs.unlinkSync(filepath) // Remove file from local after upload
    return response
  } catch (error) {
    console.error('Cloudinary upload error:', error)
    try {
      fs.unlinkSync(filepath)
    } catch {}
    return null
  }
}
