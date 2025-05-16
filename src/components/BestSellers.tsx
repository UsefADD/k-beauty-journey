
import React from 'react';
import ProductCard from './ProductCard';
import { Link } from 'react-router-dom';
import NewArrivals from './NewArrivals';
import { Button } from "@/components/ui/button";
import { useLanguage } from '../contexts/LanguageContext';
import { useInventory } from '@/hooks/useInventory';
import { Loader2 } from 'lucide-react';

const BestSellers = () => {
  const { t } = useLanguage();
  const { products, isLoading } = useInventory();
  
  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <Link to="/shop/newly-curated" className="text-sm text-knude-600 hover:text-pink-600 zigzag-underline transition-colors pb-1">
            {t('shop.newly.curated')}
          </Link>
          <Link to="/shop/viral" className="text-sm text-knude-600 hover:text-pink-600 zigzag-underline transition-colors pb-1">
            {t('shop.viral')}
          </Link>
          <Link to="/shop/best-sellers" className="text-sm text-knude-600 hover:text-pink-600 zigzag-underline transition-colors pb-1">
            {t('shop.best.sellers')}
          </Link>
          <Link to="/shop/sets" className="text-sm text-knude-600 hover:text-pink-600 zigzag-underline transition-colors pb-1">
            {t('shop.sets')}
          </Link>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-pink-600" />
          </div>
        ) : !products || products.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-500">No products found. Add some products to your Supabase database to see them here.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.slice(0, 4).map(product => (
              <ProductCard 
                key={product.id}
                id={product.id}
                name={product.name}
                brand={product.brand}
                price={product.price}
                image={product.image || "/placeholder.svg"}
              />
            ))}
          </div>
        )}
        
        <NewArrivals />
        
        <div className="mt-12 text-center">
          <Link to="/shop/best-sellers">
            <Button className="uppercase bg-white hover:bg-cream-100 border border-cream-300 text-zinc-900">
              {t('view.all.best.sellers')}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BestSellers;
