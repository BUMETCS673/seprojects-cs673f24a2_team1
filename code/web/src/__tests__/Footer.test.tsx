import React from 'react';
import { render } from '../test-utils'; // Adjust the path if needed
import '@testing-library/jest-dom';
import Footer from '../../src/components/Footer';

describe('Footer component', () => {
  it('renders the logo with correct text', () => {
    const { getByText } = render(<Footer />);
    const logoElement = getByText(/MenuMatch/i);
    expect(logoElement).toBeInTheDocument();
    expect(logoElement).toHaveAttribute('href', '/');
  });

  it('renders Privacy Policy and Terms of Service links', () => {
    const { getByText } = render(<Footer />);
    const privacyLink = getByText(/privacy policy/i) as HTMLAnchorElement;
    const termsLink = getByText(/terms of service/i) as HTMLAnchorElement;

    expect(privacyLink).toBeInTheDocument();
    expect(privacyLink).toHaveAttribute('href', '/privacy');
    expect(termsLink).toBeInTheDocument();
    expect(termsLink).toHaveAttribute('href', '/terms');
  });

  it('renders social media icons', () => {
    const { getByLabelText } = render(<Footer />);
    const facebookLink = getByLabelText(/facebook/i);
    const twitterLink = getByLabelText(/twitter/i);
    const instagramLink = getByLabelText(/instagram/i);

    expect(facebookLink).toBeInTheDocument();
    expect(twitterLink).toBeInTheDocument();
    expect(instagramLink).toBeInTheDocument();
  });

  it('verifies the correct year is displayed', () => {
    const currentYear = new Date().getFullYear().toString();
    const { getByText } = render(<Footer />);
    const yearText = getByText(`© ${currentYear} MenuMatch. All rights reserved.`);

    expect(yearText).toBeInTheDocument();
  });
});
