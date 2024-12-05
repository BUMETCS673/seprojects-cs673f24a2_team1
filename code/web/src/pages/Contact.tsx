// src/pages/Contact.tsx
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Contact() {
  return (
    <>
      <Header />
      <main className="flex flex-col items-center mt-20 px-4">
        <section className="max-w-4xl w-full py-16">
          <h1 className="text-4xl font-bold mb-8 text-center">Contact Us</h1>
          <div className="flex flex-wrap md:flex-nowrap md:space-x-8">
            {/* Contact Information */}
            <div className="w-full">
              <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
              <p className="mb-4 text-gray-700">
                We'd love to hear from you! Whether you have a question about features, pricing, or anything else, our team is ready to answer all your questions.
              </p>
              <ul className="space-y-6 text-gray-700">
                <li>
                  <strong className="block text-lg">Address</strong>
                  <p>123 Main Street<br />Boston, MA 02115</p>
                </li>
                <li>
                  <strong className="block text-lg">Email</strong>
                  <a href="mailto:support@menumatch.com" className="text-red-500 hover:underline">support@menumatch.com</a>
                </li>
                <li>
                  <strong className="block text-lg">Phone</strong>
                  <a href="tel:+1234567890" className="text-red-500 hover:underline">+1 (234) 567-890</a>
                </li>
              </ul>
              {/* Social Media Links */}
              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
                <div className="flex space-x-4">
                  <a href="#" aria-label="Facebook" className="text-gray-700 hover:text-red-500">
                    <FaFacebookF className="w-6 h-6" />
                  </a>
                  <a href="#" aria-label="Twitter" className="text-gray-700 hover:text-red-500">
                    <FaTwitter className="w-6 h-6" />
                  </a>
                  <a href="#" aria-label="Instagram" className="text-gray-700 hover:text-red-500">
                    <FaInstagram className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section (Optional) */}
        {/* Uncomment the following section if you want to include a map */}
        {/* <section className="w-full">
          <iframe
            src="https://www.google.com/maps/embed?pb=..." // Replace with your Google Maps embed link
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            title="Company Location"
          ></iframe>
        </section> */}
      </main>
      <Footer />
    </>
  );
}

export default Contact;
