// src/pages/Home.tsx

import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import RestaurantCard from '../components/RestaurantCard';
import api from '../services/api';
import Hero from "../assets/hero-bg.png"
import Filter from "../assets/filter.png"
import Review from "../assets/review.png"
import Mobile from "../assets/mobile.png"

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

function Home() {
    const navigate = useNavigate();

    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [suggestions, setSuggestions] = useState<Restaurant[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        fetchRestaurants();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchRestaurants = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await api.get('/restaurants/get-restaurants');
            setRestaurants(response.data);
        } catch (err) {
            setError('Failed to fetch restaurants. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setSearchQuery(query);

        if (query.trim() === '') {
            setSuggestions([]);
        } else {
            const filtered = restaurants.filter((restaurant) =>
                restaurant.name.toLowerCase().includes(query.toLowerCase())
            );
            setSuggestions(filtered.slice(0, 5)); // Limit suggestions to top 5
        }
    };

    const handleSuggestionClick = (restaurant_id: number) => {
        navigate(`/restaurant/${restaurant_id}`);
    };

    return (
        <>
            <Header />
            <main className="flex flex-col items-center">
                {/* Hero Section */}
                <section
                    className="w-full bg-cover bg-center h-screen"
                    style={{ backgroundImage: `url(${Hero})` }}
                >
                    <div className="flex flex-col items-center justify-center h-full bg-black bg-opacity-50">
                        <h1 className="text-white text-5xl font-bold mb-4">Find Your Perfect Meal</h1>
                        <p className="text-white text-xl mb-6">
                            Discover restaurants that cater to your dietary needs
                        </p>
                        {/* Search Bar */}
                        <div className="relative w-80">
                            <input
                                type="text"
                                placeholder="Search for restaurants..."
                                value={searchQuery}
                                onChange={handleSearchChange}
                                className="p-3 rounded-md w-full"
                            />
                            {searchQuery.trim() !== '' && suggestions.length > 0 && (
                                <ul className="absolute z-10 bg-white border border-gray-300 w-full mt-1 rounded-md max-h-60 overflow-y-auto">
                                    {suggestions.map((suggestion) => (
                                        <li
                                            key={suggestion.restaurant_id}
                                            className="p-2 cursor-pointer hover:bg-gray-100"
                                            onClick={() => handleSuggestionClick(suggestion.restaurant_id)}
                                        >
                                            {suggestion.name}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                        {/* Dietary Preferences */}
                        <div className="flex mt-6 space-x-4">
                            <Link to="/restaurants?dietaryPreference=vegan">
                                <button className="bg-green-500 text-white px-4 py-2 rounded">Vegan</button>
                            </Link>
                            <Link to="/restaurants?dietaryPreference=gluten_free">
                                <button className="bg-yellow-500 text-white px-4 py-2 rounded">Gluten-Free</button>
                            </Link>
                            <Link to="/restaurants?dietaryPreference=vegetarian">
                                <button className="bg-blue-500 text-white px-4 py-2 rounded">Vegetarian</button>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Search Results */}
                {searchQuery.trim() !== '' && suggestions.length === 0 && !loading && (
                    <section className="w-full max-w-6xl mx-auto py-8 px-4">
                        <p className="text-center text-gray-700">No restaurants found.</p>
                    </section>
                )}

                {/* Features Section */}
                <section className="py-16 px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">Why Use MenuMatch?</h2>
                    <div className="flex flex-wrap justify-center space-x-6">
                        {/* Feature 1 */}
                        <div className="w-64 text-center mb-8">
                            <img src={Filter} alt="Filter" className="mx-auto mb-4 w-20" />
                            <h3 className="text-xl font-semibold">Customized Filtering</h3>
                            <p>Find restaurants that meet your specific dietary preferences.</p>
                        </div>
                        {/* Feature 2 */}
                        <div className="w-64 text-center mb-8">
                            <img src={Review} alt="Review" className="mx-auto mb-4  w-20" />
                            <h3 className="text-xl font-semibold">Curated Reviews</h3>
                            <p>Read reviews from users with similar dietary needs.</p>
                        </div>
                        {/* Feature 3 */}
                        <div className="w-64 text-center mb-8">
                            <img src={Mobile} alt="Mobile" className="mx-auto mb-4  w-20" />
                            <h3 className="text-xl font-semibold">Accessible Anywhere</h3>
                            <p>Use our platform on both web and mobile devices.</p>
                        </div>
                    </div>
                </section>

                {/* Testimonials Section */}
                <section className="bg-gray-100 py-16 px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
                    <div className="flex flex-wrap justify-center space-x-6">
                        {/* Testimonial 1 */}
                        <div className="w-80 bg-white p-6 rounded-md shadow-md mb-8">
                            <p className="italic">
                                "MenuMatch helped me find amazing vegan restaurants when I moved to Boston."
                            </p>
                            <h4 className="mt-4 font-semibold">- Alex, Vegan</h4>
                        </div>
                        {/* Testimonial 2 */}
                        <div className="w-80 bg-white p-6 rounded-md shadow-md mb-8">
                            <p className="italic">
                                "As someone who eats vegetarian, this platform is a lifesaver."
                            </p>
                            <h4 className="mt-4 font-semibold">- Fatima, Vegetarian</h4>
                        </div>
                        {/* Testimonial 3 */}
                        <div className="w-80 bg-white p-6 rounded-md shadow-md mb-8">
                            <p className="italic">"Finding gluten-free options has never been easier!"</p>
                            <h4 className="mt-4 font-semibold">- John, Gluten-Free</h4>
                        </div>
                    </div>
                </section>

                {/* Call to Action */}
                <section className="py-16 px-4 text-center">
                    <h2 className="text-3xl font-bold mb-6">Join MenuMatch Today</h2>
                    <p className="mb-8">
                        Sign up to start discovering restaurants that fit your dietary needs.
                    </p>
                    <Link to="/login">
                        <button className="bg-red-500 text-white px-6 py-3 rounded-md text-lg">
                            Get Started
                        </button>
                    </Link>
                </section>
            </main>
            <Footer />
        </>
    );
}

export default Home;
