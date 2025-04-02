
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const RoutineBanner = () => {
  return (
    <div className="bg-white py-16 mt-8">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-knude-900 mb-8 font-serif leading-tight">
          Get started with our curated Korean Skincare Routine Sets!
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-10">
          <Link to="/shop/sets" className="transition-transform hover:scale-105">
            <img 
              src="/placeholder.svg" 
              alt="Cleanser" 
              className="rounded-lg shadow-md w-full h-auto"
            />
            <p className="mt-2 text-knude-700">Cleanser</p>
          </Link>
          <Link to="/shop/sets" className="transition-transform hover:scale-105">
            <img 
              src="/placeholder.svg" 
              alt="Toner" 
              className="rounded-lg shadow-md w-full h-auto"
            />
            <p className="mt-2 text-knude-700">Toner</p>
          </Link>
          <Link to="/shop/sets" className="transition-transform hover:scale-105">
            <img 
              src="/placeholder.svg" 
              alt="Serum" 
              className="rounded-lg shadow-md w-full h-auto"
            />
            <p className="mt-2 text-knude-700">Serum</p>
          </Link>
          <Link to="/shop/sets" className="transition-transform hover:scale-105">
            <img 
              src="/placeholder.svg" 
              alt="Moisturizer" 
              className="rounded-lg shadow-md w-full h-auto"
            />
            <p className="mt-2 text-knude-700">Moisturizer</p>
          </Link>
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
