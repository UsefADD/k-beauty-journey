import React from 'react';
import { Brand } from '@/data/brandsData';
import { ArrowLeft } from 'lucide-react';

interface BrandProductsProps {
  brand: Brand;
  onBack: () => void;
}

const BrandProducts = ({ brand, onBack }: BrandProductsProps) => {
  return (
    <div className="bg-card rounded-2xl p-8 shadow-lg mb-10 border border-border">
      <div className="flex justify-between items-center mb-8 pb-4 border-b-2 border-border">
        <h2 className="text-3xl font-semibold text-card-foreground">{brand.name} Products</h2>
        <button
          onClick={onBack}
          className="bg-primary text-primary-foreground px-5 py-3 rounded-lg flex items-center gap-2 hover:opacity-90 transition-all duration-300 hover:-translate-x-1 font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Brands
        </button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {brand.products.map((product) => (
          <div 
            key={product.id}
            className="bg-muted rounded-xl p-5 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 overflow-hidden border border-border"
          >
            <div className="h-48 bg-muted rounded-xl flex items-center justify-center mb-5 overflow-hidden relative">
              {product.image_url ? (
                <img 
                  src={product.image_url} 
                  alt={product.name}
                  className="max-w-4/5 max-h-4/5 object-contain"
                />
              ) : (
                <div className="text-4xl text-muted-foreground">📦</div>
              )}
            </div>
            <div className="text-xs text-muted-foreground mb-1 uppercase tracking-wide">{brand.name}</div>
            <div className="font-semibold mb-3 text-base text-card-foreground leading-tight">{product.name}</div>
            <div className="text-primary font-bold text-lg">{product.price} MAD</div>
          </div>
        ))}
      </div>
      
      {brand.products.length === 0 && (
        <div className="text-center py-10">
          <i className="fas fa-box-open text-4xl text-muted-foreground mb-4"></i>
          <h3 className="text-xl font-semibold text-card-foreground">No products available</h3>
          <p className="text-muted-foreground">There are no products for {brand.name} at the moment</p>
        </div>
      )}
    </div>
  );
};

export default BrandProducts;