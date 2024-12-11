import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/components/Footer.tsx
import { Link } from 'react-router-dom';
function Footer() {
    return (_jsxs("footer", { className: "bg-gray-800 text-white mt-16", children: [_jsxs("div", { className: "container mx-auto py-8 flex flex-col md:flex-row justify-between items-center", children: [_jsx(Link, { to: "/", className: "text-2xl font-bold mb-4 md:mb-0", children: "MenuMatch" }), _jsxs("div", { className: "space-x-6", children: [_jsx(Link, { to: "/privacy", className: "hover:text-red-500", children: "Privacy Policy" }), _jsx(Link, { to: "/terms", className: "hover:text-red-500", children: "Terms of Service" })] }), _jsxs("div", { className: "space-x-4 mt-4 md:mt-0", children: [_jsx("a", { href: "#", "aria-label": "Facebook", className: "hover:text-red-500", children: "FB" }), _jsx("a", { href: "#", "aria-label": "Twitter", className: "hover:text-red-500", children: "TW" }), _jsx("a", { href: "#", "aria-label": "Instagram", className: "hover:text-red-500", children: "IG" })] })] }), _jsxs("div", { className: "text-center py-4 bg-gray-900", children: ["\u00A9 ", new Date().getFullYear(), " MenuMatch. All rights reserved."] })] }));
}
export default Footer;
