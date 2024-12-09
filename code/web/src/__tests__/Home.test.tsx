import React from 'react';
import { render, screen, fireEvent, waitFor } from '../test-utils'; // Adjust import path as needed
import '@testing-library/jest-dom';
import Home from '../../src/pages/Home';
import api from '../../src/services/api';

// Mock the API response
const mockRestaurants = [
  {
    restaurant_id: 1,
    name: 'Vegan Delights',
    address: '123 Plant St',
    phone: '123-4567',
    overall_rating: 4.5,
    vegan_rating: 4.8,
    gluten_free_rating: 4.2,
    vegetarian_rating: 4.5,
  },
  {
    restaurant_id: 2,
    name: 'Gluten-Free Haven',
    address: '456 Wheat Ln',
    phone: '987-6543',
    overall_rating: 4.0,
    vegan_rating: 3.5,
    gluten_free_rating: 4.9,
    vegetarian_rating: 4.0,
  },
];

// Mocking the API get request
jest.mock('../../src/services/api');
(api.get as jest.Mock).mockResolvedValue({ data: mockRestaurants });

// Mocking useNavigate from react-router-dom
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => {
  const original = jest.requireActual('react-router-dom');
  return {
    ...original,
    useNavigate: () => mockNavigate,
  };
});

describe('Home Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders Header and Footer', async () => {
    render(<Home />);
    // Check header
    expect(screen.getByText(/MenuMatch/i)).toBeInTheDocument();
    // Wait for API call to complete to ensure the component has fully rendered
    await waitFor(() => expect(api.get).toHaveBeenCalledTimes(1));
    // Check footer
    const currentYear = new Date().getFullYear().toString();
    expect(screen.getByText(`© ${currentYear} MenuMatch. All rights reserved.`)).toBeInTheDocument();
  });

  it('fetches restaurants and shows hero section', async () => {
    render(<Home />);
    await waitFor(() => expect(api.get).toHaveBeenCalledWith('/restaurants/get-restaurants'));
    // Hero section heading
    expect(screen.getByRole('heading', { level: 1, name: /Find Your Perfect Meal/i })).toBeInTheDocument();
    // Dietary preference buttons
    expect(screen.getByRole('button', { name: /Vegan/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Gluten-Free/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Vegetarian/i })).toBeInTheDocument();
  });

  it('shows suggestions when typing a search query', async () => {
    render(<Home />);
    // Wait for data to be loaded
    await waitFor(() => expect(api.get).toHaveBeenCalledTimes(1));

    const searchInput = screen.getByPlaceholderText(/Search for restaurants/i) as HTMLInputElement;
    fireEvent.change(searchInput, { target: { value: 'vegan' } });

    // Suggestions should appear
    await waitFor(() => {
      expect(screen.getByText('Vegan Delights')).toBeInTheDocument();
    });
  });

  it('navigates to restaurant page when a suggestion is clicked', async () => {
    render(<Home />);
    await waitFor(() => expect(api.get).toHaveBeenCalledTimes(1));

    const searchInput = screen.getByPlaceholderText(/Search for restaurants/i) as HTMLInputElement;
    fireEvent.change(searchInput, { target: { value: 'gluten' } });

    await waitFor(() => {
      expect(screen.getByText('Gluten-Free Haven')).toBeInTheDocument();
    });

    // Click the suggestion
    fireEvent.click(screen.getByText('Gluten-Free Haven'));
    expect(mockNavigate).toHaveBeenCalledWith('/restaurant/2');
  });

  it('displays "No restaurants found." when search yields no suggestions', async () => {
    render(<Home />);
    await waitFor(() => expect(api.get).toHaveBeenCalledTimes(1));

    const searchInput = screen.getByPlaceholderText(/Search for restaurants/i) as HTMLInputElement;
    fireEvent.change(searchInput, { target: { value: 'NonExistentRestaurant' } });

    await waitFor(() => {
      // No suggestions should appear
      expect(screen.queryByRole('list')).not.toBeInTheDocument();
      // "No restaurants found." should show up after no suggestions
      expect(screen.getByText('No restaurants found.')).toBeInTheDocument();
    });
  });

  it('renders features, testimonials, and CTA sections', async () => {
    render(<Home />);
    // Wait for data load
    await waitFor(() => expect(api.get).toHaveBeenCalledTimes(1));

    // Features section
    expect(screen.getByText(/Why Use MenuMatch\?/i)).toBeInTheDocument();
    expect(screen.getByText(/Customized Filtering/i)).toBeInTheDocument();
    expect(screen.getByText(/Curated Reviews/i)).toBeInTheDocument();
    expect(screen.getByText(/Accessible Anywhere/i)).toBeInTheDocument();

    // Testimonials
    expect(screen.getByText(/What Our Users Say/i)).toBeInTheDocument();
    expect(screen.getByText(/"MenuMatch helped me find amazing vegan restaurants/i)).toBeInTheDocument();

    // CTA
    expect(screen.getByText(/Join MenuMatch Today/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Get Started/i })).toBeInTheDocument();
  });
});
