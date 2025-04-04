
import React from 'react';
import { AspectRatio } from "@/components/ui/aspect-ratio";

const HeroSection = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <img 
        src="/lovable-uploads/96bd7d31-ad5b-415b-af2a-51ec79980cad.png" 
        alt="K-Beauty Essentials Collection" 
        className="w-full h-full object-cover absolute inset-0"
        loading="eager"
      />
    </div>
  );
};

export default HeroSection;
