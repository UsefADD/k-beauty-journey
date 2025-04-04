
import React from 'react';
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const HeroSection = () => {
  return (
    <div className="bg-gradient-to-r from-purple-50 to-purple-200 py-16 min-h-[500px] relative overflow-hidden">
      <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center justify-between">
        <div className="w-full lg:w-1/2 text-left z-10 mb-8 lg:mb-0">
          <h1 className="text-6xl lg:text-8xl font-bold font-serif leading-none text-purple-900">
            LES ESSENTIELS<br />DE LA K-<br />BEAUTY
          </h1>
          <p className="mt-8 text-xl lg:text-2xl text-purple-600">
            Révélez votre éclat naturel<br />
            avec les secrets<br />
            de la beauté coréenne
          </p>
          <Button 
            variant="default" 
            className="mt-8 bg-purple-600 hover:bg-purple-700 text-white text-lg px-8 py-3" 
            onClick={() => document.getElementById('best-sellers')?.scrollIntoView({
              behavior: 'smooth'
            })}
          >
            Découvrir
          </Button>
        </div>
        <div className="lg:w-1/2 relative z-10">
          <div className="w-full max-w-md mx-auto lg:mx-0 lg:ml-auto transform scale-105 relative">
            <div className="absolute w-64 h-64 rounded-full bg-pink-200 opacity-60 -top-10 -right-10 z-0"></div>
            <div className="absolute w-48 h-48 rounded-full bg-purple-300 opacity-60 bottom-10 -left-10 z-0"></div>
            <AspectRatio ratio={1 / 1} className="bg-transparent relative z-10">
              <img 
                src="/lovable-uploads/3a07fe99-59ed-4493-b329-82c7eee6cbcf.png" 
                alt="K-Beauty Products Collection" 
                className="w-full h-full object-contain mix-blend-multiply" 
              />
            </AspectRatio>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
