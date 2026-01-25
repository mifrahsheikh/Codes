import React, { useState } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

const EditBusiness = ({ business, onClose, onUpdate }) => {
  const [updateBusiness, setUpdateBusiness] = useState({ ...business });

  const handleChange = (e) => {
    setUpdateBusiness({ ...updateBusiness, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setUpdateBusiness({ ...updateBusiness, image: e.target.files[0] });
  };

  const handleSave = () => {
    const formData = new FormData();

    Object.keys(updateBusiness).forEach((key) => {
      const value = updateBusiness[key];

      if (key === "id") return; // skip id

      if (key === "image") {
        if (value instanceof File) {
          formData.append("image", value);
        }
      } else {
        if (value !== null && value !== undefined && value !== "") {
          formData.append(key, value);
        }
      }
    });

    for (let [key, val] of formData.entries()) {
      console.log(key, val);
    }

    onUpdate(updateBusiness.id, formData);
    onClose();
  };

  return (
    <Modal
      isOpen={true}
      onRequestClose={onClose}
      overlayClassName="fixed inset-0 bg-black/50 flex items-center justify-center p-4"
      className="bg-white p-6 rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-lg"
    >
      <h2 className="text-xl font-bold text-emerald-700 mb-4">Edit Business</h2>
      <div className="flex flex-col gap-3">
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={updateBusiness.name}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <label>Category</label>
        <input
          type="text"
          name="category"
          value={updateBusiness.category}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <label>Latitude</label>
        <input
          type="text"
          name="latitude"
          value={updateBusiness.latitude || ""}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <label>Longitude</label>
        <input
          type="text"
          name="longitude"
          value={updateBusiness.longitude || ""}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <label>Rating</label>
        <input
          type="number"
          name="rating"
          value={updateBusiness.rating}
          onChange={handleChange}
          className="border p-2 rounded"
          min={0}
          max={5}
        />

        <label>Contact</label>
        <input
          type="text"
          name="contact"
          value={updateBusiness.contact || ""}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <label>Address</label>
        <input
          type="text"
          name="address"
          value={updateBusiness.address || ""}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <label>Description</label>
        <input
          type="text"
          name="description"
          value={updateBusiness.description || ""}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <label>Website</label>
        <input
          type="text"
          name="website"
          value={updateBusiness.website || ""}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <label>Promotions</label>
        <input
          type="text"
          name="promotions"
          value={updateBusiness.promotions || ""}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <label>Opens at</label>
        <input
          type="time"
          name="open_time"
          value={updateBusiness.open_time || ""}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <label>Closes at</label>
        <input
          type="time"
          name="close_time"
          value={updateBusiness.close_time || ""}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <label>Change Image</label>
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>

      <div className="mt-6 flex justify-end gap-3">
        <button
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          onClick={onClose}
        >
          Cancel
        </button>
        <button
          className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700"
          onClick={handleSave}
        >
          Save
        </button>
      </div>
    </Modal>
  );
};

export default EditBusiness;