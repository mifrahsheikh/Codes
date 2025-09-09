const BusinessCards = ({ business, onDelete }) => {
  return (
    <div className="bg-green-700 text-white p-2 mb-4 rounded-xl  ease-in-out text-center">
         <h3 className="font-bold text-xl">{business.name}</h3>
      <p>Category: {business.category}</p>
      <p>Rating: {business.rating}</p>
      <p>Contact: {business.contact}</p>
      <p>Distance: {business.distance} Km</p>
      <button
        className="bg-green-100 text-black px-3 py-1 mt-2 rounded-md hover:bg-red-200"
        onClick={() => onDelete(business.id)}
      >
        Delete
      </button>
    </div>
  );
};

export default BusinessCards;
