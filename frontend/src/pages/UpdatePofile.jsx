import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { FaLinkedin, FaTwitter } from 'react-icons/fa';
const Base_url = import.meta.env.VITE_BASE_URL

const UpdateProfileForm = () => {
  const [formData, setFormData] = useState({
    bio: '',
    skills: [],
    skillInput: '',
    availability: 'Available',
    location: {
      city: '',
      state: '',
      country: '',
      zipCode: ''
    },
    social: {
      linkedin: '',
      twitter: ''
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith('location.')) {
      const key = name.split('.')[1];
      setFormData((prev) => ({
        ...prev,
        location: { ...prev.location, [key]: value }
      }));
    } else if (name.startsWith('social.')) {
      const key = name.split('.')[1];
      setFormData((prev) => ({
        ...prev,
        social: { ...prev.social, [key]: value }
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleAddSkill = () => {
    const skill = formData.skillInput.trim();
    if (skill && !formData.skills.includes(skill)) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, skill],
        skillInput: ''
      }));
    }
  };

  const handleRemoveSkill = (skill) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skill)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { skillInput, ...dataToSend } = formData;
      const token = Cookies.get('token');

      await axios.put(`${Base_url}/profile`, dataToSend, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setFormData({
        bio: '',
        skills: [],
        skillInput: '',
        availability: 'Available',
        location: {
          city: '',
          state: '',
          country: '',
          zipCode: ''
        },
        social: {
          linkedin: '',
          twitter: ''
        }
      });

      toast.success('Profile updated successfully!');
    } catch (error) {
      console.error(error);
      toast.error('Failed to update profile.');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-2xl rounded-3xl space-y-8 animate-fade-in"
    >
      <h1 className="text-3xl font-extrabold text-center text-blue-700">Update Your Profile</h1>

      {/* Bio */}
      <div>
        <label className="block text-lg font-medium mb-2">Bio</label>
        <textarea
          name="bio"
          rows="4"
          placeholder="Tell us about yourself..."
          value={formData.bio}
          onChange={handleChange}
          className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 transition duration-300"
        />
      </div>

      {/* Skills */}
      <div>
        <label className="block text-lg font-medium mb-2">Skills</label>
        <div className="flex gap-2">
          <input
            type="text"
            name="skillInput"
            placeholder="Add a skill and press +"
            value={formData.skillInput}
            onChange={handleChange}
            className="flex-1 p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="button"
            onClick={handleAddSkill}
            className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition"
          >
            +
          </button>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {formData.skills.map((skill, index) => (
            <span
              key={index}
              className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-2 hover:scale-105 transition-transform"
            >
              {skill}
              <button
                type="button"
                onClick={() => handleRemoveSkill(skill)}
                className="text-red-500 hover:text-red-700"
              >
                &times;
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Availability */}
      <div>
        <label className="block text-lg font-medium mb-2">Availability</label>
        <select
          name="availability"
          value={formData.availability}
          onChange={handleChange}
          className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-400"
        >
          <option value="Available">Available</option>
          <option value="Busy">Busy</option>
          <option value="Not Available">Not Available</option>
        </select>
      </div>

      {/* Location */}
      <div>
        <h2 className="text-lg font-semibold mb-2">Location</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['city', 'state', 'country', 'zipCode'].map((field) => (
            <input
              key={field}
              type="text"
              name={`location.${field}`}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={formData.location[field]}
              onChange={handleChange}
              className="p-3 border rounded-xl focus:ring-2 focus:ring-blue-400"
            />
          ))}
        </div>
      </div>

      {/* Social Links */}
      <div>
        <h2 className="text-lg font-semibold mb-2">Social Links</h2>
        <div className="relative mb-3">
          <FaLinkedin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-600" />
          <input
            type="url"
            name="social.linkedin"
            placeholder="LinkedIn URL"
            value={formData.social.linkedin}
            onChange={handleChange}
            className="w-full p-3 pl-10 border rounded-xl focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="relative">
          <FaTwitter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sky-500" />
          <input
            type="text"
            name="social.twitter"
            placeholder="Twitter Handle"
            value={formData.social.twitter}
            onChange={handleChange}
            className="w-full p-3 pl-10 border rounded-xl focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>

      {/* Submit */}
      <div className="text-center">
        <button
          type="submit"
          className="bg-gradient-to-r from-blue-600 to-blue-800 text-white font-semibold py-3 px-10 rounded-full hover:shadow-2xl transition duration-300"
        >
          Save Profile
        </button>
      </div>
    </form>
  );
};

export default UpdateProfileForm;
