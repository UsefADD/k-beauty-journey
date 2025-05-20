
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

  const { data: products, isLoading, refetch, error } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      try {
        console.log("Fetching products from Supabase...");
        const { data, error } = await supabase
          .from('Products')
          .select('*');
        
        if (error) {
          console.error("Error fetching products:", error);
          throw error;
        }
        
        // Log the raw response for debugging
        console.log("Raw Supabase response:", data);
        
        // Check if we got data but it's empty
        if (!data || data.length === 0) {
          console.log("No products found in the database");
          return [];
        }
        
        // Log the first product to see exact field names and structure
        if (data.length > 0) {
          console.log("First product example:", JSON.stringify(data[0], null, 2));
          console.log("Object keys:", Object.keys(data[0]));
        }
        
        // Transform Supabase Products format to our Product interface format
        const transformedProducts: Product[] = data.map(item => {
          console.log("Processing product item:", item);
          
          // Extract values with proper property name mapping based on actual DB column names
          const id = item.id || "";
          console.log(`ID extraction: ${id} from ${item.id}`);
          
          // Using the correct field names from the database schema
          const name = item.Product_name || "";
          console.log(`Name extraction: ${name} from ${item.Product_name}`);
          
          const brand = item.brand || "";
          console.log(`Brand extraction: ${brand} from ${item.brand}`);
          
          const price = item.price ? Number(item.price) : 0;
          console.log(`Price extraction: ${price} from ${item.price}`);
          
          const image = item.image_url || "";
          console.log(`Image extraction: ${image} from ${item.image_url}`);
          
          const stock_quantity = item.stock_quantity ? Number(item.stock_quantity) : 0;
          console.log(`Stock quantity extraction: ${stock_quantity} from ${item.stock_quantity}`);
          
          const description = item.description || "";
          console.log(`Description extraction: ${description} from ${item.description}`);
          
          return {
            id,
            name,
            brand,
            price,
            image,
            stock_quantity,
            description
          };
        });
        
        console.log("Transformed products:", transformedProducts);
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
        "Product_name": product.name,
        "brand": product.brand,
        "price": product.price.toString(),
        "image_url": product.image,
        "stock_quantity": product.stock_quantity,
        "description": product.description
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

  // Fix the updateStock function to avoid excessive type instantiation
  const updateStock = useMutation({
    mutationFn: async ({ productId, quantity }: { productId: string; quantity: number }) => {
      try {
        console.log(`Updating stock for product ${productId} with quantity ${quantity}`);
        
        // Explicitly type the response to avoid excessive type instantiation
        type UpdateResponse = {
          data: any[] | null;
          error: any | null;
        }
        
        const result: UpdateResponse = await supabase
          .from('Products')
          .update({ "stock_quantity": quantity })
          .eq('id', productId)
          .select();
          
        if (result.error) {
          console.error("Error updating stock:", result.error);
          throw result.error;
        }
        
        return result.data;
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
    error,
    addProduct,
    updateStock,
    checkStock,
    refetch,
  };
};
