// src/components/ProfilePage.jsx
import React, {useEffect, useState} from "react";
import cookies from "js-cookie";
import axios from "axios";

function ProfilePage() {
  const [data,setData] =  useState([])

  const token = cookies.get("token");

//   console.log("token", token);
  


    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async() => {
      
        const response = await axios.get("http://localhost:3000/api/v1/profile/details", {
            headers: {
              Authorization: `Bearer ${token}`,
            }, 
          });
          console.log('response' , response.data)
          setData(response.data)
     
    }
    
    console.log('data', data)
    





  return (
    <div className="bg-gray-100 min-h-screen py-10 px-4">
      <div className="container mx-auto max-w-4xl bg-white rounded-lg shadow-lg p-8">
        {/* User Info Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            User Info
          </h2>
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
            <img
              src="https://via.placeholder.com/100"
              alt="User Avatar"
              className="w-24 h-24 rounded-full"
            />
            <div>
              <p className="text-lg font-semibold">John Doe</p>
              <p className="text-gray-600">Software Developer</p>
              <p className="text-gray-600">Based in San Francisco, CA</p>
            </div>
          </div>
        </section>

        {/* Media Details Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Media Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Example media items */}
            <div className="bg-gray-200 p-4 rounded-lg">
              <p className="text-gray-800 font-semibold">Recent Project</p>
              <p className="text-gray-600">
                A web app built with React and Node.js
              </p>
            </div>
            <div className="bg-gray-200 p-4 rounded-lg">
              <p className="text-gray-800 font-semibold">Portfolio Link</p>
              <a
                href="https://portfolio.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                Visit Portfolio
              </a>
            </div>
            <div className="bg-gray-200 p-4 rounded-lg">
              <p className="text-gray-800 font-semibold">Social Media</p>
              <p className="text-gray-600">LinkedIn, GitHub, Twitter</p>
            </div>
            <div className="bg-gray-200 p-4 rounded-lg">
              <p className="text-gray-800 font-semibold">Skills</p>
              <p className="text-gray-600">
                JavaScript, React, Node.js, MongoDB
              </p>
            </div>
          </div>
        </section>

        {/* Contact Details Section */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Contact Details
          </h2>
          <div className="flex flex-col space-y-4">
            <div className="bg-gray-200 p-4 rounded-lg">
              <p className="text-gray-800 font-semibold">Email</p>
              <p className="text-gray-600">johndoe@example.com</p>
            </div>
            <div className="bg-gray-200 p-4 rounded-lg">
              <p className="text-gray-800 font-semibold">Phone</p>
              <p className="text-gray-600">+1 (555) 123-4567</p>
            </div>
            <div className="bg-gray-200 p-4 rounded-lg">
              <p className="text-gray-800 font-semibold">Location</p>
              <p className="text-gray-600">San Francisco, CA, USA</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default ProfilePage;
