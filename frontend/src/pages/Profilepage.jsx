import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
const Base_url = import.meta.env.VITE_BASE_URL

const ProfilePage = () => {
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const { userId } = useParams()
  const navigate = useNavigate()

  const currentUser = JSON.parse(localStorage.getItem('user'))
  const currentUserId = currentUser?._id

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${Base_url}/profile/${userId}`)
        setProfile(res.data.data)
        setLoading(false)
      } catch (err) {
        console.error('Failed to fetch profile:', err)
        setLoading(false)
      }
    }

    if (userId) fetchProfile()
  }, [userId])

  if (loading) return <div className="text-center mt-10 text-emerald-500">Loading...</div>
  if (!profile) return <div className="text-center mt-10 text-red-500">Profile not found</div>

  const handleEditClick = () => {
    navigate(`/update-profile/${userId}`)
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap mb-8">
        <div className="flex items-center gap-6">
          <img
            src={profile.profilePicture || '/userdefaultimage.jpg'}
            alt="Profile"
            className="w-24 h-24 rounded-full border-4 border-emerald-300 object-cover shadow-md"
          />
          <div>
            <h2 className="text-3xl font-bold text-emerald-700">{profile.name}</h2>
            <p className="text-zinc-500">@{profile.username}</p>
            <p className="text-sm text-zinc-400">{profile.email}</p>
          </div>
        </div>

        {currentUserId === userId && (
          <button
            onClick={handleEditClick}
            className="bg-amber-400 hover:bg-amber-500 text-white px-5 py-2 rounded-full shadow-md transition duration-300"
          >
            ✏️ Edit Profile
          </button>
        )}
      </div>

      {/* Bio & Skills */}
      <div className="mb-8 bg-white rounded-xl shadow p-6 space-y-4 border border-emerald-100">
        <p className="text-gray-800"><strong>Bio:</strong> {profile.bio || 'Not provided'}</p>
        <p className="text-gray-800"><strong>Availability:</strong> {profile.availability}</p>
        <div>
          <strong className="text-gray-800">Skills:</strong>
          <div className="mt-2 flex flex-wrap gap-2">
            {profile.skills?.length > 0 ? (
              profile.skills.map((skill, idx) => (
                <span key={idx} className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm shadow-sm">
                  {skill}
                </span>
              ))
            ) : (
              <span className="text-zinc-400">None</span>
            )}
          </div>
        </div>
      </div>

      {/* Location */}
      <div className="mb-8 bg-white rounded-xl shadow p-6 border border-emerald-100">
        <h3 className="text-lg font-semibold text-emerald-700 mb-2">📍 Location</h3>
        <p className="text-zinc-600">
          {profile.location.city}, {profile.location.state}, {profile.location.country} {profile.location.zipCode}
        </p>
      </div>

      {/* Social Links */}
      <div className="flex gap-6 mb-8 items-center">
        {profile.social.linkedin && (
          <a
            href={profile.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline hover:text-blue-700 transition"
          >
            🔗 LinkedIn
          </a>
        )}
        {profile.social.twitter && (
          <a
            href={`https://twitter.com/${profile.social.twitter}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sky-500 hover:underline hover:text-sky-600 transition"
          >
            🐦 Twitter
          </a>
        )}
      </div>

      {/* Media Section */}
      <div>
        <h3 className="text-2xl font-semibold text-emerald-700 mb-4">🎥 Media ({profile.mediaCount})</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {profile.media?.map((item) => (
            <div
              key={item._id}
              className="bg-white border border-emerald-100 rounded-xl overflow-hidden shadow hover:shadow-lg transition duration-300"
            >
              <img
                src={item.url}
                alt={item.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-4 space-y-2">
                <h4 className="font-semibold text-gray-800">{item.title}</h4>
                <p className="text-sm text-gray-500">{item.description}</p>
                <p className="text-xs text-gray-400">👁 {item.view} | ❤️ {item.likes}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
