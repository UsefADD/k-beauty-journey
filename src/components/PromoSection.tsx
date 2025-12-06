import React from 'react';
import ProductCard from './ProductCard';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useInventory } from '@/hooks/useInventory';
import { Loader2, Percent } from 'lucide-react';

const PromoSection = () => {
  const { products, isLoading } = useInventory();
  
  // Filter only products on sale
  const promoProducts = products?.filter(product => product.is_on_sale && product.sale_price) || [];
  
  // Don't render section if no promo products
  if (!isLoading && promoProducts.length === 0) {
    return null;
  }
  
  return (
    <div className="py-16 bg-gradient-to-r from-amber-50 via-pink-50 to-purple-50">
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-0.5 bg-zinc-950 flex-1 max-w-xs"></div>
            <div className="flex items-center gap-2">
              <Percent className="h-6 w-6 text-zinc-950" />
              <h2 className="text-3xl md:text-4xl font-bold text-zinc-950 uppercase tracking-wide">
                Promos
              </h2>
              <Percent className="h-6 w-6 text-zinc-950" />
            </div>
            <div className="h-0.5 bg-zinc-950 flex-1 max-w-xs"></div>
          </div>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-pink-600" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {promoProducts.slice(0, 4).map(product => (
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
        )}
        
        {promoProducts.length > 4 && (
          <div className="mt-12 text-center">
            <Link to="/shop/promos">
              <Button variant="default" className="bg-zinc-950 hover:bg-zinc-800">
                Voir toutes les promos
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default PromoSection;
