import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from 'react-router-dom';
function Header() {
    return (_jsx("header", { className: "bg-white shadow-md fixed top-0 left-0 right-0 z-50", children: _jsxs("div", { className: "container mx-auto flex items-center justify-between p-4", children: [_jsx(Link, { to: "/", className: "text-2xl font-bold text-red-500", children: "MenuMatch" }), _jsxs("nav", { className: "space-x-6", children: [_jsx(Link, { to: "/", className: "text-gray-700 hover:text-red-500", children: "Home" }), _jsx(Link, { to: "/restaurants", className: "text-gray-700 hover:text-red-500", children: "Restaurants" }), _jsx(Link, { to: "/about", className: "text-gray-700 hover:text-red-500", children: "About Us" }), _jsx(Link, { to: "/contact", className: "text-gray-700 hover:text-red-500", children: "Contact" })] }), _jsx("div", { className: "space-x-4", children: _jsx(Link, { to: "/login", className: "bg-red-500 text-white px-4 py-2 rounded-md", children: "Login" }) })] }) }));
}
export default Header;
