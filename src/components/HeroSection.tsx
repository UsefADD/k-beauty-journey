
import React from 'react';
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const HeroSection = () => {
  return (
    <div 
      className="bg-gradient-to-r from-pink-100 to-pink-300 py-16 min-h-[500px] relative overflow-hidden"
    >
      <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center">
        <div className="lg:w-1/2 relative z-10 mb-8 lg:mb-0">
          <div className="w-full max-w-md mx-auto lg:mx-0">
            <img
              src="/lovable-uploads/3a07fe99-59ed-4493-b329-82c7eee6cbcf.png"
              alt="K-Beauty Products Collection"
              className="w-full object-contain mix-blend-multiply"
              style={{ maxHeight: '400px' }}
            />
          </div>
        </div>
        <div className="w-full lg:w-1/2 text-left z-10">
          <h1 className="text-6xl lg:text-8xl font-bold font-serif leading-none">
            LES ESSENTIELS<br />DE LA K-<br />BEAUTY
          </h1>
          <p className="mt-8 text-xl lg:text-2xl text-white">
            Révélez votre éclat naturel avec les secrets de la beauté coréenne
          </p>
          <Button 
            variant="link" 
            className="mt-8 text-white text-lg lg:text-xl flex items-center gap-2"
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
  );
};

export default HeroSection;
