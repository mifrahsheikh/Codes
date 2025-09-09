import React from "react";

const TopBar = ({ logo, searchTerm, setSearchTerm }) => {
  return (
    <div className="top-bar">
      <img src={logo} alt="Local Pulse Logo" className="search-logo" />
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search nearby places..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="search-button">Search</button>
      </div>
    </div>
  );
};

export default TopBar;