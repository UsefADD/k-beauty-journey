
import React from 'react';
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <div 
      className="bg-cover bg-center py-20 md:py-32 relative min-h-[500px] flex items-center"
      style={{ 
        backgroundImage: "url('/lovable-uploads/2c6a267b-fd4d-4f73-9e9c-9dbea640bbcd.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-transparent"></div>
      <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center relative z-10">
        <div className="lg:w-1/2 text-center lg:text-left mb-12 lg:mb-0">
          <h1 className="text-4xl text-black mb-6 font-serif leading-tight md:text-5xl font-bold">
            LES ESSENTIELS<br />DE LA K-<br />BEAUTY
          </h1>
          <p className="text-lg text-black mb-8 max-w-xl">
            Révélez votre éclat naturel avec les secrets de la beauté coréenne
          </p>
          <Button 
            className="bg-white hover:bg-cream-100 text-cream-900 border border-cream-300 font-medium"
            onClick={() => window.location.href = '/shop/best-sellers'}
          >
            SHOP BEST SELLERS
          </Button>
        </div>
        <div className="lg:w-1/2 flex justify-center lg:justify-end">
          <div className="flex flex-col items-end">
            <Button 
              variant="link" 
              className="text-black hover:text-black/70 mt-40 md:mt-48 lg:mt-64 flex items-center gap-2"
              onClick={() => document.getElementById('best-sellers')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Learn more
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 5V19M12 19L5 12M12 19L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
