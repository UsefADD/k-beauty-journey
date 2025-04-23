import React from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface AddToCartDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AddToCartDialog: React.FC<AddToCartDialogProps> = ({ open, onOpenChange }) => {
  const navigate = useNavigate();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Product Added to Cart</DialogTitle>
        </DialogHeader>
        <div className="py-2 text-base">
          What would you like to do next?
        </div>
        <DialogFooter className="gap-2">
          <Button
            className="flex-1"
            onClick={() => {
              onOpenChange(false);
              navigate("/cart");
            }}
          >
            Go to Cart
          </Button>
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => onOpenChange(false)}
          >
            Continue Shopping
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddToCartDialog;
