import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useProducts } from '@/hooks/useProducts';
import { useToast } from '@/hooks/use-toast';
import { removeBackgroundAndAddWhite, loadImageFromUrl } from '@/utils/backgroundRemoval';
import { supabase } from '@/integrations/supabase/client';
import { Loader2, ImageIcon } from 'lucide-react';

const BackgroundProcessor = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentProduct, setCurrentProduct] = useState('');
  const { products, refetch } = useProducts();
  const { toast } = useToast();

  const uploadProcessedImage = async (blob: Blob, originalUrl: string): Promise<string> => {
    // Extract filename from original URL or create a new one
    const filename = `processed_${Date.now()}_${Math.random().toString(36).substring(7)}.png`;
    
    // Convert blob to file
    const file = new File([blob], filename, { type: 'image/png' });
    
    // Upload to Supabase storage (you might need to create a bucket first)
    // For now, we'll convert to base64 and store as data URL
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          resolve(reader.result);
        } else {
          reject(new Error('Failed to convert image to base64'));
        }
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  const processAllProducts = async () => {
    if (!products.length) {
      toast({
        title: "No products found",
        description: "No products available to process.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    setProgress(0);

    try {
      const productsWithImages = products.filter(product => product.image_url);
      
      if (productsWithImages.length === 0) {
        toast({
          title: "No images to process",
          description: "No products have image URLs to process.",
          variant: "destructive",
        });
        setIsProcessing(false);
        return;
      }

      for (let i = 0; i < productsWithImages.length; i++) {
        const product = productsWithImages[i];
        setCurrentProduct(product.Product_name);
        
        try {
          console.log(`Processing product ${i + 1}/${productsWithImages.length}: ${product.Product_name}`);
          
          // Load the image
          const imageElement = await loadImageFromUrl(product.image_url!);
          
          // Process the image
          const processedBlob = await removeBackgroundAndAddWhite(imageElement);
          
          // Upload processed image
          const newImageUrl = await uploadProcessedImage(processedBlob, product.image_url!);
          
          // Update product in database
          const { error } = await supabase
            .from('products')
            .update({ image_url: newImageUrl })
            .eq('id', product.id);

          if (error) {
            console.error('Failed to update product:', error);
            toast({
              title: "Update failed",
              description: `Failed to update ${product.Product_name}`,
              variant: "destructive",
            });
          } else {
            console.log(`Successfully processed: ${product.Product_name}`);
          }
          
        } catch (error) {
          console.error(`Failed to process ${product.Product_name}:`, error);
          toast({
            title: "Processing failed",
            description: `Failed to process ${product.Product_name}`,
            variant: "destructive",
          });
        }
        
        setProgress(((i + 1) / productsWithImages.length) * 100);
      }

      // Refresh products data
      await refetch();
      
      toast({
        title: "Processing complete",
        description: `Successfully processed ${productsWithImages.length} product images`,
        variant: "default",
      });

    } catch (error) {
      console.error('Error processing products:', error);
      toast({
        title: "Processing failed",
        description: "An error occurred while processing images",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
      setProgress(0);
      setCurrentProduct('');
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ImageIcon className="h-5 w-5" />
          Product Image Background Processor
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          This tool will process all product images to remove backgrounds and add clean white backgrounds using AI.
        </p>
        
        {isProcessing && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span className="text-sm">Processing: {currentProduct}</span>
            </div>
            <Progress value={progress} className="w-full" />
            <p className="text-sm text-muted-foreground">
              {Math.round(progress)}% complete
            </p>
          </div>
        )}
        
        <div className="flex gap-2">
          <Button 
            onClick={processAllProducts}
            disabled={isProcessing || !products.length}
            className="flex-1"
          >
            {isProcessing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <ImageIcon className="mr-2 h-4 w-4" />
                Process All Product Images ({products.filter(p => p.image_url).length})
              </>
            )}
          </Button>
        </div>
        
        <div className="text-xs text-muted-foreground">
          <p>⚠️ This process may take several minutes depending on the number of products.</p>
          <p>⚠️ Make sure you have a stable internet connection.</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default BackgroundProcessor;