
import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ShopCategories from '../components/ShopCategories';
import ProductTypeCategories from '../components/ProductTypeCategories';
import FilteredProductsGrid from '../components/FilteredProductsGrid';
import { useProducts } from '../hooks/useProducts';

const ShopProductType = () => {
  const { type, subtype } = useParams();
  const { products, isLoading } = useProducts();

  // Filter products based on URL parameters
  const filteredProducts = React.useMemo(() => {
    if (!products) return [];
    
    return products.filter(product => {
      if (type && !subtype) {
        // Filter by product type (e.g., "traitements")
        return product.product_type?.toLowerCase().replace(/\s+/g, '-') === type;
      } else if (type && subtype) {
        // Filter by both product type and subtype
        return (
          product.product_type?.toLowerCase().replace(/\s+/g, '-') === type &&
          product.product_subtype?.toLowerCase() === subtype
        );
      }
      return true;
    });
  }, [products, type, subtype]);

  const getTitle = () => {
    if (subtype) {
      return `${subtype.toUpperCase()} - ${type?.toUpperCase()}`;
    } else if (type) {
      return type.toUpperCase().replace(/-/g, ' ');
    }
    return 'SHOP BY PRODUCT TYPE';
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow py-12 bg-knude-50">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-center mb-8 text-knude-900 font-serif">
            {getTitle()}
          </h1>
          <ShopCategories />
          
          {/* Show categories if no type is selected, otherwise show filtered products */}
          {!type ? (
            <ProductTypeCategories />
          ) : (
            <FilteredProductsGrid 
              products={filteredProducts} 
              isLoading={isLoading}
              emptyMessage={`No products found for ${getTitle().toLowerCase()}`}
            />
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ShopProductType;
