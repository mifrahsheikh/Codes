import React, { useEffect } from "react";

const BusinessDetailModal = ({ business, onClose }) => {
  if (!business) return null;

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  const statusBadge = (status) => {
    if (status?.toLowerCase() === "open") return "bg-green-600 text-white";
    if (status?.toLowerCase() === "closed") return "bg-red-600 text-white";
    return "bg-gray-600 text-white";
  };

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-[2px] z-[998]"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="fixed top-0 right-0 h-full w-full sm:w-[45%] bg-gray-950 text-white z-[999] shadow-2xl border-l border-gray-800 transform transition-transform duration-300 translate-x-0 p-6 overflow-y-auto">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-4 sticky top-0 bg-gray-950/95 backdrop-blur py-3 border-b border-gray-800">
          <div>
            <h2 className="text-2xl font-bold truncate">{business.name}</h2>
            <div className="flex gap-2 mt-2">
              {business.category && (
                <span className="inline-block bg-emerald-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                  {business.category}
                </span>
              )}
              {business.status && (
                <span
                  className={`inline-block text-xs font-semibold px-3 py-1 rounded-full ${statusBadge(
                    business.status
                  )}`}
                >
                  {business.status}
                </span>
              )}
            </div>
          </div>
          <button
            className="text-gray-400 hover:text-white text-xl"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        {/* Image */}
        <img
          src={business.image || "/placeholder.png"}
          alt={business.name}
          className="w-full h-72 object-cover rounded-xl mb-6"
        />

        {/* Rating */}
        {business.rating && (
          <div className="text-amber-400 flex items-center gap-2 mb-6">
            <span className="text-lg">⭐</span>
            <span className="font-semibold">
              {Number(business.rating).toFixed(1)}
            </span>
            <span className="text-gray-400 text-sm">/ 5</span>
          </div>
        )}

        {/* Details Section */}
        <div className="space-y-4 text-gray-300">
          {business.address && (
            <p>
              📍 <span className="font-semibold text-white">Address:</span>{" "}
              {business.address}
            </p>
          )}

          {business.contact && (
            <p>
              📞 <span className="font-semibold text-white">Contact:</span>{" "}
              <a href={`tel:${business.contact}`} className="hover:underline">
                {business.contact}
              </a>
            </p>
          )}

          {business.website && (
            <p>
              🌐 <span className="font-semibold text-white">Website:</span>{" "}
              <a
                href={business.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 hover:underline"
              >
                {business.website}
              </a>
            </p>
          )}

          {(business.open_time || business.close_time) && (
            <p>
              ⏰ <span className="font-semibold text-white">Hours:</span>{" "}
              {business.open_time || "N/A"} – {business.close_time || "N/A"}
            </p>
          )}

          {business.distance && (
            <p>
              📏 <span className="font-semibold text-white">Distance:</span>{" "}
              {business.distance} km
            </p>
          )}

          {business.eco_friendly !== undefined && (
            <p>
              🌱 <span className="font-semibold text-white">Eco Friendly:</span>{" "}
              {business.eco_friendly ? "Yes" : "No"}
            </p>
          )}

          {business.description && (
            <div>
              <h3 className="font-semibold text-lg text-white mb-1">About</h3>
              <p className="leading-relaxed">{business.description}</p>
            </div>
          )}
        </div>

        {/* Footer CTA */}
        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          {business.contact && (
            <a
              href={`tel:${business.contact}`}
              className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-center py-3 rounded-lg font-semibold"
            >
              📞 Call Now
            </a>
          )}
          {business.website && (
            <a
              href={business.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-gray-800 hover:bg-gray-700 text-center py-3 rounded-lg font-semibold"
            >
              🌐 Visit Website
            </a>
          )}
        </div>
      </div>
    </>
  );
};

export default BusinessDetailModal;