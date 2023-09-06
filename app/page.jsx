import React from "react";
import "@./styles/globals.css";
import HeroSection from "@components/HeroSection";
import CreativeSection from "@components/CreativeSection";
import HowSection from "@components/HowSection";
import PricingSection from "@components/PricingSection";
import ReviewSection from "@components/ReviewSection";
import FindUs from "../components/FindUs";
import Footer from "@components/Footer";

const Home = () => {
  return (
    <>
      <HeroSection />
      <CreativeSection />
      <HowSection />
      <PricingSection />
      <ReviewSection />
      <FindUs />
      <Footer />
    </>
  );
};

export default Home;
