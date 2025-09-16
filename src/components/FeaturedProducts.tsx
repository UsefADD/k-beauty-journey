
import React from 'react';
import { Link } from 'react-router-dom';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useCart } from '../contexts/CartContext';

interface Product {
  id: number;
  name: string;
  price: number;
  isNew: boolean;
}

const FeaturedProducts = () => {
  console.info('Render: FeaturedProducts');
  const { addItem } = useCart();

  const products: Product[] = [
    {
      id: 1,
      name: 'Cleansing Balm',
      price: 26,
      isNew: true
    }, 
    {
      id: 2,
      name: 'Rice Toner',
      price: 24,
      isNew: true
    }, 
    {
      id: 3,
      name: 'Vitamin Serum',
      price: 30,
      isNew: true
    }, 
    {
      id: 4,
      name: 'Sunscreen',
      price: 28,
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
      image: '/placeholder.svg',
    });
  };

  return (
    <div className="mt-12">
      <h2 className="font-serif text-2xl font-medium mb-6 text-center text-zinc-950">New Arrivals</h2>
      <Carousel 
        opts={{
          align: "start",
          loop: true
        }} 
        className="w-full"
      >
        <CarouselContent>
          {products.map(product => (
            <CarouselItem key={product.id} className="md:basis-1/2 lg:basis-1/4">
              <div className="group relative p-1">
                <Link to={`/product/${product.id}`} className="block">
                  <div className="overflow-hidden rounded-lg bg-knude-100 transition-all duration-300 group-hover:opacity-90 h-64 flex items-center justify-center">
                    <div className="text-center p-4">
                      <span className="text-xl font-medium text-zinc-950">{product.name}</span>
                      <p className="mt-2 text-zinc-700">{product.price.toFixed(2)} MAD</p>
                    </div>
                  </div>
                  {product.isNew && (
                    <div className="mt-2 text-center">
                      <span className="bg-knude-800 text-white px-3 py-1 text-xs rounded">
                        NEW
                      </span>
                    </div>
                  )}
                </Link>
                <button 
                  onClick={(e) => handleAddToCart(product, e)}
                  className="mt-2 w-full py-2 text-sm font-medium text-cream-700 border border-cream-300 rounded-md hover:bg-pink-700 hover:text-white transition-colors opacity-0 group-hover:opacity-100"
                >
                  Add to Cart
                </button>
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
