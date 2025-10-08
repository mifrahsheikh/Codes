import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import MapView from "../components/MapView";
import { useFetchNearbyBusinessesQuery, useGetApprovedBusinessesQuery } from "../api/BusinessAPI";
import AboutSection from "./AboutSection";
import CategorySection from "./CategorySection";
import Footer from "./Footer";
import NearbyBusinesses from './NearbyBusinesses';
import SearchBar from './../components/SearchBar';

Modal.setAppElement("#root");

const LandingPage = () => {
  const navigate = useNavigate();
  const { data: businesses = [], isLoading, error } = useGetApprovedBusinessesQuery();

  const [coords, setCoords] = useState(null);
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const token = localStorage.getItem("access");
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
      <AboutSection businesses={nearbyBusinesses} />
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <NearbyBusinesses
        isNearbyLoading={isNearbyLoading}
        nearbyError={nearbyError}
        nearbyBusinesses={nearbyBusinesses}
        filteredNearbyBusinesses={filteredNearbyBusinesses}
        setSelectedBusiness={setSelectedBusiness}
        searchTerm={searchTerm}
      />
      <CategorySection
        categories={categories}
        grouped={grouped}
        isLoading={isLoading}
        error={error}
      />
      <section className="px-10 lg:px-20 mt-6 relative z-0">
        <div className="w-full h-[50vh] md:h-[60vh] lg:h-[70vh]">
          <MapView
            businesses={filteredNearbyBusinesses}
            setSelectedBusiness={setSelectedBusiness}
          />
        </div>
      </section>

      {/* Business modal */}
      {selectedBusiness && (
        <Modal
          isOpen={!!selectedBusiness}
          onRequestClose={() => setSelectedBusiness(null)}
          overlayClassName="fixed inset-0 bg-black/50 flex items-center justify-center z-[1000]"
          className="bg-white p-0 rounded-xl max-w-md w-full mx-4 shadow-lg overflow-hidden flex flex-col"
        >
          {selectedBusiness.image && (
            <img
              src={selectedBusiness.image}
              alt={selectedBusiness.name}
              className="w-full h-56 object-cover"
            />
          )}

          <div className="p-6 text-gray-700 flex flex-col gap-2">
            <h2 className="text-xl font-bold text-emerald-700">{selectedBusiness.name}</h2>
            <span className=" bg-emerald-600 text-white text-[13px] font-semibold px-1 py-1 rounded-md">
              {selectedBusiness.category}
            </span>

            <p><span className="font-semibold">Rating:</span> {selectedBusiness.rating}</p>
            <p><span className="font-semibold">Contact:</span> {selectedBusiness.contact}</p>

            {isLoggedIn && (
              <p>
                <span className="font-semibold">Location:</span> {selectedBusiness.latitude},{" "}
                {selectedBusiness.longitude}
              </p>
            )}

            {!isLoggedIn && (
              <div className="mt-4 text-gray-500 flex flex-col items-center gap-2">
                <div
                  className="cursor-pointer hover:text-emerald-600 flex items-center gap-2"
                  onClick={() =>
                    navigate("/login", { state: { role: "user", fromLandingPage: true } })
                  }>
                  <span>Sign in to see full business details</span>
                  <span className="text-emerald-600 font-bold text-lg">→</span>
                </div>
                <div
                  className="cursor-pointer hover:text-emerald-600"
                  onClick={() =>
                    navigate("/signup", { state: { role: "user", redirectTo: "/user" } })
                  }
                >
                  or Create an Account →
                </div>
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
          </div>
        </Modal>
      )}
      <Footer />
    </div>
  );
};

export default LandingPage;