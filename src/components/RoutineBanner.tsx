
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const RoutineBanner = () => {
  return (
    <div className="bg-white py-16 mt-8">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-knude-900 mb-6 font-serif leading-tight">
          Get started with our curated Korean Skincare Routine Sets!
        </h2>
        
        <div className="flex justify-center my-10">
          <img 
            src="/lovable-uploads/97726244-b008-42e5-ac19-0fd933e93b3d.png" 
            alt="Korean Skincare Routine Products"
            className="max-w-full h-auto"
          />
        </div>
        
        <div className="flex justify-center gap-10 mt-4 mb-8">
          <Link to="/shop/sets" className="text-lg text-knude-700 hover:text-knude-900 font-medium underline">
            5 Step
          </Link>
          <Link to="/shop/sets" className="text-lg text-knude-700 hover:text-knude-900 font-medium underline">
            10 Step
          </Link>
        </div>
        
        <Link to="/shop/sets">
          <Button className="uppercase bg-knude-700 hover:bg-knude-800 text-white">
            Shop Routine Sets
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default RoutineBanner;
