import { useState, useMemo } from 'react';
import { 
  brandsData, 
  getBrandsByLetter, 
  getFeaturedBrands, 
  getPopularBrands, 
  getNewBrands, 
  searchBrands,
  type Brand 
} from '../data/brandsData';

export type BrandFilter = 'all' | 'featured' | 'popular' | 'new';
export type SortOption = 'name' | 'established' | 'productCount';

export const useBrands = () => {
  const [activeFilter, setActiveFilter] = useState<BrandFilter>('all');
  const [activeLetter, setActiveLetter] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<SortOption>('name');

  const filteredBrands = useMemo(() => {
    let brands = brandsData;

    // Apply filter
    switch (activeFilter) {
      case 'featured':
        brands = getFeaturedBrands();
        break;
      case 'popular':
        brands = getPopularBrands();
        break;
      case 'new':
        brands = getNewBrands();
        break;
      default:
        brands = brandsData;
    }

    // Apply letter filter
    if (activeLetter) {
      brands = getBrandsByLetter(activeLetter);
    }

    // Apply search
    if (searchQuery) {
      brands = searchBrands(searchQuery);
    }

    // Apply sorting
    const sortedBrands = [...brands].sort((a, b) => {
      switch (sortBy) {
        case 'established':
          return b.established - a.established;
        case 'productCount':
          return b.productCount - a.productCount;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return sortedBrands;
  }, [activeFilter, activeLetter, searchQuery, sortBy]);

  const getAvailableLetters = () => {
    const letters = new Set<string>();
    brandsData.forEach(brand => {
      const firstChar = brand.name.charAt(0).toUpperCase();
      if (/[A-Z]/.test(firstChar)) {
        letters.add(firstChar);
      } else if (/[0-9]/.test(firstChar)) {
        letters.add('#');
      }
    });
    return Array.from(letters).sort();
  };

  return {
    brands: filteredBrands,
    activeFilter,
    setActiveFilter,
    activeLetter,
    setActiveLetter,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    availableLetters: getAvailableLetters(),
    totalBrands: brandsData.length,
    filteredCount: filteredBrands.length
  };
};