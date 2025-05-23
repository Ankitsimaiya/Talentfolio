import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Cookie from 'js-cookie'
import loginIllustration from '../assets/login-illustration.svg' // Replace with your image path
import { toast } from 'react-hot-toast'
const Base_url = import.meta.env.VITE_BASE_URL

function LoginForm () {
  const [formData, setFormData] = useState({
    emailOrUsername: '',
    password: ''
  })
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const navigate = useNavigate()

  const handleChange = e => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    setErrorMsg('')

    try {
      const data = await axios.post(
        `${Base_url}/user/login`,
        formData
      )

      
      Cookie.set('token', data?.data?.token, {
        expires: 7, // 7 days
        secure: true,
        sameSite: 'Strict'
      })
      
      console.log("datk",data)
      localStorage.setItem('user', JSON.stringify(data.data?.user));
      toast.success('User Logged In Successfully')
      navigate('/')
    } catch (err) {
      console.log('error', err)
      setErrorMsg(
        err.response?.data?.error || 'Login failed. Please try again.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='min-h-screen flex flex-col md:flex-row bg-gray-100'>
      {/* Illustration Section */}
      <div className='hidden md:flex md:w-1/2 bg-blue-600 items-center justify-center'>
        <img
          src={loginIllustration}
          alt='Login visual'
          className='w-3/4 h-auto'
        />
      </div>

      {/* Login Form Section */}
      <div className='flex flex-col justify-center items-center w-full md:w-1/2 p-8'>
        <form
          onSubmit={handleSubmit}
          className='bg-white p-8 rounded-xl shadow-xl w-full max-w-md'
        >
          <h2 className='text-3xl font-bold mb-6 text-center text-blue-600'>
            Login to Talentfolio
          </h2>

          {errorMsg && (
            <div className='text-red-500 mb-4 text-sm text-center'>
              {errorMsg}
            </div>
          )}

          {/* Email Field */}
          <div className='mb-4'>
            <label
              htmlFor='email'
              className='block text-sm font-semibold text-gray-700'
            >
              Email
            </label>
            <input
              type='text'
              name='emailOrUsername'
              value={formData.emailOrUsername}
              onChange={handleChange}
              className='w-full px-4 py-2 border rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400'
              required
            />
          </div>

          {/* Password Field */}
          <div className='mb-4'>
            <label
              htmlFor='password'
              className='block text-sm font-semibold text-gray-700'
            >
              Password
            </label>
            <input
              type='password'
              name='password'
              value={formData.password}
              onChange={handleChange}
              className='w-full px-4 py-2 border rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400'
              required
            />
          </div>

          {/* Forgot Password */}
          <div className='mb-4 text-right'>
            <Link
              to='/forgot-password'
              className='text-sm text-blue-500 hover:underline'
            >
              Forgot password?
            </Link>
          </div>

          {/* Login Button */}
          <button
            type='submit'
            disabled={loading}
            className={`w-full py-2 rounded-lg font-semibold text-white transition duration-300 ${
              loading ? 'bg-blue-300' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>

          {/* Register Link */}
          <p className='text-center mt-6 text-sm text-gray-600'>
            Don’t have an account?{' '}
            <Link
              to='/register'
              className='text-blue-500 hover:underline font-medium'
            >
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default LoginForm
