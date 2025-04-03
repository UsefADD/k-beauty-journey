
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const RoutineBanner = () => {
  const [showAll, setShowAll] = useState(true);
  
  const skincareProducts = [
    { id: 1, alt: "Cleanser tube", name: "Cleanser", src: "/lovable-uploads/1fce050d-7687-4a22-b079-15a6f83570c7.png" },
    { id: 2, alt: "Toner bottle", name: "Toner", src: "/lovable-uploads/1fce050d-7687-4a22-b079-15a6f83570c7.png" },
    { id: 3, alt: "Essence bottle", name: "Essence", src: "/lovable-uploads/1fce050d-7687-4a22-b079-15a6f83570c7.png" },
    { id: 4, alt: "Serum bottle", name: "Serum", src: "/lovable-uploads/1fce050d-7687-4a22-b079-15a6f83570c7.png" },
    { id: 5, alt: "Moisturizer bottle", name: "Moisturizer", src: "/lovable-uploads/1fce050d-7687-4a22-b079-15a6f83570c7.png" },
    { id: 6, alt: "Sunscreen tube", name: "Sunscreen", src: "/lovable-uploads/1fce050d-7687-4a22-b079-15a6f83570c7.png" },
    { id: 7, alt: "Eye cream", name: "Eye Cream", src: "/lovable-uploads/1fce050d-7687-4a22-b079-15a6f83570c7.png" },
    { id: 8, alt: "Face mask", name: "Face Mask", src: "/lovable-uploads/1fce050d-7687-4a22-b079-15a6f83570c7.png" },
    { id: 9, alt: "Night cream", name: "Night Cream", src: "/lovable-uploads/1fce050d-7687-4a22-b079-15a6f83570c7.png" },
    { id: 10, alt: "Exfoliator", name: "Exfoliator", src: "/lovable-uploads/1fce050d-7687-4a22-b079-15a6f83570c7.png" },
  ];
  
  const show5Step = () => setShowAll(false);
  const show10Step = () => setShowAll(true);

  return (
    <div className="bg-white py-16 mt-8">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-knude-900 mb-8 font-serif leading-tight">
          Get started with our curated Korean Skincare Routine Sets!
        </h2>
        
        <div className="flex justify-center gap-4 flex-wrap mb-6 max-w-4xl mx-auto">
          {skincareProducts.map((product, index) => (
            <Link 
              key={product.id} 
              to={`/shop/sets/product/${product.id}`}
              className={`transition-transform hover:scale-105 flex flex-col items-center ${!showAll && index >= 5 ? 'hidden' : ''}`}
            >
              <div className="relative bg-white p-3 rounded-lg overflow-hidden">
                <img 
                  src={product.src} 
                  alt={product.alt} 
                  className="h-20 md:h-24 w-auto object-contain max-w-full"
                  loading={index < 5 ? "eager" : "lazy"}
                  draggable="false"
                />
              </div>
              <span className="mt-2 text-sm text-knude-800 font-medium">{product.name}</span>
            </Link>
          ))}
        </div>
        
        <div className="flex justify-center gap-10 mt-4 mb-8">
          <button 
            onClick={show5Step}
            className={`text-lg ${!showAll ? 'text-knude-900 font-bold' : 'text-knude-700'} hover:text-knude-900 font-medium underline`}
          >
            5 Step
          </button>
          <button 
            onClick={show10Step}
            className={`text-lg ${showAll ? 'text-knude-900 font-bold' : 'text-knude-700'} hover:text-knude-900 font-medium underline`}
          >
            10 Step
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoutineBanner;
