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
  for (let key in updateBusiness) {
    if (updateBusiness[key] !== null) formData.append(key, updateBusiness[key]);
  }
  onUpdate(formData);
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
        <input type="text" name="name" value={updateBusiness.name} onChange={handleChange} className="border p-2 rounded" />

        <label>Category</label>
        <input type="text" name="category" value={updateBusiness.category} onChange={handleChange} className="border p-2 rounded" />

        <label>Rating</label>
        <input type="number" name="rating" value={updateBusiness.rating} onChange={handleChange} className="border p-2 rounded" min={0} max={5} />

        <label>Contact</label>
        <input type="text" name="contact" value={updateBusiness.contact || ""} onChange={handleChange} className="border p-2 rounded" />

        <label>Address</label>
        <input type="text" name="address" value={updateBusiness.address || ""} onChange={handleChange} className="border p-2 rounded" />

        <label>Description</label>
        <input type="text" name="description" value={updateBusiness.description || ""} onChange={handleChange} className="border p-2 rounded" />

        <label>Website</label>
        <input type="text" name="website" value={updateBusiness.website || ""} onChange={handleChange} className="border p-2 rounded" />
        <label>Opens at</label>
        <input type="time" name="opentime" value={updateBusiness.opentime || ""} onChange={handleChange} className="border p-2 rounded" />

        <label>Closes at</label>
        <input type="time" name="closetime" value={updateBusiness.closetime || ""} onChange={handleChange} className="border p-2 rounded" />

        <label>Change Image</label>
        <input type="file" name="image" accept="image/*" onChange={handleFileChange} />

      </div>

      <div className="mt-6 flex justify-end gap-3">
        <button className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400" onClick={onClose}>Cancel</button>
        <button className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700" onClick={handleSave}>Save</button>
      </div>
    </Modal>
  );
};

export default EditBusiness;