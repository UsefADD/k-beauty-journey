
import React from 'react';

interface Brand {
  id: number;
  name: string;
  image: string;
}

const BrandsList = () => {
  const brands: Brand[] = [
    { 
      id: 1, 
      name: 'NEOGEN', 
      image: 'https://storage.googleapis.com/a1aa/image/wiM_ofC4Ks_iQnyZtE37wu0KaoaCeBATJUAcit19nxk.jpg' 
    },
    { 
      id: 2, 
      name: 'IOPE', 
      image: 'https://storage.googleapis.com/a1aa/image/O7mn6QOtENcDS1-GM-506Ih3Ikx-RRRgPMRIWlBGEVQ.jpg' 
    },
    { 
      id: 3, 
      name: 'KLAIRS', 
      image: 'https://storage.googleapis.com/a1aa/image/wiM_ofC4Ks_iQnyZtE37wu0KaoaCeBATJUAcit19nxk.jpg' 
    },
    { 
      id: 4, 
      name: 'HANSKIN', 
      image: 'https://storage.googleapis.com/a1aa/image/O7mn6QOtENcDS1-GM-506Ih3Ikx-RRRgPMRIWlBGEVQ.jpg' 
    }
  ];

  return (
    <div className="w-full md:w-3/4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {brands.map((brand) => (
          <div key={brand.id} className="group">
            <div className="overflow-hidden rounded-lg bg-cream-100 transition-all duration-300 group-hover:opacity-90">
              <img 
                src={brand.image} 
                alt={`${brand.name} products`} 
                className="w-full h-64 object-cover object-center"
              />
            </div>
            <div className="mt-3 text-center">
              <p className="font-medium text-cream-800">{brand.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrandsList;
