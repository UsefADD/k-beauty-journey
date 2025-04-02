
import React from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import BestSellers from '../components/BestSellers';
import Footer from '../components/Footer';
import NewArrivals from '../components/NewArrivals';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <HeroSection />
      <NewArrivals />
      <BestSellers />
      <Footer />
    </div>
  );
};

export default Index;
