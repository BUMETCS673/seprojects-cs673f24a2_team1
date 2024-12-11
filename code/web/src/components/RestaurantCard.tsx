// src/components/RestaurantCard.tsx
import { Link } from 'react-router-dom';

interface Restaurant {
  restaurant_id: number;
  name: string;
  address: string;
  phone: string;
  overall_rating: number;
  vegan_rating: number;
  gluten_free_rating: number;
  vegetarian_rating: number;
}

interface RestaurantCardProps {
  restaurant: Restaurant;
}

function RestaurantCard({ restaurant }: RestaurantCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-2">{restaurant.name}</h2>
      <p className="text-gray-600 mb-2">{restaurant.address}</p>
      <p className="text-gray-600 mb-4">Phone: {restaurant.phone}</p>
      <div className="flex items-center mb-4">
        <span className="text-yellow-500 mr-2">Overall Rating:</span>
        <span className="font-bold">{restaurant.overall_rating.toFixed(1)}</span>
      </div>
      <div className="flex space-x-4 mb-4">
        <div className="flex items-center">
          <span className="text-green-500 mr-1">Vegan:</span>
          <span>{restaurant.vegan_rating.toFixed(1)}</span>
        </div>
        <div className="flex items-center">
          <span className="text-blue-500 mr-1">Gluten-Free:</span>
          <span>{restaurant.gluten_free_rating.toFixed(1)}</span>
        </div>
        <div className="flex items-center">
          <span className="text-purple-500 mr-1">Vegetarian:</span>
          <span>{restaurant.vegetarian_rating.toFixed(1)}</span>
        </div>
      </div>
      <Link to={`/restaurant/${restaurant.restaurant_id}`}>
        <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
          View Details
        </button>
      </Link>
    </div>
  );
}

export default RestaurantCard;
