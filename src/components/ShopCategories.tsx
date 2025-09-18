
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

const ShopCategories = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const { t } = useLanguage();
  
  const categories = [
    { key: 'newly-curated', name: 'SHOP BY NEWLY CURATED', path: '/shop/newly-curated' },
    { key: 'viral', name: 'SHOP BY VIRAL K-BEAUTY', path: '/shop/viral' },
    { key: 'best-sellers', name: 'SHOP BY BEST SELLERS', path: '/shop/best-sellers' },
    { key: 'skin-concern', name: 'SHOP BY SKIN CONCERN', path: '/shop/skin-concern' },
    { key: 'brand', name: 'SHOP BY BRAND', path: '/shop/brand' },
    { key: 'product-type', name: 'SHOP BY PRODUCT TYPE', path: '/shop/product-type' },
    { key: 'ingredient', name: 'SHOP BY INGREDIENT', path: '/shop/ingredient' },
    { key: 'sets', name: 'SHOP BY SETS & ROUTINES', path: '/shop/sets' },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-4 mb-12">
      {categories.map((category) => (
        <Link
          key={category.key}
          to={category.path}
          className={`text-sm md:text-base ${
            currentPath === category.path 
              ? 'text-black font-bold border-b-2 border-black' 
              : 'text-black hover:text-gray-800 zigzag-underline transition-colors'
          } pb-1 mb-2`}
        >
          {category.name}
        </Link>
      ))}
    </div>
  );
};

export default ShopCategories;
