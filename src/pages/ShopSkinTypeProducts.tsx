import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ShopCategories from '../components/ShopCategories';
import SkinTypeCategories from '../components/SkinTypeCategories';
import FilteredProductsGrid from '../components/FilteredProductsGrid';
import { useProducts } from '../hooks/useProducts';

const ShopSkinTypeProducts = () => {
  const { skinType, subtype } = useParams();
  const { products, isLoading } = useProducts();

  const filteredProducts = React.useMemo(() => {
    if (!products) return [];

    const slugify = (s?: string) =>
      (s ?? '')
        .toString()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');

    const normalize = (slug: string) => slug.split('-').filter(p => p && p !== 'et' && p !== 'and').join('-');

    const st = normalize(slugify(skinType || ''));
    const sst = normalize(slugify(subtype || ''));

    return products.filter(product => {
      if (!skinType) return true;

      // Check skin_type_category array
      const skinTypes = product.skin_type_category || [];
      const hasSkinType = skinTypes.some(type => 
        normalize(slugify(type)) === st
      );

      if (!hasSkinType) return false;

      // If there's a subtype filter, check skin_concern_subcategory
      if (subtype) {
        const subcategories = product.skin_concern_subcategory || [];
        return subcategories.some(sub => 
          normalize(slugify(sub)) === sst
        );
      }

      return true;
    });
  }, [products, skinType, subtype]);

  const getTitle = () => {
    if (subtype) {
      return `${subtype.toUpperCase().replace(/-/g, ' ')} - ${skinType?.toUpperCase().replace(/-/g, ' ')}`;
    } else if (skinType) {
      return `${skinType.toUpperCase().replace(/-/g, ' ')} SKIN`;
    }
    return 'SHOP BY SKIN TYPE';
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
          
          {!skinType ? (
            <SkinTypeCategories />
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

export default ShopSkinTypeProducts;
