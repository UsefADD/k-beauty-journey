
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { Command, CommandInput, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command";
import { useLanguage } from '../contexts/LanguageContext';

interface Product {
  id: string;
  name: string;
  brand: string;
  image: string;
}

// This would typically come from an API or database
const sampleProducts: Product[] = [
  {
    id: '1',
    name: 'Bean Essence',
    brand: 'MIXSOON',
    image: '/lovable-uploads/2e3f0b7a-0103-4602-9efe-fabce75ae855.png'
  },
  {
    id: '2',
    name: 'Rice Toner',
    brand: "I'm From",
    image: '/lovable-uploads/3f8687b9-677f-4a44-9351-7ad103dcc6a3.png'
  },
];

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SearchDialog = ({ open, onOpenChange }: SearchDialogProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { t } = useLanguage();

  const filteredProducts = sampleProducts.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.brand.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelect = (productId: string) => {
    navigate(`/product/${productId}`);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0">
        <Command className="rounded-lg border shadow-md">
          <CommandInput
            placeholder={t('search.products')}
            value={searchQuery}
            onValueChange={setSearchQuery}
          />
          {filteredProducts.length === 0 && (
            <CommandEmpty>{t('no.results')}</CommandEmpty>
          )}
          <CommandGroup>
            {filteredProducts.map((product) => (
              <CommandItem
                key={product.id}
                onSelect={() => handleSelect(product.id)}
                className="flex items-center gap-2 p-2 cursor-pointer hover:bg-accent"
              >
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-10 h-10 object-cover rounded"
                />
                <div>
                  <div className="font-medium">{product.name}</div>
                  <div className="text-sm text-muted-foreground">{product.brand}</div>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </DialogContent>
    </Dialog>
  );
};

export default SearchDialog;
