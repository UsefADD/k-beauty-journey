
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

// Update the Product interface to match the actual database field names
export interface Product {
  id: string;
  Product_name: string;
  brand: string;
  price: string | null;
  image_url: string | null;
  description: string | null;
  "skin type": string | null;
  stock_quantity: number | null;
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
        
        // Since the Products table doesn't have an id field, we need to generate one
        const productsWithId = data ? data.map((product, index) => ({
          ...product,
          id: product.id || `product-${index}-${Date.now()}`, // Use existing id or generate one
        })) : [];
        
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
      return data as Product | null;
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
