
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
    <div className="relative w-full h-screen overflow-hidden bg-gray-50">
      <Carousel className="w-full h-full">
        <CarouselContent className="h-full">
          <CarouselItem className="h-full">
            <div className="relative w-full h-full flex items-center justify-center">
              <img 
                src="/lovable-uploads/96bd7d31-ad5b-415b-af2a-51ec79980cad.png" 
                alt="K-Beauty Essentials Collection" 
                className="max-w-full max-h-full object-contain"
                loading="eager"
              />
            </div>
          </CarouselItem>
          <CarouselItem className="h-full">
            <div className="relative w-full h-full flex items-center justify-center">
              <img 
                src="/lovable-uploads/782ea606-1d8b-4892-b0d1-2de59860d6ff.png" 
                alt="Spring K-Beauty Collection" 
                className="max-w-full max-h-full object-contain"
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
