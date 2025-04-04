
import React from 'react';
import { AspectRatio } from "@/components/ui/aspect-ratio";

const HeroSection = () => {
  return (
    <div className="relative w-full overflow-hidden">
      <AspectRatio ratio={16/9} className="w-full max-h-[80vh]">
        <img 
          src="/lovable-uploads/96bd7d31-ad5b-415b-af2a-51ec79980cad.png" 
          alt="K-Beauty Essentials Collection" 
          className="w-full h-full object-contain"
          loading="eager"
        />
      </AspectRatio>
    </div>
  );
};

export default HeroSection;
