
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const NewArrivals = () => {
  return (
    <div className="bg-knude-50 py-16 mt-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center">
          {/* Left side - Text content */}
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
          
          {/* Right side - Single large photo */}
          <div className="lg:w-1/2">
            <Card className="overflow-hidden border-none shadow-lg">
              <img 
                src="/placeholder.svg" 
                alt="K-Beauty New Arrivals" 
                className="w-full h-auto rounded-lg object-cover"
              />
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewArrivals;
