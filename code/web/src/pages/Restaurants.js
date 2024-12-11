var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
// src/pages/Restaurants.tsx
import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RestaurantCard from '../components/RestaurantCard';
import Filters from '../components/Filters';
import api from '../services/api';
function Restaurants() {
    const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [filters, setFilters] = useState({ dietaryPreference: '' });
    const limit = 100; // You can make this dynamic if needed
    useEffect(() => {
        fetchRestaurants();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filters]);
    const fetchRestaurants = () => __awaiter(this, void 0, void 0, function* () {
        setLoading(true);
        setError('');
        try {
            const response = yield api.get(`/restaurants/get-restaurants?limit=${limit}`);
            let data = response.data;
            // Apply filters
            if (filters.dietaryPreference) {
                data = data.filter((restaurant) => {
                    const ratingKey = `${filters.dietaryPreference}_rating`;
                    return restaurant[ratingKey] && restaurant[ratingKey] > 0;
                });
            }
            setRestaurants(data);
        }
        catch (err) {
            setError('Failed to fetch restaurants. Please try again later.');
        }
        finally {
            setLoading(false);
        }
    });
    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
    };
    return (_jsxs(_Fragment, { children: [_jsx(Header, {}), _jsx("main", { className: "mt-20 px-4", children: _jsxs("section", { className: "max-w-6xl mx-auto py-8", children: [_jsx("h1", { className: "text-4xl font-bold mb-6 text-center", children: "Restaurants" }), _jsx(Filters, { onFilterChange: handleFilterChange }), loading ? (_jsx("p", { className: "text-center text-gray-700", children: "Loading restaurants..." })) : error ? (_jsx("p", { className: "text-center text-red-500", children: error })) : restaurants.length > 0 ? (_jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: restaurants.map((restaurant) => (_jsx(RestaurantCard, { restaurant: restaurant }, restaurant.restaurant_id))) })) : (_jsx("p", { className: "text-center text-gray-700", children: "No restaurants found." }))] }) }), _jsx(Footer, {})] }));
}
export default Restaurants;
