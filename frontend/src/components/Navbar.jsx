// src/components/TalentfolioNavbar.jsx
import React, { useState } from 'react';
import { FaSearch, FaBars, FaTimes } from 'react-icons/fa'; // Import hamburger and close icons
import { Link } from 'react-router-dom';

function TalentfolioNavbar() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false); // To toggle the mobile menu

  return (
    <nav className="bg-gray-900 p-4">
      <div className=" mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="text-white font-bold text-xl">
          <a href="/">Talentfolio</a>
        </div>

        {/* Search Bar with Search Icon */}
        <div className=" items-center flex-1 mx-4 max-w-lg relative hidden sm:flex">
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
          <FaSearch className="absolute left-3 text-gray-400" />
        </div>

        {/* Menu Items */}
        <div className="hidden md:flex items-center space-x-4">
          {/* Categories Dropdown */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!isDropdownOpen)}
              className="text-white px-4 py-2 rounded-lg hover:bg-gray-700 focus:outline-none"
            >
              Categories
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg z-10">
                <a href="#" className="block px-4 py-2 hover:bg-gray-200">
                  Category 1
                </a>
                <a href="#" className="block px-4 py-2 hover:bg-gray-200">
                  Category 2
                </a>
                <a href="#" className="block px-4 py-2 hover:bg-gray-200">
                  Category 3
                </a>
              </div>
            )}
          </div>

          {/* Register and Login buttons */}
          <Link to="/register" className="text-white px-4 py-2 rounded-lg hover:bg-gray-700">
            Register
          </Link>
          <Link to="/login" className="text-white px-4 py-2 rounded-lg hover:bg-gray-700">
            Login
          </Link>
        </div>

        {/* Hamburger Menu for Mobile */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white text-2xl"
          >
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'} bg-gray-800 text-white`}
      >
        <div className="flex flex-col items-center py-4">
          {/* Search Bar for Mobile */}
          <div className="relative mb-4 w-11/12">
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
            <FaSearch className="absolute left-3 text-gray-400" />
          </div>

          {/* Menu Items for Mobile */}
          <Link to="/categories" className="px-4 py-2 w-full text-center hover:bg-gray-700">
            Categories
          </Link>
          <Link to="/register" className="px-4 py-2 w-full text-center hover:bg-gray-700">
            Register
          </Link>
          <Link to="/login" className="px-4 py-2 w-full text-center hover:bg-gray-700">
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default TalentfolioNavbar;
