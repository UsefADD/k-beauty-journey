
import React from 'react';
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

interface ProductCardProps {
  id: number | string;
  name: string;
  brand: string;
  price: number;
  image: string;
}

const ProductCard = ({
  id,
  name,
  brand,
  price,
  image
}: ProductCardProps) => {
  console.info('Render: ProductCard');
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id: id.toString(),
      name,
      price,
      image,
    });
  };

  return (
    <div className="group relative">
      <Link to={`/product/${id}`} className="block">
        <div className="aspect-square w-full overflow-hidden rounded-lg bg-cream-100 transition-all duration-300 group-hover:opacity-90">
          <img src={image} alt={name} className="h-full w-full object-cover object-center" />
          <div className="absolute top-4 right-4 p-2 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
            <Heart className="h-5 w-5 text-pink-500 hover:text-pink-700 cursor-pointer transition-colors" />
          </div>
        </div>
        <div className="mt-4 flex justify-between">
          <div>
            <h3 className="text-sm text-zinc-900">
              <span className="font-medium uppercase text-xs text-zinc-950">{brand}</span>
              <p className="font-medium mt-1 text-zinc-900">{name}</p>
            </h3>
          </div>
          <p className="text-sm font-medium text-zinc-950">{price.toFixed(2)} MAD</p>
        </div>
      </Link>
      <button 
        onClick={handleAddToCart}
        className="mt-2 w-full py-2 text-sm font-medium text-black border border-transparent rounded-md hover:bg-black hover:text-white active:bg-black active:text-white transition-all duration-200 opacity-0 group-hover:opacity-100"
        style={{
          background: 'linear-gradient(135deg, #fef3c7, #fce7f3)',
        }}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
