
import React, { useEffect } from 'react';
import ProductCard from './ProductCard';
import { useInventory } from '@/hooks/useInventory';
import { Loader2, AlertCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const ProductsGrid = () => {
  const { products, isLoading, refetch } = useInventory();
  const { toast } = useToast();
  
  // Add a direct testing query to debug connection issues
  const testSupabaseConnection = async () => {
    try {
      console.log("Testing Supabase connection directly...");
      const { data, error } = await supabase
        .from('Products')
        .select('*');
        
      if (error) {
        console.error("Error testing connection:", error);
        toast({
          title: "Connection error",
          description: error.message,
          variant: "destructive",
        });
      } else {
        console.log("Connection test response:", data);
        toast({
          title: "Connection successful",
          description: `Found ${data.length} products in database`,
        });
      }
    } catch (err) {
      console.error("Unexpected error:", err);
    }
  };

  // Run the test on component mount
  useEffect(() => {
    testSupabaseConnection();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-pink-600" />
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-10">
        <AlertCircle className="mx-auto h-12 w-12 text-amber-500 mb-4" />
        <p className="text-gray-500 mb-4">No products found in the database.</p>
        <p className="text-sm text-gray-400 mb-6">
          Make sure you have added products to your Supabase Products table.
        </p>
        <div className="flex justify-center gap-4">
          <Button 
            variant="outline" 
            onClick={testSupabaseConnection}
            className="text-sm"
          >
            Test Connection
          </Button>
          <Button 
            variant="default" 
            onClick={() => refetch()}
            className="text-sm"
          >
            Refresh Products
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          name={product.name}
          brand={product.brand}
          price={product.price}
          image={product.image || "/placeholder.svg"}
        />
      ))}
    </div>
  );
};

export default ProductsGrid;
