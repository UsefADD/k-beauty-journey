
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

export interface Product {
  id: string;
  "Product name": string;
  Brand: string;
  price: string;
  "image url": string | null;
  descrption: string | null;
  "Conseils d'utilisation": string | null;
  "skin type": string | null;
  "stock quantity": number | null;
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
      const { data, error } = await supabase
        .from('Products')
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
        
        // Create unique IDs for products if they don't have them
        const productsWithId = data ? data.map((product, index) => ({
          ...product,
          id: product.id || `product-${index}-${Date.now()}`,
        })) : [];
        
        setProducts(productsWithId);
        
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

  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    products,
    isLoading,
    error,
    refetch: fetchProducts
  };
};
