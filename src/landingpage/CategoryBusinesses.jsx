import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Modal from "react-modal";
import { useGetApprovedBusinessesQuery } from "../api/BusinessAPI";

Modal.setAppElement("#root");

const CategoryBusinesses = () => {
    const { name } = useParams();
    const navigate = useNavigate();
    const { data: businesses = [] } = useGetApprovedBusinessesQuery();
    const [selectedBusiness, setSelectedBusiness] = useState(null);

    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const isLoggedIn = !!token && role === "user";
    const filtered = businesses.filter((b) => b.category === name);

    return (
        <div className="min-h-full bg-gradient-to-b from-black to-emerald-900 text-white px-10 lg:px-20 pt-32">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-emerald-400">
                    {name}
                </h2>
                <button
                    className="text-gray-400 hover:text-white"
                    onClick={() => navigate(-1)}
                >
                    ← Back
                </button>
            </div>

            {filtered.length === 0 ? (
                <p className="text-gray-300">No businesses found in this category.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    {filtered.map((b) => (
                        <div
                            key={b.id}
                            className="bg-white text-black rounded-xl shadow cursor-pointer hover:shadow-lg transition flex flex-col"
                            onClick={() => setSelectedBusiness(b)}
                        >
                            <img
                                src={b.image || "/placeholder.png"}
                                alt={b.name}
                                className="w-full h-48 object-cover rounded-t-xl"
                            />

                            <div className="p-4 flex flex-col gap-1">
                                <h4 className="font-bold text-lg">{b.name}</h4>
                                <p className="text-gray-500 text-sm">Category: {b.category}</p>
                                <p className="text-gray-500 text-sm">Rating: {b.rating}</p>
                            </div>
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
                    <h2 className="text-2xl font-bold mb-">{selectedBusiness.name}</h2>
                    <p>Category: {selectedBusiness.category}</p>
                    <p>Rating: {selectedBusiness.rating}</p>
                    <p>Contact: {selectedBusiness.contact}</p>

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