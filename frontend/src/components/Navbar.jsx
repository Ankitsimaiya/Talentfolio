import React, { useEffect, useState, useRef } from 'react';
import { FaSearch, FaUserCircle } from 'react-icons/fa';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
const Base_url = import.meta.env.VITE_BASE_URL

function TalentfolioNavbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [userId, setUserId] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const token = Cookies.get('token');
    const storedUser = localStorage.getItem('user');
    const user = storedUser ? JSON.parse(storedUser) : null;

    if (token && user) {
      setIsLoggedIn(true);
      setUsername(user.username);
      setUserId(user._id);
    } else {
      setIsLoggedIn(false);
      setUsername('');
    }
  }, [location]);

  const handleLogout = () => {
    Cookies.remove('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    toast.info('User Logged Out');
    navigate('/');
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="bg-[#F8FAF5] border-b border-emerald-100 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-2 flex-wrap sm:flex-nowrap">

        {/* Logo */}
        <Link to="/" className="flex-shrink-0">
          <img src="/logo.png" alt="Talentfolio Logo" className="w-16 sm:w-20 h-auto" />
        </Link>

        {/* Search Bar (center aligned and flexible) */}
        <div className="flex-grow order-3 sm:order-none w-full sm:w-auto mt-2 sm:mt-0">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search by title..."
              className="w-full pl-10 pr-4 py-2 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white text-gray-800 placeholder-gray-500 transition"
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
        </div>

        {/* User section */}
        <div className="relative flex-shrink-0" ref={dropdownRef}>
          {isLoggedIn ? (
            <>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 text-[#1F2937] font-medium"
              >
                <FaUserCircle className="text-2xl sm:text-3xl text-emerald-500" />
                <span className="hidden sm:inline">{username}</span>
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-emerald-100 rounded-lg shadow-md z-50">
                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      navigate(`/profile/${userId}`);
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-emerald-50"
                  >
                    View Profile
                  </button>
                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      navigate(`/update-profile/${userId}`);
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-emerald-50"
                  >
                    Update Profile
                  </button>
                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      handleLogout();
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-emerald-50 text-red-500"
                  >
                    Logout
                  </button>
                </div>
              )}
            </>
          ) : (
            <Link
              to="/login"
              className="text-[#10B981] border border-[#10B981] px-4 py-2 rounded-lg hover:bg-[#10B981] hover:text-white transition"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default TalentfolioNavbar;
