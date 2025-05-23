import Media from '../models/media.js'
import User from '../models/user.js'
import Profile from '../models/profile.js'
import { uploadOnCloudinary } from '../services/cloudinary.js'

export async function createMedia (req, res) {
  try {
    const { id } = req.user
    const { title, description, url, mediaType, categories } = req.body

    if (!id || !title || !url || !mediaType || !categories) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields.'
      })
    }

    const user = await User.findById(id)
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found.'
      })
    }

    if (user.mediaCount >= 6) {
      return res.status(400).json({
        success: false,
        message: 'Upload limit exceeded. Max 6 media files allowed.'
      })
    }

    const newMedia = await Media.create({
      userId: id,
      title,
      description,
      url,
      mediaType,
      categories
    })

    // Increment user's media count
    user.mediaCount += 1
    await user.save()

    // Push media _id to the user's profile
    await Profile.findOneAndUpdate(
      { userId: id },
      { $push: { 'media.mediaId': newMedia._id } },
      { new: true }
    )

    return res.status(201).json({
      success: true,
      message: 'Media saved and profile updated successfully.',
      data: newMedia
    })
  } catch (err) {
    console.error('Create Media Error:', err)
    return res.status(500).json({
      success: false,
      message: 'Server error during media creation.',
      error: err.message
    })
  }
}

// Get all media
export const getAllMedia = async (req, res) => {
  try {
    const mediaList = await Media.find().populate(
      'userId',
      'username profileUrl'
    )
    res.status(200).json(mediaList)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// Get media by ID
export const getMediaById = async (req, res) => {
  try {
    const media = await Media.findById(req.params.id).populate(
      'userId',
      'username profileUrl'
    )
    if (!media) return res.status(404).json({ error: 'Media not found' })
    res.status(200).json(media)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// Update media
export const updateMedia = async (req, res) => {
  try {
    const updated = await Media.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    })
    if (!updated) return res.status(404).json({ error: 'Media not found' })
    res.status(200).json(updated)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

// Delete media
export const deleteMedia = async (req, res) => {
  try {
    const deleted = await Media.findByIdAndDelete(req.params.id)
    if (!deleted) return res.status(404).json({ error: 'Media not found' })
    res.status(200).json({ message: 'Media deleted successfully' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// Increment view count
export const incrementView = async (req, res) => {
  try {
    const media = await Media.findByIdAndUpdate(
      req.params.id,
      { $inc: { view: 1 } },
      { new: true }
    )
    res.status(200).json(media)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// Like media
export const likeMedia = async (req, res) => {
  try {
    const media = await Media.findById(req.params.id)
    if (!media) return res.status(404).json({ error: 'Media not found' })

    if (!media.likedBy.includes(req.body.userId)) {
      media.likes += 1
      media.likedBy.push(req.body.userId)
    } else {
      media.likes -= 1
      media.likedBy.pull(req.body.userId)
    }

    const updated = await media.save()
    res.status(200).json(updated)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export async function uploadMedia (req, res) {
  try {
    const filePath = req.files?.media?.[0]?.path

    if (!filePath) {
      return res.status(400).json({
        success: false,
        message: "Please upload an image or video under the 'media' field."
      })
    }

    const media = await uploadOnCloudinary(filePath)
    if (!media) {
      return res.status(500).json({
        success: false,
        message: 'Cloudinary upload failed.'
      })
    }

    return res.status(200).json({
      success: true,
      message: 'Media uploaded to Cloudinary.',
      data: {
        url: media.secure_url,
        mediaType: media.resource_type
      }
    })
  } catch (err) {
    console.error('Upload Media Error:', err)
    return res.status(500).json({
      success: false,
      message: 'Server error during file upload.'
    })
  }
}



export const getMediaDetailsWithRecommendations = async (req, res) => {
  try {
    const { mediaId } = req.params;

    // 1. Get main media with populated userId
    const media = await Media.findById(mediaId)
      .populate('userId', 'name email username')
      .lean();

    if (!media) {
      return res.status(404).json({ message: 'Media not found' });
    }

    // 2. Attach profilePicture to media.userId
    const mainProfile = await Profile.findOne({ userId: media.userId._id }).select('profilePicture');
    media.userId.profilePicture = mainProfile?.profilePicture || '';

    // 3. Find recommended media
    const recommended = await Media.find({
      _id: { $ne: mediaId },
      category: media.category,
    })
      .limit(6)
      .populate('userId', 'name email username')
      .lean();

    // 4. Get userIds
    const userIds = recommended.map(item => item.userId._id);

    // 5. Fetch profile pictures
    const profiles = await Profile.find({ userId: { $in: userIds } }).select('userId profilePicture');

    // 6. Map userId to profilePicture
    const profileMap = {};
    profiles.forEach(profile => {
      profileMap[profile.userId.toString()] = profile.profilePicture;
    });

    // 7. Attach profilePicture to each recommended media user
    const recommendedWithProfiles = recommended.map(item => {
      const profilePic = profileMap[item.userId._id.toString()] || '';
      return {
        ...item,
        userId: {
          ...item.userId,
          profilePicture: profilePic
        }
      };
    });

    // 8. Return everything
    res.status(200).json({ media, recommended: recommendedWithProfiles });
  } catch (error) {
    console.error('Error in getMediaDetails:', error);
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
};


// GET /api/media/search?title=xyz
export const searchMediaByTitle = async (req, res) => {
  try {
    const { title } = req.query;

    if (!title) {
      return res.status(400).json({ success: false, message: 'Title query is required' });
    }

    const media = await Media.find({
      title: { $regex: title, $options: 'i' }
    });

    res.status(200).json({ success: true, data: media });
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};



