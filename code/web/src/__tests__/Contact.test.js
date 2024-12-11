import { jsx as _jsx } from "react/jsx-runtime";
import '@testing-library/jest-dom';
import Contact from '../../src/pages/Contact';
import { render } from '../test-utils'; // Adjust the path if needed
describe('Contact Page', () => {
    it('renders the Header and Footer', () => {
        const { getByText } = render(_jsx(Contact, {}));
        // Header should include "MenuMatch"
        expect(getByText(/MenuMatch/i)).toBeInTheDocument();
        // Footer should display current year
        const currentYear = new Date().getFullYear().toString();
        expect(getByText(`© ${currentYear} MenuMatch. All rights reserved.`)).toBeInTheDocument();
    });
    it('displays the main heading "Contact Us"', () => {
        const { getByRole } = render(_jsx(Contact, {}));
        expect(getByRole('heading', { level: 1, name: /contact us/i })).toBeInTheDocument();
    });
    it('displays the "Get in Touch" section and contact details', () => {
        const { getByRole, getByText } = render(_jsx(Contact, {}));
        expect(getByRole('heading', { level: 2, name: /get in touch/i })).toBeInTheDocument();
        expect(getByText(/We'd love to hear from you!/i)).toBeInTheDocument();
        // Address
        expect(getByText(/123 Main Street/i)).toBeInTheDocument();
        expect(getByText(/Boston, MA 02115/i)).toBeInTheDocument();
        // Email link
        const emailLink = getByText(/support@menumatch\.com/i);
        expect(emailLink).toHaveAttribute('href', 'mailto:support@menumatch.com');
        // Phone link
        const phoneLink = getByText(/\+1 \(234\) 567-890/i);
        expect(phoneLink).toHaveAttribute('href', 'tel:+1234567890');
    });
    it('displays social media icons with correct aria-labels', () => {
        const { getByLabelText } = render(_jsx(Contact, {}));
        const facebookLink = getByLabelText(/FB/i);
        const twitterLink = getByLabelText(/TW/i);
        const instagramLink = getByLabelText(/IG/i);
        expect(facebookLink).toBeInTheDocument();
        expect(twitterLink).toBeInTheDocument();
        expect(instagramLink).toBeInTheDocument();
    });
});
