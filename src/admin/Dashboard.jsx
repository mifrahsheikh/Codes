import { useApproveBusinessMutation, useGetPendingBusinessesQuery } from "../api/BusinessAPI";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { data: fetchedBusinesses = [], isLoading, error } = useGetPendingBusinessesQuery();
  const [approveBusiness, { isLoading: approving }] = useApproveBusinessMutation();
  const [businesses, setBusinesses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setBusinesses(fetchedBusinesses);
  }, [fetchedBusinesses]);

  const handleApprove = async (id) => {
    try {
      await approveBusiness(id).unwrap();
      setBusinesses((prev) => prev.filter((b) => b.id !== id));
    } catch (err) {
      console.error("Approval failed:", err);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  if (isLoading) return <p>Loading pending businesses...</p>;
  if (error) return <p className="text-red-500">Failed to load businesses.</p>;

  return (
    <div className="ml-72 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl">Pending Businesses</h1>
        <button
          onClick={handleLogout}
          className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      {businesses.length === 0 ? (
        <p className="text-gray-600">No pending businesses</p>
      ) : (
        businesses.map((b) => (
          <div key={b.id} className="p-4 bg-white shadow rounded mb-3">
            <h2 className="font-bold">{b.name}</h2>
            <p>{b.category}</p>
            <button
              onClick={() => handleApprove(b.id)}
              disabled={approving}
              className="mt-2 px-4 py-2 bg-green-500 text-white rounded disabled:opacity-50"
            >
              Approve
            </button>
          </div>
        ))
      )}
    </div>
  );
}
