import { jsx as _jsx } from "react/jsx-runtime";
import '@testing-library/jest-dom';
import About from '../../src/pages/About';
import { render } from '../test-utils'; // adjust this path as needed
describe('About Page', () => {
    it('renders the Header and Footer components', () => {
        const { getByText } = render(_jsx(About, {}));
        // Header contains "MenuMatch" link
        expect(getByText(/MenuMatch/i)).toBeInTheDocument();
        // Footer might contain some text, for example, the current year
        const currentYear = new Date().getFullYear().toString();
        expect(getByText(`© ${currentYear} MenuMatch. All rights reserved.`)).toBeInTheDocument();
    });
    it('displays the introduction section with the correct heading and text', () => {
        const { getByRole, getByText } = render(_jsx(About, {}));
        expect(getByRole('heading', { level: 1, name: /about menumatch/i })).toBeInTheDocument();
        expect(getByText(/Connecting you with restaurants that cater to your dietary needs./i)).toBeInTheDocument();
    });
    it('displays the challenge section', () => {
        const { getByRole, getByText } = render(_jsx(About, {}));
        expect(getByRole('heading', { level: 2, name: /the challenge/i })).toBeInTheDocument();
        expect(getByText(/Many individuals with specific dietary requirements struggle to find suitable dining options./i)).toBeInTheDocument();
    });
    it('displays the solution section with features', () => {
        const { getByRole, getByText, getByAltText } = render(_jsx(About, {}));
        expect(getByRole('heading', { level: 2, name: /our solution/i })).toBeInTheDocument();
        expect(getByText(/MenuMatch is a platform dedicated to bridging this gap/i)).toBeInTheDocument();
        // Check the three features
        expect(getByAltText('Customizable')).toBeInTheDocument();
        expect(getByText(/Customizable Searches/i)).toBeInTheDocument();
        expect(getByText(/Filter restaurants based on your dietary preferences./i)).toBeInTheDocument();
        expect(getByAltText('Community')).toBeInTheDocument();
        expect(getByText(/Community Reviews/i)).toBeInTheDocument();
        expect(getByText(/Read and write reviews from users with similar needs./i)).toBeInTheDocument();
        expect(getByAltText('Global')).toBeInTheDocument();
        expect(getByText(/Global Reach/i)).toBeInTheDocument();
        expect(getByText(/Helping users worldwide find suitable dining options./i)).toBeInTheDocument();
    });
    it('displays the team members section', () => {
        const { getByRole, getByText, getByAltText } = render(_jsx(About, {}));
        expect(getByRole('heading', { level: 2, name: /meet the team/i })).toBeInTheDocument();
        // Check for team members
        expect(getByAltText('Team Member 1')).toBeInTheDocument();
        expect(getByText(/Alice Johnson/i)).toBeInTheDocument();
        expect(getByText(/Founder & CEO/i)).toBeInTheDocument();
        expect(getByAltText('Team Member 2')).toBeInTheDocument();
        expect(getByText(/Bob Smith/i)).toBeInTheDocument();
        expect(getByText(/CTO/i)).toBeInTheDocument();
        expect(getByAltText('Team Member 3')).toBeInTheDocument();
        expect(getByText(/Carol Martinez/i)).toBeInTheDocument();
        expect(getByText(/Lead Designer/i)).toBeInTheDocument();
    });
    it('displays the timeline and milestones', () => {
        const { getByRole, getByText } = render(_jsx(About, {}));
        expect(getByRole('heading', { level: 2, name: /our journey/i })).toBeInTheDocument();
        expect(getByText(/Project Inception/i)).toBeInTheDocument();
        expect(getByText(/Beta Launch/i)).toBeInTheDocument();
        expect(getByText(/Public Release/i)).toBeInTheDocument();
    });
    it('includes a "Get in Touch" call to action with a Contact Us button', () => {
        const { getByRole, getByText } = render(_jsx(About, {}));
        expect(getByRole('heading', { level: 2, name: /get in touch/i })).toBeInTheDocument();
        expect(getByText(/Interested in learning more or collaborating with us?/i)).toBeInTheDocument();
        const contactButton = getByRole('button', { name: /contact us/i });
        expect(contactButton).toBeInTheDocument();
        const link = contactButton.closest('a');
        expect(link).toHaveAttribute('href', '/contact');
    });
});
