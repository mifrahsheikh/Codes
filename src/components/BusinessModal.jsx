import React, { useState } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

const BusinessModal = ({ newBusiness, handleChange, handleAddBusiness, onClose, handleFileChange }) => {
  return (
    <div className="fixed inset-0 bg-white/30 backdrop-blur-sm bg-opacity-60 flex items-center justify-center z-[1000]">
      <div className="bg-white p-5 rounded-lg w-[40%]">
        <h2 className="text-lg font-semibold mb-4">Add New Business</h2>
        <div className="space-y-2">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={newBusiness.name}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-md border border-gray-300"
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={newBusiness.category}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-md border border-gray-300"
          />
          <input
            type="text"
            name="latitude"
            placeholder="Latitude"
            value={newBusiness.latitude}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-md border border-gray-300"
          />
          <input
            type="text"
            name="longitude"
            placeholder="Longitude"
            value={newBusiness.longitude}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-md border border-gray-300"
          />
          <input
            type="number"
            name="rating"
            placeholder="Rating"
            value={newBusiness.rating}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-md border border-gray-300"
          />
          <input
            type="text"
            name="contact"
            placeholder="Contact"
            value={newBusiness.contact}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-md border border-gray-300"
          />
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full py-2"
          />
        </div>
        <div className="mt-3 flex justify-end gap-2">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            onClick={handleAddBusiness}
          >
            OK
          </button>
          <button
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default BusinessModal;
