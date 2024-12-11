var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx } from "react/jsx-runtime";
import { render, screen, fireEvent, waitFor } from '../test-utils'; // Adjust path if needed
import '@testing-library/jest-dom';
import Login from '../../src/pages/Login';
import { useAuth0 } from '@auth0/auth0-react';
// Mock useAuth0 hook
jest.mock('@auth0/auth0-react');
// Mock useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => {
    const original = jest.requireActual('react-router-dom');
    return Object.assign(Object.assign({}, original), { useNavigate: () => mockNavigate });
});
describe('Login Page', () => {
    const loginWithRedirectMock = jest.fn();
    beforeEach(() => {
        jest.clearAllMocks();
        useAuth0.mockReturnValue({
            loginWithRedirect: loginWithRedirectMock,
            isAuthenticated: false,
        });
    });
    it('renders Header and Footer', () => {
        render(_jsx(Login, {}));
        expect(screen.getByText(/MenuMatch/i)).toBeInTheDocument(); // From Header
        const currentYear = new Date().getFullYear().toString();
        expect(screen.getByText(`© ${currentYear} MenuMatch. All rights reserved.`)).toBeInTheDocument(); // From Footer
    });
    it('shows login button if not authenticated', () => {
        render(_jsx(Login, {}));
        const loginButton = screen.getByRole('button', { name: /Login with Auth0/i });
        expect(loginButton).toBeInTheDocument();
    });
    it('calls loginWithRedirect when login button is clicked', () => {
        render(_jsx(Login, {}));
        const loginButton = screen.getByRole('button', { name: /Login with Auth0/i });
        fireEvent.click(loginButton);
        expect(loginWithRedirectMock).toHaveBeenCalledTimes(1);
    });
    it('redirects to home if user is authenticated', () => __awaiter(void 0, void 0, void 0, function* () {
        useAuth0.mockReturnValue({
            loginWithRedirect: loginWithRedirectMock,
            isAuthenticated: true,
        });
        render(_jsx(Login, {}));
        yield waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith('/');
        });
    }));
});
