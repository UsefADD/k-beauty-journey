
import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import ServicesSection from '../components/ServicesSection';
import BestSellers from '../components/BestSellers';
import NewArrivals from '../components/NewArrivals';


import BlogSection from '../components/BlogSection';
import NewsletterSignup from '../components/NewsletterSignup';
import Footer from '../components/Footer';
import ErrorBoundary from '@/components/ErrorBoundary';
import { useLocation } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CheckCircle2 } from 'lucide-react';

const Index = () => {
  const location = useLocation();
  const { toast } = useToast();
  const orderConfirmed = location.state?.orderConfirmed;

  useEffect(() => {
    if (orderConfirmed) {
      toast({
        title: "Order Submitted! 🎉",
        description: "Thank you for your order! Please complete the WhatsApp message to finalize your purchase.",
        duration: 6000,
      });
      // Clear the state
      window.history.replaceState({}, document.title);
    }
  }, [orderConfirmed, toast]);

  return (
    <div className="min-h-screen flex flex-col">
      <ErrorBoundary name="Navbar"><Navbar /></ErrorBoundary>
      
      {orderConfirmed && (
        <div className="container mx-auto px-4 pt-6">
          <Alert className="bg-green-50 border-green-200">
            <CheckCircle2 className="h-5 w-5 text-green-600" />
            <AlertTitle className="text-green-800 font-semibold">Order Successfully Submitted!</AlertTitle>
            <AlertDescription className="text-green-700">
              Your order details have been sent to WhatsApp. Please complete the message to finalize your purchase. 
              We'll contact you shortly to confirm your order.
            </AlertDescription>
          </Alert>
        </div>
      )}
      
      <ErrorBoundary name="HeroSection"><HeroSection /></ErrorBoundary>
      <ErrorBoundary name="ServicesSection"><ServicesSection /></ErrorBoundary>
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
