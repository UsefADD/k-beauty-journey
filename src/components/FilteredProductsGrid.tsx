import React from 'react';
import ProductCard from './ProductCard';
import { Product } from '@/hooks/useProducts';
import { Loader2, AlertCircle } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface FilteredProductsGridProps {
  products: Product[];
  isLoading: boolean;
  emptyMessage?: string;
}

const FilteredProductsGrid = ({ products, isLoading, emptyMessage = "No products found" }: FilteredProductsGridProps) => {
  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="flex justify-center items-center h-16">
          <Loader2 className="h-8 w-8 animate-spin text-pink-600" />
          <span className="ml-2 text-pink-600">Loading products...</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="h-48 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-10">
        <AlertCircle className="mx-auto h-12 w-12 text-amber-500 mb-4" />
        <p className="text-gray-700 font-medium mb-4">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          name={product.Product_name}
          brand={product.brand}
          price={product.price}
          image={product.image_url || "/placeholder.svg"}
          stock_quantity={product.stock_quantity}
        />
      ))}
    </div>
  );
};

export default FilteredProductsGrid;