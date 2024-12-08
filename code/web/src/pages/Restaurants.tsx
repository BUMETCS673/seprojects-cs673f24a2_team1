// src/pages/Restaurants.tsx

import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RestaurantCard from '../components/RestaurantCard';
import Filters from '../components/Filters';
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
  // Add other fields if necessary
}

interface FilterOptions {
  dietaryPreference: string;
}

function Restaurants() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [filters, setFilters] = useState<FilterOptions>({ dietaryPreference: '' });
  const limit = 100; // You can make this dynamic if needed

  useEffect(() => {
    fetchRestaurants();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  const fetchRestaurants = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await api.get(`/restaurants/get-restaurants?limit=${limit}`);
      let data: Restaurant[] = response.data;

      // Apply filters
      if (filters.dietaryPreference) {
        data = data.filter((restaurant: any) => {
          const ratingKey = `${filters.dietaryPreference}_rating` as any;
          return restaurant[ratingKey] && restaurant[ratingKey] > 0;
        });
      }

      setRestaurants(data);
    } catch (err) {
      setError('Failed to fetch restaurants. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };

  return (
    <>
      <Header />
      <main className="mt-20 px-4">
        <section className="max-w-6xl mx-auto py-8">
          <h1 className="text-4xl font-bold mb-6 text-center">Restaurants</h1>
          {/* Filters Section */}
          <Filters onFilterChange={handleFilterChange} />
          {loading ? (
            <p className="text-center text-gray-700">Loading restaurants...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : restaurants.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {restaurants.map((restaurant) => (
                <RestaurantCard key={restaurant.restaurant_id} restaurant={restaurant} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-700">No restaurants found.</p>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Restaurants;
