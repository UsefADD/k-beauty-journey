import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

interface AddToCartDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AddToCartDialog: React.FC<AddToCartDialogProps> = ({ open, onOpenChange }) => {
  const navigate = useNavigate();
  const { t, isRTL } = useLanguage();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={isRTL ? 'rtl' : 'ltr'} dir={isRTL ? 'rtl' : 'ltr'}>
        <DialogHeader>
          <DialogTitle>{t('cart.product.added')}</DialogTitle>
        </DialogHeader>
        <div className="py-2 text-base">
          {t('cart.what.next')}
        </div>
        <DialogFooter className="gap-2">
          <Button
            className="flex-1"
            onClick={() => {
              onOpenChange(false);
              navigate("/cart");
            }}
          >
            {t('cart.go.to.cart')}
          </Button>
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => onOpenChange(false)}
          >
            {t('cart.continue.shopping')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddToCartDialog;