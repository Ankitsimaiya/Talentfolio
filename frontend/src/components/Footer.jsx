// src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-[#F8FAF5] text-[#1F2937] py-10 border-t border-emerald-100">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-4">

        {/* About Section */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-[#10B981]">Talentfolio</h2>
          <p className="text-[#6B7280]">
            Talentfolio is a platform dedicated to showcasing talents and connecting with opportunities. Our mission is to provide a space for creators, artists, and professionals to shine.
          </p>
        </div>

        {/* Categories Section */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-[#10B981]">Categories</h2>
          <ul className="text-[#6B7280] space-y-2">
            <li>
              <Link to="/category/design" className="hover:text-[#10B981]">Design</Link>
            </li>
            <li>
              <Link to="/category/technology" className="hover:text-[#10B981]">Technology</Link>
            </li>
            <li>
              <Link to="/category/business" className="hover:text-[#10B981]">Business</Link>
            </li>
            <li>
              <Link to="/category/photography" className="hover:text-[#10B981]">Photography</Link>
            </li>
          </ul>
        </div>

        {/* Support Section */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-[#10B981]">Support</h2>
          <ul className="text-[#6B7280] space-y-2">
            <li>
              <Link to="/help" className="hover:text-[#10B981]">Help Center</Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-[#10B981]">Contact Us</Link>
            </li>
            <li>
              <Link to="/privacy-policy" className="hover:text-[#10B981]">Privacy Policy</Link>
            </li>
            <li>
              <Link to="/terms-of-service" className="hover:text-[#10B981]">Terms of Service</Link>
            </li>
          </ul>
        </div>

        {/* Social Media Section */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-[#10B981]">Follow Us</h2>
          <div className="flex space-x-4 text-[#6B7280]">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#10B981] transition">
              <FaFacebook size={24} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#10B981] transition">
              <FaTwitter size={24} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#10B981] transition">
              <FaLinkedin size={24} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#10B981] transition">
              <FaInstagram size={24} />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-[#6B7280] mt-8 pt-4 text-sm border-t border-emerald-100">
        &copy; {new Date().getFullYear()} Talentfolio. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
