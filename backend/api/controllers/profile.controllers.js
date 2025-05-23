import Profile from '../models/profile.js'
import Media from '../models/media.js'
import User from '../models/user.js'

// Create a new profile
export const createProfile = async (req, res) => {
  try {
    const existingProfile = await Profile.findOne({ userId: req.user.id })
    if (existingProfile) {
      return res.status(400).json({ error: 'Profile already exists' })
    }

    const { media, ...rest } = req.body

    let mediaIds = []

    // Optional: Validate mediaIds if provided
    if (media && media.mediaId?.length) {
      const foundMedia = await Media.find({
        _id: { $in: media.mediaId },
        userId: req.user.id // ensure the user owns them (optional)
      })
      mediaIds = foundMedia.map(item => item._id)
    }

    const profile = new Profile({
      userId: req.user.id,
      ...rest,
      media: { mediaId: mediaIds }
    })

    const savedProfile = await profile.save()
    res.status(201).json(savedProfile)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// Get profile by user ID (logged in user)
export const getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ userId: req.user.id })
      .populate('userId', 'name email')
      .populate('media.mediaId')

    if (!profile) return res.status(404).json({ error: 'Profile not found' })

    res.status(200).json(profile)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}


// Update profile for the logged-in user
export const updateProfile = async (req, res) => {
  try {
    const userId = req.user?.id // Assuming you're using middleware to add user to req

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized: User not logged in' })
    }

    const updates = req.body

    const updatedProfile = await Profile.findOneAndUpdate(
      { userId },
      { $set: updates },
      { new: true }
    )

    if (!updatedProfile) {
      return res.status(404).json({ error: 'Profile not found for this user' })
    }

    res.status(200).json({
      message: 'Profile updated successfully',
      profile: updatedProfile
    })
  } catch (error) {
    console.error('Profile update error:', error.message)
    res.status(500).json({
      error: 'Internal server error while updating profile',
      message: error.message
    })
  }
}

// Delete profile by user ID (logged in user)
export const deleteProfile = async (req, res) => {
  try {
    const deletedProfile = await Profile.findOneAndDelete({
      userId: req.user.id
    })
    if (!deletedProfile)
      return res.status(404).json({ error: 'Profile not found' })

    res.status(200).json({ message: 'Profile deleted successfully' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export const homeMedia = async (req, res) => {
  try {
    const mediaItems = await Media.aggregate([
      { $match: { hide: false } },
      { $sample: { size: 20 } }, // Random sampling
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'userDetails'
        }
      },
      {
        $project: {
          _id: 1,
          url: 1,
          title: 1,
          description: 1,
          categories: 1,
          mediaType: 1,
          createdAt: 1,
          'userDetails.username': 1,
          'userDetails.profileUrl': 1
        }
      }
    ])

    // Transform each item to merge user data (safely)
    const response = mediaItems.map(item => {
      const user = item.userDetails?.[0] || {}
      return {
        _id: item._id,
        title: item.title,
        description: item.description,
        categories: item.categories,
        mediaType: item.mediaType,
        url: item.url,
        createdAt: item.createdAt,
        username: user.username || 'Unknown',
        profileUrl: user.profileUrl || ''
      }
    })

    res.status(200).json({
      success: true,
      message: 'Home media fetched successfully.',
      data: response
    })
  } catch (error) {
    console.error('Error fetching home media:', error)
    res.status(500).json({
      success: false,
      message: 'Internal server error while fetching home media.',
      error: error.message
    })
  }
}

export const subdetails = async (req, res) => {
  const { category } = req.params

  if (!category) {
    return res.status(400).json({
      success: false,
      message: 'Category parameter is required.'
    })
  }

  try {
    const mediaItems = await Media.aggregate([
      { $match: { categories: category, hide: false } },
      { $limit: 20 },
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'userDetails'
        }
      },
      {
        $project: {
          _id: 1,
          title: 1,
          description: 1,
          categories: 1,
          mediaType: 1,
          url: 1,
          createdAt: 1,
          'userDetails.username': 1,
          'userDetails.profileUrl': 1
        }
      }
    ])

    const response = mediaItems.map(item => {
      const user = item.userDetails?.[0] || {}
      return {
        _id: item._id,
        title: item.title,
        description: item.description,
        categories: item.categories,
        mediaType: item.mediaType,
        url: item.url,
        createdAt: item.createdAt,
        username: user.username || 'Unknown',
        profileUrl: user.profileUrl || ''
      }
    })

    res.status(200).json({
      success: true,
      message: `Media for category '${category}' fetched successfully.`,
      data: response
    })
  } catch (error) {
    console.error('Error fetching category media:', error)
    res.status(500).json({
      success: false,
      message: 'Internal server error while fetching media by category.',
      error: error.message
    })
  }
}





export const getUserWithFullProfileById = async (req, res) => {
  try {
    const userId = req.params.id

    const user = await User.findById(userId).select('-password')
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    const profile = await Profile.findOne({ userId })
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' })
    }

    const mediaList = await Media.find({ _id: { $in: profile.media?.mediaId || [] } })

    const mergedData = {
      ...user._doc,
      ...profile._doc,
      media: mediaList
    }

    res.status(200).json({
      message: 'Profile with media fetched successfully',
      data: mergedData
    })
  } catch (error) {
    console.error('Error fetching full profile:', error.message)
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}
