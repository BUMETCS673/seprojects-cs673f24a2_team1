import React from "react";
import GlobalStyles from './styles/GlobalStyles';
import { css } from "styled-components/macro"; // eslint-disable-line

import LandingPage from "./pages/LandingPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import AboutUs from "./pages/AboutUs";
import Map from "./pages/Map";

const App: React.FC = () => {
  return (
    <>
      <GlobalStyles />
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/map" element={<Map />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
