
import React from 'react';
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <div 
      className="bg-cover bg-center py-16 md:py-24 relative"
      style={{ backgroundImage: "url('/lovable-uploads/6b6ec213-3966-4284-a5b6-c7980f3baec0.png')" }}
    >
      <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center relative z-10">
        <div className="lg:w-1/2 text-center lg:text-left mb-12 lg:mb-0">
          {/* The hero section now uses the image background, so we don't need the text */}
          <div className="mt-auto">
            <Button 
              className="k-button-secondary bg-white/90 hover:bg-white mt-8 backdrop-blur-sm"
              onClick={() => window.location.href = '/shop/best-sellers'}
            >
              SHOP BEST SELLERS
            </Button>
          </div>
        </div>
        <div className="lg:w-1/2 flex justify-center lg:justify-end">
          {/* Empty space for the right side, as the image already contains product visuals */}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
