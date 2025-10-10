import React, { useState } from "react";
import { useGetBusinessesQuery } from "../api/BusinessAPI";
import { useNavigate } from "react-router-dom";
import { Search, MapPin, Star } from "lucide-react";

const UserBusinesses = () => {
  const navigate = useNavigate();
  const { data: businesses = [], isLoading, error } = useGetBusinessesQuery();
  const [searchTerm, setSearchTerm] = useState("");

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const filteredBusinesses = businesses.filter(
    (b) =>
      (b.name ?? "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (b.category ?? "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-emerald-900 text-white px-6 py-10">
      <div className="flex justify-center mb-10">
        <div className="relative w-full max-w-lg">
          <Search className="absolute left-3 top-3 text-emerald-400" size={20} />
          <input
            type="text"
            placeholder="Search by name or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-black/50 border border-emerald-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
          />
        </div>
      </div>
      {isLoading && (
        <p className="text-emerald-400 text-center animate-pulse">
          Loading businesses...
        </p>
      )}

      {error && (
        <p className="text-red-400 text-center">
          Failed to load businesses. Please try again.
        </p>
      )}
      {!isLoading && !error && (
        <>
          {filteredBusinesses.length === 0 ? (
            <p className="text-gray-400 text-center">
              No businesses found matching your search.
            </p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredBusinesses.map((b) => (
                <div
                  key={b.id}
                  onClick={() => navigate(`/business/${b.id}`)}
                  className="group cursor-pointer bg-gradient-to-br from-black/60 to-emerald-950 border border-emerald-800/40 rounded-2xl overflow-hidden shadow-lg hover:shadow-emerald-600/30 transition-all duration-300 hover:scale-[1.03]"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={b.image || "/placeholder.png"}
                      alt={b.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 transition duration-500"></div>
                  </div>

                  <div className="p-5">
                    <h2 className="text-xl font-semibold text-emerald-400 truncate">
                      {b.name}
                    </h2>
                    <p className="text-sm text-gray-400 mb-2 capitalize">
                      {b.category || "Uncategorized"}
                    </p>
                    <div className="flex justify-between items-center text-gray-400 text-sm">
                      {b.city && (
                        <span className="flex items-center gap-1">
                          <MapPin size={14} className="text-emerald-400" />
                          {b.city}
                        </span>
                      )}
                      {b.rating > 0 && (
                        <span className="flex items-center gap-1 text-amber-400">
                          <Star size={14} /> {Number(b.rating).toFixed(1)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
            <button
          onClick={handleLogout}
          className="px-6 py-2 bg-red-600 hover:bg-red-500 rounded-lg text-white font-semibold shadow-md shadow-red-900/40 transition"
        >
          Logout
        </button>
        </>
      )}
    </div>
  );
};

export default UserBusinesses;