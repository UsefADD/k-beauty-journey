import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useLanguage } from '../contexts/LanguageContext';
import { useNewArrivals } from '@/hooks/useNewArrivals';
import ProductCard from './ProductCard';
import { Loader2 } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
const NewArrivals = () => {
  console.info('Render: NewArrivals');
  const { t } = useLanguage();
  const { newArrivals, isLoading } = useNewArrivals(6); // Get 6 newest products for carousel
  
  // Get unique brands from new arrivals
  const uniqueBrands = newArrivals ? [...new Set(newArrivals.map(product => product.brand).filter(brand => brand))] : [];
  const brandsText = uniqueBrands.length > 0 
    ? `Découvrez nos marques : ${uniqueBrands.join(', ')}.`
    : 'Découvrez nos dernières collections de marques K-Beauty authentiques.';
  
  return <div className="bg-white py-16 mt-16">
      <div className="container mx-auto px-4">
        {/* Title at the top */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-0.5 bg-black flex-1"></div>
            <h2 className="text-3xl md:text-4xl font-bold text-black uppercase tracking-wide">
              Best Sellers
            </h2>
            <div className="h-0.5 bg-black flex-1"></div>
          </div>
          <p className="text-lg text-center max-w-2xl mx-auto text-zinc-800 mb-8">
            {brandsText}
          </p>
        </div>

        {/* Products Carousel */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-gray-600" />
          </div>
        ) : newArrivals && newArrivals.length > 0 ? (
          <Carousel 
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full max-w-6xl mx-auto mb-8"
          >
            <CarouselContent>
              {newArrivals.map(product => (
                <CarouselItem key={product.id} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-2">
                    <ProductCard 
                      id={product.id}
                      name={product.name}
                      brand={product.brand}
                      price={product.price}
                      image={product.image || "/placeholder.svg"}
                      stock_quantity={product.stock_quantity}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="border-cream-300 text-cream-700 hover:bg-cream-200 hover:text-cream-900" />
            <CarouselNext className="border-cream-300 text-cream-700 hover:bg-cream-200 hover:text-cream-900" />
          </Carousel>
        ) : (
          <div className="text-center p-6">
            <h3 className="text-2xl font-semibold mb-2 text-zinc-950">Nouveaux produits bientôt disponibles</h3>
            <p className="text-zinc-900">Découvrez nos dernières trouvailles K-Beauty</p>
          </div>
        )}

      </div>
    </div>;
};
export default NewArrivals;