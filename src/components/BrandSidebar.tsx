import React from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { useBrands } from '../hooks/useBrands';

const BrandSidebar = () => {
  const {
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    brands,
    isLoading
  } = useBrands();

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
        <Select value={sortBy} onValueChange={(value: 'name' | 'productCount') => setSortBy(value)}>
          <SelectTrigger>
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name">Name A-Z</SelectItem>
            <SelectItem value="productCount">Product Count</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Results Count */}
      <div className="border-t pt-4">
        <Badge variant="secondary" className="w-full justify-center">
          {isLoading ? 'Loading...' : `${brands.length} brands found`}
        </Badge>
      </div>
    </div>
  );
};

export default BrandSidebar;