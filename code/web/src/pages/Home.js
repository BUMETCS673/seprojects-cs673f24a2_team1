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
// src/pages/Home.tsx
import { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import api from '../services/api';
import Hero from "../assets/hero-bg.png";
import Filter from "../assets/filter.png";
import Review from "../assets/review.png";
import Mobile from "../assets/mobile.png";
function Home() {
    const navigate = useNavigate();
    const [restaurants, setRestaurants] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    useEffect(() => {
        fetchRestaurants();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const fetchRestaurants = () => __awaiter(this, void 0, void 0, function* () {
        setLoading(true);
        setError('');
        try {
            const response = yield api.get('/restaurants/get-restaurants');
            setRestaurants(response.data);
        }
        catch (err) {
            setError('Failed to fetch restaurants. Please try again later.');
        }
        finally {
            setLoading(false);
        }
    });
    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        if (query.trim() === '') {
            setSuggestions([]);
        }
        else {
            const filtered = restaurants.filter((restaurant) => restaurant.name.toLowerCase().includes(query.toLowerCase()));
            setSuggestions(filtered.slice(0, 5)); // Limit suggestions to top 5
        }
    };
    const handleSuggestionClick = (restaurant_id) => {
        navigate(`/restaurant/${restaurant_id}`);
    };
    return (_jsxs(_Fragment, { children: [_jsx(Header, {}), _jsxs("main", { className: "flex flex-col items-center", children: [_jsx("section", { className: "w-full bg-cover bg-center h-screen", style: { backgroundImage: `url(${Hero})` }, children: _jsxs("div", { className: "flex flex-col items-center justify-center h-full bg-black bg-opacity-50", children: [_jsx("h1", { className: "text-white text-5xl font-bold mb-4", children: "Find Your Perfect Meal" }), _jsx("p", { className: "text-white text-xl mb-6", children: "Discover restaurants that cater to your dietary needs" }), _jsxs("div", { className: "relative w-80", children: [_jsx("input", { type: "text", placeholder: "Search for restaurants...", value: searchQuery, onChange: handleSearchChange, className: "p-3 rounded-md w-full" }), searchQuery.trim() !== '' && suggestions.length > 0 && (_jsx("ul", { className: "absolute z-10 bg-white border border-gray-300 w-full mt-1 rounded-md max-h-60 overflow-y-auto", children: suggestions.map((suggestion) => (_jsx("li", { className: "p-2 cursor-pointer hover:bg-gray-100", onClick: () => handleSuggestionClick(suggestion.restaurant_id), children: suggestion.name }, suggestion.restaurant_id))) }))] }), _jsxs("div", { className: "flex mt-6 space-x-4", children: [_jsx(Link, { to: "/restaurants?dietaryPreference=vegan", children: _jsx("button", { className: "bg-green-500 text-white px-4 py-2 rounded", children: "Vegan" }) }), _jsx(Link, { to: "/restaurants?dietaryPreference=gluten_free", children: _jsx("button", { className: "bg-yellow-500 text-white px-4 py-2 rounded", children: "Gluten-Free" }) }), _jsx(Link, { to: "/restaurants?dietaryPreference=vegetarian", children: _jsx("button", { className: "bg-blue-500 text-white px-4 py-2 rounded", children: "Vegetarian" }) })] })] }) }), searchQuery.trim() !== '' && suggestions.length === 0 && !loading && (_jsx("section", { className: "w-full max-w-6xl mx-auto py-8 px-4", children: _jsx("p", { className: "text-center text-gray-700", children: "No restaurants found." }) })), _jsxs("section", { className: "py-16 px-4", children: [_jsx("h2", { className: "text-3xl font-bold text-center mb-12", children: "Why Use MenuMatch?" }), _jsxs("div", { className: "flex flex-wrap justify-center space-x-6", children: [_jsxs("div", { className: "w-64 text-center mb-8", children: [_jsx("img", { src: Filter, alt: "Filter", className: "mx-auto mb-4 w-20" }), _jsx("h3", { className: "text-xl font-semibold", children: "Customized Filtering" }), _jsx("p", { children: "Find restaurants that meet your specific dietary preferences." })] }), _jsxs("div", { className: "w-64 text-center mb-8", children: [_jsx("img", { src: Review, alt: "Review", className: "mx-auto mb-4  w-20" }), _jsx("h3", { className: "text-xl font-semibold", children: "Curated Reviews" }), _jsx("p", { children: "Read reviews from users with similar dietary needs." })] }), _jsxs("div", { className: "w-64 text-center mb-8", children: [_jsx("img", { src: Mobile, alt: "Mobile", className: "mx-auto mb-4  w-20" }), _jsx("h3", { className: "text-xl font-semibold", children: "Accessible Anywhere" }), _jsx("p", { children: "Use our platform on both web and mobile devices." })] })] })] }), _jsxs("section", { className: "bg-gray-100 py-16 px-4", children: [_jsx("h2", { className: "text-3xl font-bold text-center mb-12", children: "What Our Users Say" }), _jsxs("div", { className: "flex flex-wrap justify-center space-x-6", children: [_jsxs("div", { className: "w-80 bg-white p-6 rounded-md shadow-md mb-8", children: [_jsx("p", { className: "italic", children: "\"MenuMatch helped me find amazing vegan restaurants when I moved to Boston.\"" }), _jsx("h4", { className: "mt-4 font-semibold", children: "- Alex, Vegan" })] }), _jsxs("div", { className: "w-80 bg-white p-6 rounded-md shadow-md mb-8", children: [_jsx("p", { className: "italic", children: "\"As someone who eats vegetarian, this platform is a lifesaver.\"" }), _jsx("h4", { className: "mt-4 font-semibold", children: "- Fatima, Vegetarian" })] }), _jsxs("div", { className: "w-80 bg-white p-6 rounded-md shadow-md mb-8", children: [_jsx("p", { className: "italic", children: "\"Finding gluten-free options has never been easier!\"" }), _jsx("h4", { className: "mt-4 font-semibold", children: "- John, Gluten-Free" })] })] })] }), _jsxs("section", { className: "py-16 px-4 text-center", children: [_jsx("h2", { className: "text-3xl font-bold mb-6", children: "Join MenuMatch Today" }), _jsx("p", { className: "mb-8", children: "Sign up to start discovering restaurants that fit your dietary needs." }), _jsx(Link, { to: "/login", children: _jsx("button", { className: "bg-red-500 text-white px-6 py-3 rounded-md text-lg", children: "Get Started" }) })] })] }), _jsx(Footer, {})] }));
}
export default Home;
