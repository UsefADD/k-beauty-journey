
import React from 'react';
import ProductCard from './ProductCard';
import { useInventory } from '@/hooks/useInventory';
import { Loader2, AlertCircle, Database, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

const ProductsGrid = () => {
  const { products, isLoading, refetch, error } = useInventory();

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

  if (error) {
    return (
      <div className="text-center py-10">
        <AlertCircle className="mx-auto h-12 w-12 text-red-500 mb-4" />
        <p className="text-red-500 font-medium mb-2">Error loading products</p>
        <p className="text-gray-500 mb-6">{error.toString()}</p>
        <Button 
          variant="default" 
          onClick={() => refetch()}
          className="text-sm"
        >
          <RefreshCw className="mr-2 h-4 w-4" /> Try Again
        </Button>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-10">
        <Database className="mx-auto h-12 w-12 text-amber-500 mb-4" />
        <p className="text-gray-700 font-medium mb-4">No products found in the database.</p>
        <div className="flex justify-center">
          <Button 
            variant="default" 
            onClick={() => refetch()}
            className="text-sm"
          >
            <RefreshCw className="mr-2 h-4 w-4" /> Refresh Products
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          name={product.name}
          brand={product.brand}
          price={product.price}
          image={product.image || "/placeholder.svg"}
          stock_quantity={product.stock_quantity}
          sale_price={product.sale_price}
          is_on_sale={product.is_on_sale}
        />
      ))}
    </div>
  );
};

export default ProductsGrid;
