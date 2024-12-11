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
// src/pages/RestaurantDetails.tsx
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import api from '../services/api';
function RestaurantDetails() {
    const { id } = useParams();
    const [restaurant, setRestaurant] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    // State for Add Review Form
    const [formData, setFormData] = useState({
        name: '',
        rating: 0,
        review_text: '',
    });
    const [submitError, setSubmitError] = useState('');
    const [submitSuccess, setSubmitSuccess] = useState('');
    const [submitting, setSubmitting] = useState(false);
    // Google Places API key
    const apiKey = 'AIzaSyCLyIS3AOvylY8MUExSSFUNfruG4f6I1vQ';
    const [imageSrc, setImageSrc] = useState('');
    useEffect(() => {
        fetchRestaurantDetails();
        fetchRestaurantReviews();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const fetchRestaurantDetails = () => __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield api.get(`/restaurants/details/${id}`);
            const restaurantData = response.data;
            setRestaurant(restaurantData);
            // Construct image source if photo_ref is available
            if (restaurantData.photo_ref) {
                const imgSrc = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${restaurantData.photo_ref}&key=${apiKey}`;
                setImageSrc(imgSrc);
            }
            setLoading(false);
        }
        catch (err) {
            setError('Failed to fetch restaurant details. Please try again later.');
            setLoading(false);
        }
    });
    const fetchRestaurantReviews = () => __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield api.get(`/reviews/restaurant/${id}`);
            setReviews(response.data);
        }
        catch (err) {
            console.error('Failed to fetch reviews.');
        }
    });
    const handleInputChange = (e) => {
        setFormData(Object.assign(Object.assign({}, formData), { [e.target.name]: e.target.value }));
    };
    const handleSubmitReview = (e) => __awaiter(this, void 0, void 0, function* () {
        e.preventDefault();
        setSubmitting(true);
        setSubmitError('');
        setSubmitSuccess('');
        // Basic validation
        if (!formData.name || !formData.rating || !formData.review_text) {
            setSubmitError('Please fill in all fields.');
            setSubmitting(false);
            return;
        }
        try {
            const response = yield api.post('/reviews/', {
                restaurant_id: parseInt(id),
                name: formData.name,
                rating: parseFloat(formData.rating.toString()),
                review_text: formData.review_text,
            });
            if (response.data.STATUS === 'SUCCESS') {
                setSubmitSuccess('Your review has been submitted.');
                // Clear form
                setFormData({ name: '', rating: 0, review_text: '' });
                // Refresh reviews
                fetchRestaurantReviews();
            }
            else {
                setSubmitError('Failed to submit your review. Please try again.');
            }
        }
        catch (err) {
            setSubmitError('An error occurred while submitting your review.');
        }
        finally {
            setSubmitting(false);
        }
    });
    return (_jsxs(_Fragment, { children: [_jsx(Header, {}), _jsx("main", { className: "mt-20 px-4", children: _jsx("section", { className: "max-w-4xl mx-auto py-8", children: loading ? (_jsx("p", { className: "text-center text-gray-700", children: "Loading restaurant details..." })) : error ? (_jsx("p", { className: "text-center text-red-500", children: error })) : restaurant ? (_jsxs(_Fragment, { children: [_jsx("h1", { className: "text-4xl font-bold mb-4", children: restaurant.name }), imageSrc && (_jsx("img", { src: imageSrc, alt: restaurant.name, className: "w-full h-auto mb-6 rounded-md" })), _jsx("p", { className: "text-gray-600 mb-2", children: restaurant.address }), _jsxs("p", { className: "text-gray-600 mb-2", children: ["Phone: ", restaurant.phone] }), _jsxs("p", { className: "text-gray-600 mb-4", children: ["Price Level: ", restaurant.price_level] }), _jsxs("div", { className: "flex items-center mb-4", children: [_jsx("span", { className: "text-yellow-500 mr-2", children: "Overall Rating:" }), _jsx("span", { className: "font-bold", children: restaurant.overall_rating.toFixed(1) })] }), _jsxs("div", { className: "flex space-x-4 mb-4", children: [_jsxs("div", { className: "flex items-center", children: [_jsx("span", { className: "text-green-500 mr-1", children: "Vegan:" }), _jsx("span", { children: restaurant.vegan_rating.toFixed(1) })] }), _jsxs("div", { className: "flex items-center", children: [_jsx("span", { className: "text-blue-500 mr-1", children: "Gluten-Free:" }), _jsx("span", { children: restaurant.gluten_free_rating.toFixed(1) })] }), _jsxs("div", { className: "flex items-center", children: [_jsx("span", { className: "text-purple-500 mr-1", children: "Vegetarian:" }), _jsx("span", { children: restaurant.vegetarian_rating.toFixed(1) })] })] }), _jsxs("section", { className: "mt-8", children: [_jsx("h2", { className: "text-2xl font-semibold mb-4", children: "Reviews" }), reviews.length > 0 ? (_jsx("div", { className: "space-y-4", children: reviews.map((review) => (_jsxs("div", { className: "border p-4 rounded-md", children: [_jsxs("div", { className: "flex items-center justify-between mb-2", children: [_jsx("span", { className: "font-semibold", children: review.name }), _jsxs("div", { className: "flex items-center", children: [_jsx("span", { className: "text-yellow-500 mr-1", children: "Rating:" }), _jsx("span", { className: "font-bold", children: review.rating.toFixed(1) })] })] }), _jsx("p", { className: "text-gray-700", children: review.review_text })] }, review.review_id))) })) : (_jsx("p", { className: "text-gray-700", children: "No reviews available for this restaurant." }))] })] })) : (_jsx("p", { className: "text-center text-gray-700", children: "Restaurant not found." })) }) }), _jsx(Footer, {})] }));
}
export default RestaurantDetails;
