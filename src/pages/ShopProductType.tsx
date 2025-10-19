
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

    // Normalize a string into a URL-friendly slug
    const slugify = (s?: string) =>
      (s ?? '')
        .toString()
        .normalize('NFD') // remove accents
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-') // non-alphanum -> hyphen
        .replace(/^-+|-+$/g, ''); // trim hyphens

    // Remove common connective words so `cheveux-et-corps` matches `cheveux-corps`
    const normalize = (slug: string) => slug.split('-').filter(p => p && p !== 'et' && p !== 'and').join('-');

    // Map common synonyms to a canonical slug (FR-first)
    const canonicalize = (slug: string) => {
      const s = slug.replace(/-+/g, '-');
      // Hair & Body -> Cheveux & Corps
      if (s === 'hair-body' || s === 'hair-and-body' || /(^|-)hair(-.*)?-body($|-)/.test(s)) return 'cheveux-corps';
      // Moisturizer -> Hydratant
      if (s === 'moisturizer' || s === 'moisturizers') return 'hydratant';
      // Sunscreen -> Protection solaire
      if (s === 'sunscreen' || s === 'sun-screen' || s === 'spf') return 'protection-solaire';
      // Treatments -> Traitements
      if (s === 'treatments' || s === 'treatment') return 'traitements';
      return s;
    };

    const t = canonicalize(normalize(type ? type : ''));
    const st = canonicalize(normalize(subtype ? subtype : ''));

    return products.filter(product => {
      const pt = canonicalize(normalize(slugify(product.product_type)));
      const pst = canonicalize(normalize(slugify(product.product_subtype)));

      if (type && !subtype) {
        // Filter by product type (e.g., "traitements")
        return pt === t;
      } else if (type && subtype) {
        // Filter by both product type and subtype
        return pt === t && pst === st;
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
