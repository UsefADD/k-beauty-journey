
import React from 'react';
import { Link } from 'react-router-dom';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Heart } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useNewArrivals } from '@/hooks/useNewArrivals';
import { Loader2 } from 'lucide-react';

const NewProducts = () => {
  const { addItem } = useCart();
  const { newArrivals: products, isLoading } = useNewArrivals(4); // Get 4 newest products
  
  // If there are no products or loading/error states, handle them
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64 mt-8">
        <Loader2 className="h-8 w-8 animate-spin text-pink-600" />
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-10 mt-8">
        <p className="text-gray-500">Aucun nouveau produit disponible pour le moment.</p>
      </div>
    );
  }

  // Use all available new products (up to 4)
  const displayProducts = products;

  const handleAddToCart = (product: any, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id: product.id.toString(),
      name: product.name,
      price: product.price,
      image: product.image || '/placeholder.svg',
    });
  };

  return (
    <div className="mt-8">
      <Carousel 
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {displayProducts.map((product) => (
            <CarouselItem key={product.id} className="md:basis-1/2 lg:basis-1/4">
              <div className="flex flex-col items-center p-2">
                <Link to={`/product/${product.id}`} className="relative w-full">
                  <div className="overflow-hidden rounded-lg bg-white transition-all duration-300 group-hover:opacity-90 h-64 flex items-center justify-center">
                    {product.image ? (
                      <img 
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover object-center"
                        onError={(e) => { e.currentTarget.src = '/placeholder.svg'; }}
                      />
                    ) : (
                      <div className="text-center p-4">
                        <h3 className="font-medium text-cream-900 text-lg">{product.name}</h3>
                        <p className="mt-2 text-cream-700">{product.price.toFixed(2)} MAD</p>
                      </div>
                    )}
                  </div>
                  <button 
                    className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-md hover:bg-cream-100 transition-colors"
                    onClick={(e) => handleAddToCart(product, e)}
                  >
                    <Heart className="h-4 w-4 text-cream-700" />
                  </button>
                </Link>
                <span className="mt-3 text-sm font-bold text-cream-800">
                  {product.brand}
                </span>
                <button 
                  onClick={(e) => handleAddToCart(product, e)}
                  className="mt-2 w-full py-2 text-sm font-medium text-cream-700 border border-cream-300 rounded-md hover:bg-pink-700 hover:text-white transition-colors"
                >
                  Add to Cart
                </button>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="border-cream-300 text-cream-700 hover:bg-cream-200 hover:text-cream-900" />
        <CarouselNext className="border-cream-300 text-cream-700 hover:bg-cream-200 hover:text-cream-900" />
      </Carousel>
    </div>
  );
};

export default NewProducts;
