import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FilteredProductsGrid from '../components/FilteredProductsGrid';
import { useProducts } from '@/hooks/useProducts';

const BrandProducts = () => {
  const { brandName } = useParams();
  const { products, isLoading } = useProducts();
  const [brandProducts, setBrandProducts] = useState([]);

  useEffect(() => {
    if (products && brandName) {
      const target = decodeURIComponent(brandName).trim().toLowerCase();
      const filtered = products.filter(
        product => (product.brand || '').trim().toLowerCase() === target
      );
      setBrandProducts(filtered);
    }
  }, [products, brandName]);

  const displayBrandName = brandName ? decodeURIComponent(brandName) : '';

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow py-12 bg-cream-50">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-center mb-4 text-black font-serif">
              {displayBrandName}
            </h1>
            <p className="text-center text-gray-600 max-w-2xl mx-auto">
              Découvrez tous les produits de la marque {displayBrandName}
            </p>
          </div>

          <FilteredProductsGrid 
            products={brandProducts} 
            isLoading={isLoading}
            emptyMessage={`Aucun produit trouvé pour la marque ${displayBrandName}`}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BrandProducts;
