
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const NewArrivals = () => {
  return (
    <div className="bg-knude-50 py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 mb-10 lg:mb-0 pr-0 lg:pr-12">
            <h2 className="text-4xl md:text-5xl font-bold text-knude-900 mb-6 font-serif leading-tight">
              Hot New<br />K-Beauty Arrivals
            </h2>
            <p className="text-lg text-knude-800 mb-8 max-w-xl">
              Fresh drops from your favorite brands! Mediheal, IOPE, 
              Arencia, and Abib bring you the latest in K-beauty innovation.
            </p>
            <Link to="/shop/newly-curated">
              <Button className="uppercase bg-white hover:bg-knude-100 text-knude-900 border border-knude-300">
                Shop Newly Curated
              </Button>
            </Link>
          </div>
          <div className="lg:w-1/2">
            <div className="relative">
              <img 
                src="/lovable-uploads/78bb1641-521c-494d-8d63-2f0bde49efbd.png" 
                alt="Arencia Holy Hyssop Serum 3D" 
                className="w-full max-w-lg mx-auto rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewArrivals;
