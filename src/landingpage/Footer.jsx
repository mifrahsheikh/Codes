import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black text-gray-300 py-10 mt-20 border-t border-emerald-800">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
        
        <div>
          <h2 className="text-xl font-bold text-emerald-500">LocalPulse</h2>
          <p className="mt-3 text-sm text-gray-400">
            Discover businesses around you – restaurants, hospitals, brands, and more.
          </p>
        </div>
        <div className="flex flex-col space-y-2 text-sm">
          <Link to="/" className="hover:text-emerald-400">Home</Link>
          <Link to="/about" className="hover:text-emerald-400">About</Link>
          <Link to="/categories" className="hover:text-emerald-400">Categories</Link>
          <Link to="/contact" className="hover:text-emerald-400">Contact</Link>
        </div>

        <div className="flex space-x-4 justify-start md:justify-end">
          <a href="#" className="hover:text-emerald-400"><FaFacebook size={20} /></a>
          <a href="#" className="hover:text-emerald-400"><FaTwitter size={20} /></a>
          <a href="#" className="hover:text-emerald-400"><FaInstagram size={20} /></a>
        </div>
      </div>

      <div className="text-center text-gray-500 text-xs mt-8">
        © {new Date().getFullYear()} LocalPulse. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
