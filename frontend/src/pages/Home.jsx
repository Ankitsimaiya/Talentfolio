import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Base_url = import.meta.env.VITE_BASE_URL

const HomePage = () => {
  const [mediaItems, setMediaItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHomeMedia = async () => {
      try {
        const res = await axios.get(`${Base_url}/profile/home`);
        setMediaItems(res.data.data);
      } catch (error) {
        console.error("Failed to load media:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeMedia();
  }, []);

  if (loading) return <div className="text-center mt-10 text-gray-700">Loading media...</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {mediaItems?.map((item, index) => (
        <div
          key={item._id}
          onClick={() => navigate(`/media/${item._id}`)}
          className="bg-white rounded-2xl shadow-md overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:scale-[1.03] cursor-pointer animate-fade-in"
          style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'backwards' }}
        >
          <div className="w-full h-52 bg-gray-100 flex items-center justify-center overflow-hidden">
            {item.mediaType === 'video' ? (
              <video
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                controls
              >
                <source src={item.url} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <img
                src={item.url}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
            )}
          </div>

          <div className="p-4">
            <h2 className="text-lg font-semibold mb-1 text-gray-800">{item.title}</h2>
            <p className="text-gray-600 text-sm mb-2">{item.description}</p>

            <div className="flex flex-wrap gap-2 mb-2">
              {item.categories.map((cat, idx) => (
                <span
                  key={idx}
                  className="bg-emerald-100 text-emerald-700 text-xs px-2 py-1 rounded-full transition-all duration-200 hover:bg-emerald-200 hover:-translate-y-[1px]"
                >
                  #{cat}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>By {item.username}</span>
              <span>{new Date(item.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HomePage;
