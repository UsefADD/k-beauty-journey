import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
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
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { useProductImages } from '@/hooks/useProductImages';
import { Upload, X } from 'lucide-react';
import { useImageUpload } from '@/hooks/useImageUpload';

interface Product {
  id: string;
  Product_name?: string;
  name?: string;
  brand: string;
  price: any;
  description: string;
  stock_quantity: number;
  product_type: string;
  product_subtype?: string;
  product_status?: 'new' | 'coming_soon' | 'standard';
  'skin type'?: string;
}

interface ProductFormData {
  name: string;
  brand: string;
  price: string;
  description: string;
  stock_quantity: string;
  product_type: string;
  product_subtype?: string;
  product_status?: 'new' | 'coming_soon' | 'standard';
  skin_type?: string;
  skin_concern?: string;
  key_ingredient?: string;
  seasons: string[];
}

interface EditProductDialogProps {
  product: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const EditProductDialog = ({ product, open, onOpenChange }: EditProductDialogProps) => {
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset, watch, setValue } = useForm<ProductFormData>();
  const { data: productImages = [] } = useProductImages(product?.id || '');
  const { uploadImage, isUploading } = useImageUpload();
  const [selectedSeasons, setSelectedSeasons] = React.useState<string[]>([]);

  const { data: productSeasons } = useQuery({
    queryKey: ['product-seasons', product?.id],
    queryFn: async () => {
      if (!product?.id) return [];
      const { data, error } = await supabase
        .from('products')
        .select('seasons')
        .eq('id', product.id)
        .single();
      
      if (error) throw error;
      return data?.seasons || [];
    },
    enabled: !!product?.id && open,
  });

  React.useEffect(() => {
    if (product) {
      reset({
        name: (product as any).Product_name || (product as any).name || '',
        brand: product.brand || '',
        price: product.price?.toString?.() ?? '',
        description: product.description || '',
        stock_quantity: product.stock_quantity != null ? String(product.stock_quantity) : '',
        product_type: product.product_type || '',
        product_subtype: product.product_subtype || '',
        product_status: product.product_status || 'standard',
        skin_type: (product as any)['skin type'] || '',
        skin_concern: '',
        key_ingredient: '',
        seasons: [],
      });
    }
  }, [product, reset]);

  React.useEffect(() => {
    if (productSeasons) {
      setSelectedSeasons(productSeasons);
      setValue('seasons', productSeasons);
    }
  }, [productSeasons, setValue]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !product) return;

    try {
      const imageUrl = await uploadImage(file);
      
      if (!imageUrl) return;

      const maxOrder = productImages.length > 0 
        ? Math.max(...productImages.map(img => img.display_order))
        : -1;

      const { error } = await supabase
        .from('product_images')
        .insert({
          product_id: product.id,
          image_url: imageUrl,
          display_order: maxOrder + 1,
        });

      if (error) throw error;

      queryClient.invalidateQueries({ queryKey: ['product-images', product.id] });
      toast.success('Image ajoutée avec succès');
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Erreur lors de l\'ajout de l\'image');
    }
  };

  const handleDeleteImage = async (imageId: string) => {
    try {
      const { error } = await supabase
        .from('product_images')
        .delete()
        .eq('id', imageId);

      if (error) throw error;

      queryClient.invalidateQueries({ queryKey: ['product-images', product?.id] });
      toast.success('Image supprimée avec succès');
    } catch (error) {
      console.error('Error deleting image:', error);
      toast.error('Erreur lors de la suppression de l\'image');
    }
  };

  const updateProduct = useMutation({
    mutationFn: async (data: ProductFormData) => {
      const { error } = await supabase
        .from('products')
        .update({
          Product_name: data.name || null,
          brand: data.brand || null,
          price: (data.price ?? '').toString() || null,
          description: data.description || null,
          stock_quantity: data.stock_quantity !== undefined && data.stock_quantity !== null && data.stock_quantity !== '' ? Number(data.stock_quantity) as any : null,
          product_type: data.product_type || null,
          product_subtype: data.product_subtype || null,
          product_status: data.product_status || 'standard',
          ['skin type']: data.skin_type || null,
          seasons: selectedSeasons,
        })
        .eq('id', product?.id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success('Produit mis à jour avec succès');
      onOpenChange(false);
    },
    onError: (error: any) => {
      console.error('Error updating product:', error);
      const message = error?.message || error?.cause?.message || 'Erreur lors de la mise à jour du produit';
      toast.error(message);
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

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="product_type">Type de produit</Label>
              <Input 
                id="product_type" 
                {...register('product_type')} 
              />
            </div>

            <div>
              <Label htmlFor="product_subtype">Sous-type de produit</Label>
              <Input 
                id="product_subtype" 
                {...register('product_subtype')} 
              />
            </div>
          </div>

          <div>
            <Label htmlFor="product_status">Statut du produit</Label>
            <select 
              id="product_status"
              {...register('product_status')}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <option value="new">Nouveau</option>
              <option value="coming_soon">Bientôt disponible</option>
              <option value="standard">Standard</option>
            </select>
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

          <div>
            <Label>Saisons</Label>
            <div className="grid grid-cols-2 gap-4 mt-2">
              {['Printemps', 'Été', 'Automne', 'Hiver'].map((season) => (
                <div key={season} className="flex flex-row items-center space-x-2">
                  <Checkbox
                    checked={selectedSeasons.includes(season)}
                    onCheckedChange={(checked) => {
                      const updated = checked
                        ? [...selectedSeasons, season]
                        : selectedSeasons.filter((s) => s !== season);
                      setSelectedSeasons(updated);
                      setValue('seasons', updated);
                    }}
                  />
                  <Label className="font-normal cursor-pointer">
                    {season}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <Label>Images du produit</Label>
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                {productImages.map((image) => (
                  <div key={image.id} className="relative group">
                    <img
                      src={image.image_url}
                      alt="Product"
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <Button
                      type="button"
                      size="icon"
                      variant="destructive"
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6"
                      onClick={() => handleDeleteImage(image.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
              
              <div>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUploading}
                  className="hidden"
                  id="image-upload"
                />
                <Label htmlFor="image-upload">
                  <Button
                    type="button"
                    variant="outline"
                    disabled={isUploading}
                    className="w-full"
                    onClick={() => document.getElementById('image-upload')?.click()}
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    {isUploading ? 'Téléchargement...' : 'Ajouter une image'}
                  </Button>
                </Label>
              </div>
            </div>
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
