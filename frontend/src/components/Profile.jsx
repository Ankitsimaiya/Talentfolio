// src/components/ProfilePage.jsx
import React, { useEffect, useState } from "react";
import cookies from "js-cookie";
import axios from "axios";
import MediaUploadModal from "./Media"; // Modal for uploading media
// import {} from "fa-icon" 

function ProfilePage() {
  const [data, setData] = useState(null);
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const token = cookies.get("token");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/v1/profile/details", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(response.data);
    } catch (error) {
      console.error("Error fetching profile data", error);
    }
  };

  if (!data) {
    return <div>Loading...</div>;
  }

  const { user, media } = data;

  return (
    <div className="bg-gray-100 min-h-screen py-10 px-4 flex items-center justify-center">
      <div className="container mx-auto max-w-4xl bg-white rounded-lg shadow-lg p-8">
        {/* User Info Section */}
        <section className="text-center mb-8">
          <img
            src={user.profileUrl || "https://via.placeholder.com/100"}
            alt="User Avatar"
            className="w-32 h-32 rounded-full mb-4 mx-auto" // Adjust size of the profile image
          />
          <div>
            <p className="text-2xl font-semibold">{user.name }</p>
            <p className="text-gray-600"> {user.username}</p>
            
            <p className="text-gray-600"> {user.bio }</p>
           
            <p className="text-gray-600">
              Location: {user.location ? `${user.location.city}, ${user.location.state}` : "Not Available"}
            </p>
          </div>
        </section>

        {/* Social Media Links */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Social Links</h2>
          <div className="flex justify-center space-x-6">
            {user.social?.instagram && (
              <a
                href={`https://${user.social.instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                Instagram
              </a>
            )}
            {user.social?.facebook && (
              <a
                href={`https://${user.social.facebook}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                Facebook
              </a>
            )}
            {user.social?.x && (
              <a
                href={`https://${user.social.x}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                X (Twitter)
              </a>
            )}
          </div>
        </section>

        {/* Media Details Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Media Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {media.map((item) => (
              <div key={item._id} className="bg-gray-200 p-4 rounded-lg">
                {/* Conditionally render media based on media type */}
                {item.mediaType === "image" ? (
                  <img
                    src={item.url}
                    alt={item.title}
                    className="w-full h-48 object-cover rounded mb-2"
                  />
                ) : item.mediaType === "video" ? (
                  <video
                    className="w-full h-48 object-cover rounded mb-2"
                    controls
                  >
                    <source src={item.url} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : null}
                <p className="text-gray-800 font-semibold">{item.title}</p>
                <p className="text-gray-600">{item.description}</p>
                <p className="text-gray-600">Category: {item.categories}</p>
                <p className="text-gray-600">Type: {item.mediaType}</p>
                <p className="text-gray-600">Views: {item.view} | Likes: {item.like}</p>
              </div>
            ))}
          </div>
          {/* Upload Media Button */}
          <div className="flex justify-end mt-4">
            <button
              onClick={() => setShowModal(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600"
            >
              Upload Media
            </button>
          </div>
        </section>

        {/* Contact Details Section */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Contact Details</h2>
          <div className="flex flex-col space-y-4">
            <div className="bg-gray-200 p-4 rounded-lg">
              <p className="text-gray-800 font-semibold">Email</p>
              <p className="text-gray-600">{user.email}</p>
            </div>
            <div className="bg-gray-200 p-4 rounded-lg">
              <p className="text-gray-800 font-semibold">Location</p>
              <p className="text-gray-600">{user.location ? `${user.location.city}, ${user.location.state}` : "Not Available"}</p>
            </div>
          </div>
        </section>
      </div>

      {/* Modal for Media Upload */}
      {showModal && <MediaUploadModal onClose={() => setShowModal(false)} fetchData={fetchData} />}
    </div>
  );
}

export default ProfilePage;
