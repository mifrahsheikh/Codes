const BusinessModal = ({
  newBusiness,
  handleChange,
  handleAddBusiness,
  onClose,
}) => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Add New Business</h2>
        <div className="form-group">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={newBusiness.name}
            onChange={handleChange}
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={newBusiness.category}
            onChange={handleChange}
          />
          <input
            type="text"
            name="latitude"
            placeholder="Latitude"
            value={newBusiness.latitude}
            onChange={handleChange}
          />
          <input
            type="text"
            name="longitude"
            placeholder="Longitude"
            value={newBusiness.longitude}
            onChange={handleChange}
          />
          <input
            type="number"
            name="rating"
            placeholder="Rating"
            value={newBusiness.rating}
            onChange={handleChange}
          />
          <input
            type="text"
            name="contact"
            placeholder="Contact"
            value={newBusiness.contact}
            onChange={handleChange}
          />
        </div>

        <div className="modal-actions">
          <button className="ok-btn" onClick={handleAddBusiness}>
            OK
          </button>
          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default BusinessModal;
