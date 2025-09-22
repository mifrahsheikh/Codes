import React, { useState, useEffect } from "react";
import hospitalImage from "../assets/hospitalImage.jpg";
import restaurantImage from "../assets/restaurant.jpg";
import mallImage from "../assets/Mall-image.jpg";
import cafeImage from "../assets/Cafe's.jpg";
import hotelImage from "../assets/Hotel.jpg";

const AboutSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const categories = [
    "Hospitals",
    "Restaurants",
    "Malls",
    "Cafes",
    "Hotels",
  ];

  const categoryImages = {
    Hospitals: hospitalImage,
    Restaurants: restaurantImage,
    Malls: mallImage,
    Cafes: cafeImage,
    Hotels: hotelImage,
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % categories.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [categories.length]);

  return (
    <section className="flex flex-col lg:flex-row items-center justify-between px-10 lg:px-20 pt-32 lg:pt-40">
      <div className="lg:w-1/2 text-center lg:text-left">
        <h1 className="text-5xl font-extrabold mb-6">
          Discover <span className="text-emerald-400">Businesses Around You</span>
        </h1>
        <p className="text-gray-300 text-lg mb-6">
          LocalPulse helps you explore restaurants, hospitals, shops, and brands in your area. Find trusted services, popular stores, and local businesses all in one place.
        </p>
        <p className="text-gray-300 text-lg mb-6">
          Our platform provides essential details about each business category. Explore images and discover what each category has to offer.
        </p>
      </div>

      <div className="lg:w-1/2 mt-10 lg:mt-0 flex justify-center relative">
        <div className="w-full max-w-120 h-80 overflow-hidden rounded-lg shadow-lg relative">
          {categories.map((category, index) => (
            <div
              key={category}
              className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
                }`}
            >
              <img
                src={categoryImages[category] || categoryImages.default}
                alt={category}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          ))}
        </div>

        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2">
          {categories.map((_, idx) => (
            <span
              key={idx}
              className={`w-3 h-3 rounded-full cursor-pointer ${idx === currentIndex ? "bg-emerald-400" : "bg-gray-300"
                }`}
              onClick={() => setCurrentIndex(idx)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;