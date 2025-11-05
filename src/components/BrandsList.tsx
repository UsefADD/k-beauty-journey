
import React from 'react';
import { useBrands } from '../hooks/useBrands';
import { Brand } from '@/data/brandsData';
import { Loader2 } from 'lucide-react';

interface BrandsListProps {
  onBrandSelect: (brand: Brand) => void;
}

const BrandsList = ({ onBrandSelect }: BrandsListProps) => {
  const { brands, isLoading, selectedLetter } = useBrands();

  // Ensure filtering by selected letter is strictly applied
  const displayedBrands = selectedLetter
    ? brands.filter((brand) => brand.name.trim().toUpperCase().startsWith(selectedLetter.toUpperCase()))
    : brands;

  if (isLoading) {
    return (
      <div className="w-full flex justify-center items-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-pink-500" />
        <span className="ml-2 text-gray-600">Loading brands...</span>
      </div>
    );
  }

  if (displayedBrands.length === 0) {
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-10">
        {displayedBrands.map((brand) => (
          <div 
            key={brand.id} 
            className="bg-white rounded-xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer flex flex-col items-center text-center"
            onClick={() => onBrandSelect(brand)}
          >
            <div className="w-20 h-20 bg-gradient-to-r from-cream-400 to-pink-300 rounded-2xl flex items-center justify-center mb-5 text-gray-800 text-2xl font-bold shadow-lg">
              {brand.name.charAt(0)}
            </div>
            <div className="text-xl font-bold mb-3 text-gray-800">{brand.name}</div>
            <div className="text-gray-600 text-base leading-relaxed">{brand.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrandsList;
