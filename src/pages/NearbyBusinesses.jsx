import React, { useEffect, useState } from "react";
import MapView from "../components/MapView";
import logo from "../assets/logo (2).png";
import { addBusiness, deleteBusiness, fetchNearbyBusinesses } from "../api/BusinessAPI";
import BusinessCards from "../components/BusinessCards";
import BusinessModal from "../components/BusinessModal";
import TopBar from "../components/TopBar";

const NearbyBusinesses = () => {
  const [businesses, setBusinesses] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [locationError, setLocationError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newBusiness, setNewBusiness] = useState({
    name: "",
    category: "",
    latitude: "",
    longitude: "",
    rating: "",
    contact: "",
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        try {
          const data = await fetchNearbyBusinesses(lat, lng);
          setBusinesses(data);
          setFiltered(data);
        } catch (error) {
          console.error("Error fetching nearby businesses:", error);
          setLocationError("Failed to fetch nearby businesses.");
        } finally {
          setLoading(false);
        }
      },
      (error) => {
        console.error("Geolocation error:", error);
        setLocationError("Location permission is required.");
        setLoading(false);
      }
    );
  }, []);

  useEffect(() => {
    const results = businesses.filter(
      (business) =>
        business.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        business.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFiltered(results);
  }, [searchTerm, businesses]);

  const handleChange = (e) => {
    setNewBusiness({ ...newBusiness, [e.target.name]: e.target.value });
  };

  const handleAddBusiness = async () => {
    try {
      const data = await addBusiness(newBusiness);
      setBusinesses([...businesses, data]);
      setFiltered([...filtered, data]);
      setShowModal(false);
      setNewBusiness({
        name: "",
        category: "",
        latitude: "",
        longitude: "",
        rating: "",
        contact: "",
      });
    } catch (error) {
      console.error("Error adding business:", error);
      alert("Failed to add business. Check backend logs.");
    }
  };

  const handleDeleteBusiness = async (id) => {
    try {
      await deleteBusiness(id);
      const updated = businesses.filter((b) => b.id !== id);
      setBusinesses(updated);
      setFiltered(updated);
    } catch (error) {
      console.error("Error deleting business:", error);
      alert("Failed to delete business. Check backend logs.");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <TopBar logo={logo} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {loading && <p className="text-gray-600">Loading nearby businesses...</p>}
      {locationError && <p className="text-red-500">{locationError}</p>}
      {!loading && filtered.length === 0 && !locationError && (
        <p className="text-gray-600">No businesses found nearby.</p>
      )}

      {!loading && filtered.length > 0 && (
        <div className="flex gap-5">
          <div className="flex-1 flex flex-col">
            <div className="bg-white p-3 text-center font-bold text-xl rounded-lg shadow mb-3">
              Businesses
            </div>
            <div className="bg-white p-3 rounded-lg h-[60%] overflow-y-auto shadow">
              {filtered.map((business) => (
                <BusinessCards
                  key={business.id}
                  business={business}
                  onDelete={handleDeleteBusiness}
                />
              ))}
            </div>
          </div>

          <div className="flex-1 max-w-[50%] h-[50%]">
            <MapView businesses={filtered} />
          </div>
        </div>
      )}

      <button
        className="fixed bottom-5 left-5 bg-green-400 text-white rounded-full px-5 py-3 text-base font-bold shadow-lg"
        onClick={() => setShowModal(true)}>
        + Add Business
      </button>

      {showModal && (
        <BusinessModal
          newBusiness={newBusiness}
          handleChange={handleChange}
          handleAddBusiness={handleAddBusiness}
          onClose={() => setShowModal(false)}/>
      )}
    </div>
  );
};

export default NearbyBusinesses;
