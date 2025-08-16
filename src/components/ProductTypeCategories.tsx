import React from 'react';
import { Link } from 'react-router-dom';

const productTypes = [
  {
    name: 'Skincare',
    path: '/shop/product-type/skincare',
    subtypes: [
      { name: 'Cleanser', path: '/shop/product-type/skincare/cleanser' },
      { name: 'Toner', path: '/shop/product-type/skincare/toner' },
      { name: 'Serum', path: '/shop/product-type/skincare/serum' },
      { name: 'Moisturizer', path: '/shop/product-type/skincare/moisturizer' },
      { name: 'Sunscreen', path: '/shop/product-type/skincare/sunscreen' },
      { name: 'Mask', path: '/shop/product-type/skincare/mask' },
    ]
  },
  {
    name: 'Makeup',
    path: '/shop/product-type/makeup',
    subtypes: [
      { name: 'Foundation', path: '/shop/product-type/makeup/foundation' },
      { name: 'Concealer', path: '/shop/product-type/makeup/concealer' },
      { name: 'Blush', path: '/shop/product-type/makeup/blush' },
      { name: 'Lipstick', path: '/shop/product-type/makeup/lipstick' },
      { name: 'Eyeshadow', path: '/shop/product-type/makeup/eyeshadow' },
    ]
  },
  {
    name: 'Hair Care',
    path: '/shop/product-type/haircare',
    subtypes: [
      { name: 'Shampoo', path: '/shop/product-type/haircare/shampoo' },
      { name: 'Conditioner', path: '/shop/product-type/haircare/conditioner' },
      { name: 'Hair Mask', path: '/shop/product-type/haircare/mask' },
      { name: 'Hair Oil', path: '/shop/product-type/haircare/oil' },
    ]
  }
];

const ProductTypeCategories = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
      {productTypes.map((category) => (
        <div key={category.name} className="bg-white rounded-lg shadow-sm p-6">
          <Link
            to={category.path}
            className="text-xl font-semibold text-knude-800 hover:text-knude-600 transition-colors block mb-4"
          >
            {category.name}
          </Link>
          <div className="space-y-2">
            {category.subtypes.map((subtype) => (
              <Link
                key={subtype.name}
                to={subtype.path}
                className="block text-knude-600 hover:text-knude-500 transition-colors text-sm py-1"
              >
                {subtype.name}
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductTypeCategories;