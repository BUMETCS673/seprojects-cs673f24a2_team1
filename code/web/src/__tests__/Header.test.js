import { jsx as _jsx } from "react/jsx-runtime";
import { render } from '../test-utils'; // Adjust this path if needed
import '@testing-library/jest-dom';
import Header from '../../src/components/Header';
describe('Header component', () => {
    it('renders the logo with correct text and link', () => {
        const { getByText } = render(_jsx(Header, {}));
        const logoElement = getByText(/MenuMatch/i);
        expect(logoElement).toBeInTheDocument();
        expect(logoElement.closest('a')).toHaveAttribute('href', '/');
    });
    it('renders navigation links with correct texts and hrefs', () => {
        const { getByText } = render(_jsx(Header, {}));
        const homeLink = getByText(/home/i);
        const restaurantsLink = getByText(/restaurants/i);
        const aboutLink = getByText(/about us/i);
        const contactLink = getByText(/contact/i);
        expect(homeLink.closest('a')).toHaveAttribute('href', '/');
        expect(restaurantsLink.closest('a')).toHaveAttribute('href', '/restaurants');
        expect(aboutLink.closest('a')).toHaveAttribute('href', '/about');
        expect(contactLink.closest('a')).toHaveAttribute('href', '/contact');
    });
    it('renders a login link with correct href', () => {
        const { getByText } = render(_jsx(Header, {}));
        const loginLink = getByText(/login/i);
        expect(loginLink.closest('a')).toHaveAttribute('href', '/login');
    });
});
