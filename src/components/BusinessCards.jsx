import React, { useState } from "react";
import EditBusiness from "./EditBusiness";

const BusinessCards = ({ business, onDelete, onUpdate }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const renderTypeSpecificDetails = () => {
    switch (business.business_type) {
      case "home":
        return (
          <p className="text-gray-600">
            Home Based — Delivery:{" "}
            <span className="font-semibold">
              {business.delivery_available ? "Yes" : "No"}
            </span>
          </p>
        );
      case "online":
        return (
          <p className="text-gray-600">
            Online Business — Website:{" "}
            <a
              href={business.website}
              target="_blank"
              rel="noreferrer"
              className="text-emerald-700 underline"
            >
              {business.website || "N/A"}
            </a>
          </p>
        );
      case "main":
        return (
          <p className="text-gray-600">
            Main Store — {business.address}, {business.city}
          </p>
        );
      case "local":
        return (
          <p className="text-gray-600">
            Local Business — Region: {business.region || "N/A"}
          </p>
        );
      case "franchise":
        return <p className="text-gray-600">🏢 Franchise — Multiple Locations</p>;
      case "pop_up":
        return <p className="text-gray-600">🛍️ Pop-Up Shop — Temporary Setup</p>;
      default:
        return <p className="text-gray-600">Type: {business.business_type}</p>;
    }
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition transform hover:-translate-y-1 p-6 flex flex-col items-center text-center w-80">
        <img
          src={business.image || "/placeholder.png"}
          alt={business.name}
          className="w-80 h-48 rounded-xl object-cover mb-4"
        />
        <h3 className="font-bold text-emerald-700 text-lg">{business.name}</h3>
        <p className="text-gray-500">{business.category}</p>
        <div className="mt-2">{renderTypeSpecificDetails()}</div>
        <div className="flex items-center justify-center mt-2">
          <span className="text-yellow-500 font-medium">
            ⭐ {business.rating ?? "N/A"}
          </span>
        </div>
        <div className="flex gap-2 mt-4">
          <button
            className="bg-emerald-600 h-10 text-white px-3 py-2 rounded-lg hover:bg-emerald-700 transition"
            onClick={() => setShowDetails(true)}
          >
            View Details
          </button>

          <button
            className="bg-blue-600 h-10 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            onClick={() => setShowEditModal(true)}
          >
            Edit
          </button>

          <button
            className="bg-red-500 h-10 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
            onClick={() => onDelete(business.id)}
          >
            Delete
          </button>
        </div>
      </div>

      {showDetails && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[1000] p-4">
          <div className="bg-white text-black rounded-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 relative shadow-lg">
            <button
              onClick={() => setShowDetails(false)}
              className="absolute top-3 right-3 text-gray-600 hover:text-red-500 text-lg font-bold"
            >
              ✕
            </button>

            <h2 className="text-2xl font-semibold text-emerald-700 mb-4">
              {business.name}
            </h2>
            <div className="mb-4 border-b pb-3">
              <h3 className="font-semibold text-lg mb-2 text-emerald-600">
                General Information
              </h3>
              <p><strong>Category:</strong> {business.category || "N/A"}</p>
              <p><strong>Type:</strong> {business.business_type || "N/A"}</p>
              <p><strong>Industry:</strong> {business.industry || "N/A"}</p>
              <p><strong>Description:</strong> {business.description || "N/A"}</p>
            </div>

            <div className="mb-4 border-b pb-3">
              <h3 className="font-semibold text-lg mb-2 text-emerald-600">
              Location
              </h3>
              <p><strong>Address:</strong> {business.address || "N/A"}</p>
              <p><strong>City:</strong> {business.city || "N/A"}</p>
              <p><strong>Region:</strong> {business.region || "N/A"}</p>
              <p><strong>Coordinates:</strong>
                {business.latitude && business.longitude
                  ? `${business.latitude}, ${business.longitude}`
                  : "N/A"}
              </p>
            </div>

            <div className="mb-4 border-b pb-3">
              <h3 className="font-semibold text-lg mb-2 text-emerald-600">
                Operating Hours
              </h3>
              <p><strong>Open:</strong> {business.open_time || "N/A"}</p>
              <p><strong>Close:</strong> {business.close_time || "N/A"}</p>
            </div>

            <div className="mb-4 border-b pb-3">
              <h3 className="font-semibold text-lg mb-2 text-emerald-600">
                Online Presence
              </h3>
              <p>
                <strong>Website:</strong>{" "}
                <a
                  href={business.website}
                  target="_blank"
                  rel="noreferrer"
                  className="text-emerald-700 underline"
                >
                  {business.website || "N/A"}
                </a>
              </p>
              <p><strong>Instagram:</strong> {business.instagram || "N/A"}</p>
              <p><strong>Facebook:</strong> {business.facebook || "N/A"}</p>
              <p><strong>TikTok:</strong> {business.tiktok || "N/A"}</p>
            </div>
            <div className="mb-4 border-b pb-3">
              <h3 className="font-semibold text-lg mb-2 text-emerald-600">
                Services & Payment
              </h3>
              <p><strong>Eco Friendly:</strong> {business.eco_friendly ? "Yes" : "No"}</p>
              <p><strong>Bookings:</strong> {business.bookings ? "Available" : "Not Available"}</p>
              <p><strong>Payment Methods:</strong> {business.payment_methods?.join(", ") || "N/A"}</p>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2 text-emerald-600">
                Delivery / Ordering
              </h3>
              <p><strong>Delivery Available:</strong> {business.delivery_available ? "Yes" : "No"}</p>
              <p><strong>Home Service:</strong> {business.home_service ? "Yes" : "No"}</p>
              <p><strong>Pickup Available:</strong> {business.pickup_available ? "Yes" : "No"}</p>
              <p><strong>Online Ordering:</strong> {business.online_ordering ? "Enabled" : "Disabled"}</p>
            </div>
          </div>
        </div>
      )}

      {showEditModal && (
        <EditBusiness
          business={business}
          onClose={() => setShowEditModal(false)}
          onUpdate={onUpdate}
        />
      )}
    </>
  );
};

export default BusinessCards;