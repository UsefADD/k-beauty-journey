
import React from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import BestSellers from '../components/BestSellers';
import NewArrivals from '../components/NewArrivals';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NewArrivals />
      <Navbar />
      <HeroSection />
      <BestSellers />
      <Footer />
    </div>
  );
};

export default Index;
