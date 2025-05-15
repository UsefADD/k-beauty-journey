
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ShopCategories from '../components/ShopCategories';
import ProductsGrid from '../components/ProductsGrid';

const ShopBestSellers = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow py-12 bg-knude-50">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-center mb-8 text-knude-900 font-serif">
            SHOP BY BEST SELLERS
          </h1>
          <ShopCategories />
          <div className="mt-8">
            <ProductsGrid />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ShopBestSellers;
