// src/pages/RestaurantDetails.tsx

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import api from '../services/api';

interface Restaurant {
  restaurant_id: number;
  name: string;
  address: string;
  phone: string;
  price_level: string;
  overall_rating: number;
  vegan_rating: number;
  gluten_free_rating: number;
  vegetarian_rating: number;
  photo_ref?: string;
  // Add other fields if necessary
}

interface Review {
  review_id: number;
  restaurant_id: number;
  name: string;
  rating: number;
  review_text: string;
  // Add other fields as necessary
}

function RestaurantDetails() {
  const { id } = useParams<{ id: string }>();
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  // State for Add Review Form
  const [formData, setFormData] = useState({
    name: '',
    rating: 0,
    review_text: '',
  });
  const [submitError, setSubmitError] = useState<string>('');
  const [submitSuccess, setSubmitSuccess] = useState<string>('');
  const [submitting, setSubmitting] = useState<boolean>(false);

  // Google Places API key
  const apiKey = 'AIzaSyCLyIS3AOvylY8MUExSSFUNfruG4f6I1vQ';
  const [imageSrc, setImageSrc] = useState<string>('');

  useEffect(() => {
    fetchRestaurantDetails();
    fetchRestaurantReviews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchRestaurantDetails = async () => {
    try {
      const response = await api.get(`/restaurants/details/${id}`);
      const restaurantData: Restaurant = response.data;
      setRestaurant(restaurantData);

      // Construct image source if photo_ref is available
      if (restaurantData.photo_ref) {
        const imgSrc = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${restaurantData.photo_ref}&key=${apiKey}`;
        setImageSrc(imgSrc);
      }

      setLoading(false);
    } catch (err) {
      setError('Failed to fetch restaurant details. Please try again later.');
      setLoading(false);
    }
  };

  const fetchRestaurantReviews = async () => {
    try {
      const response = await api.get(`/reviews/restaurant/${id}`);
      setReviews(response.data);
    } catch (err) {
      console.error('Failed to fetch reviews.');
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmitReview = async (e: React.FormEvent<HTMLFormElement>) => {
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
      const response = await api.post('/reviews/', {
        restaurant_id: parseInt(id as any),
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
      } else {
        setSubmitError('Failed to submit your review. Please try again.');
      }
    } catch (err) {
      setSubmitError('An error occurred while submitting your review.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Header />
      <main className="mt-20 px-4">
        <section className="max-w-4xl mx-auto py-8">
          {loading ? (
            <p className="text-center text-gray-700">Loading restaurant details...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : restaurant ? (
            <>
              <h1 className="text-4xl font-bold mb-4">{restaurant.name}</h1>
              {imageSrc && (
                <img
                  src={imageSrc}
                  alt={restaurant.name}
                  className="w-full h-auto mb-6 rounded-md"
                />
              )}
              <p className="text-gray-600 mb-2">{restaurant.address}</p>
              <p className="text-gray-600 mb-2">Phone: {restaurant.phone}</p>
              <p className="text-gray-600 mb-4">Price Level: {restaurant.price_level}</p>
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

              {/* Reviews Section */}
              <section className="mt-8">
                <h2 className="text-2xl font-semibold mb-4">Reviews</h2>
                {reviews.length > 0 ? (
                  <div className="space-y-4">
                    {reviews.map((review) => (
                      <div key={review.review_id} className="border p-4 rounded-md">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold">{review.name}</span>
                          <div className="flex items-center">
                            <span className="text-yellow-500 mr-1">Rating:</span>
                            <span className="font-bold">{review.rating.toFixed(1)}</span>
                          </div>
                        </div>
                        <p className="text-gray-700">{review.review_text}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-700">No reviews available for this restaurant.</p>
                )}
              </section>
            </>
          ) : (
            <p className="text-center text-gray-700">Restaurant not found.</p>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}

export default RestaurantDetails;
