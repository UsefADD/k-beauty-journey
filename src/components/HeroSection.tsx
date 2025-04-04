
import React from 'react';
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <div 
      className="bg-gradient-to-r from-pink-100 to-pink-300 py-16 min-h-[500px]"
    >
      <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center">
        <div className="lg:w-1/2 text-center lg:text-left">
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
        <div className="lg:w-1/2 mt-16 lg:mt-0 relative h-[500px]">
          <img 
            src="https://storage.googleapis.com/a1aa/image/nq0-e9r2OJdnequ3MtGCSg4k3Bz7S1YdZ-iY3XfgXR4.jpg" 
            alt="Anua Serum Anti-Tache" 
            className="absolute top-0 right-0 transform translate-x-16 -translate-y-16 w-[200px] h-[400px] object-cover"
          />
          <img 
            src="https://storage.googleapis.com/a1aa/image/z-RF6w-WZrnpxhCThNRqCJrxxgrdOZ6YWKpEB-5KYLo.jpg" 
            alt="Cosrx Lotion Tonifiant" 
            className="absolute bottom-0 right-0 transform translate-x-16 translate-y-16 w-[200px] h-[400px] object-cover"
          />
          <img 
            src="https://storage.googleapis.com/a1aa/image/P1FquTBI1w3E0xecLtefH3njM2TJ3Z60n3fejroXsVY.jpg" 
            alt="Klairs Vitamin C" 
            className="absolute bottom-0 right-0 transform translate-x-32 translate-y-32 w-[200px] h-[400px] object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
