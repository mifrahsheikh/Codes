import React, { useRef } from "react";
const NearbyBusinesses = ({
    isNearbyLoading,
    nearbyError,
    nearbyBusinesses,
    filteredNearbyBusinesses,
    setSelectedBusiness,
}) => {
    const nearby = useRef(null);
    const getFallbackImage = (category = "") => {
        const cat = category?.toLowerCase() || "";
        if (cat.includes("restaurant") || cat.includes("cafe") || cat.includes("food") || cat.includes("catering"))
            return "/images/restaurant.jpg";
        if (cat.includes("hospital") || cat.includes("clinic") || cat.includes("health"))
            return "/images/hospital.jpg";
        if (cat.includes("service") || cat.includes("shop") || cat.includes("store"))
            return "/images/store.jpg";
        if (cat.includes("commercial") || cat.includes("mall") || cat.includes("building"))
            return "/images/malls.jpeg";
        if (cat.includes("entertainment") || cat.includes("cinemas"))
            return "/images/entertainment.jpg";
        return "/placeholder.png";
    };
    const getBadges = (b) => {
        const badges = [];
        if (b.rating >= 4.5) badges.push("⭐ Top Rated");
        return badges;
    };
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
                <p className="text-gray-400 animate-pulse">Reconnecting...</p>
            ) : nearbyBusinesses.length === 0 ? (
                <p className="text-gray-300 text-center">No businesses nearby</p>
            ) : (
                <div className="relative">
                    <button
                        onClick={scrollLeft}
                        className="absolute left-0 top-1/2 -translate-y-1/2 bg-emerald-600 text-white p-3 rounded-full z-10 hover:bg-emerald-700 shadow-lg"
                    >
                        ←
                    </button>
                    <button
                        onClick={scrollRight}
                        className="absolute right-0 top-1/2 -translate-y-1/2 bg-emerald-600 text-white p-3 rounded-full z-10 hover:bg-emerald-700 shadow-lg"
                    >
                        →
                    </button>
                    <div ref={nearby} className="flex gap-4 py-2 overflow-x-hidden overflow-y-hidden scroll-smooth">
                        {filteredNearbyBusinesses.length === 0 ? (
                            <div className="flex items-center justify-center w-full text-gray-500">
                                No businesses match your search
                            </div>
                        ) : (
                            filteredNearbyBusinesses.map((b) => (
                                <div
                                    key={b.id}
                                    className="flex-none w-[22%] h-[25%] bg-white rounded-xl shadow hover:shadow-lg transition flex flex-col cursor-pointer overflow-hidden"
                                    onClick={() => {
                                        if (String(b.id).startsWith("db_")) {
                                            setSelectedBusiness(b);
                                        }
                                    }}
                                >

                                    <img
                                        src={b.image || getFallbackImage(b.category)}
                                        alt={b.name}
                                        className="w-full h-47 object-cover rounded-t-xl"
                                    />
                                    <div className="p-3 flex flex-col gap-1 text-sm leading-tight">
                                        <h3 className="font-bold text-emerald-700 truncate">{b.name}</h3>
                                        <div className="flex gap-1 flex-wrap mt-1 h-6 overflow-hidden">
                                            {getBadges(b).map((badge, idx) => (
                                                <span key={idx} className="text-[10px] px-2 py-1 rounded-full bg-emerald-100 text-emerald-800 font-semibold">
                                                    {badge}
                                                </span>
                                            ))}
                                        </div>
                                        <p className="text-gray-500 truncate">{b.category}</p>
                                        <p className="text-gray-500">Rating: {b.rating ?? "N/A"}</p>
                                        <p className="text-gray-500">Distance: {b.distance ?? "N/A"}</p>
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
