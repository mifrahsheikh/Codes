import React from "react";
import { useNavigate } from "react-router-dom";
import { useGetApprovedBusinessesQuery } from "../api/BusinessAPI";
import mallPicture from '../assets/pictures/malls.jpg'
import restaurantImage from '../assets/pictures/restaurant-image.jpg'
import hospitalImage from '../assets/pictures/hospital-image.png'
import BakeryImage from '../assets/pictures/bakeries.jpg'
import SoftwareHouseImage from '../assets/pictures/Software-Houses.png'
import CafeImage from "../assets/Cafe's.jpg"
import BankImage from '../assets/pictures/banks-Pakistan.jpg'
import HotelImage from '../assets/Hotel.jpg'
import MartImage from '../assets/pictures/marts.jpg'

const categoryImages = {
  hospital: hospitalImage,
  restaurant: restaurantImage,
  mall: mallPicture,
  supermarket: MartImage,
  cafe: CafeImage,
  hotel: HotelImage,
  bakery: BakeryImage,
  software_house: SoftwareHouseImage,
  bank: BankImage,
};

const CategoriesPage = () => {
  const navigate = useNavigate();
  const { data: businesses = [], isLoading, error } = useGetApprovedBusinessesQuery();

  const grouped = businesses.reduce((acc, b) => {
    if (!acc[b.category]) acc[b.category] = [];
    acc[b.category].push(b);
    return acc;
  }, {});
  const categories = Object.keys(grouped);

  return (
<div className="min-h-screen bg-gradient-to-b from-black to-emerald-900 text-white px-6 lg:px-20 py-10 pt-32">
  <h1 className="text-4xl font-bold text-emerald-400 mb-4 text-center">
    All Categories
  </h1>

  <div className="flex justify-center lg:justify-start">
    <button
      className="bg-emerald-600 px-4 py-2 rounded-lg hover:bg-emerald-700 transition mb-4"
      onClick={() => navigate(-1)}
    >← Back
    </button>
  </div>
      {isLoading ? (
        <p className="text-gray-300">Loading categories...</p>
      ) : error ? (
        <p className="text-red-500">Failed to load categories.</p>
      ) : categories.length === 0 ? (
        <p className="text-gray-400 text-center">No categories available</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category) => (
            <div
              key={category}
              className="bg-white rounded-2xl p-4 h-80 shadow-md hover:shadow-lg cursor-pointer flex flex-col items-center text-center hover:scale-105 transition"
              onClick={() => navigate(`/category/${category}`)}
            >
              <img
                src={categoryImages[category.toLowerCase()] || "/images/default.jpg"}
                alt={category}
                className="w-full h-55 object-cover rounded-xl mb-3"
              />
              <h3 className="text-lg font-semibold text-emerald-700">{category}</h3>
              <p className="text-gray-500 text-sm mt-2">
                {grouped[category]?.length || 0} businesses
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoriesPage;