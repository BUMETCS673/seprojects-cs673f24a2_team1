// src/pages/Restaurants.tsx
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RestaurantCard from '../components/RestaurantCard';
import api from '../services/api';

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

function Restaurants() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [limit] = useState<number>(100); // You can make this dynamic if needed

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    try {
      const response = await api.get(`/restaurants/get-restaurants?limit=${limit}`);
      setRestaurants(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch restaurants. Please try again later.');
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <main className="mt-20 px-4">
        <section className="max-w-6xl mx-auto py-8">
          <h1 className="text-4xl font-bold mb-6 text-center">Restaurants</h1>
          {/* Filters Section (Optional) */}
          {/* <div className="mb-6">
            // Add filter components here
          </div> */}
          {loading ? (
            <p className="text-center text-gray-700">Loading restaurants...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {restaurants.map((restaurant) => (
                <RestaurantCard key={restaurant.restaurant_id} restaurant={restaurant} />
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Restaurants;
