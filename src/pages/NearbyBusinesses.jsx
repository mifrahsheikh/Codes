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
    <div className="main-container">
  <TopBar logo={logo} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {loading && <p>Loading nearby businesses...</p>}
      {locationError && <p className="error">{locationError}</p>}
      {!loading && filtered.length === 0 && !locationError && (
        <p>No businesses found nearby.</p>
      )}

      {!loading && filtered.length > 0 && (
        <div className="grid-container">
          <div className="left-column">
            <div className="business-header">Businesses</div>
            <div className="business-list">
              {filtered.map((business) => (
                <BusinessCards
                  key={business.id}
                  business={business}
                  onDelete={handleDeleteBusiness}
                />
              ))}
            </div>
          </div>
          <div className="right-column">
            <MapView businesses={filtered} />
          </div>
        </div>
      )}

      <button
        className="floating-add-button"
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