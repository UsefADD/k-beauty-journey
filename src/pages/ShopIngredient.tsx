
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ShopCategories from '../components/ShopCategories';
import IngredientCategories from '../components/IngredientCategories';

const ShopIngredient = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow py-12 bg-knude-50">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-center mb-8 text-knude-900 font-serif">
            SHOP BY INGREDIENT
          </h1>
          <ShopCategories />
          <div className="mt-8 mb-6 text-center">
            <p className="text-knude-700 max-w-3xl mx-auto">
              Discover products featuring your favorite ingredients known for their effective skincare benefits. 
              Each ingredient targets specific skin concerns for personalized results.
            </p>
          </div>
          <IngredientCategories />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ShopIngredient;
