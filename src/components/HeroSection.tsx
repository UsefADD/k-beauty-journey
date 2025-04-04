
import React, { useState } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Circle, CircleDot } from "lucide-react";

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 2;
  
  return (
    <div className="relative w-full h-screen overflow-hidden bg-gray-50">
      <Carousel 
        className="w-full h-full"
        opts={{
          axis: "y", // Make carousel vertical
          loop: true,
        }}
        onSelect={(api) => {
          if (api) {
            setCurrentSlide(api.selectedScrollSnap());
          }
        }}
      >
        <CarouselContent className="h-full flex-col">
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
      </Carousel>
      
      {/* Pagination dots on the right side */}
      <div className="absolute right-6 top-1/2 transform -translate-y-1/2 flex flex-col gap-2">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <button
            key={index}
            onClick={() => {
              // Get the carousel element and trigger scroll to the selected slide
              const carousel = document.querySelector('[data-carousel]');
              if (carousel) {
                const api = (carousel as any)._embla;
                if (api) {
                  api.scrollTo(index);
                  setCurrentSlide(index);
                }
              }
            }}
            className="focus:outline-none"
            aria-label={`Go to slide ${index + 1}`}
          >
            {index === currentSlide ? (
              <CircleDot className="h-4 w-4 text-pink-600" />
            ) : (
              <Circle className="h-4 w-4 text-gray-400" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
