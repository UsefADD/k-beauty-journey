
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {brands.map((brand) => (
          <Card key={brand.id} className="group hover:shadow-md transition-all duration-300 hover:border-primary/50">
            <CardContent className="p-6">
              <Link 
                to={`/shop/brand/${brand.id}`}
                className="block hover:text-primary transition-colors"
              >
                <div className="text-center space-y-3">
                  <h3 className="font-bold text-xl mb-2 group-hover:text-primary transition-colors">
                    {brand.name}
                  </h3>
                  
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    {brand.productCount} {brand.productCount === 1 ? 'Product' : 'Products'}
                  </Badge>
                  
                  <p className="text-sm text-muted-foreground">
                    {brand.description}
                  </p>
                  
                  <div className="flex flex-wrap justify-center gap-1 mt-3">
                    {brand.products.slice(0, 2).map((product) => (
                      <Badge key={product.id} variant="outline" className="text-xs">
                        {product.product_type}
                      </Badge>
                    ))}
                    {brand.products.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{brand.products.length - 2} more
                      </Badge>
                    )}
                  </div>
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
