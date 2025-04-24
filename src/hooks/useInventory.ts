
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';

export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  stock_quantity: number;
}

export const useInventory = () => {
  const queryClient = useQueryClient();

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
      
      return data as Product[];
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
    updateStock,
    checkStock,
  };
};
