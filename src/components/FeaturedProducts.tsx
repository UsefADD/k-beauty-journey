
import React from 'react';
import { Link } from 'react-router-dom';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { useCart } from '../contexts/CartContext';
import { useNewArrivals, NewArrivalProduct } from '@/hooks/useNewArrivals';
import { Loader2 } from 'lucide-react';


const FeaturedProducts = () => {
  console.info('Render: FeaturedProducts');
  const { addItem } = useCart();

  const { newArrivals, isLoading } = useNewArrivals(4);

  const handleAddToCart = (product: NewArrivalProduct, e: React.MouseEvent) => {
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
    <div className="mt-12">
      <h2 className="font-serif text-2xl font-medium mb-6 text-center text-zinc-950">Nouveautés</h2>
      <Carousel 
        opts={{
          align: "start",
          loop: true
        }} 
        className="w-full"
      >
        <CarouselContent>
          {isLoading ? (
            <CarouselItem className="md:basis-1/2 lg:basis-1/4">
              <div className="h-64 flex items-center justify-center">
                <Loader2 className="h-6 w-6 animate-spin text-zinc-600" />
              </div>
            </CarouselItem>
          ) : (newArrivals && newArrivals.length > 0 ? (
            newArrivals.map(product => (
              <CarouselItem key={product.id} className="md:basis-1/2 lg:basis-1/4">
                <div className="group relative p-1">
                  <Link to={`/product/${product.id}`} className="block">
                    <div className="overflow-hidden rounded-lg bg-knude-100 transition-all duration-300 group-hover:opacity-90 h-64 flex items-center justify-center">
                      <div className="text-center p-4">
                        <span className="text-xl font-medium text-zinc-950">{product.name}</span>
                        <p className="mt-2 text-zinc-700">{product.price.toFixed(2)} MAD</p>
                      </div>
                    </div>
                  </Link>
                  <Button 
                    onClick={(e) => handleAddToCart(product, e)}
                    className="mt-2 w-full opacity-0 group-hover:opacity-100 transition-opacity"
                    variant="default"
                  >
                    Ajouter au panier
                  </Button>
                </div>
              </CarouselItem>
            ))
          ) : (
            <CarouselItem className="md:basis-1/2 lg:basis-1/4">
              <div className="h-64 flex items-center justify-center text-zinc-700">
                Aucun produit disponible pour le moment.
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
