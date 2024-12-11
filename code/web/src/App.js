import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Restaurants from './pages/Restaurants';
import RestaurantDetails from './pages/RestaurantDetails';
// import Signup from './pages/Signup';
import Login from './pages/Login';
function App() {
    return (_jsx(Router, { children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(Home, {}) }), _jsx(Route, { path: "/restaurants", element: _jsx(Restaurants, {}) }), _jsx(Route, { path: "/restaurant/:id", element: _jsx(RestaurantDetails, {}) }), _jsx(Route, { path: "/about", element: _jsx(About, {}) }), _jsx(Route, { path: "/contact", element: _jsx(Contact, {}) }), _jsx(Route, { path: "/login", element: _jsx(Login, {}) })] }) }));
}
export default App;
