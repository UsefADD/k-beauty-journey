
import React from 'react';
import ProductCard from './ProductCard';
import { Link } from 'react-router-dom';
import NewArrivals from './NewArrivals';
import { Button } from "@/components/ui/button";

const bestSellerProducts = [
  {
    id: 1,
    name: "Rice Toner Bright & Radiant",
    brand: "I'm From",
    price: 28,
    image: "/placeholder.svg"
  },
  {
    id: 2,
    name: "Vitamin C Serum Anti-Aging",
    brand: "KLAIRS",
    price: 23,
    image: "/placeholder.svg"
  },
  {
    id: 3,
    name: "Cleansing Oil PHA Makeup Remover",
    brand: "HANSKIN",
    price: 28,
    image: "/placeholder.svg"
  },
  {
    id: 4,
    name: "Day-Light Protection Sunscreen SPF50+",
    brand: "NEOGEN",
    price: 32,
    image: "/placeholder.svg"
  }
];

const BestSellers = () => {
  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <Link to="/shop/newly-curated" className="text-sm text-knude-600 hover:text-pink-600 hover:font-medium transition-colors pb-1">
            SHOP BY NEWLY CURATED
          </Link>
          <Link to="/shop/viral" className="text-sm text-knude-600 hover:text-pink-600 hover:font-medium transition-colors pb-1">
            SHOP BY VIRAL K-BEAUTY
          </Link>
          <Link to="/shop/best-sellers" className="text-sm text-knude-600 hover:text-pink-600 hover:font-medium transition-colors pb-1">
            SHOP BY BEST SELLERS
          </Link>
          <Link to="/shop/sets" className="text-sm text-knude-600 hover:text-pink-600 hover:font-medium transition-colors pb-1">
            SHOP BY SETS & ROUTINES
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {bestSellerProducts.map(product => <ProductCard key={product.id} {...product} />)}
        </div>
        
        <NewArrivals />
        
        <div className="mt-12 text-center">
          <Link to="/shop/best-sellers">
            <Button className="uppercase bg-white hover:bg-cream-100 text-cream-900 border border-cream-300">
              View All Best Sellers
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BestSellers;
