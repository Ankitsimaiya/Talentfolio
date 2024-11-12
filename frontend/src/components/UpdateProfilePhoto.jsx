// src/components/UpdateProfilePhotoModal.jsx
import React, { useState } from "react";
import cookies from "js-cookie";
import axios from "axios";

function UpdateProfilePhotoModal({ isOpen, onClose, currentPhotoUrl }) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(currentPhotoUrl);
  const token = cookies.get("token");

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file)); // Show preview of new photo
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      alert("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("profilePhoto", selectedFile);

    try {
      await axios.post("http://localhost:3000/api/v1/profile/photo", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Profile photo updated successfully!");
      onClose(); // Close modal after successful upload
    } catch (error) {
      console.error("Error uploading profile photo", error);
      alert("Failed to update profile photo.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-lg  p-3  relative">
        <button onClick={onClose} className="absolute top-3 right-3 text-white text-4xl  hover:text-gray-700">
          &times;
        </button>
        {/* <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">Profile Photo</h2> */}
        
        {isEditMode ? (
          <form onSubmit={handleUpload} className="space-y-6">
            <div className="text-center">
              {/* <p className="text-gray-600">New Profile Photo Preview:</p> */}
              <img
                src={previewUrl}
                alt="Profile Preview"
                className="w-28 h-28 object-cover rounded-full mx-auto mt-2"
              />
            </div>
            <div>
              <label htmlFor="profilePhoto" className="block text-gray-700 font-semibold mb-2">
                Choose New Profile Photo
              </label>
              <input
                id="profilePhoto"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="bg-blue-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-600"
              >
                Upload Photo
              </button>
            </div>
          </form>
        ) : (
          <div className="text-center">
            <img
              src={currentPhotoUrl}
              alt="Current Profile"
              className="w-60 h-60 object-cover  mx-auto mt-2"
            />
            <button
              onClick={() => setIsEditMode(true)}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-full font-semibold hover:bg-blue-600"
            >
              Update Profile Photo
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default UpdateProfilePhotoModal;
