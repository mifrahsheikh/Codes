import React from "react";

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="w-full flex justify-center mt-10 mb-8">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search by name or category..."
        className="w-[40%] px-4 py-4 rounded-2xl border border-gray-400 shadow-md bg-black/40 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition"
      />
    </div>
  );
};

export default SearchBar;