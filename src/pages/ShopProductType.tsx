
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
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');

    // Remove common connective words so `cheveux-et-corps` matches `cheveux-corps`
    const normalize = (slug: string) => slug.split('-').filter(p => p && p !== 'et' && p !== 'and').join('-');

    // Map common synonyms to a canonical slug (FR-first)
    const canonicalize = (slug: string) => {
      const s = slug.replace(/-+/g, '-');
      // Lotions tonifiantes / Toners
      if (s === 'lotions-tonifiantes' || s === 'lotion-tonifiante' || s === 'lotions-tonifiant' || s === 'lotion-tonifiant' || s === 'toner' || s === 'toners' || s === 'lotions' || s === 'lotion' || s === 'tonique' || s === 'toniques') return 'lotions-tonifiant';
      // Soin des yeux / Eye care
      if (s === 'soin-yeux' || s === 'soin-des-yeux' || s === 'soins-yeux' || s === 'soins-des-yeux' || s === 'eye-care' || s === 'eye-cream' || s === 'contour-yeux') return 'soin-des-yeux';
      // Hair & Body -> Cheveux & Corps
      if (s === 'hair-body' || s === 'hair-and-body' || /(^|-)hair(-.*)?-body($|-)/.test(s)) return 'cheveux-corps';
      // Maquillage & Outils -> Maquillage (unify)
      if (s === 'maquillage-outils' || s === 'maquillage-et-outils' || s === 'maquillage' || s === 'makeup' || s === 'make-up') return 'maquillage';
      // Moisturizer -> Hydratant
      if (s === 'moisturizer' || s === 'moisturizers') return 'hydratant';
      // Sunscreen -> Protection solaire
      if (s === 'sunscreen' || s === 'sun-screen' || s === 'spf' || s === 'protection' || s === 'solaire' || s === 'sun-care' || s === 'sun-protection') return 'protection-solaire';
      // Treatments -> Traitements
      if (s === 'treatments' || s === 'treatment') return 'traitements';
      // Subtype synonyms
      if (s === 'recourbe-cils' || s === 'lashcurler') return 'lash-curler';
      return s;
    };

    // Synonyms map used for flexible fallback matching
    const synonyms: Record<string, string[]> = {
      'lotions-tonifiant': ['toner', 'toners', 'tonique', 'toniques', 'lotion-tonifiante', 'lotions-tonifiantes', 'lotions', 'lotion'],
      'soin-des-yeux': ['soin-yeux', 'eye-care', 'eye-cream', 'contour-yeux']
    };

    const t = canonicalize(normalize(type ? type : ''));
    const st = canonicalize(normalize(subtype ? subtype : ''));

    console.log('[ShopProductType] URL type:', type, '-> normalized:', t);
    console.log('[ShopProductType] URL subtype:', subtype, '-> normalized:', st);

    // Strict matching first
    const strictFiltered = products.filter(product => {
      const pt = canonicalize(normalize(slugify(product.product_type)));
      const pst = canonicalize(normalize(slugify(product.product_subtype)));

      if (type && !subtype) {
        const match = pt === t;
        if (match) {
          console.log('[ShopProductType] MATCH (strict):', product.Product_name, 'product_type:', product.product_type, '->', pt);
        }
        return match;
      } else if (type && subtype) {
        const match = pt === t && pst === st;
        if (match) {
          console.log('[ShopProductType] MATCH (strict):', product.Product_name, 'pt:', pt, 'pst:', pst);
        }
        return match;
      }
      return true;
    });

    // If nothing found, try a flexible fallback using synonyms and subtype
    if (type && strictFiltered.length === 0) {
      const tList = [t, ...(synonyms[t] || [])];
      const fallback = products.filter(product => {
        const pt = canonicalize(normalize(slugify(product.product_type)));
        const pst = canonicalize(normalize(slugify(product.product_subtype)));
        return tList.includes(pt) || tList.includes(pst) || pt.includes(t) || pst.includes(t);
      });
      console.log('[ShopProductType] Fallback results count:', fallback.length, 'for type:', t, 'with aliases:', tList);
      if (fallback.length > 0) return fallback;
    }

    console.log('[ShopProductType] Filtered products count (strict):', strictFiltered.length);
    return strictFiltered;
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
