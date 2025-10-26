
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
  product_status?: 'new' | 'coming_soon' | 'standard' | null;
}

const ProductCard = ({
  id,
  name,
  brand,
  price,
  image,
  stock_quantity,
  volume,
  product_status
}: ProductCardProps) => {
  console.info('Render: ProductCard');
  const { addItem } = useCart();
  const isOutOfStock = !stock_quantity || stock_quantity <= 0;
  const isComingSoon = product_status === 'coming_soon';

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

  const cardContent = (
    <>
      <div className="aspect-square w-full overflow-hidden rounded-lg bg-cream-100 transition-all duration-300 group-hover:opacity-90 relative">
        <img
          src={image}
          alt={name}
          className={`h-full w-full object-cover object-center ${isOutOfStock ? 'opacity-60' : ''}`}
          onError={(e) => { e.currentTarget.src = '/placeholder.svg'; }}
        />
        {isOutOfStock && !isComingSoon && (
          <div className="absolute top-2 left-2 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold z-10">
            ÉPUISÉ
          </div>
        )}
        {product_status === 'new' && !isOutOfStock && !isComingSoon && (
          <div className="absolute top-2 left-2 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">
            NOUVEAU
          </div>
        )}
        {!isComingSoon && !isOutOfStock && (
          <div className="absolute top-4 right-4 p-2 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
            <Heart className="h-5 w-5 text-pink-500 hover:text-pink-700 cursor-pointer transition-colors" />
          </div>
        )}
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm text-zinc-900">
            <span className="font-medium uppercase text-xs text-zinc-950">{brand}</span>
            <p className="font-medium mt-1 text-zinc-900">{name}</p>
            {volume && <p className="text-xs text-gray-600 mt-0.5">{volume}</p>}
          </h3>
        </div>
        {!isOutOfStock && !isComingSoon && (
          <p className="text-sm font-medium text-zinc-950">{price.toFixed(2)} MAD</p>
        )}
      </div>
    </>
  );

  return (
    <div className="group relative">
      {isComingSoon ? (
        <div className="block cursor-default">
          {cardContent}
        </div>
      ) : (
        <Link to={`/product/${id}`} className="block">
          {cardContent}
        </Link>
      )}
      {!isComingSoon && (
        <Button 
          onClick={handleAddToCart}
          className="mt-2 w-full opacity-0 group-hover:opacity-100 transition-opacity"
          variant="default"
          disabled={isOutOfStock}
        >
          {isOutOfStock ? "Stock épuisé" : "Add to Cart"}
        </Button>
      )}
    </div>
  );
};

export default ProductCard;
