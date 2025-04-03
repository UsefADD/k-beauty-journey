
import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Heart } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  brand: string;
  isNew: boolean;
}

const NewProducts = () => {
  const products: Product[] = [
    { 
      id: 1, 
      name: 'Electrolyte Water Cream', 
      brand: 'COCOKIND', 
      isNew: true
    },
    { 
      id: 2, 
      name: 'Skin Booster Ampoule Peel Pad', 
      brand: 'IOPE', 
      isNew: true
    },
    { 
      id: 3, 
      name: 'Power Elasticity-Boosting Plump Pad', 
      brand: 'KNOURS', 
      isNew: true
    },
    { 
      id: 4, 
      name: 'Holy Hyssop Serum 3D', 
      brand: 'ARENCIA', 
      isNew: true
    }
  ];

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
                <div className="relative w-full">
                  <div className="overflow-hidden rounded-lg bg-white transition-all duration-300 group-hover:opacity-90 h-64 flex items-center justify-center">
                    <div className="text-center p-4">
                      <h3 className="font-medium text-knude-900 text-lg">{product.name}</h3>
                    </div>
                  </div>
                  <button className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-md hover:bg-knude-100 transition-colors">
                    <Heart className="h-4 w-4 text-knude-700" />
                  </button>
                </div>
                <span className="mt-3 text-sm font-bold text-knude-800">
                  {product.brand}
                </span>
                {product.isNew && (
                  <span className="mt-1 text-xs bg-knude-800 text-white px-3 py-1 rounded">
                    NEW
                  </span>
                )}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="border-knude-300 text-knude-700 hover:bg-knude-200 hover:text-knude-900" />
        <CarouselNext className="border-knude-300 text-knude-700 hover:bg-knude-200 hover:text-knude-900" />
      </Carousel>
    </div>
  );
};

export default NewProducts;
