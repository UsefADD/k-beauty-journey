
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

// Update the Product interface to match the actual database field names
export interface Product {
  id: string;
  Product_name: string;
  brand: string;
  price: number; // Changed from string | null to number
  image_url: string | null;
  description: string | null;
  "skin type": string | null;
  stock_quantity: number | null;
  product_type: string | null;
  product_subtype: string | null;
  skin_type_category: string[] | null;
  skin_concern_category: string[] | null;
  skin_concern_subcategory: string[] | null;
  how_to_use: string | null;
  ingredients: string | null;
  volume: string | null;
  product_status: 'new' | 'coming_soon' | 'standard' | null;
}

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchProducts = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      console.log('Fetching products from Supabase...');
      console.log('Supabase URL:', import.meta.env.VITE_SUPABASE_URL);
      console.log('Supabase key defined:', !!import.meta.env.VITE_SUPABASE_ANON_KEY);
      
      const { data, error } = await supabase
        .from('products')  // Changed from 'Products' to 'products' (lowercase)
        .select('*');
      
      if (error) {
        console.error('Error fetching products:', error);
        setError(error.message);
        toast({
          title: "Error",
          description: "Failed to load products. Please try again later.",
          variant: "destructive",
        });
        setProducts([]);
      } else {
        console.log('Products received from Supabase:', data);
        
        // Resolve primary images: use products.image_url if present, otherwise take first product_images by display_order
        let imageMap: Record<string, string> = {};
        if (data && data.length > 0) {
          const missingIds = (data as any[])
            .filter((p: any) => !p.image_url)
            .map((p: any) => p.id)
            .filter(Boolean);
          if (missingIds.length > 0) {
            const { data: images, error: imagesError } = await supabase
              .from('product_images')
              .select('product_id,image_url,display_order')
              .in('product_id', missingIds)
              .order('display_order', { ascending: true });
            if (imagesError) {
              console.warn('Could not fetch product_images for missing images:', imagesError);
            } else if (images && images.length > 0) {
              for (const img of images as any[]) {
                const pid = (img as any).product_id as string;
                if (pid && !imageMap[pid]) {
                  imageMap[pid] = ((img as any).image_url || '').toString().replace(/\$0$/, '').trim();
                }
              }
            }
          }
        }

        const productsWithId = data ? (data as any[]).map((product: any, index: number) => {
          const cleanedImage = product.image_url ? product.image_url.toString().replace(/\$0$/, '').trim() : '';
          const resolvedImage = cleanedImage || imageMap[product.id] || null;
          return {
            ...product,
            id: product.id || `product-${index}-${Date.now()}`,
            // Convert price from string like "289 dhs" to number
            price: product.price ? parseFloat(product.price.toString().replace(/[^\d.]/g, '')) || 0 : 0,
            image_url: resolvedImage,
          };
        }) : [];
        
        setProducts(productsWithId as Product[]);
        
        if (productsWithId.length === 0) {
          console.log('No products found in the database.');
          toast({
            title: "No Products",
            description: "No products found in the database.",
            variant: "default",
          });
        }
      }
    } catch (err: any) {
      console.error('Unexpected error:', err);
      setError(err.message);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again later.",
        variant: "destructive",
      });
      setProducts([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Test the Supabase connection independently
  const testConnection = async () => {
    try {
      console.log('Testing Supabase connection...');
      const { error } = await supabase.from('products').select('count');  // Changed from 'Products' to 'products' (lowercase)
      
      if (error) {
        console.error('Connection test failed:', error);
        return false;
      }
      
      console.log('Connection test successful');
      return true;
    } catch (err) {
      console.error('Connection test error:', err);
      return false;
    }
  };

  useEffect(() => {
    fetchProducts();
    testConnection();
  }, []);

  const fetchSingleProduct = async (productId: string) => {
    try {
      console.log('Fetching single product:', productId);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', productId)
        .single();
      
      if (error) {
        console.error('Error fetching product:', error);
        return null;
      }
      
      console.log('Product fetched successfully:', data);
      
      // Transform the price from string to number
      if (data) {
        const transformedProduct = {
          ...data,
          price: data.price ? parseFloat(data.price.toString().replace(/[^\d.]/g, '')) || 0 : 0,
        };
        return transformedProduct as Product;
      }
      
      return null;
    } catch (err) {
      console.error('Unexpected error fetching product:', err);
      return null;
    }
  };

  return {
    products,
    isLoading,
    error,
    refetch: fetchProducts,
    testConnection,
    fetchSingleProduct
  };
};
