import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Upload, Download, Palette } from 'lucide-react';

const ManualBackgroundEditor = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [productId, setProductId] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        setProcessedImage(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const addWhiteBackground = () => {
    if (!selectedImage || !canvasRef.current) return;

    setIsProcessing(true);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.onload = () => {
      // Set canvas size to image size
      canvas.width = img.width;
      canvas.height = img.height;

      // Fill with white background
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw the original image on top
      ctx.drawImage(img, 0, 0);

      // Convert to data URL
      const processedDataUrl = canvas.toDataURL('image/png', 1.0);
      setProcessedImage(processedDataUrl);
      setIsProcessing(false);

      toast({
        title: "Background added",
        description: "White background has been added to the image",
      });
    };
    img.src = selectedImage;
  };

  const updateProductImage = async () => {
    if (!processedImage || !productId.trim()) {
      toast({
        title: "Missing information",
        description: "Please provide both a processed image and product ID",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsProcessing(true);

      // Update the product with the new image
      const { error } = await supabase
        .from('products')
        .update({ image_url: processedImage })
        .eq('id', productId.trim());

      if (error) {
        throw error;
      }

      toast({
        title: "Product updated",
        description: "Product image has been updated successfully",
      });

      // Reset form
      setSelectedImage(null);
      setProcessedImage(null);
      setProductId('');

    } catch (error) {
      console.error('Error updating product:', error);
      toast({
        title: "Update failed",
        description: "Failed to update product image",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadImage = () => {
    if (!processedImage) return;

    const link = document.createElement('a');
    link.download = `processed-image-${Date.now()}.png`;
    link.href = processedImage;
    link.click();
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Palette className="h-5 w-5" />
          Manual Background Editor
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="image-upload">Upload Product Image</Label>
          <Input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            ref={fileInputRef}
          />
        </div>

        {selectedImage && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Original Image</Label>
                <img
                  src={selectedImage}
                  alt="Original"
                  className="w-full h-48 object-contain border border-gray-200 rounded-lg bg-gray-50"
                />
              </div>
              
              {processedImage && (
                <div>
                  <Label>With White Background</Label>
                  <img
                    src={processedImage}
                    alt="Processed"
                    className="w-full h-48 object-contain border border-gray-200 rounded-lg bg-white"
                  />
                </div>
              )}
            </div>

            <Button
              onClick={addWhiteBackground}
              disabled={isProcessing}
              className="w-full"
            >
              <Palette className="mr-2 h-4 w-4" />
              Add White Background
            </Button>
          </div>
        )}

        {processedImage && (
          <div className="space-y-4 border-t pt-4">
            <div className="space-y-2">
              <Label htmlFor="product-id">Product ID</Label>
              <Input
                id="product-id"
                placeholder="Enter product ID to update"
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
              />
            </div>

            <div className="flex gap-2">
              <Button
                onClick={updateProductImage}
                disabled={isProcessing || !productId.trim()}
                className="flex-1"
              >
                <Upload className="mr-2 h-4 w-4" />
                Update Product Image
              </Button>
              
              <Button
                onClick={downloadImage}
                variant="outline"
              >
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
            </div>
          </div>
        )}

        <canvas ref={canvasRef} style={{ display: 'none' }} />

        <div className="text-xs text-muted-foreground space-y-1">
          <p>💡 This tool adds a clean white background to product images.</p>
          <p>📋 Find product IDs in your admin inventory or product URLs.</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ManualBackgroundEditor;