import React from "react";

const BusinessModal = ({ newBusiness, handleChange, handleAddBusiness, onClose, handleFileChange }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[1000] p-4">
      <div className="bg-white text-white p-6 rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-lg">
        <h2 className="text-xl font-bold text-emerald-500 mb-4">Add New Business</h2>
        <div className="flex flex-col gap-3">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={newBusiness.name}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-md border border-emerald-600 bg-gray-100 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"/>

          <input
            type="text"
            name="category"
            placeholder="Category"
            value={newBusiness.category}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-md border border-emerald-600 bg-gray-100 text-gray-900 placeholder-gary-900 focus:outline-none focus:ring-emarald-500"
          />
          <input
            type="text"
            name="latitude"
            placeholder="Latitude"
            value={newBusiness.latitude}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-md border border-emerald-600 bg-gray-100 text-gray-900 placeholder-gary-900 focus:outline-none focus:ring-emarald-500"
          />
          <input
            type="text"
            name="longitude"
            placeholder="Longitude"
            value={newBusiness.longitude}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-md border border-emerald-600 bg-gray-100 text-gray-900 placeholder-gary-900 focus:outline-none focus:ring-emarald-500"
          />
          <input
            type="number"
            name="rating"
            placeholder="Rating"
            value={newBusiness.rating}
            onChange={handleChange}
            min={0}
            max={5}
            className="w-full px-3 py-2 rounded-md border border-emerald-600 bg-gray-100 text-gray-900 placeholder-gary-900 focus:outline-none focus:ring-emarald-500"
          />
          <input
            type="text"
            name="contact"
            placeholder="Contact"
            value={newBusiness.contact}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-md border border-emerald-600 bg-gray-100 text-gray-900 placeholder-gary-900 focus:outline-none focus:ring-emarald-500"
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={newBusiness.address || ""}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-md border border-emerald-600 bg-gray-100 text-gray-900 placeholder-gary-900 focus:outline-none focus:ring-emarald-500"
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={newBusiness.description|| ""}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-md border border-emerald-600 bg-gray-100 text-gray-900 placeholder-gary-900 focus:outline-none focus:ring-emarald-500"
          />
          <input
            type="url"
            name="website"
            placeholder="Website"
            value={newBusiness.website || ""}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-md border border-emerald-600 bg-gray-100 text-gray-900 placeholder-gary-900 focus:outline-none focus:ring-emarald-500"
          />
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full px-3 py-2 rounded-md border border-emerald-600 bg-gray-100 text-gray-900 placeholder-gary-900 focus:outline-none focus:ring-emarald-500"
          />
        </div>

        <div className="mt-4 flex justify-end gap-3">
          <button
            className="w-full px-3 py-2 rounded-md border border-emerald-600 bg-gray text-white placeholder-gray-400"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700"
            onClick={handleAddBusiness}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default BusinessModal;