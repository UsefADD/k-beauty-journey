
import React from 'react';

const BrandSidebar = () => {
  const brands = [
    { name: 'VIEW ALL', featured: false },
    { name: 'FEATURED', featured: true },
    { name: 'ANUA', featured: false },
    { name: 'HANYUL', featured: false },
    { name: "I'M FROM", featured: false },
    { name: 'NEOGEN', featured: false },
    { name: 'THEN I MET YOU', featured: false },
  ];

  return (
    <div className="w-full md:w-1/4 mb-8 md:mb-0 pr-0 md:pr-6">
      <ul className="space-y-3">
        {brands.map((brand) => (
          <li key={brand.name}>
            <a 
              href="#" 
              className={`hover:text-cream-600 transition-colors ${
                brand.featured ? 'font-medium text-pink-800' : 'text-cream-700'
              }`}
            >
              {brand.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BrandSidebar;
