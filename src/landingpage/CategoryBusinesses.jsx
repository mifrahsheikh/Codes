import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Modal from "react-modal";
import { useGetApprovedBusinessesQuery } from "../api/BusinessAPI";

Modal.setAppElement("#root");

const CategoryBusinesses = () => {
    const { name } = useParams();
    const navigate = useNavigate();
    const { data: businesses = [], isLoading, error } = useGetApprovedBusinessesQuery();
    const [selectedBusiness, setSelectedBusiness] = useState(null);

    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const isLoggedIn = !!token && role === "user";

    const filtered = businesses.filter((b) => b.category === name);

    return (
        <div className="min-h-full bg-gradient-to-b from-black to-emerald-900 text-white px-10 lg:px-20 pt-32">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-emerald-400">
                    {name} Near You
                </h2>
                <button
                    className="text-gray-400 hover:text-white"
                    onClick={() => navigate(-1)}
                >
                    ← Back
                </button>
            </div>

            {isLoading ? (
                <p>Loading businesses...</p>
            ) : error ? (
                <p className="text-red-500">Failed to load businesses.</p>
            ) : filtered.length === 0 ? (
                <p className="text-gray-300">No businesses found in this category.</p>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filtered.map((b) => (
                        <div
                            key={b.id}
                            className="bg-white text-black rounded-xl p-4 shadow cursor-pointer hover:shadow-lg transition"
                            onClick={() => setSelectedBusiness(b)}
                        >
                            <h4 className="font-bold">{b.name}</h4>
                            <p className="text-sm text-gray-500">Rating: {b.rating}</p>
                        </div>
                    ))}
                </div>
            )}

            {selectedBusiness && (
                <Modal
                    isOpen={!!selectedBusiness}
                    onRequestClose={() => setSelectedBusiness(null)}
                    className="bg-white p-6 rounded-xl max-w-lg mx-auto mt-20 shadow-lg"
                    overlayClassName="fixed inset-0 bg-black/50 flex items-start justify-center"
                >
                    <h2 className="text-2xl font-bold mb-2">{selectedBusiness.name}</h2>
                    <p>Category: {selectedBusiness.category}</p>
                    <p>Rating: {selectedBusiness.rating}</p>

                    {!isLoggedIn ? (
                        <div
                            className="mt-4 text-gray-500 cursor-pointer hover:text-emerald-600 flex items-center gap-2"
                            onClick={() => navigate("/login")}
                        >
                            <span>Sign in to see full business details</span>
                            <span className="text-emerald-600 font-bold text-xl">→</span>
                        </div>
                    ) : (
                        <>
                            <p>Contact: {selectedBusiness.contact}</p>
                            <p>
                                Location: {selectedBusiness.latitude}, {selectedBusiness.longitude}
                            </p>
                        </>
                    )}

                    <button
                        className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700"
                        onClick={() => setSelectedBusiness(null)}
                    >
                        Close
                    </button>
                </Modal>
            )}
        </div>
    );
};

export default CategoryBusinesses;