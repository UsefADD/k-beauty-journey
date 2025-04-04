
import React from 'react';
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <div className="bg-[#ffc0b1] py-16 min-h-[500px] relative overflow-hidden">
      <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center justify-between">
        <div className="w-full lg:w-1/2 text-left z-10 mb-8 lg:mb-0">
          <h1 className="text-6xl lg:text-8xl font-bold font-serif leading-tight tracking-tighter text-black">
            LES<br />ESSENTIELS<br />DE LA K-<br />BEAUTY
          </h1>
          <p className="mt-4 text-xl text-white font-light">
            Révélez votre éclat naturel<br />avec les secrets de la beauté coréenne
          </p>
          <div className="mt-16">
            <Button variant="link" className="text-white text-lg flex items-center gap-2 px-0" onClick={() => document.getElementById('best-sellers')?.scrollIntoView({
              behavior: 'smooth'
            })}>
              Learn more
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 5V19M12 19L5 12M12 19L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Button>
          </div>
        </div>
        <div className="w-full lg:w-1/2 relative z-10">
          <div className="relative">
            <img 
              src="/lovable-uploads/f421cb06-a023-41f7-a1e9-43c6c2fff9cc.png" 
              alt="K-Beauty Essentials Collection" 
              className="w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
