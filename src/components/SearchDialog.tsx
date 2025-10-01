
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command";
import { useLanguage } from '../contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { Loader2 } from 'lucide-react';
import { Product } from '@/hooks/useProducts';

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SearchDialog = ({ open, onOpenChange }: SearchDialogProps) => {
  console.info('Render: SearchDialog', { open });
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { t } = useLanguage();

  useEffect(() => {
    const fetchProducts = async () => {
      if (open) {
        setIsLoading(true);
        try {
          const { data, error } = await supabase
            .from('products')  // Changed from 'Products' to 'products' (lowercase)
            .select('*');
          
          if (error) {
            console.error('Error fetching products for search:', error);
          } else {
            // Transform products to ensure each has an id and price is a number
            const productsWithId = data?.map(product => ({
              ...product,
              id: product.id || crypto.randomUUID(), // Use existing id or generate one
              price: product.price ? parseFloat(product.price.toString().replace(/[^\d.]/g, '')) || 0 : 0,
            })) || [];
            setProducts(productsWithId as Product[]);
          }
        } catch (err) {
          console.error('Unexpected error in search:', err);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchProducts();
  }, [open]);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredProducts([]);
      return;
    }
    
    const filtered = products.filter(product => {
      const productName = product.Product_name || '';
      const brand = product.brand || '';
      const query = searchQuery.toLowerCase();
      
      return productName.toLowerCase().includes(query) ||
             brand.toLowerCase().includes(query);
    });
    setFilteredProducts(filtered);
  }, [searchQuery, products]);

  const handleSelect = (productId: string) => {
    navigate(`/product/${productId}`);
    onOpenChange(false);
  };

  // Prevent click events inside the dialog from propagating and closing it
  const handleDialogClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0" onClick={handleDialogClick}>
        <DialogTitle className="sr-only">Search products</DialogTitle>
        <Command className="rounded-lg border shadow-md">
          <CommandInput
            placeholder={t('search.products')}
            value={searchQuery}
            onValueChange={setSearchQuery}
            autoFocus
          />
          
          <CommandList>
            {isLoading ? (
              <div className="flex justify-center items-center p-4">
                <Loader2 className="h-6 w-6 animate-spin text-pink-600" />
              </div>
            ) : (
              <>
                {searchQuery.trim() !== '' && filteredProducts.length === 0 && (
                  <CommandEmpty>{t('no.results')}</CommandEmpty>
                )}
                
                {filteredProducts.length > 0 && (
                  <CommandGroup>
                    {filteredProducts.map((product) => (
                      <CommandItem
                        key={product.id}
                        onSelect={() => handleSelect(product.id)}
                        className="flex items-center gap-2 p-2 cursor-pointer hover:bg-accent"
                      >
                        <img 
                          src={product.image_url || "/placeholder.svg"} 
                          alt={product.Product_name} 
                          className="w-10 h-10 object-cover rounded"
                        />
                        <div>
                          <div className="font-medium">{product.Product_name}</div>
                          <div className="text-sm text-muted-foreground">{product.brand}</div>
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                )}
              </>
            )}
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  );
};

export default SearchDialog;
