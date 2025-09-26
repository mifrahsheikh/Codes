import React from "react";
const BusinessDetailModal = ({ business, onClose }) => {
  if (!business) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[1000] p-4">
      <div className="bg-gray-900 text-white p-6 rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-lg">
        <h2 className="text-2xl font-bold text-emerald-400 mb-4">{business.name}</h2>
        <img
          src={business.image || "/placeholder.png"}
          alt={business.name}
          className="w-full h-48 object-cover rounded-lg mb-4"
        />
        <div className="space-y-2">
          <p><span className="font-semibold">Category:</span> {business.category}</p>
          {business.rating && <p><span className="font-semibold">Rating:</span> {business.rating}</p>}
          {business.contact && <p><span className="font-semibold">Contact:</span> {business.contact}</p>}
          {business.address && <p><span className="font-semibold">Address:</span> {business.address}</p>}
          {business.description && <p><span className="font-semibold">Description:</span> {business.description}</p>}
          {business.website && (
            <p>
              <span className="font-semibold">Website:</span>{" "}
              <a href={business.website} target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline">
                {business.website}
              </a>
            </p>
          )}
          {business.distance && <p><span className="font-semibold">Distance:</span> {business.distance} km</p>}
          {business.eco_friendly !== undefined && (
            <p><span className="font-semibold">Eco Friendly:</span> {business.eco_friendly ? "Yes" : "No"}</p>
          )}
        </div>

        <button
          onClick={onClose}
          className="mt-4 w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-md"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default BusinessDetailModal;