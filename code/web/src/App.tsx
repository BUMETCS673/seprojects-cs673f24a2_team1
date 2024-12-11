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
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/restaurants" element={<Restaurants />} />
                <Route path="/restaurant/:id" element={<RestaurantDetails />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                {/* <Route path="/signup" element={<Signup />} /> */}
                <Route path="/login" element={<Login />} />
                {/* Add more routes as needed */}
            </Routes>
        </Router>
    );
}

export default App;
