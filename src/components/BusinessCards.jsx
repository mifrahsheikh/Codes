import React, { useState } from "react";
import EditBusiness from "./EditBusiness";

const BusinessCards = ({ business, onDelete, onUpdate }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div
        className="bg-white rounded-xl shadow-md hover:shadow-lg transition transform hover:-translate-y-1 cursor-pointer p-6 flex flex-col items-center text-center w-80"
        onClick={() => setShowModal(true)}
      >
        <img
          src={business.image || "/placeholder.png"}
          alt={business.name}
          className="w-90 h-50 rounded-xl object-cover mb-4"
        />
        <h3 className="font-bold text-emerald-700 text-lg">{business.name}</h3>
        <p className="text-gray-500">{business.category}</p>
        <div className="flex items-center justify-center mt-1">
          <span className="text-yellow-400">Rating: {business.rating}</span>
        </div>

        <button
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(business.id);
          }}>
          Delete
        </button>
      </div>
      {showModal && (
        <EditBusiness
          business={business}
          onClose={() => setShowModal(false)}
          onUpdate={onUpdate}
        />
      )}
    </>
  );
};

export default BusinessCards;