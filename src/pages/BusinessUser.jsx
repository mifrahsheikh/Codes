import React, { useState, useEffect } from "react";
import BusinessCards from "../components/BusinessCards";
import EditBusiness from "../components/EditBusiness";
import { useNavigate } from "react-router-dom";
import {
  useDeleteBusinessMutation,
  useGetMyBusinessesQuery,
  useUpdateBusinessMutation,
} from "../api/BusinessAPI";
import { clearBusinesses } from "../api/BusinessSlice";
import { useDispatch } from "react-redux";
import { logout } from "../api/TokenSlice";

const BusinessUser = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [updateBusiness] = useUpdateBusinessMutation();
  const { data: businessesData = [], error, isLoading } = useGetMyBusinessesQuery();
  const [businesses, setBusinesses] = useState([]);
  const [deleteBusiness] = useDeleteBusinessMutation();

  const [selectedBusiness, setSelectedBusiness] = useState(null);

  useEffect(() => {
    if (Array.isArray(businessesData) && businessesData !== businesses) {
      setBusinesses(businessesData);
    }
  }, [businessesData]);

  const filtered = (businesses || []).filter(
    (b) =>
      (b.name ?? "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (b.category ?? "").toLowerCase().includes(searchTerm.toLowerCase())
  );

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
    dispatch(clearBusinesses());
    dispatch(logout());
    localStorage.clear();
    navigate("/");
  };

  const handleUpdateBusiness = async (id, formData) => {
    try {
      const updated = await updateBusiness({ id, formData }).unwrap();
      setBusinesses((prev) =>
        prev.map((b) => (b.id === id ? { ...b, ...updated } : b))
      );
      return true;
    } catch (err) {
      console.error("Failed to update business:", err);
      return false;
    }
  };

  return (
    <div className="p-6 min-h-full bg-gradient-to-b from-black to-emerald-900 text-white">
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          placeholder="Search by name or category..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md p-3 rounded-xl border border-emerald-600 bg-black text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
      </div>

      {error && <p className="text-red-500 text-center">Failed to fetch your businesses.</p>}
      {!isLoading && filtered.length === 0 && !error && (
        <p className="text-gray-400 text-center">You haven’t added any businesses yet.</p>
      )}

      {!isLoading && filtered.length > 0 && (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map((business) => (
            <BusinessCards
              key={business.id}
              business={business}
              onDelete={() => handleDeleteBusiness(business.id)}
              onClick={() => setSelectedBusiness(business)}
            />
          ))}
        </div>
      )}

      {selectedBusiness && (
        <EditBusiness
          business={selectedBusiness}
          onClose={() => setSelectedBusiness(null)}
          onUpdate={(formData) =>
            handleUpdateBusiness(selectedBusiness.id, formData)
          }
        />
      )}
      <button
        className="fixed bottom-5 left-5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full px-6 py-3 shadow-lg text-lg font-bold"
        onClick={() => navigate("/add-business")}
      >
        + Add Business
      </button>

      <div className="mt-10 flex justify-end">
        <button
          onClick={handleLogout}
          className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold shadow"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default BusinessUser;