
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
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
      try {
        const { data, error } = await supabase
          .from('Products')
          .select('*');
        
        if (error) {
          console.error("Error fetching products:", error);
          throw error;
        }
        
        // Transform Supabase Products format to our Product interface format
        const transformedProducts: Product[] = (data || []).map(item => ({
          id: item.id || `product-${Math.random().toString(36).substr(2, 9)}`,
          name: item["Product name"],
          brand: item.Brand,
          price: Number(item.price) || 0,
          image: item["image url"] || "",
          stock_quantity: item["stock quantity"] || 0,
          description: item.descrption,
        }));
        
        return transformedProducts;
      } catch (err) {
        console.error("Failed to fetch products:", err);
        return [];
      }
    },
  });

  const addProduct = useMutation({
    mutationFn: async (product: Omit<Product, 'id'>) => {
      // Transform our Product interface to Supabase Products format
      const supabaseProduct = {
        "Product name": product.name,
        "Brand": product.brand,
        "price": product.price.toString(),
        "image url": product.image,
        "stock quantity": product.stock_quantity,
        "descrption": product.description
      };

      const { data, error } = await supabase
        .from('Products')
        .insert([supabaseProduct])
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
      try {
        console.log(`Updating stock for product ${productId} with quantity ${quantity}`);
        const { data, error } = await supabase
          .from('Products')
          .update({ "stock quantity": quantity })
          .eq('id', productId)
          .select()
          .single();

        if (error) {
          console.error("Error updating stock:", error);
          throw error;
        }
        
        return data;
      } catch (err) {
        console.error("Failed to update stock:", err);
        throw err;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      console.log("Stock updated successfully");
    },
    onError: (error) => {
      console.error("Error in updateStock mutation:", error);
    }
  });

  const checkStock = (productId: string, requestedQuantity: number) => {
    if (!products) {
      console.log("Products not loaded yet, can't check stock");
      return false;
    }
    
    const product = products.find(p => p.id === productId);
    const hasStock = product ? product.stock_quantity >= requestedQuantity : false;
    console.log(`Stock check for ${productId}: ${hasStock ? 'Available' : 'Not available'}`);
    return hasStock;
  };

  return {
    products,
    isLoading,
    addProduct,
    updateStock,
    checkStock,
  };
};
