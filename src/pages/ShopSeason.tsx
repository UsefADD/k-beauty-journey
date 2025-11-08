import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FilteredProductsGrid from '../components/FilteredProductsGrid';
import { useProducts } from '@/hooks/useProducts';

const ShopSeason = () => {
  const { season } = useParams();
  const { products, isLoading } = useProducts();
  const [seasonProducts, setSeasonProducts] = useState([]);

  useEffect(() => {
    if (products && season) {
      const targetSeason = decodeURIComponent(season).toLowerCase();
      const filtered = products.filter(
        product => product.seasons && product.seasons.some((s: string) => s.toLowerCase() === targetSeason)
      );
      setSeasonProducts(filtered);
    }
  }, [products, season]);

  const displaySeasonName = season ? decodeURIComponent(season) : '';

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow py-12 bg-cream-50">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-center mb-4 text-black font-serif">
              Collection {displaySeasonName}
            </h1>
            <p className="text-center text-gray-600 max-w-2xl mx-auto">
              Découvrez tous les produits parfaits pour la saison {displaySeasonName}
            </p>
          </div>

          <FilteredProductsGrid 
            products={seasonProducts} 
            isLoading={isLoading}
            emptyMessage={`Aucun produit trouvé pour la saison ${displaySeasonName}`}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ShopSeason;
