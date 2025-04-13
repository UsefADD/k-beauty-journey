
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLanguage } from '../contexts/LanguageContext';

const NewArrivals = () => {
  const { t } = useLanguage();
  
  return (
    <div className="bg-white py-16 mt-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center">
          {/* Left side - Text content */}
          <div className="lg:w-1/2 mb-10 lg:mb-0 pr-0 lg:pr-12">
            <h2 className="text-4xl md:text-5xl font-bold text-pink-800 mb-6 font-serif leading-tight">
              {t('new.arrivals.title')}
            </h2>
            <p className="text-lg text-cream-800 mb-8 max-w-xl">
              {t('new.arrivals.description')}
            </p>
            <Link to="/shop/newly-curated">
              <Button className="uppercase bg-white hover:bg-cream-100 text-pink-800 border border-cream-300">
                {t('shop.newly.curated')}
              </Button>
            </Link>
          </div>
          
          {/* Right side - Placeholder instead of photo */}
          <div className="lg:w-1/2">
            <Card className="overflow-hidden border-none shadow-lg bg-white h-64 flex items-center justify-center">
              <div className="text-center p-6">
                <h3 className="text-2xl font-semibold text-pink-800 mb-2">{t('new.arrivals.card.title')}</h3>
                <p className="text-cream-700">{t('new.arrivals.card.description')}</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewArrivals;
