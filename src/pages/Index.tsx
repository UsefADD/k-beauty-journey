
import React from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import BestSellers from '../components/BestSellers';
import FeaturedProducts from '../components/FeaturedProducts';
import RoutineBanner from '../components/RoutineBanner';
import BlogSection from '../components/BlogSection';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <HeroSection />
      <BestSellers />
      <FeaturedProducts />
      <RoutineBanner />
      <BlogSection />
      <Footer />
    </div>
  );
};

export default Index;
