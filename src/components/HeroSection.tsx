
import React from 'react';
import { AspectRatio } from "@/components/ui/aspect-ratio";

const HeroSection = () => {
  return (
    <div className="relative w-full overflow-hidden">
      <AspectRatio ratio={16/9} className="w-full">
        <img 
          src="/lovable-uploads/f421cb06-a023-41f7-a1e9-43c6c2fff9cc.png" 
          alt="K-Beauty Essentials Collection" 
          className="w-full h-full object-cover"
          loading="eager"
          style={{ imageRendering: 'high-quality' }}
        />
      </AspectRatio>
    </div>
  );
};

export default HeroSection;
