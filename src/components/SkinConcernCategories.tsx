import React from 'react';
import { Link } from 'react-router-dom';

const skinConcerns = [
  {
    name: 'Acne & Blemishes',
    path: '/shop/skin-concern/acne',
    description: 'Clear and prevent breakouts',
    subtypes: [
      { name: 'Blackheads', path: '/shop/skin-concern/acne/blackheads' },
      { name: 'Whiteheads', path: '/shop/skin-concern/acne/whiteheads' },
      { name: 'Cystic Acne', path: '/shop/skin-concern/acne/cystic' },
      { name: 'Acne Scars', path: '/shop/skin-concern/acne/scars' },
    ]
  },
  {
    name: 'Anti-Aging',
    path: '/shop/skin-concern/anti-aging',
    description: 'Reduce signs of aging',
    subtypes: [
      { name: 'Fine Lines', path: '/shop/skin-concern/anti-aging/fine-lines' },
      { name: 'Wrinkles', path: '/shop/skin-concern/anti-aging/wrinkles' },
      { name: 'Loss of Firmness', path: '/shop/skin-concern/anti-aging/firmness' },
      { name: 'Sagging', path: '/shop/skin-concern/anti-aging/sagging' },
    ]
  },
  {
    name: 'Hyperpigmentation',
    path: '/shop/skin-concern/pigmentation',
    description: 'Even out skin tone',
    subtypes: [
      { name: 'Dark Spots', path: '/shop/skin-concern/pigmentation/dark-spots' },
      { name: 'Melasma', path: '/shop/skin-concern/pigmentation/melasma' },
      { name: 'Post-Acne Marks', path: '/shop/skin-concern/pigmentation/post-acne' },
      { name: 'Sun Damage', path: '/shop/skin-concern/pigmentation/sun-damage' },
    ]
  },
  {
    name: 'Hydration',
    path: '/shop/skin-concern/hydration',
    description: 'Boost moisture levels',
    subtypes: [
      { name: 'Dehydration', path: '/shop/skin-concern/hydration/dehydration' },
      { name: 'Flaky Skin', path: '/shop/skin-concern/hydration/flaky' },
      { name: 'Tight Skin', path: '/shop/skin-concern/hydration/tight' },
    ]
  },
  {
    name: 'Sensitivity & Redness',
    path: '/shop/skin-concern/sensitivity',
    description: 'Calm and soothe irritation',
    subtypes: [
      { name: 'Rosacea', path: '/shop/skin-concern/sensitivity/rosacea' },
      { name: 'Irritation', path: '/shop/skin-concern/sensitivity/irritation' },
      { name: 'Inflammation', path: '/shop/skin-concern/sensitivity/inflammation' },
    ]
  },
  {
    name: 'Enlarged Pores',
    path: '/shop/skin-concern/pores',
    description: 'Minimize pore appearance',
    subtypes: [
      { name: 'Clogged Pores', path: '/shop/skin-concern/pores/clogged' },
      { name: 'Large Pores', path: '/shop/skin-concern/pores/large' },
      { name: 'Rough Texture', path: '/shop/skin-concern/pores/texture' },
    ]
  }
];

const SkinConcernCategories = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
      {skinConcerns.map((concern) => (
        <div key={concern.name} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
          <Link
            to={concern.path}
            className="text-lg font-semibold text-knude-800 hover:text-knude-600 transition-colors block mb-2"
          >
            {concern.name}
          </Link>
          <p className="text-sm text-knude-600 mb-4">{concern.description}</p>
          <div className="space-y-2">
            {concern.subtypes.map((subtype) => (
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

export default SkinConcernCategories;