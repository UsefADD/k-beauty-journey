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
  sale_price?: number | null;
  is_on_sale?: boolean;
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
            .select('id, Product_name, brand, price, image_url, stock_quantity, description, sale_price, is_on_sale')
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

        // Get product IDs for fetching images
        const productIds = data.map(p => p.id);
        
        // Fetch product images for products without image_url
        const { data: productImages } = await supabase
          .from('product_images')
          .select('product_id, image_url, display_order')
          .in('product_id', productIds)
          .order('display_order', { ascending: true });
        
        // Create a map of product_id to first image
        const imageMap = new Map<string, string>();
        if (productImages) {
          productImages.forEach(img => {
            if (!imageMap.has(img.product_id)) {
              imageMap.set(img.product_id, img.image_url);
            }
          });
        }
        
        // Transform to our interface format
        const transformedProducts: NewArrivalProduct[] = data.map(item => {
          const price = item.price ? parseFloat(item.price.toString().replace(/[^\d.]/g, '')) || 0 : 0;
          
          // Use image_url if available, otherwise use first image from product_images
          let imageUrl = item.image_url ? item.image_url.toString().replace(/\$0$/, '').trim() : "";
          if (!imageUrl && imageMap.has(item.id)) {
            imageUrl = imageMap.get(item.id) || "";
          }
          
          return {
            id: item.id || "",
            name: item.Product_name || "",
            brand: item.brand || "",
            price,
            image: imageUrl,
            stock_quantity: item.stock_quantity ? Number(item.stock_quantity) : 0,
            description: item.description || "",
            sale_price: item.sale_price ? Number(item.sale_price) : null,
            is_on_sale: item.is_on_sale || false
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