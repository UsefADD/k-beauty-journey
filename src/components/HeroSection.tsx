
import React from 'react';
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <div 
      className="bg-cover bg-center py-20 md:py-32 relative min-h-[500px] flex items-center"
      style={{ 
        backgroundImage: "url('/lovable-uploads/6b6ec213-3966-4284-a5b6-c7980f3baec0.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-30"></div>
      <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center relative z-10">
        <div className="lg:w-1/2 text-center lg:text-left mb-12 lg:mb-0">
          <h1 className="text-4xl text-white mb-6 font-serif leading-tight md:text-5xl font-bold">
            THE K-BEAUTY<br />ESSENTIALS
          </h1>
          <p className="text-lg text-white mb-8 max-w-xl">
            Begin your K-Beauty journey with our curated collection of essentials.
          </p>
          <Button 
            className="bg-white hover:bg-cream-100 text-cream-900 border border-cream-300 font-medium"
            onClick={() => window.location.href = '/shop/best-sellers'}
          >
            SHOP BEST SELLERS
          </Button>
        </div>
        <div className="lg:w-1/2 flex justify-center lg:justify-end">
          {/* Empty space for the right side */}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
