
import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { useBrands } from '../hooks/useBrands';
import { MapPin, Calendar, Package } from 'lucide-react';

const BrandsList = () => {
  const { brands } = useBrands();

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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {brands.map((brand) => (
          <Card key={brand.id} className="group hover:shadow-lg transition-all duration-300">
            <CardContent className="p-0">
              <div className="relative overflow-hidden rounded-t-lg bg-muted">
                <img 
                  src={brand.image} 
                  alt={`${brand.name} products`} 
                  className="w-full h-48 object-cover object-center group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3 flex gap-2">
                  {brand.featured && (
                    <Badge variant="secondary" className="bg-primary text-primary-foreground">
                      Featured
                    </Badge>
                  )}
                  {brand.new && (
                    <Badge variant="secondary" className="bg-emerald-500 text-white">
                      New
                    </Badge>
                  )}
                  {brand.popular && (
                    <Badge variant="secondary" className="bg-orange-500 text-white">
                      Popular
                    </Badge>
                  )}
                </div>
              </div>
              
              <div className="p-4">
                <Link 
                  to={`/shop/brand/${brand.id}`}
                  className="block hover:text-primary transition-colors"
                >
                  <h3 className="font-bold text-lg mb-2">{brand.name}</h3>
                </Link>
                
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {brand.description}
                </p>
                
                <div className="space-y-2 text-xs text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-3 w-3" />
                    <span>{brand.country}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-3 w-3" />
                    <span>Est. {brand.established}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Package className="h-3 w-3" />
                    <span>{brand.productCount} products</span>
                  </div>
                </div>
                
                <div className="mt-3 flex flex-wrap gap-1">
                  {brand.specialties.slice(0, 2).map((specialty) => (
                    <Badge key={specialty} variant="outline" className="text-xs">
                      {specialty}
                    </Badge>
                  ))}
                  {brand.specialties.length > 2 && (
                    <Badge variant="outline" className="text-xs">
                      +{brand.specialties.length - 2} more
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BrandsList;
