import React, { useRef, useState, useEffect } from "react";
import { useGetBusinessesQuery } from "../api/BusinessAPI";
import BusinessDetailModal from "../components/BusinessDetailModal";

const UserBusinesses = () => {
  const { data: businesses = [], isLoading, error } = useGetBusinessesQuery();
  const [nearbyBusinesses, setNearbyBusinesses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const nearby = useRef(null);

  const scrollLeft = () => nearby.current?.scrollBy({ left: -250, behavior: "smooth" });
  const scrollRight = () => nearby.current?.scrollBy({ left: 250, behavior: "smooth" });
  const handleLogout = () => { localStorage.clear(); window.location.href = "/"; };

  useEffect(() => {
    setNearbyBusinesses(businesses.filter(b => b.distance && b.distance <= 10));
  }, [businesses]);

  const filteredBusinesses = businesses.filter(
    b =>
      (b.name ?? "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (b.category ?? "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 bg-gradient-to-b from-black to-emerald-900 min-h-screen text-white">
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          placeholder="Search by name or category..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="w-full max-w-md p-3 rounded-xl border border-emerald-600 bg-black text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
      </div>

      <div className="flex justify-between items-center mb-8">
        <button
          onClick={handleLogout}
          className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>

      {nearbyBusinesses.length > 0 && (
        <section className="mb-10 relative">
          <h2 className="text-2xl font-bold mb-4 text-emerald-400">Nearby Businesses</h2>
          <button onClick={scrollLeft} className="absolute left-0 top-1/2 -translate-y-1/2 bg-emerald-600 text-white p-3 rounded-full z-20 hover:bg-emerald-700 shadow-lg">{"<"}</button>
          <button onClick={scrollRight} className="absolute right-0 top-1/2 -translate-y-1/2 bg-emerald-600 text-white p-3 rounded-full z-20 hover:bg-emerald-700 shadow-lg">{">"}</button>
          <div ref={nearby} className="flex gap-4 py-2 overflow-x-auto scroll-smooth">
            {nearbyBusinesses.map(b => (
              <div
                key={b.id}
                className="min-w-[20%] bg-gray-900 rounded-xl shadow hover:shadow-lg transition flex flex-col cursor-pointer overflow-hidden"
                onClick={() => setSelectedBusiness(b)}
              >
                <img src={b.image || "/placeholder.png"} alt={b.name} className="w-full h-44 object-cover rounded-t-xl" />
                <div className="p-3 flex flex-col gap-1">
                  <h3 className="font-bold text-emerald-400 text-sm md:text-base truncate">{b.name}</h3>
                  <p className="text-gray-300 text-xs md:text-sm truncate">{b.category}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {isLoading ? (
        <p className="text-white">Loading businesses...</p>
      ) : error ? (
        <p className="text-red-500">Failed to load businesses.</p>
      ) : (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBusinesses.map(b => (
            <div
              key={b.id}
              className="bg-gray-900 text-white rounded-xl shadow-lg overflow-hidden hover:scale-105 transform transition cursor-pointer"
              onClick={() => setSelectedBusiness(b)}
            >
              <img src={b.image || "/placeholder.png"} alt={b.name} className="w-full h-48 object-cover" />
              <div className="p-4 flex flex-col gap-1">
                <h2 className="text-xl font-bold text-emerald-400">{b.name}</h2>
                <p className="text-gray-300">{b.category}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedBusiness && (
        <BusinessDetailModal
          business={selectedBusiness}
          onClose={() => setSelectedBusiness(null)}
        />
      )}
    </div>
  );
};

export default UserBusinesses;