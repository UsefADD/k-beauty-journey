
import React from 'react';
import { Link } from 'react-router-dom';

const ShopCategories = () => {
  const categories = [
    { name: 'SHOP BY NEWLY CURATED', active: true, path: '/shop' },
    { name: 'SHOP BY VIRAL K-BEAUTY', active: false, path: '/shop/viral' },
    { name: 'SHOP BY BEST SELLERS', active: false, path: '/shop/best-sellers' },
    { name: 'SHOP BY SETS & ROUTINES', active: false, path: '/shop/sets' },
    { name: 'SHOP BY SKIN CONCERN', active: false, path: '/shop/skin-concern' },
    { name: 'SHOP BY BRAND', active: false, path: '/shop/brand' },
    { name: 'SHOP BY PRODUCT TYPE', active: false, path: '/shop/product-type' },
    { name: 'SHOP BY INGREDIENT', active: false, path: '/shop/ingredient' },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-4 mb-12">
      {categories.map((category) => (
        <Link
          key={category.name}
          to={category.path}
          className={`text-sm md:text-base ${
            category.active 
              ? 'text-knude-700 font-bold border-b-2 border-knude-500' 
              : 'text-knude-600 hover:text-knude-800 transition-colors'
          } pb-1 mb-2`}
        >
          {category.name}
        </Link>
      ))}
    </div>
  );
};

export default ShopCategories;
