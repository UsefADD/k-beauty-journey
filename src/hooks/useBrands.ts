import { useState, useMemo, useEffect } from 'react';
import { 
  fetchBrandsFromProducts,
  searchBrands as searchBrandsData, 
  getBrandsByLetter, 
  sortBrands, 
  type Brand 
} from '@/data/brandsData';

export const useBrands = () => {
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
    
    console.log('All brands:', allBrands.map(b => b.name));
    console.log('Selected letter:', selectedLetter);
    
    // Apply letter filter first
    if (selectedLetter) {
      filtered = getBrandsByLetter(filtered, selectedLetter);
      console.log('After letter filter:', filtered.map(b => b.name));
    }
    
    // Apply search filter
    if (searchQuery) {
      filtered = searchBrandsData(filtered, searchQuery);
      console.log('After search filter:', filtered.map(b => b.name));
    }
    
    // Apply sorting
    const sorted = sortBrands(filtered, sortBy);
    console.log('Final filtered brands:', sorted.map(b => b.name));
    return sorted;
  }, [searchQuery, selectedLetter, sortBy, allBrands]);

  const availableLetters = useMemo(() => {
    const letters = new Set(allBrands.map(brand => brand.name.charAt(0).toUpperCase()));
    return Array.from(letters).sort();
  }, [allBrands]);

  return {
    brands,
    isLoading,
    searchQuery,
    setSearchQuery,
    selectedLetter,
    setSelectedLetter,
    sortBy,
    setSortBy,
    availableLetters,
  };
};