// src/pages/Home.tsx
import React from 'react';
import Footer from 'components/Footer';
import { Link } from 'react-router-dom';
import Header from 'components/Header';

function Home() {
  return (
    <>
      <Header />
      <main className="flex flex-col items-center">
        {/* Hero Section */}
        <section className="w-full bg-cover bg-center h-screen" style={{ backgroundImage: 'url(../assets/hero-bg.png)' }}>
          <div className="flex flex-col items-center justify-center h-full bg-black bg-opacity-50">
            <h1 className="text-white text-5xl font-bold mb-4">Find Your Perfect Meal</h1>
            <p className="text-white text-xl mb-6">Discover restaurants that cater to your dietary needs</p>
            {/* Search Bar */}
            <div className="flex">
              <input
                type="text"
                placeholder="Search for restaurants..."
                className="p-3 rounded-l-md w-80"
              />
              <button className="bg-red-500 text-white p-3 rounded-r-md">Search</button>
            </div>
            {/* Dietary Preferences */}
            <div className="flex mt-6 space-x-4">
              <button className="bg-green-500 text-white px-4 py-2 rounded">Vegan</button>
              <button className="bg-yellow-500 text-white px-4 py-2 rounded">Gluten-Free</button>
              <button className="bg-blue-500 text-white px-4 py-2 rounded">Halal</button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Use MenuMatch?</h2>
          <div className="flex flex-wrap justify-center space-x-6">
            {/* Feature 1 */}
            <div className="w-64 text-center mb-8">
              <img src="/assets/icons/filter.svg" alt="Filter" className="mx-auto mb-4" />
              <h3 className="text-xl font-semibold">Customized Filtering</h3>
              <p>Find restaurants that meet your specific dietary preferences.</p>
            </div>
            {/* Feature 2 */}
            <div className="w-64 text-center mb-8">
              <img src="/assets/icons/review.svg" alt="Review" className="mx-auto mb-4" />
              <h3 className="text-xl font-semibold">Curated Reviews</h3>
              <p>Read reviews from users with similar dietary needs.</p>
            </div>
            {/* Feature 3 */}
            <div className="w-64 text-center mb-8">
              <img src="/assets/icons/mobile.svg" alt="Mobile" className="mx-auto mb-4" />
              <h3 className="text-xl font-semibold">Accessible Anywhere</h3>
              <p>Use our platform on both web and mobile devices.</p>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="bg-gray-100 py-16 px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
          <div className="flex flex-wrap justify-center space-x-6">
            {/* Testimonial 1 */}
            <div className="w-80 bg-white p-6 rounded-md shadow-md mb-8">
              <p className="italic">"MenuMatch helped me find amazing vegan restaurants when I moved to Boston."</p>
              <h4 className="mt-4 font-semibold">- Alex, Vegan</h4>
            </div>
            {/* Testimonial 2 */}
            <div className="w-80 bg-white p-6 rounded-md shadow-md mb-8">
              <p className="italic">"As someone who eats halal, this platform is a lifesaver."</p>
              <h4 className="mt-4 font-semibold">- Fatima, Halal</h4>
            </div>
            {/* Testimonial 3 */}
            <div className="w-80 bg-white p-6 rounded-md shadow-md mb-8">
              <p className="italic">"Finding gluten-free options has never been easier!"</p>
              <h4 className="mt-4 font-semibold">- John, Gluten-Free</h4>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Join MenuMatch Today</h2>
          <p className="mb-8">Sign up to start discovering restaurants that fit your dietary needs.</p>
          <Link to="/signup">
            <button className="bg-red-500 text-white px-6 py-3 rounded-md text-lg">Get Started</button>
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Home;
