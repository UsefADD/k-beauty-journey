
import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { Button } from "@/components/ui/button";

const CartIcon = () => {
  const { totalItems, toggleCart } = useCart();

  return (
    <Button variant="ghost" size="icon" onClick={toggleCart} className="relative">
      <ShoppingBag className="h-5 w-5" />
      {totalItems > 0 && (
        <span className="absolute -top-1 -right-1 bg-pink-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
          {totalItems}
        </span>
      )}
    </Button>
  );
};

export default CartIcon;
