
import React, { useEffect } from 'react';
import ProductCard from './ProductCard';
import { useInventory } from '@/hooks/useInventory';
import { Loader2, AlertCircle, Database, RefreshCw } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';

const ProductsGrid = () => {
  const { products, isLoading, refetch, error } = useInventory();
  const { toast } = useToast();
  
  // Add a direct testing query to debug connection issues
  const testSupabaseConnection = async () => {
    try {
      console.log("Testing Supabase connection directly...");
      const { data, error } = await supabase
        .from('products')  // Changed from 'Products' to 'products' (lowercase)
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
        
        // Check if we have data but it's empty
        if (data && data.length === 0) {
          toast({
            title: "Connection successful",
            description: "Connected to database but no products found. You need to add products to your Supabase Products table.",
          });
        } else if (data && data.length > 0) {
          // Show sample data to help diagnose column name issues
          const sampleKeys = Object.keys(data[0]).join(', ');
          toast({
            title: "Connection successful",
            description: `Found ${data.length} products. Column names: ${sampleKeys}`,
          });
          console.log("Sample product data:", data[0]);
        } else {
          toast({
            title: "Connection successful",
            description: "Unknown data format returned from database.",
          });
        }
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      toast({
        title: "Connection error",
        description: "An unexpected error occurred while testing the connection.",
        variant: "destructive",
      });
    }
  };

  // Run the test on component mount
  useEffect(() => {
    testSupabaseConnection();
  }, []);

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="flex justify-center items-center h-16">
          <Loader2 className="h-8 w-8 animate-spin text-pink-600" />
          <span className="ml-2 text-pink-600">Loading products...</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="h-48 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <AlertCircle className="mx-auto h-12 w-12 text-red-500 mb-4" />
        <p className="text-red-500 font-medium mb-2">Error loading products</p>
        <p className="text-gray-500 mb-6">{error.toString()}</p>
        <Button 
          variant="default" 
          onClick={() => refetch()}
          className="text-sm"
        >
          <RefreshCw className="mr-2 h-4 w-4" /> Try Again
        </Button>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-10">
        <Database className="mx-auto h-12 w-12 text-amber-500 mb-4" />
        <p className="text-gray-700 font-medium mb-4">No products found in the database.</p>
        <div className="text-sm text-gray-500 mb-6 max-w-md mx-auto space-y-2">
          <p>Make sure you have added products to your Supabase Products table with the following columns:</p>
          <ul className="list-disc text-left pl-8 mt-2">
            <li><code>id</code> (UUID)</li>
            <li><code>Product_name</code> (text)</li>
            <li><code>brand</code> (text)</li>
            <li><code>price</code> (text or number)</li>
            <li><code>image_url</code> (text)</li>
            <li><code>stock_quantity</code> (number)</li>
            <li><code>description</code> (text)</li>
          </ul>
        </div>
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
