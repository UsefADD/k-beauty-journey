import React, { useState, useEffect } from 'react';
import { Circle, CircleDot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
const HeroSection = () => {
  console.info('Render: HeroSection');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [prevSlide, setPrevSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const slides = [{
    src: "/k-beauty-hero.webp",
    alt: "K-Beauty Essentials Collection",
    title: "",
    subtitle: ""
  }, {
    src: "/autumn-collection.png",
    alt: "Autumn K-Beauty Collection",
    title: "",
    subtitle: ""
  }];
  useEffect(() => {
    const interval = setInterval(() => {
      handleSlideChange((currentSlide + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [currentSlide, slides.length]);
  const handleSlideChange = (index: number) => {
    if (index === currentSlide || isAnimating) return;
    setPrevSlide(currentSlide);
    setCurrentSlide(index);
    setIsAnimating(true);
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };
  const getSlideDirection = () => {
    if (currentSlide === 0 && prevSlide === slides.length - 1) return 'slide-left';
    if (currentSlide === slides.length - 1 && prevSlide === 0) return 'slide-right';
    return currentSlide > prevSlide ? 'slide-left' : 'slide-right';
  };
  return <div className="relative w-full h-screen overflow-hidden bg-white">
      <div className="w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute w-full h-full flex items-center justify-center transition-opacity duration-500 ${
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <div className="relative w-full h-full flex items-center justify-center">
              <img
                src={slide.src}
                alt={slide.alt}
                className={index === 0 ? "max-w-full max-h-full object-contain" : "w-full h-full object-cover"}
                loading={index === 0 ? "eager" : "lazy"}
              />
              {slide.title ? (
                <div className="absolute inset-0 bg-black bg-opacity-30">
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 font-serif text-zinc-200">
                      {slide.title}
                    </h2>
                    <p className="text-xl md:text-2xl mb-6 text-zinc-200">{slide.subtitle}</p>
                  </div>
                </div>
              ) : index === 0 ? (
                <div className="absolute inset-0 flex items-end justify-start p-12">
                  <div className="text-center mb-30 -ml-8">
                    <Link to="/shop/best-sellers">
                      <Button variant="default" size="lg">
                        Craquez pour nos best-sellers
                      </Button>
                    </Link>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        ))}
      </div>
      
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => handleSlideChange(index)}
            className="focus:outline-none hover:scale-110 transition-transform w-8 h-8 flex items-center justify-center"
            aria-label={`Aller à la slide ${index + 1}`}
            disabled={isAnimating}
          >
            {index === currentSlide ? (
              <CircleDot className="h-5 w-5 text-pink-600" />
            ) : (
              <Circle className="h-5 w-5 text-gray-500" />
            )}
          </button>
        ))}
      </div>
      
      <style>
        {`
        .slide-left {
          animation: slideOutLeft 0.5s forwards;
        }
        .slide-right {
          animation: slideOutRight 0.5s forwards;
        }
        .entering-right {
          animation: slideInRight 0.5s forwards;
        }
        .entering-left {
          animation: slideInLeft 0.5s forwards;
        }
        
        @keyframes slideOutLeft {
          from { transform: translateX(0); }
          to { transform: translateX(-100%); }
        }
        
        @keyframes slideOutRight {
          from { transform: translateX(0); }
          to { transform: translateX(100%); }
        }
        
        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        
        @keyframes slideInLeft {
          from { transform: translateX(-100%); }
          to { transform: translateX(0); }
        }
        `}
      </style>
    </div>;
};
export default HeroSection;