import { useApproveBusinessMutation, useGetPendingBusinessesQuery } from "../api/BusinessAPI";
import { useGetApprovedBusinessesQuery } from "../api/BusinessAPI";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { data: pendingBusinesses = [], isLoading, error } = useGetPendingBusinessesQuery();
  const { data: approvedBusinesses = [] } = useGetApprovedBusinessesQuery();
  const [approveBusiness, { isLoading: approving }] = useApproveBusinessMutation();
  const [businesses, setBusinesses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setBusinesses(pendingBusinesses);
  }, [pendingBusinesses]);

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
  const totalBusinesses = (approvedBusinesses?.length || 0) + (pendingBusinesses?.length || 0);
  const pendingCount = pendingBusinesses?.length || 0;
  const approvedCount = approvedBusinesses?.length || 0;

  return (
    <div className="ml-72 p-8 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-emerald-700">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h2 className="text-gray-600">Total Businesses</h2>
          <p className="text-2xl font-bold text-emerald-600">{totalBusinesses}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h2 className="text-gray-600">Approved Businesses</h2>
          <p className="text-2xl font-bold text-green-600">{approvedCount}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h2 className="text-gray-600">Pending Approvals</h2>
          <p className="text-2xl font-bold text-yellow-600">{pendingCount}</p>
        </div>
      </div>

      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Pending Businesses</h2>
      {isLoading ? (
        <p className="text-gray-500">Loading pending businesses...</p>
      ) : error ? (
        <p className="text-red-500">Failed to load businesses.</p>
      ) : businesses.length === 0 ? (
        <p className="text-gray-500">No pending businesses 🎉</p>
      ) : (
        <div className="overflow-x-auto bg-white shadow rounded-lg">
          <table className="min-w-full border border-gray-200">
            <thead className="bg-emerald-600 text-white">
              <tr>
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Category</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {businesses.map((b) => (
                <tr key={b.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">{b.name}</td>
                  <td className="py-3 px-4">{b.category}</td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => handleApprove(b.id)}
                      disabled={approving}
                      className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50"
                    >
                      Approve
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
