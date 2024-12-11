// src/pages/About.tsx
import Footer from '../components/Footer';
import Header from '../components/Header';
import Custom from '../assets/customize.png'
import Community from '../assets/community.png'
import Global from '../assets/global.png'
import CEO from "../assets/ceo.png"
import CTO from "../assets/cto.png"
import Designer from "../assets/designer.png"

function About() {
  return (
    <>
      <Header />
      <main className="flex flex-col items-center mt-20">
        {/* Introduction Section */}
        <section className="w-full bg-gray-100 py-16 px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">About MenuMatch</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Connecting you with restaurants that cater to your dietary needs.
          </p>
        </section>

        {/* Problem Statement */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-semibold mb-6">The Challenge</h2>
            <p className="text-lg leading-relaxed">
              Many individuals with specific dietary requirements struggle to find suitable dining options.
              General restaurant reviews often lack detailed information about dietary accommodations, making it difficult to make informed choices.
            </p>
          </div>
        </section>

        {/* Our Solution */}
        <section className="bg-gray-100 py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-semibold mb-6">Our Solution</h2>
            <p className="text-lg leading-relaxed mb-6">
              MenuMatch is a platform dedicated to bridging this gap by providing curated reviews and restaurant listings tailored to various dietary needs such as vegan, gluten-free, and halal.
            </p>
            <div className="flex flex-wrap justify-center space-x-6">
              {/* Feature 1 */}
              <div className="w-64 text-center mb-8">
                <img src={Custom} alt="Customizable" className="mx-auto mb-4 w-20" />
                <h3 className="text-xl font-semibold">Customizable Searches</h3>
                <p>Filter restaurants based on your dietary preferences.</p>
              </div>
              {/* Feature 2 */}
              <div className="w-64 text-center mb-8">
                <img src={Community} alt="Community" className="mx-auto mb-4 w-20" />
                <h3 className="text-xl font-semibold">Community Reviews</h3>
                <p>Read and write reviews from users with similar needs.</p>
              </div>
              {/* Feature 3 */}
              <div className="w-64 text-center mb-8">
                <img src={Global} alt="Global" className="mx-auto mb-4 w-20" />
                <h3 className="text-xl font-semibold">Global Reach</h3>
                <p>Helping users worldwide find suitable dining options.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Members */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-semibold text-center mb-12">Meet the Team</h2>
            <div className="flex flex-wrap justify-center">
              {/* Team Member 1 */}
              <div className="w-64 text-center mb-8 mx-4">
                <img
                  src={CEO}
                  alt="Team Member 1"
                  className="w-40 h-40 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-semibold">Alice Johnson</h3>
                <p className="text-gray-600">Founder & CEO</p>
              </div>
              {/* Team Member 2 */}
              <div className="w-64 text-center mb-8 mx-4">
                <img
                  src={CTO}
                  alt="Team Member 2"
                  className="w-40 h-40 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-semibold">Bob Smith</h3>
                <p className="text-gray-600">CTO</p>
              </div>
              {/* Team Member 3 */}
              <div className="w-64 text-center mb-8 mx-4">
                <img
                  src={Designer}
                  alt="Team Member 3"
                  className="w-40 h-40 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-semibold">Carol Martinez</h3>
                <p className="text-gray-600">Lead Designer</p>
              </div>
              {/* Add more team members as needed */}
            </div>
          </div>
        </section>

        {/* Timeline and Milestones */}
        <section className="bg-gray-100 py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-semibold mb-12 text-center">Our Journey</h2>
            <ol className="relative border-l border-gray-200">
              {/* Milestone 1 */}
              <li className="mb-10 ml-6">
                <span className="absolute -left-3 flex items-center justify-center w-6 h-6 bg-red-500 rounded-full ring-8 ring-white">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 0a10 10 0 11-0.001 20.001A10 10 0 0110 0zM8 14.5l6-4.5-6-4.5v9z" />
                  </svg>
                </span>
                <h3 className="flex items-center mb-1 text-lg font-semibold">Project Inception <span className="bg-blue-100 text-blue-800 text-sm font-medium ml-3 px-2.5 py-0.5 rounded">Jan 2023</span></h3>
                <p className="text-base font-normal text-gray-500">The idea of MenuMatch was born to help people with dietary restrictions.</p>
              </li>
              {/* Milestone 2 */}
              <li className="mb-10 ml-6">
                <span className="absolute -left-3 flex items-center justify-center w-6 h-6 bg-red-500 rounded-full ring-8 ring-white">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 0a10 10 0 11-0.001 20.001A10 10 0 0110 0zM8 14.5l6-4.5-6-4.5v9z" />
                  </svg>
                </span>
                <h3 className="mb-1 text-lg font-semibold">Beta Launch <span className="bg-blue-100 text-blue-800 text-sm font-medium ml-3 px-2.5 py-0.5 rounded">June 2023</span></h3>
                <p className="text-base font-normal text-gray-500">Released the beta version to a group of initial users for feedback.</p>
              </li>
              {/* Milestone 3 */}
              <li className="ml-6">
                <span className="absolute -left-3 flex items-center justify-center w-6 h-6 bg-red-500 rounded-full ring-8 ring-white">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 0a10 10 0 11-0.001 20.001A10 10 0 0110 0zM8 14.5l6-4.5-6-4.5v9z" />
                  </svg>
                </span>
                <h3 className="mb-1 text-lg font-semibold">Public Release <span className="bg-blue-100 text-blue-800 text-sm font-medium ml-3 px-2.5 py-0.5 rounded">Oct 2023</span></h3>
                <p className="text-base font-normal text-gray-500">Officially launched MenuMatch to the public with full features.</p>
              </li>
            </ol>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
          <p className="mb-8">Interested in learning more or collaborating with us?</p>
          <a href="/contact">
            <button className="bg-red-500 text-white px-6 py-3 rounded-md text-lg">Contact Us</button>
          </a>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default About;
