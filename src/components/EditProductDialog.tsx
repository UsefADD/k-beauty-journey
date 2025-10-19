import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  description: string;
  stock_quantity: number;
  product_type: string;
  skin_type?: string;
  skin_concern?: string;
  key_ingredient?: string;
}

interface ProductFormData {
  name: string;
  brand: string;
  price: string;
  description: string;
  stock_quantity: string;
  product_type: string;
  skin_type?: string;
  skin_concern?: string;
  key_ingredient?: string;
}

interface EditProductDialogProps {
  product: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const EditProductDialog = ({ product, open, onOpenChange }: EditProductDialogProps) => {
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset } = useForm<ProductFormData>();

  React.useEffect(() => {
    if (product) {
      reset({
        ...product,
        price: product.price.toString(),
        stock_quantity: product.stock_quantity.toString(),
      });
    }
  }, [product, reset]);

  const updateProduct = useMutation({
    mutationFn: async (data: ProductFormData) => {
      const { error } = await supabase
        .from('products')
        .update({
          name: data.name,
          brand: data.brand,
          price: Number(data.price) as any,
          description: data.description,
          stock_quantity: Number(data.stock_quantity) as any,
          product_type: data.product_type,
          skin_type: data.skin_type || null,
          skin_concern: data.skin_concern || null,
          key_ingredient: data.key_ingredient || null,
        })
        .eq('id', product?.id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success('Produit mis à jour avec succès');
      onOpenChange(false);
    },
    onError: (error) => {
      console.error('Error updating product:', error);
      toast.error('Erreur lors de la mise à jour du produit');
    },
  });

  const onSubmit = (data: ProductFormData) => {
    updateProduct.mutate(data);
  };

  if (!product) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Modifier le produit</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="name">Nom du produit</Label>
            <Input id="name" {...register('name', { required: true })} />
          </div>

          <div>
            <Label htmlFor="brand">Marque</Label>
            <Input id="brand" {...register('brand', { required: true })} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="price">Prix (MAD)</Label>
              <Input 
                id="price" 
                type="number" 
                step="0.01"
                {...register('price', { required: true })} 
              />
            </div>

            <div>
              <Label htmlFor="stock_quantity">Stock</Label>
              <Input 
                id="stock_quantity" 
                type="number"
                {...register('stock_quantity', { required: true })} 
              />
            </div>
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea 
              id="description" 
              rows={4}
              {...register('description')} 
            />
          </div>

          <div>
            <Label htmlFor="product_type">Type de produit</Label>
            <Input 
              id="product_type" 
              {...register('product_type', { required: true })} 
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="skin_type">Type de peau</Label>
              <Input id="skin_type" {...register('skin_type')} />
            </div>

            <div>
              <Label htmlFor="skin_concern">Préoccupation</Label>
              <Input id="skin_concern" {...register('skin_concern')} />
            </div>
          </div>

          <div>
            <Label htmlFor="key_ingredient">Ingrédient clé</Label>
            <Input id="key_ingredient" {...register('key_ingredient')} />
          </div>

          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
            >
              Annuler
            </Button>
            <Button type="submit" disabled={updateProduct.isPending}>
              {updateProduct.isPending ? 'Enregistrement...' : 'Enregistrer'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProductDialog;
