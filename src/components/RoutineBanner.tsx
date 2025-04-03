
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const RoutineBanner = () => {
  const [showAll, setShowAll] = useState(true);
  
  const skincareProducts = [{
    id: 0,
    alt: "Skincare serum bottle",
    src: "/lovable-uploads/cf1bd19f-3f65-443c-84a4-2be48fe142cd.png"
  }, {
    id: 1,
    alt: "Skincare cream jar",
    src: "/lovable-uploads/55aa6f6d-0a03-4365-808e-a758c3a0098f.png"
  }, {
    id: 2,
    alt: "Skincare bottle with dropper",
    src: "/lovable-uploads/4a10f030-fcba-449c-98f8-58d4c7a38580.png"
  }, {
    id: 3,
    alt: "Skincare tube product",
    src: "/lovable-uploads/99dbaf2d-d503-4f8a-8e98-93172fb77124.png"
  }, {
    id: 4,
    alt: "Skincare ointment tube",
    src: "/lovable-uploads/41330e03-a806-4f90-96ce-12336f3d878f.png"
  }, {
    id: 5,
    alt: "Skincare toner bottle",
    src: "/lovable-uploads/d27fdee5-66ef-4a44-8727-fd5143946de2.png"
  }, {
    id: 6,
    alt: "Skincare cleanser bottle",
    src: "/lovable-uploads/961cc2ff-8afd-4664-a281-148a337902b7.png"
  }, {
    id: 7,
    alt: "Skincare cream tube",
    src: "/lovable-uploads/83c3f421-5c6c-425d-a367-f86a52a6958f.png"
  }, {
    id: 8,
    alt: "Skincare spray bottle",
    src: "/lovable-uploads/dde91023-8691-43f3-81b2-1d31449ecf53.png"
  }, {
    id: 9,
    alt: "Skincare product box",
    src: "/lovable-uploads/b98adfac-063f-4525-9cd0-82d4b087a9ad.png"
  }];
  
  const show5Step = () => setShowAll(false);
  const show10Step = () => setShowAll(true);
  
  return <div className="bg-white py-16 mt-8">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-knude-900 mb-8 font-serif leading-tight">
          Get started with our curated Korean Skincare Routine Sets!
        </h2>
        
        <div className="flex justify-center gap-10 mt-4 mb-8">
          <button onClick={show5Step} className={`text-lg ${!showAll ? 'text-knude-900 font-bold' : 'text-knude-700'} hover:text-knude-900 font-medium underline`}>
            5 Step
          </button>
          <button onClick={show10Step} className={`text-lg ${showAll ? 'text-knude-900 font-bold' : 'text-knude-700'} hover:text-knude-900 font-medium underline`}>
            10 Step
          </button>
        </div>
        
        <div className="max-w-4xl mx-auto mb-10">
          <div className="grid grid-cols-5 gap-4 md:gap-8">
            {skincareProducts.slice(0, showAll ? 10 : 5).map((product) => (
              <div key={product.id} className="flex flex-col items-center">
                <div className="w-20 h-20 md:w-24 md:h-24 mb-2 flex items-center justify-center">
                  <img 
                    src={product.src} 
                    alt={product.alt} 
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <span className="text-xs text-knude-700">Step {product.id + 1}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8">
          <Link to="/shop/sets">
            <Button variant="default" size="lg" className="bg-knude-700 hover:bg-knude-800 text-white">
              Shop Routine Sets
            </Button>
          </Link>
        </div>
      </div>
    </div>;
};

export default RoutineBanner;
