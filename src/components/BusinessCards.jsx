import React from "react";

const BusinessCards = ({ business, onDelete }) => {
  return (
    <div className="business-card">
      <h3>{business.name}</h3>
      <p>Category: {business.category}</p>
      <p>Rating: {business.rating}</p>
      <p>Contact: {business.contact}</p>
      <p>Distance: {business.distance} Km</p>
      <button
        className="delete-button"
        onClick={() => onDelete(business.id)}
      >
        Delete
      </button>
    </div>
  );
};

export default BusinessCards;
