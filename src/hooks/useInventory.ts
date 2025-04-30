
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';
import { useToast } from '@/hooks/use-toast';

export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  stock_quantity: number;
  description?: string;
}

export const useInventory = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: products, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      // Check if Supabase is configured before attempting to query
      if (!isSupabaseConfigured()) {
        console.error("Supabase is not properly configured. Please set up environment variables.");
        return [];
      }

      const { data, error } = await supabase
        .from('products')
        .select('*');
      
      if (error) {
        console.error("Error fetching products:", error);
        throw error;
      }
      
      return data as Product[] || [];
    },
  });

  const addProduct = useMutation({
    mutationFn: async (product: Omit<Product, 'id'>) => {
      // Check if Supabase is configured before attempting to add
      if (!isSupabaseConfigured()) {
        console.error("Supabase is not properly configured. Please set up environment variables.");
        throw new Error("Supabase configuration is missing");
      }

      const { data, error } = await supabase
        .from('products')
        .insert([product])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast({
        title: "Product Added",
        description: "The product has been successfully added to inventory.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to add product: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  const updateStock = useMutation({
    mutationFn: async ({ productId, quantity }: { productId: string; quantity: number }) => {
      // Check if Supabase is configured before attempting to update
      if (!isSupabaseConfigured()) {
        console.error("Supabase is not properly configured. Please set up environment variables.");
        throw new Error("Supabase configuration is missing");
      }

      const { data, error } = await supabase
        .from('products')
        .update({ stock_quantity: quantity })
        .eq('id', productId)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });

  const checkStock = (productId: string, requestedQuantity: number) => {
    // If products aren't loaded yet or Supabase isn't configured, return false
    if (!products || !isSupabaseConfigured()) return false;
    
    const product = products.find(p => p.id === productId);
    return product ? product.stock_quantity >= requestedQuantity : false;
  };

  return {
    products,
    isLoading,
    addProduct,
    updateStock,
    checkStock,
  };
};
