
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

interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  image: string;
  isNew: boolean;
}

const NewProducts = () => {
  const { addItem } = useCart();
  
  const products: Product[] = [
    { 
      id: 1, 
      name: 'Electrolyte Water Cream', 
      brand: 'COCOKIND',
      price: 28,
      image: '/placeholder.svg', 
      isNew: true
    },
    { 
      id: 2, 
      name: 'Skin Booster Ampoule Peel Pad', 
      brand: 'IOPE',
      price: 32, 
      image: '/placeholder.svg',
      isNew: true
    },
    { 
      id: 3, 
      name: 'Power Elasticity-Boosting Plump Pad', 
      brand: 'KNOURS',
      price: 29,
      image: '/placeholder.svg', 
      isNew: true
    },
    { 
      id: 4, 
      name: 'Holy Hyssop Serum 3D', 
      brand: 'ARENCIA',
      price: 35,
      image: '/placeholder.svg', 
      isNew: true
    }
  ];

  const handleAddToCart = (product: Product, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id: product.id.toString(),
      name: product.name,
      price: product.price,
      image: product.image,
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
          {products.map((product) => (
            <CarouselItem key={product.id} className="md:basis-1/2 lg:basis-1/4">
              <div className="flex flex-col items-center p-2">
                <Link to={`/product/${product.id}`} className="relative w-full">
                  <div className="overflow-hidden rounded-lg bg-white transition-all duration-300 group-hover:opacity-90 h-64 flex items-center justify-center">
                    <div className="text-center p-4">
                      <h3 className="font-medium text-cream-900 text-lg">{product.name}</h3>
                      <p className="mt-2 text-cream-700">{product.price.toFixed(2)} MAD</p>
                    </div>
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
                {product.isNew && (
                  <span className="mt-1 text-xs bg-cream-800 text-white px-3 py-1 rounded">
                    NEW
                  </span>
                )}
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
