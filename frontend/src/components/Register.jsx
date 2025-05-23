import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import registerIllustration from '../assets/register-illustration.svg'; // Replace with your own SVG or image
const Base_url = import.meta.env.VITE_BASE_URL

function RegisterForm() {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const response = await axios.post(`${Base_url}/user/register`, formData);

      if (response.status === 201) {
        navigate('/login');
      }
    } catch (err) {
      setErrorMsg(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
      
      {/* Illustration Panel */}
      <div className="hidden md:flex md:w-1/2 bg-indigo-600 items-center justify-center">
        <img src={registerIllustration} alt="Register illustration" className="w-3/4 h-auto" />
      </div>

      {/* Form Panel */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 p-8">
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md">
          <h2 className="text-3xl font-bold mb-6 text-center text-indigo-600">Create an Account</h2>

          {errorMsg && <div className="text-red-500 mb-4 text-sm text-center">{errorMsg}</div>}

          {/* Name */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              required
            />
          </div>

          {/* Username */}
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              required
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-lg font-semibold text-white transition duration-300 ${
              loading ? 'bg-indigo-300' : 'bg-indigo-600 hover:bg-indigo-700'
            }`}
          >
            {loading ? 'Creating account...' : 'Register'}
          </button>

          {/* Login Redirect */}
          <p className="text-center mt-6 text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-indigo-500 hover:underline font-medium">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default RegisterForm;
