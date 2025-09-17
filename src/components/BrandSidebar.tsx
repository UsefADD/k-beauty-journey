
import React from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { useBrands, type BrandFilter, type SortOption } from '../hooks/useBrands';

const BrandSidebar = () => {
  const {
    activeFilter,
    setActiveFilter,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    filteredCount,
    totalBrands
  } = useBrands();

  const filterOptions: { value: BrandFilter; label: string; description: string }[] = [
    { value: 'all', label: 'VIEW ALL', description: 'All brands' },
    { value: 'featured', label: 'FEATURED', description: 'Top recommended brands' },
    { value: 'popular', label: 'POPULAR', description: 'Most loved brands' },
    { value: 'new', label: 'NEW ARRIVALS', description: 'Recently added brands' }
  ];

  const sortOptions: { value: SortOption; label: string }[] = [
    { value: 'name', label: 'Name (A-Z)' },
    { value: 'established', label: 'Newest First' },
    { value: 'productCount', label: 'Most Products' }
  ];

  return (
    <div className="w-full md:w-1/4 mb-8 md:mb-0 pr-0 md:pr-6">
      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search brands..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Sort Options */}
      <div className="mb-6">
        <label className="text-sm font-medium text-muted-foreground mb-2 block">
          <SlidersHorizontal className="inline h-4 w-4 mr-2" />
          Sort by
        </label>
        <Select value={sortBy} onValueChange={(value: SortOption) => setSortBy(value)}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {sortOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Filters */}
      <div className="mb-6">
        <h3 className="font-medium text-sm text-muted-foreground mb-3">CATEGORIES</h3>
        <ul className="space-y-2">
          {filterOptions.map((filter) => (
            <li key={filter.value}>
              <Button
                variant="ghost"
                onClick={() => setActiveFilter(filter.value)}
                className={`w-full justify-start text-left p-2 h-auto ${
                  activeFilter === filter.value 
                    ? 'bg-primary/10 text-primary font-medium' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <div className="flex flex-col items-start">
                  <span className="font-medium">{filter.label}</span>
                  <span className="text-xs text-muted-foreground">{filter.description}</span>
                </div>
              </Button>
            </li>
          ))}
        </ul>
      </div>

      {/* Results Count */}
      <div className="border-t pt-4">
        <Badge variant="secondary" className="w-full justify-center">
          {filteredCount} of {totalBrands} brands
        </Badge>
      </div>
    </div>
  );
};

export default BrandSidebar;
