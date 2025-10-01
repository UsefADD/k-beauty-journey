import React from 'react';
import { Link } from 'react-router-dom';
import { Brand } from '@/data/brandsData';
import { ArrowLeft } from 'lucide-react';

interface BrandProductsProps {
  brand: Brand;
  onBack: () => void;
}

const BrandProducts = ({ brand, onBack }: BrandProductsProps) => {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg mb-10">
      <div className="flex justify-between items-center mb-8 pb-4 border-b-2 border-gray-200">
        <h2 className="text-3xl font-bold text-gray-800">{brand.name} Products</h2>
        <button
          onClick={onBack}
          className="bg-pink-600 text-white px-5 py-3 rounded-lg flex items-center gap-2 hover:bg-pink-700 transition-all duration-300 hover:-translate-x-1 font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Brands
        </button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {brand.products.map((product) => (
          <Link 
            key={product.id}
            to={`/product/${product.id}`}
            className="bg-gray-50 rounded-xl p-5 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 overflow-hidden block cursor-pointer"
          >
            <div className="h-44 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mb-5 text-white text-4xl overflow-hidden relative">
              {product.image_url ? (
                <img 
                  src={product.image_url} 
                  alt={product.name}
                  className="w-full h-full object-cover absolute inset-0"
                />
              ) : (
                '📦'
              )}
            </div>
            <div className="font-bold mb-2 text-lg text-gray-800">{product.name}</div>
            <div className="text-blue-500 font-extrabold text-xl">{product.price} MAD</div>
          </Link>
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