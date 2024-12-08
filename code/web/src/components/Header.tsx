// src/components/Header.tsx
import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-red-500">
          MenuMatch
        </Link>
        {/* Navigation Links */}
        <nav className="space-x-6">
          <Link to="/" className="text-gray-700 hover:text-red-500">Home</Link>
          <Link to="/restaurants" className="text-gray-700 hover:text-red-500">Restaurants</Link>
          <Link to="/about" className="text-gray-700 hover:text-red-500">About Us</Link>
          <Link to="/contact" className="text-gray-700 hover:text-red-500">Contact</Link>
        </nav>
        {/* Authentication Links */}
        <div className="space-x-4">
          <Link to="/login" className="bg-red-500 text-white px-4 py-2 rounded-md">Login</Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
