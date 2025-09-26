import React from "react";
import { useGetBusinessesQuery } from "../api/BusinessAPI";

const UserBusinesses = () => {
  const { data: businesses = [], isLoading, error } = useGetBusinessesQuery(); 

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">All Businesses</h1>

      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">Failed to load businesses.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {businesses.map((b) => (
            <div key={b.id} className="bg-white text-black p-4 rounded shadow">
              <h2 className="font-bold">{b.name}</h2>
              <p>Category: {b.category}</p>
              <p>Rating: {b.rating}</p>
              <p>Contact: {b.contact}</p>
              <p>Latitude: {b.latitude}, Longitude: {b.longitude}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserBusinesses;