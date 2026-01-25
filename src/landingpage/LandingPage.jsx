import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import MapView from "../components/MapView";
import { useFetchNearbyBusinessesQuery, useGetApprovedBusinessesQuery } from "../api/BusinessAPI";
import AboutSection from "./AboutSection";
import CategorySection from "./CategorySection";
import Footer from "./Footer";
import NearbyBusinesses from './NearbyBusinesses';

Modal.setAppElement("#root");

const LandingPage = () => {
  const navigate = useNavigate();
  const { data: businesses = [], isLoading, error } = useGetApprovedBusinessesQuery();

  const [coords, setCoords] = useState(null);
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const isLoggedIn = !!token && role === "user";

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      () => setCoords(null)
    );
  }, []);

  const {
    data: nearbyData,
    isLoading: isNearbyLoading,
    error: nearbyError,
  } = useFetchNearbyBusinessesQuery(coords, { skip: !coords });

  const nearbyBusinesses = Array.isArray(nearbyData)
    ? nearbyData
    : nearbyData?.businesses || [];

  const grouped = businesses.reduce((acc, b) => {
    if (!acc[b.category]) acc[b.category] = [];
    acc[b.category].push(b);
    return acc;
  }, {});
  const categories = Object.keys(grouped);

  const filteredNearbyBusinesses = nearbyBusinesses.filter((b) => {
    const term = searchTerm.toLowerCase();
    return (
      b.name?.toLowerCase().includes(term) ||
      b.category?.toLowerCase().includes(term)
    );
  });

  return (
    <div className="min-h-full bg-gradient-to-b from-black to-emerald-900 text-white z-50 bg-fixed">
      {/* Top sections */}
      <AboutSection businesses={nearbyBusinesses} />
      <NearbyBusinesses
        isNearbyLoading={isNearbyLoading}
        nearbyError={nearbyError}
        nearbyBusinesses={nearbyBusinesses}
        filteredNearbyBusinesses={filteredNearbyBusinesses}
        setSelectedBusiness={setSelectedBusiness}
      />

      {/* Category browse section */}
      <CategorySection
        categories={categories}
        grouped={grouped}
        isLoading={isLoading}
        error={error}
      />

      {/* Map placed below the category section */}
      <section className="px-10 lg:px-20 h-[400px] md:h-[500px] relative z-0 mt-6">
        <MapView businesses={filteredNearbyBusinesses} />
      </section>

      {/* Business modal */}
      {selectedBusiness && (
        <Modal
          isOpen={!!selectedBusiness}
          onRequestClose={() => setSelectedBusiness(null)}
          overlayClassName="fixed inset-0 bg-black/50 flex items-center justify-center z-[1000]"
          className="bg-white p-6 rounded-xl max-w-md w-full mx-4 shadow-lg"
        >
          <h2 className="text-xl font-bold text-emerald-700 mb-4">{selectedBusiness.name}</h2>
          <div className="space-y-2 text-gray-700">
            <p>
              <span className="font-semibold">Category:</span> {selectedBusiness.category}
            </p>
            <p>
              <span className="font-semibold">Rating:</span> {selectedBusiness.rating}
            </p>
            <p>
              <span className="font-semibold">Contact:</span> {selectedBusiness.contact}
            </p>
            {isLoggedIn && (
              <p>
                <span className="font-semibold">Location:</span> {selectedBusiness.latitude},{" "}
                {selectedBusiness.longitude}
              </p>
            )}
            {selectedBusiness.image && (
              <img
                src={selectedBusiness.image}
                alt={selectedBusiness.name}
                className="w-full h-60 object-cover rounded mt-2"
              />
            )}
          </div>
          {!isLoggedIn && (
            <div
              className="mt-4 text-gray-500 cursor-pointer hover:text-emerald-600 flex items-center gap-2"
              onClick={() => navigate("/login", { state: { role: "user" } })}
            >
              <span>Sign in to see full business details</span>
              <span className="text-emerald-600 font-bold text-lg">→</span>
            </div>
          )}
          <div className="mt-6 flex justify-end">
            <button
              className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 transition"
              onClick={() => setSelectedBusiness(null)}
            >
              Close
            </button>
          </div>
        </Modal>
      )}

      <Footer />
    </div>
  );
};

export default LandingPage;