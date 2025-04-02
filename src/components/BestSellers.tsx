import React from 'react';
import ProductCard from './ProductCard';
const bestSellerProducts = [{
  id: 1,
  name: "Rice Toner Bright & Radiant",
  brand: "I'm From",
  price: 28,
  image: "/placeholder.svg"
}, {
  id: 2,
  name: "Vitamin C Serum Anti-Aging",
  brand: "KLAIRS",
  price: 23,
  image: "/placeholder.svg"
}, {
  id: 3,
  name: "Cleansing Oil PHA Makeup Remover",
  brand: "HANSKIN",
  price: 28,
  image: "/placeholder.svg"
}, {
  id: 4,
  name: "Day-Light Protection Sunscreen SPF50+",
  brand: "NEOGEN",
  price: 32,
  image: "/placeholder.svg"
}];
const BestSellers = () => {
  return <div className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="section-title text-center text-sm">SHOP BY NEWLY CURATED</h2>
        <p className="section-subtitle text-center">
          Discover our most-loved K-Beauty products, trusted by skincare enthusiasts worldwide for their remarkable results.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {bestSellerProducts.map(product => <ProductCard key={product.id} {...product} />)}
        </div>
        
        <div className="mt-12 text-center">
          <button className="k-button-primary">VIEW ALL BEST SELLERS</button>
        </div>
      </div>
    </div>;
};
export default BestSellers;