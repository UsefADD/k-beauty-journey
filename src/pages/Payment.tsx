
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Package } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Payment = () => {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow py-12 bg-cream-50">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-pink-800 mb-8">{t('payment.method')}</h1>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center gap-3 text-pink-600 mb-4">
              <Package className="h-6 w-6" />
              <span className="font-medium text-lg">{t('payment.method')}</span>
            </div>
            <p className="text-cream-700 text-lg">{t('cash.on.delivery.only')}</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Payment;
