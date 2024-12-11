import React from 'react';
import { render, screen, fireEvent, waitFor } from '../test-utils'; // Adjust path if needed
import '@testing-library/jest-dom';
import Login from '../../src/pages/Login';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';

// Mock useAuth0 hook
jest.mock('@auth0/auth0-react');

// Mock useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => {
  const original = jest.requireActual('react-router-dom') as {};
  return {
    ...original,
    useNavigate: () => mockNavigate,
  };
});

describe('Login Page', () => {
  const loginWithRedirectMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useAuth0 as jest.Mock).mockReturnValue({
      loginWithRedirect: loginWithRedirectMock,
      isAuthenticated: false,
    });
  });

  it('renders Header and Footer', () => {
    render(<Login />);
    expect(screen.getByText(/MenuMatch/i)).toBeInTheDocument(); // From Header
    const currentYear = new Date().getFullYear().toString();
    expect(screen.getByText(`© ${currentYear} MenuMatch. All rights reserved.`)).toBeInTheDocument(); // From Footer
  });

  it('shows login button if not authenticated', () => {
    render(<Login />);
    const loginButton = screen.getByRole('button', { name: /Login with Auth0/i });
    expect(loginButton).toBeInTheDocument();
  });

  it('calls loginWithRedirect when login button is clicked', () => {
    render(<Login />);
    const loginButton = screen.getByRole('button', { name: /Login with Auth0/i });
    fireEvent.click(loginButton);
    expect(loginWithRedirectMock).toHaveBeenCalledTimes(1);
  });

  it('redirects to home if user is authenticated', async () => {
    (useAuth0 as jest.Mock).mockReturnValue({
      loginWithRedirect: loginWithRedirectMock,
      isAuthenticated: true,
    });

    render(<Login />);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/');
    });
  });
});
