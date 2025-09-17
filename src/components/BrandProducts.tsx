import React from 'react';
import { Brand } from '@/data/brandsData';
import { ArrowLeft } from 'lucide-react';

interface BrandProductsProps {
  brand: Brand;
  onBack: () => void;
}

const BrandProducts = ({ brand, onBack }: BrandProductsProps) => {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm mb-10">
      <div className="flex justify-between items-center mb-5 pb-2.5 border-b border-gray-200">
        <h2 className="text-2xl font-semibold">{brand.name} Products</h2>
        <button
          onClick={onBack}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Brands
        </button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {brand.products.map((product) => (
          <div 
            key={product.id}
            className="bg-gray-50 rounded-lg p-4 hover:-translate-y-1 transition-transform duration-300"
          >
            <div className="h-30 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mb-4 text-white text-2xl">
              📦
            </div>
            <div className="font-semibold mb-1">{product.name}</div>
            <div className="text-blue-500 font-bold">{product.price} AED</div>
          </div>
        ))}
      </div>
      
      {brand.products.length === 0 && (
        <div className="text-center py-10">
          <i className="fas fa-box-open text-4xl text-gray-400 mb-4"></i>
          <h3 className="text-xl font-semibold text-gray-700">No products available</h3>
          <p className="text-gray-500">There are no products for {brand.name} at the moment</p>
        </div>
      )}
    </div>
  );
};

export default BrandProducts;