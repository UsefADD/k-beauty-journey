
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ShopCategories from '../components/ShopCategories';
import BrandCategories from '../components/BrandCategories';

const ShopBrand = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow py-12 bg-knude-50">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-center mb-8 text-pink-800 font-serif">
            SHOP BY BRAND
          </h1>
          <ShopCategories />
          <div className="mt-8 mb-6 text-center">
            <p className="text-pink-600 max-w-3xl mx-auto">
              Explore our carefully curated collection of premium Korean skincare brands. 
              Each brand brings its unique approach to beauty with innovative formulations and proven results.
            </p>
          </div>
          <BrandCategories />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ShopBrand;
