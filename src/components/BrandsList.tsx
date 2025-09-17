
import React from 'react';
import { useBrands } from '../hooks/useBrands';
import { Brand } from '@/data/brandsData';
import { Loader2 } from 'lucide-react';

interface BrandsListProps {
  onBrandSelect: (brand: Brand) => void;
}

const BrandsList = ({ onBrandSelect }: BrandsListProps) => {
  const { brands, isLoading } = useBrands();

  if (isLoading) {
    return (
      <div className="w-full flex justify-center items-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
        <span className="ml-2 text-gray-600">Loading brands...</span>
      </div>
    );
  }

  if (brands.length === 0) {
    return (
      <div className="w-full">
        <div className="text-center py-10 bg-white rounded-xl shadow-sm">
          <i className="fas fa-search text-4xl text-gray-400 mb-4"></i>
          <h3 className="text-xl font-semibold text-gray-700">No brands found</h3>
          <p className="text-gray-500">There are no brands for the selected criteria</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mb-10">
        {brands.map((brand) => (
          <div 
            key={brand.id} 
            className="bg-white rounded-xl p-5 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer"
            onClick={() => onBrandSelect(brand)}
          >
            <div className="w-15 h-15 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mb-4 text-white text-xl font-bold">
              {brand.name.charAt(0)}
            </div>
            <div className="text-lg font-semibold mb-2">{brand.name}</div>
            <div className="text-gray-600 text-sm">{brand.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrandsList;
