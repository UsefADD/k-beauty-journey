import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLanguage } from '../contexts/LanguageContext';
import { useNewArrivals } from '@/hooks/useNewArrivals';
import ProductCard from './ProductCard';
import { Loader2 } from 'lucide-react';
const NewArrivals = () => {
  console.info('Render: NewArrivals');
  const { t } = useLanguage();
  const { newArrivals, isLoading } = useNewArrivals(2); // Get 2 newest products in stock
  
  // Get unique brands from new arrivals
  const uniqueBrands = newArrivals ? [...new Set(newArrivals.map(product => product.brand).filter(brand => brand))] : [];
  const brandsText = uniqueBrands.length > 0 
    ? `Découvrez nos marques : ${uniqueBrands.join(', ')}.`
    : 'Découvrez nos dernières collections de marques K-Beauty authentiques.';
  
  return <div className="bg-white py-16 mt-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center">
          {/* Left side - Text content */}
          <div className="lg:w-1/2 mb-10 lg:mb-0 pr-0 lg:pr-12">
            <div className="mb-6">
              <div className="flex items-center gap-4">
                <div className="h-0.5 bg-black flex-1 max-w-xs"></div>
                <h2 className="text-3xl md:text-4xl font-bold text-black uppercase tracking-wide">
                  Best Sellers
                </h2>
                <div className="h-0.5 bg-black flex-1 max-w-xs"></div>
              </div>
            </div>
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
            ) : newArrivals && newArrivals.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {newArrivals.map(product => (
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