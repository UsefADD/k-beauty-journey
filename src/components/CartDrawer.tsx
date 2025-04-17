
import React from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Trash2, X, ShoppingBag } from "lucide-react";
import { useCart } from '@/contexts/CartContext';
import { useLanguage } from '@/contexts/LanguageContext';

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ open, onClose }) => {
  const { items, removeItem, updateQuantity, totalPrice, totalItems } = useCart();
  const { t } = useLanguage();
  
  const handleClose = () => {
    onClose();
  };
  
  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader className="border-b pb-4 mb-4">
          <SheetTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5" />
              <span>{t('your.cart')} ({totalItems})</span>
            </div>
            <SheetClose className="rounded-full p-1 hover:bg-gray-100">
              <X className="h-5 w-5" />
            </SheetClose>
          </SheetTitle>
        </SheetHeader>
        
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <ShoppingBag className="h-12 w-12 text-gray-300 mb-2" />
            <h3 className="text-lg font-medium">{t('cart.empty')}</h3>
            <p className="text-sm text-gray-500 mb-4">{t('cart.start.shopping')}</p>
            <Button onClick={() => {
              handleClose();
              window.location.href = '/shop';
            }}>
              {t('continue.shopping')}
            </Button>
          </div>
        ) : (
          <>
            <div className="space-y-4 mb-6">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-4 border-b pb-4">
                  <div className="h-16 w-16 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
                    <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium truncate">{item.name}</h4>
                    <p className="text-sm text-gray-500 mt-1">{item.price.toFixed(2)} MAD</p>
                    <div className="flex items-center mt-2">
                      <button 
                        className="w-6 h-6 flex items-center justify-center border rounded-l-md"
                        onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                      >
                        -
                      </button>
                      <span className="w-8 h-6 flex items-center justify-center border-t border-b">
                        {item.quantity}
                      </span>
                      <button 
                        className="w-6 h-6 flex items-center justify-center border rounded-r-md"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button 
                    className="text-gray-400 hover:text-red-500 transition-colors"
                    onClick={() => removeItem(item.id)}
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              ))}
            </div>
            
            <div className="border-t pt-4">
              <div className="flex justify-between mb-2">
                <span>{t('subtotal')}</span>
                <span>{totalPrice.toFixed(2)} MAD</span>
              </div>
              <Button className="w-full mt-4" onClick={() => {
                handleClose();
                window.location.href = '/payment';
              }}>
                {t('checkout')}
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
