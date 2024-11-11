// src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-4">
        
        {/* About Section */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Talentfolio</h2>
          <p className="text-gray-400">
            Talentfolio is a platform dedicated to showcasing talents and connecting with opportunities. Our mission is to provide a space for creators, artists, and professionals to shine.
          </p>
        </div>

        {/* Categories Section */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Categories</h2>
          <ul className="text-gray-400 space-y-2">
            <li>
              <Link to="/category/design" className="hover:text-white">Design</Link>
            </li>
            <li>
              <Link to="/category/technology" className="hover:text-white">Technology</Link>
            </li>
            <li>
              <Link to="/category/business" className="hover:text-white">Business</Link>
            </li>
            <li>
              <Link to="/category/photography" className="hover:text-white">Photography</Link>
            </li>
          </ul>
        </div>

        {/* Support Section */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Support</h2>
          <ul className="text-gray-400 space-y-2">
            <li>
              <Link to="/help" className="hover:text-white">Help Center</Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-white">Contact Us</Link>
            </li>
            <li>
              <Link to="/privacy-policy" className="hover:text-white">Privacy Policy</Link>
            </li>
            <li>
              <Link to="/terms-of-service" className="hover:text-white">Terms of Service</Link>
            </li>
          </ul>
        </div>

        {/* Social Media Section */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Follow Us</h2>
          <div className="flex space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
              <FaFacebook size={24} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
              <FaTwitter size={24} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
              <FaLinkedin size={24} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
              <FaInstagram size={24} />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-gray-500 mt-8 border-t border-gray-700 pt-4">
        &copy; {new Date().getFullYear()} Talentfolio. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
