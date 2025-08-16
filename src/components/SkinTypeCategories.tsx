import React from 'react';
import { Link } from 'react-router-dom';

const skinTypes = [
  {
    name: 'Oily Skin',
    path: '/shop/skin-type/oily',
    description: 'Products for excess oil control',
    subtypes: [
      { name: 'Sebum Control', path: '/shop/skin-type/oily/sebum-control' },
      { name: 'Pore Minimizing', path: '/shop/skin-type/oily/pore-minimizing' },
      { name: 'Mattifying', path: '/shop/skin-type/oily/mattifying' },
    ]
  },
  {
    name: 'Dry Skin',
    path: '/shop/skin-type/dry',
    description: 'Hydrating and nourishing products',
    subtypes: [
      { name: 'Deep Hydration', path: '/shop/skin-type/dry/hydration' },
      { name: 'Barrier Repair', path: '/shop/skin-type/dry/barrier-repair' },
      { name: 'Nourishing', path: '/shop/skin-type/dry/nourishing' },
    ]
  },
  {
    name: 'Combination Skin',
    path: '/shop/skin-type/combination',
    description: 'Balanced care for mixed skin types',
    subtypes: [
      { name: 'T-Zone Control', path: '/shop/skin-type/combination/t-zone' },
      { name: 'Balancing', path: '/shop/skin-type/combination/balancing' },
      { name: 'Multi-Zone Care', path: '/shop/skin-type/combination/multi-zone' },
    ]
  },
  {
    name: 'Sensitive Skin',
    path: '/shop/skin-type/sensitive',
    description: 'Gentle and soothing formulations',
    subtypes: [
      { name: 'Soothing', path: '/shop/skin-type/sensitive/soothing' },
      { name: 'Fragrance-Free', path: '/shop/skin-type/sensitive/fragrance-free' },
      { name: 'Hypoallergenic', path: '/shop/skin-type/sensitive/hypoallergenic' },
    ]
  },
  {
    name: 'Normal Skin',
    path: '/shop/skin-type/normal',
    description: 'Maintenance and prevention',
    subtypes: [
      { name: 'Daily Care', path: '/shop/skin-type/normal/daily-care' },
      { name: 'Prevention', path: '/shop/skin-type/normal/prevention' },
      { name: 'Maintenance', path: '/shop/skin-type/normal/maintenance' },
    ]
  }
];

const SkinTypeCategories = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
      {skinTypes.map((skinType) => (
        <div key={skinType.name} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
          <Link
            to={skinType.path}
            className="text-lg font-semibold text-knude-800 hover:text-knude-600 transition-colors block mb-2"
          >
            {skinType.name}
          </Link>
          <p className="text-sm text-knude-600 mb-4">{skinType.description}</p>
          <div className="space-y-2">
            {skinType.subtypes.map((subtype) => (
              <Link
                key={subtype.name}
                to={subtype.path}
                className="block text-knude-500 hover:text-knude-600 transition-colors text-sm py-1 border-l-2 border-knude-200 pl-3 hover:border-knude-400"
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

export default SkinTypeCategories;