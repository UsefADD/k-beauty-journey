import React from 'react';
import { Link } from 'react-router-dom';

const productTypes = [
  {
    name: 'Lotions tonifiantes',
    path: '/shop/product-type/lotions-tonifiantes',
    subtypes: []
  },
  {
    name: 'Soin des yeux',
    path: '/shop/product-type/soin-yeux',
    subtypes: []
  },
  {
    name: 'Traitements',
    path: '/shop/product-type/traitements',
    subtypes: [
      { name: 'Serum', path: '/shop/product-type/traitements/serum' },
      { name: 'Ampoule', path: '/shop/product-type/traitements/ampoule' },
      { name: 'Essence', path: '/shop/product-type/traitements/essence' },
    ]
  },
  {
    name: 'Double nettoyage',
    path: '/shop/product-type/double-nettoyage',
    subtypes: [
      { name: 'Cleanser', path: '/shop/product-type/double-nettoyage/cleanser' },
      { name: 'Oil Cleanser', path: '/shop/product-type/double-nettoyage/oil-cleanser' },
    ]
  },
  {
    name: 'Hydratant',
    path: '/shop/product-type/hydratant',
    subtypes: [
      { name: 'Cream', path: '/shop/product-type/hydratant/cream' },
      { name: 'Lotion', path: '/shop/product-type/hydratant/lotion' },
      { name: 'Gel', path: '/shop/product-type/hydratant/gel' },
    ]
  },
  {
    name: 'Protection solaire',
    path: '/shop/product-type/protection-solaire',
    subtypes: [
      { name: 'Sunscreen', path: '/shop/product-type/protection-solaire/sunscreen' },
      { name: 'SPF Cream', path: '/shop/product-type/protection-solaire/spf-cream' },
    ]
  },
  {
    name: 'Cheveux et corps',
    path: '/shop/product-type/cheveux-corps',
    subtypes: [
      { name: 'Serum', path: '/shop/product-type/cheveux-corps/serum' },
    ]
  },
  {
    name: 'Maquillage',
    path: '/shop/product-type/maquillage',
    subtypes: [
      { name: 'Lash Curler', path: '/shop/product-type/maquillage/lash-curler' },
      { name: 'Outils', path: '/shop/product-type/maquillage/outils' },
    ]
  },
  {
    name: 'Maquillage et outils',
    path: '/shop/product-type/maquillage-outils',
    subtypes: [
      { name: 'Lash Curler', path: '/shop/product-type/maquillage-outils/lash-curler' },
      { name: 'Outils', path: '/shop/product-type/maquillage-outils/outils' },
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