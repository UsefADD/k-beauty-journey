
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../lib/supabaseClient';

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
      const { data, error } = await supabase
        .from('products')
        .select('*');
      
      if (error) throw error;
      return data as Product[];
    },
  });

  const updateStock = useMutation({
    mutationFn: async ({ productId, quantity }: { productId: string; quantity: number }) => {
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
    const product = products?.find(p => p.id === productId);
    return product ? product.stock_quantity >= requestedQuantity : false;
  };

  return {
    products,
    isLoading,
    updateStock,
    checkStock,
  };
};

