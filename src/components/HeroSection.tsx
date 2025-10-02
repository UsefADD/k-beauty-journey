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
    src: "/lovable-uploads/96bd7d31-ad5b-415b-af2a-51ec79980cad.png",
    alt: "K-Beauty Essentials Collection",
    title: "",
    subtitle: ""
  }, {
    src: "/lovable-uploads/af567ca0-8439-426c-ab0b-4b6827528920.png",
    alt: "Spring K-Beauty Collection",
    title: "Spring Collection",
    subtitle: "Refresh your routine with our seasonal favorites"
  }, {
    src: "/autumn-skincare-new.png",
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
                className="max-w-full max-h-full object-contain"
                loading={index === 0 ? "eager" : "lazy"}
              />
              {slide.title ? (
                <div className="absolute inset-0 bg-black bg-opacity-30">
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 font-serif text-zinc-200">
                      {slide.title}
                    </h2>
                    <p className="text-xl md:text-2xl mb-6 text-zinc-200">{slide.subtitle}</p>
                    {index === 1 && (
                      <Link to="/shop/newly-curated">
                        <Button variant="default" size="lg">
                          Get Ready for Spring
                        </Button>
                      </Link>
                    )}
                    {index === 2 && (
                      <Link to="/shop">
                        <Button variant="default" size="lg">
                          Découvrir la Collection
                        </Button>
                      </Link>
                    )}
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
      
      <div className="absolute right-6 top-1/2 transform -translate-y-1/2 flex flex-col gap-2">
        {slides.map((_, index) => <button key={index} onClick={() => handleSlideChange(index)} className="focus:outline-none" aria-label={`Go to slide ${index + 1}`} disabled={isAnimating}>
            {index === currentSlide ? <CircleDot className="h-4 w-4 text-pink-600" /> : <Circle className="h-4 w-4 text-gray-400" />}
          </button>)}
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