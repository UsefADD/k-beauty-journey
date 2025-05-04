
import React from 'react';
import ProductCard from './ProductCard';
import { useProducts } from '@/hooks/useProducts';
import { Loader2 } from 'lucide-react';

const ProductsGrid = () => {
  const { products, isLoading, error } = useProducts();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-pink-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500">Failed to load products. Please try again later.</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">No products found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          name={product["Product name"]}
          brand={product.Brand}
          price={Number(product.price) || 0}
          image={product["image url"] || "/placeholder.svg"}
        />
      ))}
    </div>
  );
};

export default ProductsGrid;
