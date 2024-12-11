import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:5000/api"; // Replace with your actual API base URL

// Restaurants API
const RestaurantsApi = {
  getRestaurants: async (limit = 100) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/restaurants/get-restaurants`, {
        params: { limit },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching restaurants:", error);
      throw error;
    }
  },

  getTopRestaurants: async (limit = 10) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/restaurants/top-restaurants`, {
        params: { limit },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching top restaurants:", error);
      throw error;
    }
  },

  getRestaurantDetails: async (restaurantId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/restaurants/details/${restaurantId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching details for restaurant ${restaurantId}:`, error);
      throw error;
    }
  },
};

// Reviews API
const ReviewsApi = {
  getAllReviews: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/reviews/`);
      return response.data;
    } catch (error) {
      console.error("Error fetching reviews:", error);
      throw error;
    }
  },

  getReviewsForRestaurant: async (restaurantId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/reviews/restaurant/${restaurantId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching reviews for restaurant ${restaurantId}:`, error);
      throw error;
    }
  },

  getReviewDetails: async (reviewId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/reviews/details/${reviewId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching review details for review ${reviewId}:`, error);
      throw error;
    }
  },
};

export { RestaurantsApi, ReviewsApi };
