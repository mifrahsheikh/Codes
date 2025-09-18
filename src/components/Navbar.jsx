import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = ({ isLoggedIn }) => {
  const navigate = useNavigate();

  return (
    <nav className="w-full flex justify-between items-center p-7 bg-black/50 backdrop-brightness-50 fixed top-0 shadow z-50">
      <h1 className="text-2xl font-bold text-emerald-400">LocalPulse</h1>
      <div>
        {!isLoggedIn && (
          <button
            className="px-4 py-2 bg-white text-emerald-700 rounded-xl font-semibold hover:bg-gray-200 transition"
            onClick={() => navigate("/login")}
          >
            Sign In
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
