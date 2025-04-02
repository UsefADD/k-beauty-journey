
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
          <div className="lg:w-1/2 grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <img 
                  src="/placeholder.svg" 
                  alt="Mediheal Face Mask" 
                  className="w-full h-auto rounded"
                />
                <h3 className="text-sm font-medium mt-2 text-knude-900">Mediheal Mask</h3>
                <p className="text-knude-600 text-xs">$12.99</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <img 
                  src="/placeholder.svg" 
                  alt="IOPE Serum" 
                  className="w-full h-auto rounded"
                />
                <h3 className="text-sm font-medium mt-2 text-knude-900">IOPE Bio Essence</h3>
                <p className="text-knude-600 text-xs">$49.99</p>
              </div>
            </div>
            <div className="space-y-4 pt-6">
              <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <img 
                  src="/placeholder.svg" 
                  alt="Arencia Product" 
                  className="w-full h-auto rounded"
                />
                <h3 className="text-sm font-medium mt-2 text-knude-900">Arencia Cream</h3>
                <p className="text-knude-600 text-xs">$34.99</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <img 
                  src="/placeholder.svg" 
                  alt="Abib Product" 
                  className="w-full h-auto rounded"
                />
                <h3 className="text-sm font-medium mt-2 text-knude-900">Abib Toner</h3>
                <p className="text-knude-600 text-xs">$28.99</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewArrivals;
