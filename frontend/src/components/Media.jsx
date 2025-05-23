import React, { useState, useRef } from 'react'
import axios from 'axios'
import cookies from 'js-cookie'
import { toast } from 'react-toastify'
const Base_url = import.meta.env.VITE_BASE_URL

function CreateMediaPage () {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [categories, setCategories] = useState('')
  const [mediaType, setMediaType] = useState('image')
  const [file, setFile] = useState(null)
  const [url, setUrl] = useState('')
  const [uploading, setUploading] = useState(false)
  const [savingDocument, setSavingDocument] = useState(false)
  const fileInputRef = useRef(null)
  const token = cookies.get('token')

  // Upload file to server and get the media URL
  const handleFileUpload = async () => {
    if (!file) return
    try {
      setUploading(true)

      const formData = new FormData()
      formData.append('media', file)

      const res = await axios.post(
        `${Base_url}/media/upload`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`
          }
        }
      )

      setUrl(res.data.data.url)
      setMediaType(res.data.data.mediaType)
      toast.success('File uploaded successfully')
    } catch (error) {
      console.error('File upload failed:', error)
      toast.error('Failed to upload file')
    } finally {
      setUploading(false)
    }
  }

  // Save media document metadata to backend
  const handleSubmit = async e => {
    e.preventDefault()
    setSavingDocument(true)
    try {
      const payload = {
        title,
        description,
        categories: categories.split(',').map(cat => cat.trim()),
        url,
        mediaType,
        hide: false,
        likes: 0,
        view: 0
      }

      await axios.post(`${Base_url}/media`, payload, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      toast.success('Media document saved successfully')

      // Reset form state
      setTitle('')
      setDescription('')
      setCategories('')
      setFile(null)
      setUrl('')
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    } catch (error) {
      console.error('Save failed:', error)
      toast.error('Failed to save media document')
    } finally {
      setSavingDocument(false)
    }
  }

  return (
    <div className='max-w-2xl mx-auto mt-10 p-6 bg-white rounded shadow'>
      <h2 className='text-2xl font-bold mb-6'>Create Media</h2>

      <form onSubmit={handleSubmit} className='space-y-4 mt-6'>
        <input
          type='text'
          placeholder='Title'
          value={title}
          onChange={e => setTitle(e.target.value)}
          className='w-full p-2 border border-gray-300 rounded'
          required
        />
        <textarea
          placeholder='Description'
          value={description}
          onChange={e => setDescription(e.target.value)}
          className='w-full p-2 border border-gray-300 rounded'
          rows='3'
          required
        />
        <input
          type='text'
          placeholder='Categories (comma separated)'
          value={categories}
          onChange={e => setCategories(e.target.value)}
          className='w-full p-2 border border-gray-300 rounded'
          required
        />
        {/* <select
          value={mediaType}
          onChange={e => setMediaType(e.target.value)}
          className='w-full p-2 border border-gray-300 rounded'
        >
          <option value='image'>Image</option>
          <option value='video'>Video</option>
        </select> */}

        <div className='space-y-4'>
          <input
            type='file'
            ref={fileInputRef}
            onChange={e => setFile(e.target.files[0])}
            className='w-full'
            accept='image/*,video/*'
          />
          <button
            type='button'
            onClick={handleFileUpload}
            disabled={!file || uploading}
            className='w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed'
          >
            {uploading ? 'Uploading...' : 'Upload Media File'}
          </button>
        </div>

        <button
          type='submit'
          disabled={savingDocument || !url}
          className={`w-full text-white py-2 rounded 
            ${
              savingDocument || !url
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 cursor-pointer'
            }`}
        >
          {savingDocument ? 'Saving...' : 'Save Media Document'}
        </button>
      </form>
    </div>
  )
}

export default CreateMediaPage
