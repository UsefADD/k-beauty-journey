import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import ServicesSection from '../components/ServicesSection';
import BestSellers from '../components/BestSellers';
import NewArrivals from '../components/NewArrivals';
import PromoSection from '../components/PromoSection';
import BlogSection from '../components/BlogSection';
import NewsletterSignup from '../components/NewsletterSignup';
import Footer from '../components/Footer';
import ErrorBoundary from '@/components/ErrorBoundary';
import { useLocation } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Index = () => {
  const location = useLocation();
  const { toast } = useToast();
  const { t, isRTL } = useLanguage();
  const orderConfirmed = location.state?.orderConfirmed;

  useEffect(() => {
    if (orderConfirmed) {
      toast({
        title: t('order.submitted'),
        description: t('order.submitted.message'),
        duration: 6000,
      });
      // Clear the state
      window.history.replaceState({}, document.title);
    }
  }, [orderConfirmed, toast, t]);

  return (
    <div className={`min-h-screen flex flex-col ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <ErrorBoundary name="Navbar"><Navbar /></ErrorBoundary>
      
      {orderConfirmed && (
        <div className="container mx-auto px-4 pt-6 animate-slide-in-top">
          <Alert className="bg-green-50 border-green-200">
            <CheckCircle2 className="h-5 w-5 text-green-600" />
            <AlertTitle className="text-green-800 font-semibold">{t('order.success.title')}</AlertTitle>
            <AlertDescription className="text-green-700">
              {t('order.success.message')}
            </AlertDescription>
          </Alert>
        </div>
      )}
      
      <ErrorBoundary name="HeroSection"><HeroSection /></ErrorBoundary>
      <ErrorBoundary name="ServicesSection"><ServicesSection /></ErrorBoundary>
      <ErrorBoundary name="PromoSection"><PromoSection /></ErrorBoundary>
      <ErrorBoundary name="BestSellers"><BestSellers /></ErrorBoundary>
      <ErrorBoundary name="NewArrivals"><NewArrivals /></ErrorBoundary>
      
      
      <ErrorBoundary name="BlogSection"><BlogSection /></ErrorBoundary>
      <div className="container mx-auto px-4 py-12">
        <ErrorBoundary name="NewsletterSignup"><NewsletterSignup /></ErrorBoundary>
      </div>
      <ErrorBoundary name="Footer"><Footer /></ErrorBoundary>
    </div>
  );
};

export default Index;