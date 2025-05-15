
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ShopCategories from '../components/ShopCategories';
import ProductsGrid from '../components/ProductsGrid';
import { useProducts } from '@/hooks/useProducts';
import { Button } from '@/components/ui/button';
import { Loader2, RefreshCw } from 'lucide-react';

const ShopNewlyCurated = () => {
  const { products, isLoading, error, refetch } = useProducts();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow py-12 bg-knude-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center mb-8">
            <h1 className="text-3xl font-bold text-center text-knude-900 font-serif">
              SHOP BY NEWLY CURATED
            </h1>
            <Button 
              variant="ghost" 
              size="icon"
              className="ml-2"
              onClick={() => refetch()}
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <RefreshCw className="h-5 w-5" />
              )}
              <span className="sr-only">Refresh products</span>
            </Button>
          </div>
          
          <ShopCategories />
          
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-pink-600" />
              <span className="ml-2 text-pink-600">Loading products...</span>
            </div>
          ) : error ? (
            <div className="text-center py-10">
              <p className="text-red-500 mb-4">{error}</p>
              <Button onClick={() => refetch()} variant="outline">
                Try Again
              </Button>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-500 mb-4">No products found in the database.</p>
              <p className="text-sm text-gray-400">Make sure you've added products to your Supabase Products table.</p>
            </div>
          ) : (
            <div className="mt-8">
              <p className="text-sm text-gray-500 mb-2">Found {products.length} products</p>
              <ProductsGrid />
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ShopNewlyCurated;
