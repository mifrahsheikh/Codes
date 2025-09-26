import React, { useState, useEffect } from "react";
import logo from "../assets/logo (2).png";
import TopBar from "../components/TopBar";
import BusinessCards from "../components/BusinessCards";
import BusinessModal from "../components/BusinessModal";
import { useNavigate } from "react-router-dom";
import { useAddBusinessMutation, useDeleteBusinessMutation, useGetBusinessesQuery, useUpdateBusinessMutation } from "../api/BusinessAPI";

const BusinessUser = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [updateBusiness] = useUpdateBusinessMutation();
  const [newBusiness, setNewBusiness] = useState({
    name: "",
    category: "",
    latitude: "",
    longitude: "",
    rating: "",
    contact: "",
    image: null,
  });

  const { data: businessesData = [], error, isLoading } = useGetBusinessesQuery();
  const [businesses, setBusinesses] = useState([]);

  const [addBusiness] = useAddBusinessMutation();
  const [deleteBusiness] = useDeleteBusinessMutation();

  useEffect(() => {
    if (Array.isArray(businessesData)) {
      setBusinesses(businessesData);
    }
  }, [businessesData]);

  const filtered = businesses.filter(
    (b) =>
      (b.name ?? "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (b.category ?? "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleChange = (e) => {
    setNewBusiness({ ...newBusiness, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setNewBusiness({ ...newBusiness, image: e.target.files[0] });
  };

  const handleAddBusiness = async () => {
    try {
      const formData = new FormData();
      for (let key in newBusiness) {
        if (newBusiness[key]) formData.append(key, newBusiness[key]);
      }
      const addedBusiness = await addBusiness(formData).unwrap();

      setNewBusiness({
        name: "",
        category: "",
        latitude: "",
        longitude: "",
        rating: "",
        contact: "",
        image: null,
      });
      setShowModal(false);

      setBusinesses((prev) => [addedBusiness, ...prev]);
    } catch (err) {
      console.error("Error adding business:", err);
      alert("Failed to add business.");
    }
  };

  const handleDeleteBusiness = async (id) => {
    try {
      await deleteBusiness(id).unwrap();
      setBusinesses((prev) => prev.filter((b) => b.id !== id));
    } catch (err) {
      console.error("Error deleting business:", err);
      alert("Failed to delete business.");
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const handleUpdateBusiness = async (formData, id) => {
    try {
      const updatedBusiness = await updateBusiness({ id, data: formData }).unwrap();
      setBusinesses((prev) =>
        prev.map((b) => (b.id === id ? updatedBusiness : b))
      );
    } catch (err) {
      console.error("Failed to update business:", err);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <TopBar logo={logo} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {error && <p className="text-red-500">Failed to fetch your businesses.</p>}
      {!isLoading && filtered.length === 0 && !error && (
        <p className="text-gray-600">You haven’t added any businesses yet.</p>
      )}

      {!isLoading && filtered.length > 0 && (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map((business) => (
            <BusinessCards
              key={business.id}
              business={business}
              onDelete={handleDeleteBusiness}
              onUpdate={(formData) => handleUpdateBusiness(formData, business.id)}
            />
          ))}
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
          handleFileChange={handleFileChange}
          handleAddBusiness={handleAddBusiness}
          onClose={() => setShowModal(false)}
        />
      )}

      <div className="mt-10 flex justify-end">
        <button
          onClick={handleLogout}
          className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default BusinessUser;