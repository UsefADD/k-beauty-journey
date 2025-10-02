
import React from 'react';
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useCart } from '../contexts/CartContext';

interface ProductCardProps {
  id: number | string;
  name: string;
  brand: string;
  price: number;
  image: string;
  stock_quantity?: number;
  volume?: string | null;
}

const ProductCard = ({
  id,
  name,
  brand,
  price,
  image,
  stock_quantity,
  volume
}: ProductCardProps) => {
  console.info('Render: ProductCard');
  const { addItem } = useCart();
  const isOutOfStock = !stock_quantity || stock_quantity <= 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isOutOfStock) {
      addItem({
        id: id.toString(),
        name,
        price,
        image,
      });
    }
  };

  return (
    <div className="group relative">
      <Link to={`/product/${id}`} className="block">
        <div className="aspect-square w-full overflow-hidden rounded-lg bg-cream-100 transition-all duration-300 group-hover:opacity-90">
          <img src={image} alt={name} className="h-full w-full object-cover object-center" />
          {isOutOfStock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold">
                Stock épuisé
              </span>
            </div>
          )}
          <div className="absolute top-4 right-4 p-2 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
            <Heart className="h-5 w-5 text-pink-500 hover:text-pink-700 cursor-pointer transition-colors" />
          </div>
        </div>
        <div className="mt-4 flex justify-between">
          <div>
            <h3 className="text-sm text-zinc-900">
              <span className="font-medium uppercase text-xs text-zinc-950">{brand}</span>
              <p className="font-medium mt-1 text-zinc-900">{name}</p>
              {volume && <p className="text-xs text-gray-600 mt-0.5">{volume}</p>}
            </h3>
          </div>
          <p className="text-sm font-medium text-zinc-950">{price.toFixed(2)} MAD</p>
        </div>
      </Link>
      <Button 
        onClick={handleAddToCart}
        className="mt-2 w-full opacity-0 group-hover:opacity-100 transition-opacity"
        variant="default"
        disabled={isOutOfStock}
      >
        {isOutOfStock ? "Stock épuisé" : "Add to Cart"}
      </Button>
    </div>
  );
};

export default ProductCard;
