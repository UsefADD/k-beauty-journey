
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
import { Button } from "@/components/ui/button";

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SearchDialog = ({ open, onOpenChange }: SearchDialogProps) => {
  console.info('Render: SearchDialog', { open });
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [matchingBrands, setMatchingBrands] = useState<string[]>([]);
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
            console.log('Products loaded for search:', productsWithId.length);
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
      setMatchingBrands([]);
      return;
    }
    
    console.log('Searching for:', searchQuery);
    console.log('Total products:', products.length);
    
    const query = searchQuery.toLowerCase();
    const brandsSet = new Set<string>();
    
    // Trouver tous les produits qui correspondent au nom ou à la marque
    const directMatches = products.filter(product => {
      const productName = product.Product_name || '';
      const brand = product.brand || '';
      
      const brandMatches = brand.toLowerCase().includes(query);
      const nameMatches = productName.toLowerCase().includes(query);
      
      if (brandMatches) {
        brandsSet.add(brand);
      }
      
      if (brandMatches || nameMatches) {
        console.log('Match found:', { name: productName, brand });
        return true;
      }
      
      return false;
    });
    
    // Obtenir TOUS les produits des marques qui correspondent
    const allMatchingBrandProducts = products.filter(product => {
      return brandsSet.has(product.brand || '');
    });
    
    console.log('Direct matches:', directMatches.length);
    console.log('All brand products:', allMatchingBrandProducts.length);
    console.log('Matching brands:', Array.from(brandsSet));
    
    setFilteredProducts(allMatchingBrandProducts);
    setMatchingBrands(Array.from(brandsSet));
  }, [searchQuery, products]);

  const handleSelect = (productId: string) => {
    navigate(`/product/${productId}`);
    onOpenChange(false);
    setSearchQuery('');
  };

  const handleBrandClick = (brandName: string) => {
    navigate(`/shop/brand/${encodeURIComponent(brandName)}`);
    onOpenChange(false);
    setSearchQuery('');
  };

  // Prevent click events inside the dialog from propagating and closing it
  const handleDialogClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleSearchClick = () => {
    if (matchingBrands.length > 0) {
      handleBrandClick(matchingBrands[0]);
    } else if (filteredProducts.length > 0) {
      handleSelect(filteredProducts[0].id);
    }
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
                {searchQuery.trim() !== '' && filteredProducts.length === 0 && matchingBrands.length === 0 && (
                  <CommandEmpty>{t('no.results')}</CommandEmpty>
                )}
                
                
                {matchingBrands.length > 0 && matchingBrands.map((brand) => {
                  const brandProducts = filteredProducts.filter(p => p.brand === brand);
                  return (
                    <CommandGroup key={brand} heading={`${brand} (${brandProducts.length} produit${brandProducts.length > 1 ? 's' : ''})`}>
                      {brandProducts.map((product) => (
                        <CommandItem
                          key={product.id}
                          onSelect={() => handleSelect(product.id)}
                          className="flex items-center gap-2 p-2 cursor-pointer hover:bg-accent"
                        >
                          <div className="w-10 h-10 flex-shrink-0 bg-muted rounded overflow-hidden">
                            <img 
                              src={product.image_url || "/placeholder.svg"} 
                              alt={product.Product_name} 
                              className="w-full h-full object-cover"
                              loading="eager"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = "/placeholder.svg";
                              }}
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium truncate">{product.Product_name}</div>
                            <div className="text-sm text-muted-foreground truncate">{product.price}</div>
                          </div>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  );
                })}
              </>
            )}
          </CommandList>
          <div className="flex justify-end p-3">
            <Button onClick={handleSearchClick} disabled={!searchQuery.trim()}>
              Rechercher
            </Button>
          </div>
        </Command>
      </DialogContent>
    </Dialog>
  );
};

export default SearchDialog;
