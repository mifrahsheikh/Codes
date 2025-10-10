import React from "react";

const CategoryFilters = ({
  categories,
  categoryFilter,
  setCategoryFilter,
  ratingFilter,
  setRatingFilter,
  businessTypeFilter,
  setBusinessTypeFilter
}) => {
  return (
<div className="relative w-full flex flex-col sm:flex-row justify-start items-center gap-4 px-6 lg:px-20 mt-10 overflow-visible">
  
  <select
    value={categoryFilter}
    onChange={(e) => setCategoryFilter(e.target.value)}
    className=" px-3 py-2 rounded-lg border border-gray-400 bg-black/40 text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
  >
    <option value="">All Categories</option>
    {categories.map((cat) => (
      <option key={cat} value={cat}>
        {cat}
      </option>
    ))}
  </select>

  <select
    value={ratingFilter}
    onChange={(e) => setRatingFilter(e.target.value)}
    className="px-3 py-2 rounded-lg border border-gray-400 bg-black/40 text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
  >
    <option value="">All Ratings</option>
    <option value="4">4 above</option>
    <option value="3">3 above</option>
    <option value="2">2 above</option>
  </select>

  <div className="flex gap-3">
    <button
      className={`px-5 py-2 rounded-lg border hover:bg-emerald-800 ${businessTypeFilter === "online" ? "bg-emerald-600 text-white" : "bg-black/40 text-white border-gray-400"}`}
      onClick={() => setBusinessTypeFilter(businessTypeFilter === "online" ? "" : "online")}
    >
      Online
    </button>

    <button
      className={`px-5 py-2 rounded-lg border hover:bg-emerald-800 ${businessTypeFilter === "local" ? "bg-emerald-600 text-white" : "bg-black/40 text-white border-gray-400"}`}
      onClick={() => setBusinessTypeFilter(businessTypeFilter === "local" ? "" : "local")}
    >
      Local
    </button>
  </div>
</div>

  );
};

export default CategoryFilters;
