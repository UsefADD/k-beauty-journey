import React from 'react';
import { ShoppingBag, Gift, Truck } from 'lucide-react';

const ServicesSection = () => {
  return (
    <div className="bg-white py-8 border-t border-gray-200">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-center justify-center md:justify-start gap-4">
            <ShoppingBag className="w-8 h-8 text-black flex-shrink-0" />
            <span className="text-black font-medium text-center md:text-left">
              Expédition le jour même
            </span>
          </div>
          
          <div className="flex items-center justify-center gap-4">
            <Gift className="w-8 h-8 text-black flex-shrink-0" />
            <span className="text-black font-medium text-center">
              Masque gratuit à partir de 400 dhs
            </span>
          </div>
          
          <div className="flex items-center justify-center md:justify-end gap-4">
            <Truck className="w-8 h-8 text-black flex-shrink-0" />
            <span className="text-black font-medium text-center md:text-right">
              Livraison gratuite à partir de 800 dhs
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesSection;