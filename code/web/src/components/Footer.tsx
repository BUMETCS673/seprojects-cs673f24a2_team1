// src/components/Footer.tsx
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-gray-800 text-white mt-16">
      <div className="container mx-auto py-8 flex flex-col md:flex-row justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold mb-4 md:mb-0">
          MenuMatch
        </Link>
        {/* Footer Links */}
        <div className="space-x-6">
          <Link to="/privacy" className="hover:text-red-500">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-red-500">Terms of Service</Link>
        </div>
        {/* Social Media Icons */}
        <div className="space-x-4 mt-4 md:mt-0">
          <a href="#" aria-label="Facebook" className="hover:text-red-500">
            {/* Replace with actual icons */}
            FB
          </a>
          <a href="#" aria-label="Twitter" className="hover:text-red-500">
            TW
          </a>
          <a href="#" aria-label="Instagram" className="hover:text-red-500">
            IG
          </a>
        </div>
      </div>
      <div className="text-center py-4 bg-gray-900">
        © {new Date().getFullYear()} MenuMatch. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
