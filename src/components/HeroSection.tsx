
import React, { useState, useEffect } from 'react';
import { Circle, CircleDot } from "lucide-react";

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      src: "/lovable-uploads/96bd7d31-ad5b-415b-af2a-51ec79980cad.png",
      alt: "K-Beauty Essentials Collection"
    },
    {
      src: "/lovable-uploads/782ea606-1d8b-4892-b0d1-2de59860d6ff.png",
      alt: "Spring K-Beauty Collection"
    }
  ];
  
  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds
    
    return () => clearInterval(interval); // Clean up on unmount
  }, [slides.length]);
  
  const handleSlideChange = (index: number) => {
    setCurrentSlide(index);
  };
  
  return (
    <div className="relative w-full h-screen overflow-hidden bg-gray-50">
      <div className="w-full h-full">
        <div className="h-full">
          {/* Only show the current slide */}
          <div className="relative w-full h-full flex items-center justify-center">
            <img 
              src={slides[currentSlide].src}
              alt={slides[currentSlide].alt}
              className="max-w-full max-h-full object-contain transition-opacity duration-500"
              loading={currentSlide === 0 ? "eager" : "lazy"}
            />
          </div>
        </div>
      </div>
      
      {/* Pagination dots on the right side */}
      <div className="absolute right-6 top-1/2 transform -translate-y-1/2 flex flex-col gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => handleSlideChange(index)}
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
