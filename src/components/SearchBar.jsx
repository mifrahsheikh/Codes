import React from "react";

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="w-full flex justify-center mt-10 mb-8 px-4">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search by name or category..."
        className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-2/5 px-4 py-3
          rounded-2xl
          border border-gray-400
          shadow-md
          bg-black/40
          text-white
          placeholder-gray-500
          focus:outline-none
          focus:ring-2
          focus:ring-emerald-400
          focus:border-emerald-400
          transition
        "
      />
    </div>
  );
};

export default SearchBar;
