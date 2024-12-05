import React from "react";
import AnimationRevealPage from "../helpers/AnimationRevealPage.js";
import Hero from "../components/hero.js";
import Features from "../components/features.js";
import Slider from "../components/slider.js";
import Footer from "../components/footer.js";

export default () => (
  <AnimationRevealPage>
    <Hero />
    <Features />
    <Slider />
    <Footer />
  </AnimationRevealPage>
);
