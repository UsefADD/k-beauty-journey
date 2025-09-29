
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import AlphabetNavigation from '@/components/AlphabetNavigation';
import BrandsList from '@/components/BrandsList';
import BrandProducts from '@/components/BrandProducts';
import Footer from '@/components/Footer';
import { BrandsProvider } from '@/hooks/useBrands';
import { Brand } from '@/data/brandsData';

const Brands = () => {
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);

  const handleBrandSelect = (brand: Brand) => {
    setSelectedBrand(brand);
  };

  const handleBackToBrands = () => {
    setSelectedBrand(null);
  };

  return (
    <BrandsProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-grow bg-gray-50">
          <div className="max-w-6xl mx-auto px-5 py-5">
            {!selectedBrand ? (
              <>
                <header className="text-center mb-10 p-8 bg-gradient-to-r from-cream-400 to-pink-300 text-gray-800 rounded-2xl shadow-lg">
                  <h1 className="text-5xl font-bold mb-3">Brand Directory</h1>
                  <p className="text-xl max-w-3xl mx-auto opacity-90">
                    Browse our collection of brands and their products. Select a letter to view brands starting with that letter.
                  </p>
                </header>
                
                <AlphabetNavigation />
                <BrandsList onBrandSelect={handleBrandSelect} />
              </>
            ) : (
              <BrandProducts 
                brand={selectedBrand} 
                onBack={handleBackToBrands}
              />
            )}
          </div>
        </main>

        <Footer />
      </div>
    </BrandsProvider>
  );
};

export default Brands;
