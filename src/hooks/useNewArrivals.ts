import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface NewArrivalProduct {
  id: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  stock_quantity: number;
  description?: string;
}

export const useNewArrivals = (limit: number = 4) => {
  const { data: newArrivals, isLoading, error } = useQuery({
    queryKey: ['newArrivals', limit],
    queryFn: async () => {
      try {
        console.log("Fetching new arrivals from Supabase...");
        
        // Get products with stock > 0, ordered by id (assuming newer products have higher/newer IDs)
          const { data, error } = await supabase
            .from('products')
            .select('id, Product_name, brand, price, image_url, stock_quantity, description')
            .gt('stock_quantity', 0)
            .order('stock_quantity', { ascending: false, nullsFirst: false })
            .order('id', { ascending: false })
            .limit(limit);
        
        if (error) {
          console.error("Error fetching new arrivals:", error);
          throw error;
        }
        
        if (!data || data.length === 0) {
          console.log("No products found for new arrivals");
          return [];
        }
        
        // Transform to our interface format
        const transformedProducts: NewArrivalProduct[] = data.map(item => {
          const price = item.price ? parseFloat(item.price.toString().replace(/[^\d.]/g, '')) || 0 : 0;
          
          return {
            id: item.id || "",
            name: item.Product_name || "",
            brand: item.brand || "",
            price,
            image: item.image_url ? item.image_url.toString().replace(/\$0$/, '').trim() : "",
            stock_quantity: item.stock_quantity ? Number(item.stock_quantity) : 0,
            description: item.description || ""
          };
        });
        
        console.log("New arrivals transformed:", transformedProducts);
        return transformedProducts;
      } catch (err) {
        console.error("Failed to fetch new arrivals:", err);
        return [];
      }
    },
  });

  return {
    newArrivals,
    isLoading,
    error,
  };
};