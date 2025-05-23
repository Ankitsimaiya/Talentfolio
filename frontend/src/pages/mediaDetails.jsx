import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { motion } from 'framer-motion'
const Base_url = import.meta.env.VITE_BASE_URL

/**
 * Animation variants for page transitions using Framer Motion
 */
const pageVariants = {
  initial: { opacity: 0, y: 20 }, // Initial state: slightly down and transparent
  in: { opacity: 1, y: 0 },       // Animate to fully visible and positioned
  out: { opacity: 0, y: -20 }     // Exit state: fade out and move up
}

/**
 * Duration and timing for the page transition animations
 */
const pageTransition = {
  duration: 1
}

/**
 * MediaDetailPage Component
 * Fetches and displays detailed info about a media item (image/video),
 * along with recommended media items and uploader profiles.
 */
const MediaDetailPage = () => {
  // Extract the media ID from the URL parameters
  const { id } = useParams()

  // State variables for media data, recommendations, and loading status
  const [media, setMedia] = useState(null)
  const [recommended, setRecommended] = useState([])
  const [loading, setLoading] = useState(true)

  // Navigation hook to programmatically route user on clicks
  const navigate = useNavigate()

  /**
   * Fetch media details and recommended media when component mounts or ID changes
   */
  useEffect(() => {
    const fetchMedia = async () => {
      try {
        // Request media data from backend API by media ID
        const res = await axios.get(`${Base_url}/media/media/${id}`)
        
        // Set fetched media and recommendations in state
        setMedia(res.data.media)
        setRecommended(res.data.recommended)

        // Smoothly scroll to top when loading new media
        window.scrollTo({ top: 0, behavior: 'smooth' })

        setLoading(false)
      } catch (err) {
        // Log error and end loading state if fetch fails
        console.error('Error fetching media details:', err)
        setLoading(false)
      }
    }

    fetchMedia()
  }, [id])

  // Show loading message while fetching data
  if (loading) return <div className='text-center mt-10'>Loading...</div>

  // Show fallback if media not found
  if (!media) return <div className='text-center mt-10'>Media not found</div>

  // Default profile image URL if user has no profile picture
  const defaultProfile = '/userdefaultimage.jpg'

  return (
    <motion.div
      initial='initial'
      animate='in'
      exit='out'
      variants={pageVariants}
      transition={pageTransition}
      className='p-4'
    >
      <div className='max-w-5xl mx-auto p-6'>

        {/* Main Media Section */}
        <div className='mb-6'>
          <div>
            {/* Conditional rendering: show image or video based on mediaType */}
            {media.mediaType === 'image' ? (
              <img
                src={media.url}
                alt={media.title}
                className='w-full h-96 object-cover rounded shadow'
              />
            ) : (
              <video
                src={media.url}
                controls
                className='w-full h-96 object-cover rounded shadow'
              />
            )}

            {/* Media Title */}
            <h2 className='text-2xl font-bold mt-4'>{media.title}</h2>

            {/* Media Description */}
            <p className='text-gray-700 mt-2'>{media.description}</p>

            {/* Views and Likes */}
            <p className='text-sm text-gray-500 mt-1'>
              Views: {media.view} | Likes: {media.likes}
            </p>

            {/* Categories */}
            <div className='text-sm mt-1 text-gray-600'>
              Categories: {media.categories?.join(', ')}
            </div>
          </div>

          {/* Uploader Info Section */}
          {media.userId && (
            <button
              onClick={() => navigate(`/profile/${media.userId._id}`)}
              className='mt-4 flex items-center space-x-3 cursor-pointer bg-transparent border-none p-0'
              aria-label={`View profile of ${media.userId.name}`}
            >
              <img
                src={media.userId.profilePicture || defaultProfile}
                alt={media.userId.username}
                className='w-10 h-10 rounded-full object-cover'
              />
              <div>
                <p className='text-sm font-medium'>{media.userId.name}</p>
                <p className='text-xs text-gray-500'>@{media.userId.username}</p>
              </div>
            </button>
          )}
        </div>

        {/* Recommended Media Section */}
        <div>
          <h3 className='text-xl font-semibold mb-3'>Recommended Media</h3>

          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
            {recommended.map(item => (
              <div
                key={item._id}
                className='border rounded shadow p-2 hover:shadow-md transition cursor-pointer'
                onClick={() => navigate(`/media/${item._id}`)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if(e.key === 'Enter') navigate(`/media/${item._id}`)}}
                aria-label={`View details for ${item.title}`}
              >
                {/* Recommended media preview */}
                {item.mediaType === 'image' ? (
                  <img
                    src={item.url}
                    alt={item.title}
                    className='w-full h-40 object-cover rounded mb-2'
                  />
                ) : (
                  // For videos, consider showing poster image or thumbnail for performance/accessibility
                  <video
                    src={item.url}
                    className='w-full h-40 object-cover rounded mb-2'
                    controls={false} // Remove controls in recommendations for better UX
                    muted
                    preload="metadata"
                  />
                )}

                {/* Recommended media title and truncated description */}
                <h4 className='font-medium'>{item.title}</h4>
                <p className='text-sm text-gray-600 truncate'>
                  {item.description}
                </p>

                {/* Recommended uploader info */}
                <button
                  onClick={(e) => {
                    e.stopPropagation() // Prevent parent click to avoid unwanted navigation
                    navigate(`/profile/${item.userId._id}`)
                  }}
                  className='mt-2 flex items-center space-x-2 cursor-pointer bg-transparent border-none p-0'
                  aria-label={`View profile of ${item.userId.name}`}
                >
                  <img
                    src={item.userId.profilePicture || defaultProfile}
                    alt={item.userId.username}
                    className='w-8 h-8 rounded-full object-cover'
                  />
                  <div>
                    <p className='text-xs font-medium'>{item.userId.name}</p>
                    <p className='text-[11px] text-gray-500'>@{item.userId.username}</p>
                  </div>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default MediaDetailPage
