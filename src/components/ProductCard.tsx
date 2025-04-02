
import React from 'react';
import { Heart } from 'lucide-react';

interface ProductCardProps {
  id: number;
  name: string;
  brand: string;
  price: number;
  image: string;
}

const ProductCard = ({ id, name, brand, price, image }: ProductCardProps) => {
  return (
    <div className="group relative">
      <div className="aspect-square w-full overflow-hidden rounded-lg bg-knude-100 transition-all duration-300 group-hover:opacity-90">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute top-4 right-4 p-2 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
          <Heart className="h-5 w-5 text-knude-500 hover:text-knude-700 cursor-pointer transition-colors" />
        </div>
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm text-knude-700">
            <span className="font-medium text-knude-600 uppercase text-xs">{brand}</span>
            <p className="font-medium text-knude-900 mt-1">{name}</p>
          </h3>
        </div>
        <p className="text-sm font-medium text-knude-900">${price.toFixed(2)}</p>
      </div>
      <button className="mt-2 w-full py-2 text-sm font-medium text-knude-700 border border-knude-300 rounded-md hover:bg-knude-700 hover:text-white transition-colors opacity-0 group-hover:opacity-100">
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
