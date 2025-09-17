
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
        
        <main className="flex-grow bg-white">
          <div className="max-w-6xl mx-auto px-5 py-8">
            {!selectedBrand ? (
              <>
                {/* Hero section */}
                <section className="bg-gradient-to-r from-secondary to-accent text-center py-12 mb-10 rounded-2xl">
                  <div className="container mx-auto px-4">
                    <div className="text-4xl font-bold text-foreground mb-3">MARQUES</div>
                    <div className="text-xl font-medium mb-2 text-foreground">Korean Skincare Brands</div>
                    <div className="text-base mb-6 text-muted-foreground">
                      Découvrez nos marques coréennes authentiques
                    </div>
                    <button className="bg-primary text-primary-foreground border-0 py-3 px-8 rounded-full font-semibold text-base cursor-pointer transition-colors hover:opacity-90">
                      DÉCOUVRIR
                    </button>
                  </div>
                </section>

                {/* Features section */}
                <section className="flex justify-between items-center py-8 border-b border-border mb-10">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center text-primary">
                      <i className="fas fa-shipping-fast"></i>
                    </div>
                    <div className="text-sm font-medium text-foreground">Expédition le jour même</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center text-primary">
                      <i className="fas fa-gift"></i>
                    </div>
                    <div className="text-sm font-medium text-foreground">Masque gratuit à partir de 40€</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center text-primary">
                      <i className="fas fa-truck"></i>
                    </div>
                    <div className="text-sm font-medium text-foreground">Livraison gratuite à partir de 50€</div>
                  </div>
                </section>
                
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
