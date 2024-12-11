import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
// src/pages/Login.tsx
import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
function Login() {
    const { loginWithRedirect, isAuthenticated } = useAuth0();
    const navigate = useNavigate();
    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated, navigate]);
    return (_jsxs(_Fragment, { children: [_jsx(Header, {}), _jsx("main", { className: "flex flex-col items-center mt-20 px-4", children: _jsxs("section", { className: "w-full max-w-md bg-white p-8 rounded-md shadow-md", children: [_jsx("h1", { className: "text-2xl font-bold mb-6 text-center", children: "Login to MenuMatch" }), !isAuthenticated && (_jsx("button", { onClick: () => loginWithRedirect(), className: "w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-500 hover:bg-red-600", children: "Login with Auth0" }))] }) }), _jsx(Footer, {})] }));
}
export default Login;
