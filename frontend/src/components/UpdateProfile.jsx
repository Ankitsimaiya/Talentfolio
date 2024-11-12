// src/components/UpdateProfilePage.jsx
import React, { useEffect, useState } from "react";
import cookies from "js-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function UpdateProfilePage() {
  const [bio, setBio] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [contact, setContact] = useState("");
  const [instagram, setInstagram] = useState("");
  const [facebook, setFacebook] = useState("");
  const [x, setX] = useState("");
  const token = cookies.get("token");

  const navigate = useNavigate()

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/v1/profile/details", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { bio, location, contact, social } = response.data.user;
      setBio(bio || "");
      setCity(location?.city || "");
      setState(location?.state || "");
      setContact(contact || "");
      setInstagram(social?.instagram || "");
      setFacebook(social?.facebook || "");
      setX(social?.x || "");
    } catch (error) {
      console.error("Error fetching profile data", error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (contact.length > 10) {
      alert("Contact number cannot exceed 10 digits.");
      return;
    }
    try {
      const updatedData = {
        bio,
        location: { city, state },
        contact,
        social: { instagram, facebook, x },
      };

      await axios.put("http://localhost:3000/api/v1/user/update", updatedData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then(navigate('/profile'));
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile", error);
      alert("Failed to update profile.");
    }
  };

  const handleContactChange = (e) => {
    const input = e.target.value;
    if (/^\d*$/.test(input) && input.length <= 10) { // Check for numeric input and max length of 10
      setContact(input);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen py-10 px-4 flex items-center justify-center">
      <div className="container mx-auto max-w-3xl bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">Update Profile</h2>
        <form onSubmit={handleUpdate} className="space-y-6">
          {/* Bio */}
          <div>
            <label htmlFor="bio" className="block text-gray-700 font-semibold mb-2">Bio</label>
            <textarea
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
              rows="3"
              placeholder="Enter your bio"
            ></textarea>
          </div>

          {/* Location */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="city" className="block text-gray-700 font-semibold mb-2">City</label>
              <input
                id="city"
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="Enter your city"
              />
            </div>
            <div>
              <label htmlFor="state" className="block text-gray-700 font-semibold mb-2">State</label>
              <input
                id="state"
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="Enter your state"
              />
            </div>
          </div>

          {/* Contact */}
          <div>
            <label htmlFor="contact" className="block text-gray-700 font-semibold mb-2">Contact</label>
            <input
              id="contact"
              type="text"
              value={contact}
              onChange={handleContactChange}
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="Enter your contact number"
            />
          </div>

          {/* Social Media Links */}
          <div>
            <label htmlFor="instagram" className="block text-gray-700 font-semibold mb-2">Instagram</label>
            <input
              id="instagram"
              type="text"
              value={instagram}
              onChange={(e) => setInstagram(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="Enter Instagram link"
            />
          </div>
          <div>
            <label htmlFor="facebook" className="block text-gray-700 font-semibold mb-2">Facebook</label>
            <input
              id="facebook"
              type="text"
              value={facebook}
              onChange={(e) => setFacebook(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="Enter Facebook link"
            />
          </div>
          <div>
            <label htmlFor="x" className="block text-gray-700 font-semibold mb-2">X (Twitter)</label>
            <input
              id="x"
              type="text"
              value={x}
              onChange={(e) => setX(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="Enter X link"
            />
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-600"
            >
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateProfilePage;
