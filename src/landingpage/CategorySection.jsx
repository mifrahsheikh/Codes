import { useNavigate } from "react-router-dom";
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

const CategorySection = ({ categories, grouped, isLoading, error }) => {
  const navigate = useNavigate();
  const previewCategories = categories.slice(0, 8);

  return (
    <section className="px-6 lg:px-20 mt-20">
      <h2 className="text-3xl font-bold mb-10 text-center lg:text-left text-emerald-400">
        Browse by Category
      </h2>
      {isLoading ? (
        <p className="text-gray-300">Loading categories...</p>
      ) : error ? (
        <p className="text-red-500">Failed to load categories.</p>
      ) : categories.length === 0 ? (
        <p className="text-gray-400 text-center">No categories available</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {previewCategories.map((category) => (
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

        {categories.length > 7 && (
  <div className="flex justify-end mt-4 ">
    <button
      onClick={() => navigate("/categories")}
      className="px-8 py-3 bg-emerald-600 text-white rounded-full shadow-md hover:bg-emerald-700 transition justify-end"
    >
      See More Categories →
    </button>
  </div>
)}
        </div>
      )}
    </section>
  );
};

export default CategorySection;