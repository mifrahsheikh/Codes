import { useGetApprovedBusinessesQuery, useDeleteBusinessMutation } from "../api/BusinessAPI";
import { useEffect } from "react";

export default function ApprovedBusinesses() {
  const { data: approved = [], isLoading, error } = useGetApprovedBusinessesQuery();
  const [deleteBusiness] = useDeleteBusinessMutation();

  useEffect(() => {
    console.log("Access token:", localStorage.getItem("access"));
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteBusiness(id).unwrap();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  if (isLoading) return <p>Loading approved businesses...</p>;
  if (error) return <p className="text-red-500">Failed to load approved businesses.</p>;

  const grouped = approved.reduce((acc, biz) => {
    if (!acc[biz.category]) acc[biz.category] = [];
    acc[biz.category].push(biz);
    return acc;
  }, {});

  return (
    <div className="ml-72 p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-emerald-700 mb-6">Approved Businesses</h1>

      {Object.keys(grouped).length === 0 ? (
        <p className="text-gray-600">No approved businesses yet</p>
      ) : (
        Object.keys(grouped).map((category) => (
          <div key={category} className="mb-8">
            <h3 className="text-xl font-semibold text-emerald-600 mb-3">{category}</h3>
            <div className="overflow-x-auto bg-white shadow rounded-lg">
              <table className="min-w-full border border-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="py-3 px-4 text-left">Name</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {grouped[category].map((biz) => (
                    <tr key={biz.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">{biz.name}</td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => handleDelete(biz.id)}
                          className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))
      )}
    </div>
  );
}