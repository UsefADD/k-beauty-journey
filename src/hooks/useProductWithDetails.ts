import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface ProductImage {
  image_url?: string;
  display_order?: number;
}

export interface ProductVariant {
  volume?: string;
  price?: number;
  stock_quantity?: number;
}

export interface ProductWithDetails {
  Product_name: string;
  brand: string;
  price: string;
  description?: string;
  product_type?: string;
  product_subtype?: string;
  how_to_use?: string;
  ingredients?: string;
  volume?: string;
  images: ProductImage[];
  variants: ProductVariant[];
}

export const useProductWithDetails = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const addProductWithDetails = useMutation({
    mutationFn: async (productData: ProductWithDetails) => {
      // Step 1: Insert the product
      const { data: product, error: productError } = await supabase
        .from('products')
        .insert([{
          Product_name: productData.Product_name,
          brand: productData.brand,
          price: productData.price,
          description: productData.description || '',
          product_type: productData.product_type || '',
          product_subtype: productData.product_subtype || '',
          how_to_use: productData.how_to_use || '',
          ingredients: productData.ingredients || '',
          volume: productData.volume || '',
        }])
        .select()
        .single();

      if (productError) throw productError;
      if (!product) throw new Error('Failed to create product');

      const productId = product.id;

      // Step 2: Insert product images if provided
      if (productData.images && productData.images.length > 0) {
        const imagesToInsert = productData.images
          .filter(img => img.image_url && img.image_url.trim() !== '')
          .map(img => ({
            product_id: productId,
            image_url: img.image_url!,
            display_order: img.display_order ?? 0,
          }));

        if (imagesToInsert.length > 0) {
          const { error: imagesError } = await supabase
            .from('product_images')
            .insert(imagesToInsert);

          if (imagesError) throw imagesError;
        }
      }

      // Step 3: Insert product variants if provided
      if (productData.variants && productData.variants.length > 0) {
        const variantsToInsert = productData.variants
          .filter(variant => variant.volume && variant.volume.trim() !== '')
          .map(variant => ({
            product_id: productId,
            volume: variant.volume!,
            price: variant.price ?? 0,
            stock_quantity: variant.stock_quantity ?? 0,
          }));

        if (variantsToInsert.length > 0) {
          const { error: variantsError } = await supabase
            .from('product_variants')
            .insert(variantsToInsert);

          if (variantsError) throw variantsError;
        }
      }

      return product;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast({
        title: "Produit ajouté",
        description: "Le produit avec ses images et variantes a été ajouté avec succès.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Erreur",
        description: `Échec de l'ajout du produit: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  return {
    addProductWithDetails,
  };
};
