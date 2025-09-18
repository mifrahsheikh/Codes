import { useGetApprovedBusinessesQuery, useDeleteBusinessMutation } from "../api/BusinessAPI";

export default function ApprovedBusinesses() {
  const { data: approved = [], isLoading, error } = useGetApprovedBusinessesQuery();
  const [deleteBusiness] = useDeleteBusinessMutation();

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
    <div className="ml-72 p-6">
      <h1 className="text-3xl mb-6">Approved Businesses</h1>

      {Object.keys(grouped).length === 0 ? (
        <p className="text-gray-600">No approved businesses yet</p>
      ) : (
        Object.keys(grouped).map((a) => (
          <div key={a} className="mb-6">
            <h3 className="text-xl font-bold text-emerald-600 mb-2">{a}</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {grouped[as].map((biz) => (
                <div key={biz.id} className="p-4 bg-white rounded shadow">
                  <h4 className="font-bold">{biz.name}</h4>
                  <button
                    onClick={() => handleDelete(biz.id)}
                    className="mt-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
