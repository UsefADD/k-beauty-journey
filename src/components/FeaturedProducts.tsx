
import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface Product {
  id: number;
  name: string;
  isNew: boolean;
}

const FeaturedProducts = () => {
  const products: Product[] = [
    { id: 1, name: 'Cleansing Balm', isNew: true },
    { id: 2, name: 'Rice Toner', isNew: true },
    { id: 3, name: 'Vitamin Serum', isNew: true },
    { id: 4, name: 'Sunscreen', isNew: true }
  ];

  return (
    <div className="mt-12">
      <h2 className="font-serif text-2xl font-medium text-knude-900 mb-6 text-center">New Arrivals</h2>
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
              <div className="group relative p-1">
                <div className="overflow-hidden rounded-lg bg-knude-100 transition-all duration-300 group-hover:opacity-90 h-64 flex items-center justify-center">
                  <span className="text-knude-800 text-xl font-medium">{product.name}</span>
                </div>
                {product.isNew && (
                  <div className="mt-2 text-center">
                    <span className="bg-knude-800 text-white px-3 py-1 text-xs rounded">
                      NEW
                    </span>
                  </div>
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

export default FeaturedProducts;
