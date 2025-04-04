
import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const HeroSection = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <Carousel className="w-full h-full">
        <CarouselContent className="h-full">
          <CarouselItem className="h-full">
            <div className="relative w-full h-full">
              <img 
                src="/lovable-uploads/96bd7d31-ad5b-415b-af2a-51ec79980cad.png" 
                alt="K-Beauty Essentials Collection" 
                className="w-full h-full object-contain absolute inset-0"
                loading="eager"
              />
            </div>
          </CarouselItem>
          <CarouselItem className="h-full">
            <div className="relative w-full h-full">
              <img 
                src="/lovable-uploads/a18cda7b-9823-4d1a-86f9-4698edd0b43a.png" 
                alt="K-Beauty Skincare Products" 
                className="w-full h-full object-contain absolute inset-0"
                loading="lazy"
              />
            </div>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious className="absolute left-4 z-10" />
        <CarouselNext className="absolute right-4 z-10" />
      </Carousel>
    </div>
  );
};

export default HeroSection;
