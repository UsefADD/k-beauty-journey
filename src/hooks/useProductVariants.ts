import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface ProductVariant {
  id: string;
  product_id: string;
  volume: string;
  price: number;
  stock_quantity: number;
}

export const useProductVariants = (productId: string) => {
  return useQuery({
    queryKey: ['product-variants', productId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('product_variants')
        .select('*')
        .eq('product_id', productId)
        .order('price', { ascending: true });

      if (error) {
        console.error('Error fetching product variants:', error);
        throw error;
      }

      return (data || []).map(variant => ({
        ...variant,
        price: parseFloat(variant.price.toString())
      })) as ProductVariant[];
    },
    enabled: !!productId,
  });
};
