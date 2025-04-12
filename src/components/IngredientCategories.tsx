
import React from 'react';
import { Link } from 'react-router-dom';

const ingredients = [
  { name: 'Hyaluronic Acid', path: '/shop/ingredient/hyaluronic-acid' },
  { name: 'Niacinamide', path: '/shop/ingredient/niacinamide' },
  { name: 'Vitamin C', path: '/shop/ingredient/vitamin-c' },
  { name: 'Centella Asiatica', path: '/shop/ingredient/centella-asiatica' },
  { name: 'Rice Extract', path: '/shop/ingredient/rice-extract' },
  { name: 'Snail Mucin', path: '/shop/ingredient/snail-mucin' },
  { name: 'Green Tea', path: '/shop/ingredient/green-tea' },
  { name: 'Propolis', path: '/shop/ingredient/propolis' },
];

const IngredientCategories = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8 mb-16">
      {ingredients.map((ingredient) => (
        <Link
          key={ingredient.name}
          to={ingredient.path}
          className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow text-center flex flex-col items-center justify-center min-h-[150px]"
        >
          <h3 className="text-lg font-medium text-pink-800 mb-2">{ingredient.name}</h3>
          <p className="text-sm text-cream-600">Shop Products</p>
        </Link>
      ))}
    </div>
  );
};

export default IngredientCategories;
