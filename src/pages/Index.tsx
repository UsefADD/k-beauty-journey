
import React from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import ServicesSection from '../components/ServicesSection';
import BestSellers from '../components/BestSellers';
import NewArrivals from '../components/NewArrivals';

import RoutineBanner from '../components/RoutineBanner';
import BlogSection from '../components/BlogSection';
import NewsletterSignup from '../components/NewsletterSignup';
import Footer from '../components/Footer';
import ErrorBoundary from '@/components/ErrorBoundary';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <ErrorBoundary name="Navbar"><Navbar /></ErrorBoundary>
      <ErrorBoundary name="HeroSection"><HeroSection /></ErrorBoundary>
      <ErrorBoundary name="ServicesSection"><ServicesSection /></ErrorBoundary>
      <ErrorBoundary name="BestSellers"><BestSellers /></ErrorBoundary>
      <ErrorBoundary name="NewArrivals"><NewArrivals /></ErrorBoundary>
      
      <ErrorBoundary name="RoutineBanner"><RoutineBanner /></ErrorBoundary>
      <ErrorBoundary name="BlogSection"><BlogSection /></ErrorBoundary>
      <div className="container mx-auto px-4 py-12">
        <ErrorBoundary name="NewsletterSignup"><NewsletterSignup /></ErrorBoundary>
      </div>
      <ErrorBoundary name="Footer"><Footer /></ErrorBoundary>
    </div>
  );
};

export default Index;
