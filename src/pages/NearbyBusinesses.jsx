import React, { useEffect, useState } from "react";
import MapView from "../components/MapView";
import logo from "../assets/logo (2).png";
import { useAddBusinessMutation, useDeleteBusinessMutation, useFetchNearbyBusinessesQuery } from "../api/BusinessAPI";
import TopBar from './../components/TopBar';
import BusinessCards from './../components/BusinessCards';
import BusinessModal from './../components/BusinessModal';

const NearbyBusinesses = () => {
  const [coords, setCoords] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
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
      (pos) => setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      () => setCoords(null)
    );
  }, []);

const {
  data: businessesData = [],
  error,
  isLoading,
} = useFetchNearbyBusinessesQuery(coords, { skip: !coords });

  const businesses = Array.isArray(businessesData)
    ? businessesData
    : businessesData?.results ?? [];

  const [addBusiness] = useAddBusinessMutation();
  const [deleteBusiness] = useDeleteBusinessMutation();

  const filtered = businesses.filter(
    (b) =>
      (b.name ?? "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (b.category ?? "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleChange = (e) => {
    setNewBusiness({ ...newBusiness, [e.target.name]: e.target.value });
  };

  const handleAddBusiness = async () => {
    try {
      await addBusiness(newBusiness).unwrap();
      setShowModal(false);
      setNewBusiness({
        name: "",
        category: "",
        latitude: "",
        longitude: "",
        rating: "",
        contact: "",
      });
    } catch (err) {
      console.error("Error adding business:", err);
      alert("Failed to add business.");
    }
  };

  const handleDeleteBusiness = async (id) => {
    try {
      await deleteBusiness(id).unwrap();
    } catch (err) {
      console.error("Error deleting business:", err);
      alert("Failed to delete business.");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <TopBar
        logo={logo}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      {error && (
        <p className="text-red-500">Failed to fetch nearby businesses.</p>
      )}
      {!isLoading && filtered.length === 0 && !error && (
        <p className="text-gray-600">No businesses found nearby.</p>
      )}

      {!isLoading && filtered.length > 0 && (
        <div className="flex gap-5">
          <div className="flex-1 flex flex-col">
            <div className="bg-white p-3 text-center font-bold text-xl rounded-lg shadow mb-3">
              Businesses
            </div>
            <div className="bg-white p-3 rounded-lg h-[37%] overflow-y-auto shadow">
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
        onClick={() => setShowModal(true)}
      >
        + Add Business
      </button>

      {showModal && (
        <BusinessModal
          newBusiness={newBusiness}
          handleChange={handleChange}
          handleAddBusiness={handleAddBusiness}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default NearbyBusinesses;
