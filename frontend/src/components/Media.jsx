// src/components/MediaUploadModal.jsx
import React, { useState } from "react";
import axios from "axios";
import cookies from "js-cookie";

function MediaUploadModal({ onClose, fetchData }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState(null);
  const token = cookies.get("token");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("categories", category);
    formData.append("image", file);

    try {
      await axios.post("http://localhost:3000/api/v1/media/upload-image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      fetchData(); // Refresh profile data after upload
      onClose(); // Close the modal
    } catch (error) {
      console.error("Error uploading media", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl"
        >
          &times;
        </button>
        <h2 className="text-2xl font-semibold mb-4">Upload Media</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
            rows="3"
            required
          ></textarea>
          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
          <input
            type="file"
            onChange={handleFileChange}
            className="w-full"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded w-full"
          >
            Upload
          </button>
        </form>
      </div>
    </div>
  );
}

export default MediaUploadModal;
