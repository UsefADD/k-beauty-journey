
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const ShopCategories = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  const categories = [
    { name: 'SHOP BY NEWLY CURATED', path: '/shop/newly-curated' },
    { name: 'SHOP BY VIRAL K-BEAUTY', path: '/shop/viral' },
    { name: 'SHOP BY BEST SELLERS', path: '/shop/best-sellers' },
    { name: 'SHOP BY SETS & ROUTINES', path: '/shop/sets' },
    { name: 'SHOP BY SKIN CONCERN', path: '/shop/skin-concern' },
    { name: 'SHOP BY BRAND', path: '/shop/brand' },
    { name: 'SHOP BY PRODUCT TYPE', path: '/shop/product-type' },
    { name: 'SHOP BY INGREDIENT', path: '/shop/ingredient' },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-4 mb-12">
      {categories.map((category) => (
        <Link
          key={category.name}
          to={category.path}
          className={`text-sm md:text-base ${
            currentPath === category.path 
              ? 'text-pink-700 font-bold border-b-2 border-pink-500' 
              : 'text-pink-600 hover:text-pink-600 hover:font-medium transition-colors'
          } pb-1 mb-2`}
        >
          {category.name}
        </Link>
      ))}
    </div>
  );
};

export default ShopCategories;
