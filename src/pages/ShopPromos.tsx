import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { useInventory } from '@/hooks/useInventory';
import { Loader2, Percent } from 'lucide-react';

const ShopPromos = () => {
  const { products, isLoading } = useInventory();
  
  // Filter only products on sale
  const promoProducts = products?.filter(product => product.is_on_sale && product.sale_price) || [];
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 bg-gradient-to-r from-amber-50 via-pink-50 to-purple-50">
        <div className="container mx-auto px-4 py-12">
          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="h-0.5 bg-zinc-950 flex-1 max-w-xs"></div>
              <div className="flex items-center gap-2">
                <Percent className="h-6 w-6 text-zinc-950" />
                <h1 className="text-3xl md:text-4xl font-bold text-zinc-950 uppercase tracking-wide">
                  Toutes les Promos
                </h1>
                <Percent className="h-6 w-6 text-zinc-950" />
              </div>
              <div className="h-0.5 bg-zinc-950 flex-1 max-w-xs"></div>
            </div>
            <p className="text-center text-muted-foreground">
              {promoProducts.length} produit{promoProducts.length > 1 ? 's' : ''} en promotion
            </p>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-pink-600" />
            </div>
          ) : promoProducts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-lg text-muted-foreground">Aucune promotion disponible pour le moment.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {promoProducts.map(product => (
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
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ShopPromos;
