
import React from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import BestSellers from '../components/BestSellers';
import FeaturedProducts from '../components/FeaturedProducts';
import Footer from '../components/Footer';
import RoutineBanner from '../components/RoutineBanner';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <HeroSection />
      <BestSellers />
      <FeaturedProducts />
      <RoutineBanner />
      <Footer />
    </div>
  );
};

export default Index;
