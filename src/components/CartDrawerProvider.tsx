
import React from 'react';
import { useCart } from '@/contexts/CartContext';
import CartDrawer from './CartDrawer';

interface CartDrawerProviderProps {
  children: React.ReactNode;
}

const CartDrawerProvider: React.FC<CartDrawerProviderProps> = ({ children }) => {
  const { isCartOpen, closeCart } = useCart();

  return (
    <>
      {children}
      <CartDrawer open={isCartOpen} onClose={closeCart} />
    </>
  );
};

export default CartDrawerProvider;
