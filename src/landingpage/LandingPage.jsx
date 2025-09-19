import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import MapView from "../components/MapView";
import { useFetchNearbyBusinessesQuery, useGetApprovedBusinessesQuery } from "../api/BusinessAPI";
import Navbar from "../components/Navbar";
import AboutSection from "../components/AboutSection";
import SearchBar from "../components/SEarchBar";

Modal.setAppElement("#root");

const LandingPage = () => {
  const navigate = useNavigate();
  const { data: businesses = [], isLoading, error } =
    useGetApprovedBusinessesQuery();

  const [coords, setCoords] = useState(null);
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const isLoggedIn = !!token && role === "user";

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) =>
        setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      () => setCoords(null)
    );
  }, []);

  const {
    data: nearbyBusinesses = [],
    isLoading: isNearbyLoading,
    error: nearbyError,
  } = useFetchNearbyBusinessesQuery(coords, { skip: !coords });

  const grouped = businesses.reduce((acc, b) => {
    if (!acc[b.category]) acc[b.category] = [];
    acc[b.category].push(b);
    return acc;
  }, {});
  const categories = Object.keys(grouped);
const filteredNearbyBusinesses = nearbyBusinesses.filter((b) => {
  const term = searchTerm.toLowerCase();
  return (
    b.name.toLowerCase().includes(term) ||
    b.category.toLowerCase().includes(term)
  );
});
  return (
    <div className="min-h-full bg-gradient-to-b from-black to-emerald-800 text-white z-50">
      <Navbar isLoggedIn={isLoggedIn} />
      <AboutSection businesses={nearbyBusinesses} />
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <section className="px-10 lg:px-20 mt-20">
        <h2 className="text-3xl font-bold mb-8 text-center lg:text-left">
          Nearby Businesses
        </h2>

        {isNearbyLoading ? (
          <p>Loading nearby businesses...</p>
        ) : nearbyError ? (
          <p className="text-red-500">Failed to load nearby businesses.</p>
        ) : nearbyBusinesses.length === 0 ? (
          <p className="text-gray-300 text-center">No businesses nearby</p>
        ) : (
          <div className="flex gap-6">
            <div className="w-1/2 bg-white text-black p-4 rounded-lg shadow">
              {nearbyBusinesses.map((b) => (
                <div
                  key={b.id}
                  className="p-3 border-b cursor-pointer hover:bg-gray-100"
                  onClick={() => setSelectedBusiness(b)}
                >
                  <h3 className="font-bold">{b.name}</h3>
                  <p className="text-gray-500">{b.category}</p>
                </div>
              ))}
            </div>
            <div className="w-1/2 relative z-0">
              <MapView businesses={nearbyBusinesses} />
            </div>
          </div>
        )}
      </section>

      <section className="px-10 lg:px-20 mt-20">
        <h2 className="text-3xl font-bold mb-8 text-center lg:text-left">
          Browse by Category
        </h2>

        {isLoading ? (
          <p>Loading approved businesses...</p>
        ) : error ? (
          <p className="text-red-500">Failed to load businesses.</p>
        ) : categories.length === 0 ? (
          <p className="text-gray-300 text-center">No approved businesses yet</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <div
                key={category}
                className="bg-white text-black rounded-xl p-6 shadow cursor-pointer hover:shadow-lg transition text-center"
                onClick={() => navigate(`/category/${category}`)}
              >
                <h3 className="text-xl font-bold text-emerald-600">
                  {category}
                </h3>
                <p className="text-gray-500">
                  {grouped[category].length} businesses
                </p>
              </div>
            ))}
          </div>
        )}
      </section>

      {selectedBusiness && (
        <Modal
          isOpen={!!selectedBusiness}
          onRequestClose={() => setSelectedBusiness(null)}
          overlayClassName="fixed inset-0 bg-black/50 flex items-start justify-center z-[1000]"
          className="bg-white p-6 rounded-xl max-w-lg mx-auto mt-20 shadow-lg z-[1001]"
        >
          <h2 className="text-2xl font-bold mb-2">{selectedBusiness.name}</h2>
          <p>Category: {selectedBusiness.category}</p>
          <p>Rating: {selectedBusiness.rating}</p>

          {!isLoggedIn ? (
            <div
              className="mt-4 text-gray-500 cursor-pointer hover:text-emerald-600 flex items-center gap-2"
              onClick={() => navigate("/login")}
            >
              <span>Sign in to see full business details</span>
              <span className="text-emerald-600 font-bold text-xl">→</span>
            </div>
          ) : (
            <>
              <p>Contact: {selectedBusiness.contact}</p>
              <p>
                Location: {selectedBusiness.latitude},{" "}
                {selectedBusiness.longitude}
              </p>
            </>
          )}

          <button
            className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700"
            onClick={() => setSelectedBusiness(null)}
          >
            Close
          </button>
        </Modal>
      )}
    </div>
  );
};

export default LandingPage;