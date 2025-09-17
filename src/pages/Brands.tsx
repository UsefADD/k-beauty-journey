
import React from 'react';
import Navbar from '@/components/Navbar';
import AlphabetNavigation from '@/components/AlphabetNavigation';
import BrandSidebar from '@/components/BrandSidebar';
import BrandsList from '@/components/BrandsList';
import FeaturedProducts from '@/components/FeaturedProducts';
import Footer from '@/components/Footer';
import { BrandsProvider } from '@/hooks/useBrands';

const Brands = () => {
  return (
    <BrandsProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-grow bg-background">
          <div className="container mx-auto px-4 py-8">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-serif font-bold text-foreground mb-4">
                Discover K-Beauty Brands
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Explore our curated collection of premium Korean skincare brands. 
                Each brand brings unique innovations and time-tested beauty secrets.
              </p>
            </div>
            
            <AlphabetNavigation />
            
            <div className="flex flex-col lg:flex-row gap-8">
              <BrandSidebar />
              <BrandsList />
            </div>
            
            <div className="mt-16">
              <FeaturedProducts />
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </BrandsProvider>
  );
};

export default Brands;
