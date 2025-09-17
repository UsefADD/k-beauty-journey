
import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { useBrands } from '../hooks/useBrands';
import { Package, Loader2 } from 'lucide-react';

const BrandsList = () => {
  const { brands, isLoading } = useBrands();

  if (isLoading) {
    return (
      <div className="w-full md:w-3/4 flex justify-center items-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2 text-muted-foreground">Loading brands...</span>
      </div>
    );
  }

  if (brands.length === 0) {
    return (
      <div className="w-full md:w-3/4">
        <div className="text-center py-12">
          <p className="text-muted-foreground">No brands found matching your criteria.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full md:w-3/4">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {brands.map((brand) => (
          <Card key={brand.id} className="group hover:shadow-md transition-all duration-300 hover:border-primary/50">
            <CardContent className="p-4">
              <Link 
                to={`/shop/brand/${brand.id}`}
                className="block hover:text-primary transition-colors"
              >
                <div className="text-center">
                  <h3 className="font-medium text-lg group-hover:text-primary transition-colors">
                    {brand.name}
                  </h3>
                </div>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BrandsList;
