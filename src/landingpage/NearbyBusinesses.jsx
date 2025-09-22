import React, { useRef } from "react";

const NearbyBusinesses = ({
    isNearbyLoading,
    nearbyError,
    nearbyBusinesses,
    filteredNearbyBusinesses,
    setSelectedBusiness,
}) => {
    const nearby = useRef(null);

    const scrollLeft = () => {
        if (nearby.current) {
            nearby.current.scrollBy({ left: -250, behavior: "smooth" });
        }
    };

    const scrollRight = () => {
        if (nearby.current) {
            nearby.current.scrollBy({ left: 250, behavior: "smooth" });
        }
    };

    return (
        <section className="px-10 lg:px-20 mt-20 relative">
            <h2 className="text-3xl font-bold mb-4 text-center lg:text-left">
                Nearby Businesses
            </h2>

            {isNearbyLoading ? (
                <p>Loading nearby businesses...</p>
            ) : nearbyError ? (
                <p className="text-red-500">Failed to load nearby businesses.</p>
            ) : nearbyBusinesses.length === 0 ? (
                <p className="text-gray-300 text-center">No businesses nearby</p>
            ) : (
                <div className="relative">
                    <button
                        onClick={scrollLeft}
                        className="absolute left-0 top-1/2 -translate-y-1/2 bg-emerald-600 text-white p-3 rounded-full z-10 hover:bg-emerald-700 shadow-lg"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 19l-7-7 7-7"
                            />
                        </svg>
                    </button>

                    <button
                        onClick={scrollRight}
                        className="absolute right-0 top-1/2 -translate-y-1/2 bg-emerald-600 text-white p-3 rounded-full z-10 hover:bg-emerald-700 shadow-lg"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                            />
                        </svg>
                    </button>

                    <div
                        ref={nearby}
                        className="flex gap-4 py-2 overflow-x-hidden scroll-smooth"
                    >
                        {filteredNearbyBusinesses.length === 0 ? (
                            <div className="flex items-center justify-center w-full text-gray-500">
                                No businesses match your search
                            </div>
                        ) : (
                            filteredNearbyBusinesses.map((b) => (
                                <div
                                    key={b.id}
                                    className="min-w-[20%] h-75 bg-white rounded-xl shadow hover:shadow-lg transition flex flex-col cursor-pointer"
                                    onClick={() => setSelectedBusiness(b)}
                                >
                                    <img
                                        src={b.image || "/placeholder.png"}
                                        alt={b.name}
                                        className="w-full h-50 object-cover rounded-t-xl"
                                    />
                                    <div className="p-3 flex flex-col gap-1">
                                        <h3 className="font-bold text-emerald-700">{b.name}</h3>
                                        <p className="text-gray-500">{b.category}</p>
                                        <p className="text-gray-500">Rating: {b.rating}</p>
                                        <p className="text-gray-500">Distance: {b.distance}</p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}
        </section>
    );
};

export default NearbyBusinesses;
