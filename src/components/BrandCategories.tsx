
import React from 'react';
import { Link } from 'react-router-dom';

const brands = [
  { name: 'KLAIRS', path: '/shop/brand/KLAIRS' },
  { name: 'COSRX', path: '/shop/brand/COSRX' },
  { name: 'ISNTREE', path: '/shop/brand/ISNTREE' },
  { name: 'BEAUTY OF JOSEON', path: '/shop/brand/BEAUTY OF JOSEON' },
  { name: 'I\'M FROM', path: '/shop/brand/I\'M FROM' },
  { name: 'PYUNKANG YUL', path: '/shop/brand/PYUNKANG YUL' },
  { name: 'NEOGEN', path: '/shop/brand/NEOGEN' },
  { name: 'ROVECTIN', path: '/shop/brand/ROVECTIN' },
];

const BrandCategories = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8 mb-16">
      {brands.map((brand) => (
        <Link
          key={brand.name}
          to={brand.path}
          className="bg-white border border-black p-6 rounded-lg hover:bg-black hover:text-white transition-all text-center flex flex-col items-center justify-center min-h-[150px] group"
        >
          <h3 className="text-lg font-medium text-black mb-2 group-hover:text-white">{brand.name}</h3>
          <p className="text-sm text-black group-hover:text-white">Shop All Products</p>
        </Link>
      ))}
    </div>
  );
};

export default BrandCategories;
