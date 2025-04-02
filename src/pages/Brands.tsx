
import React from 'react';
import Navbar from '@/components/Navbar';
import AlphabetNavigation from '@/components/AlphabetNavigation';
import BrandSidebar from '@/components/BrandSidebar';
import BrandsList from '@/components/BrandsList';
import FeaturedProducts from '@/components/FeaturedProducts';
import Footer from '@/components/Footer';

const Brands = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-serif font-medium text-knude-900 mb-6 text-center">Our Brands</h1>
          
          <AlphabetNavigation />
          
          <div className="flex flex-col md:flex-row">
            <BrandSidebar />
            <BrandsList />
          </div>
          
          <FeaturedProducts />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Brands;
