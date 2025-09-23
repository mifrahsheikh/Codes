import { useNavigate } from "react-router-dom";
import { FaHospital, FaUtensils, FaShoppingBag, FaStore, FaCoffee, FaHotel } from "react-icons/fa";

const icons = {
  hospitals: <FaHospital className="text-emerald-600 text-3xl mb-3" />,
  restaurants: <FaUtensils className="text-emerald-600 text-3xl mb-3" />,
  brands: <FaShoppingBag className="text-emerald-600 text-3xl mb-3" />,
  shops: <FaStore className="text-emerald-600 text-3xl mb-3" />,
  cafes: <FaCoffee className="text-emerald-600 text-3xl mb-3" />,
  hotels: <FaHotel className="text-emerald-600 text-3xl mb-3" />,
};

const CategorySection = ({ categories, grouped, isLoading, error }) => {
  const navigate = useNavigate();

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
          {categories.map((category) => (
            <div
              key={category}
              className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg hover:shadow-emerald-500/30 
                         transition cursor-pointer flex flex-col items-center text-center hover:scale-105 "
              onClick={() => navigate(`/category/${category}`)}
            >
              {icons[category.toLowerCase()] || <FaStore className="text-emerald-600 text-3xl mb-3" />}

              <h3 className="text-lg font-semibold text-emerald-700">{category}</h3>

              <p className="text-gray-500 text-sm mt-2">
                {grouped[category].length} businesses
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default CategorySection;
