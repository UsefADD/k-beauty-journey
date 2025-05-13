
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
      } else {
        console.log('Products loaded:', data);
        // Transform each product to ensure it has an id
        const productsWithId = data?.map(product => {
          // Use row-level uuid as id (Supabase doesn't expose this directly in the returned row)
          // Generate a random id as fallback if none exists
          return {
            ...product,
            id: crypto.randomUUID(), // Use a more reliable UUID generation method
          };
        }) || [];
        setProducts(productsWithId);
      }
    } catch (err: any) {
      console.error('Unexpected error:', err);
      setError(err.message);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again later.",
        variant: "destructive",
      });
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
