import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLanguage } from '../contexts/LanguageContext';
import { useInventory } from '@/hooks/useInventory';
import ProductCard from './ProductCard';
import { Loader2 } from 'lucide-react';
const NewArrivals = () => {
  console.info('Render: NewArrivals');
  const { t } = useLanguage();
  const { products, isLoading } = useInventory();
  
  // Get the latest 2 products (last 2 in the array assuming newest are added last)
  const latestProducts = products ? products.slice(-2).reverse() : [];
  
  // Get unique brands from all products
  const uniqueBrands = products ? [...new Set(products.map(product => product.brand).filter(brand => brand))] : [];
  const brandsText = uniqueBrands.length > 0 
    ? `Découvrez nos marques : ${uniqueBrands.slice(0, 3).join(', ')}${uniqueBrands.length > 3 ? ' et plus encore' : ''}.`
    : 'Découvrez nos dernières collections de marques K-Beauty authentiques.';
  
  return <div className="bg-white py-16 mt-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center">
          {/* Left side - Text content */}
          <div className="lg:w-1/2 mb-10 lg:mb-0 pr-0 lg:pr-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 font-serif leading-tight text-zinc-950">
              {t('new.arrivals.title')}
            </h2>
            <p className="text-lg mb-8 max-w-xl text-zinc-800">
              {brandsText}
            </p>
            <Link to="/shop/newly-curated">
              <Button variant="default">
                {t('shop.newly.curated')}
              </Button>
            </Link>
          </div>
          
          {/* Right side - Latest Products */}
          <div className="lg:w-1/2">
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-gray-600" />
              </div>
            ) : latestProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {latestProducts.map(product => (
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
            ) : (
              <Card className="overflow-hidden border-none shadow-lg bg-white h-64 flex items-center justify-center">
                <div className="text-center p-6">
                  <h3 className="text-2xl font-semibold mb-2 text-zinc-950">Nouveaux produits bientôt disponibles</h3>
                  <p className="text-zinc-900">Découvrez nos dernières trouvailles K-Beauty</p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>;
};
export default NewArrivals;