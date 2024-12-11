import { jsx as _jsx } from "react/jsx-runtime";
import { render } from '../test-utils'; // Adjust this path if needed
import '@testing-library/jest-dom';
import RestaurantCard from '../../src/components/RestaurantCard';
describe('RestaurantCard Component', () => {
    const restaurant = {
        restaurant_id: 123,
        name: 'Test Restaurant',
        address: '123 Test St, Test City',
        phone: '555-1234',
        overall_rating: 4.25,
        vegan_rating: 4.1,
        gluten_free_rating: 3.7,
        vegetarian_rating: 4.9,
    };
    it('renders the restaurant name, address, and phone', () => {
        const { getByText } = render(_jsx(RestaurantCard, { restaurant: restaurant }));
        expect(getByText('Test Restaurant')).toBeInTheDocument();
        expect(getByText('123 Test St, Test City')).toBeInTheDocument();
        expect(getByText('Phone: 555-1234')).toBeInTheDocument();
    });
    it('renders ratings with correct formatting', () => {
        const { getByText } = render(_jsx(RestaurantCard, { restaurant: restaurant }));
        // Overall rating
        expect(getByText('Overall Rating:')).toBeInTheDocument();
        expect(getByText('4.3')).toBeInTheDocument(); // 4.25.toFixed(1) -> '4.3'
        // Vegan rating
        expect(getByText('Vegan:')).toBeInTheDocument();
        expect(getByText('4.1')).toBeInTheDocument();
        // Gluten-Free rating
        expect(getByText('Gluten-Free:')).toBeInTheDocument();
        expect(getByText('3.7')).toBeInTheDocument();
        // Vegetarian rating
        expect(getByText('Vegetarian:')).toBeInTheDocument();
        expect(getByText('4.9')).toBeInTheDocument();
    });
    it('renders a "View Details" button linking to the correct route', () => {
        const { getByRole } = render(_jsx(RestaurantCard, { restaurant: restaurant }));
        const button = getByRole('button', { name: /view details/i });
        expect(button).toBeInTheDocument();
        // The button is wrapped by a Link
        const link = button.closest('a');
        expect(link).toHaveAttribute('href', '/restaurant/123');
    });
});
