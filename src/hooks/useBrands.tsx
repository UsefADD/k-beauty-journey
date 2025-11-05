import React, { useState, useMemo, useEffect, createContext, useContext } from 'react';
import { 
  fetchBrandsFromProducts,
  searchBrands as searchBrandsData, 
  getBrandsByLetter, 
  sortBrands, 
  type Brand 
} from '@/data/brandsData';

interface BrandsContextType {
  allBrands: Brand[];
  isLoading: boolean;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedLetter: string;
  setSelectedLetter: (letter: string) => void;
  sortBy: 'name' | 'productCount';
  setSortBy: (sort: 'name' | 'productCount') => void;
  brands: Brand[];
  availableLetters: string[];
}

const BrandsContext = createContext<BrandsContextType | null>(null);

export const BrandsProvider = ({ children }: { children: React.ReactNode }) => {
  const [allBrands, setAllBrands] = useState<Brand[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLetter, setSelectedLetter] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'productCount'>('name');

  useEffect(() => {
    const loadBrands = async () => {
      setIsLoading(true);
      const brands = await fetchBrandsFromProducts();
      setAllBrands(brands);
      setIsLoading(false);
    };
    loadBrands();
  }, []);
  
  const brands = useMemo(() => {
    let filtered = [...allBrands];
    
    // Apply letter filter first
    if (selectedLetter) {
      filtered = getBrandsByLetter(filtered, selectedLetter);
    }
    
    // Apply search filter
    if (searchQuery) {
      filtered = searchBrandsData(filtered, searchQuery);
    }
    
    // Apply sorting
    const result = sortBrands(filtered, sortBy);
    if (typeof window !== 'undefined') {
      console.debug('[useBrands] letter:', selectedLetter, 'search:', searchQuery, 'sort:', sortBy, 'all:', allBrands.length, 'result:', result.length);
    }
    return result;
  }, [searchQuery, selectedLetter, sortBy, allBrands]);

  const availableLetters = useMemo(() => {
    const letters = new Set(
      allBrands
        .map(brand => brand.name?.trim?.() || '')
        .filter(Boolean)
        .map(name => name.charAt(0).toUpperCase())
    );
    return Array.from(letters).sort();
  }, [allBrands]);

  const value = {
    allBrands,
    isLoading,
    searchQuery,
    setSearchQuery,
    selectedLetter,
    setSelectedLetter,
    sortBy,
    setSortBy,
    brands,
    availableLetters,
  };

  return (
    <BrandsContext.Provider value={value}>
      {children}
    </BrandsContext.Provider>
  );
};

export const useBrands = () => {
  const context = useContext(BrandsContext);
  if (!context) {
    throw new Error('useBrands must be used within a BrandsProvider');
  }
  return context;
};