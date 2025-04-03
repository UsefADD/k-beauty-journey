
import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

const RoutineBanner = () => {
  const [showAll, setShowAll] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  const skincareProducts = [{
    id: 0,
    alt: "Skincare serum bottle",
    src: "/lovable-uploads/3eec9cf5-51f5-4226-bffc-88d99d5bf83d.png"
  }, {
    id: 1,
    alt: "Skincare cream jar",
    src: "/lovable-uploads/2b8e8981-e46b-4281-b85d-36a2136518da.png"
  }, {
    id: 2,
    alt: "Skincare bottle with dropper",
    src: "/lovable-uploads/23ac0574-5929-4097-8940-9a5d222dc69e.png"
  }, {
    id: 3,
    alt: "Skincare tube product",
    src: "/lovable-uploads/b8a870c6-140a-445b-958f-ad9de03eb52a.png"
  }, {
    id: 4,
    alt: "Skincare ointment tube",
    src: "/lovable-uploads/3f8687b9-677f-4a44-9351-7ad103dcc6a3.png"
  }, {
    id: 5,
    alt: "Skincare toner bottle",
    src: "/lovable-uploads/45aa9abb-88dd-494a-b9f3-e73bc3cc5d32.png"
  }, {
    id: 6,
    alt: "Skincare cleanser bottle",
    src: "/lovable-uploads/bd018877-6012-48c9-aea2-701ebf7bc5dd.png"
  }, {
    id: 7,
    alt: "Skincare cream tube",
    src: "/lovable-uploads/543c8629-f480-46f4-aa40-5a0a54fefbe4.png"
  }, {
    id: 8,
    alt: "Skincare spray bottle",
    src: "/lovable-uploads/2e3f0b7a-0103-4602-9efe-fabce75ae855.png"
  }, {
    id: 9,
    alt: "Skincare product box",
    src: "/lovable-uploads/bbdb6c0f-d628-4c48-a3b8-96ec25b14d4f.png"
  }];
  
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = 0;
    }
  }, [showAll]);
  
  const show5Step = () => setShowAll(false);
  const show10Step = () => setShowAll(true);
  
  return <div className="bg-white py-16 mt-8">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-cream-900 mb-8 font-serif leading-tight">
          Get started with our curated Korean Skincare Routine Sets!
        </h2>
        
        <div className="flex justify-center gap-10 mt-4 mb-8">
          <button onClick={show5Step} className={`text-lg ${!showAll ? 'text-cream-900 font-bold' : 'text-cream-700'} hover:text-cream-900 font-medium underline`}>
            5 Step
          </button>
          <button onClick={show10Step} className={`text-lg ${showAll ? 'text-cream-900 font-bold' : 'text-cream-700'} hover:text-cream-900 font-medium underline`}>
            10 Step
          </button>
        </div>
        
        <ScrollArea className="w-full max-w-6xl mx-auto mb-10">
          <div className="flex justify-center flex-wrap gap-2 px-2 py-2">
            {skincareProducts.slice(0, showAll ? 10 : 5).map((product) => (
              <div key={product.id} className="flex flex-col items-center w-16 sm:w-20">
                <div className="w-16 h-16 sm:w-20 sm:h-20 mb-1 flex items-center justify-center">
                  <img 
                    src={product.src} 
                    alt={product.alt} 
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <span className="text-xs sm:text-sm font-medium text-cream-700">Step {product.id + 1}</span>
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="mt-8">
          <Link to="/shop/sets">
            <Button variant="default" size="lg" className="bg-pink-700 hover:bg-pink-800 text-white">
              Shop Routine Sets
            </Button>
          </Link>
        </div>
      </div>
    </div>;
};

export default RoutineBanner;
