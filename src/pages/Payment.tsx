import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Package } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useCart } from "@/contexts/CartContext";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface ShippingFormValues {
  fullName: string;
  email: string;
  address: string;
  city: string;
  zipCode: string;
  phone: string;
}

const Payment = () => {
  const { t } = useLanguage();
  const { items, totalPrice, clearCart } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Check if there are any items in the cart
  useEffect(() => {
    if (items.length === 0) {
      toast({
        title: "Empty Cart",
        description: "Your cart is empty. Please add items before proceeding to payment.",
      });
      navigate('/shop');
    }
  }, [items, navigate, toast]);
  
  const form = useForm<ShippingFormValues>({
    defaultValues: {
      fullName: "",
      email: "",
      address: "",
      city: "",
      zipCode: "",
      phone: "",
    },
  });

  const onSubmit = async (data: ShippingFormValues) => {
    try {
      // Format order details for WhatsApp
      const orderDate = new Date().toLocaleString();
      let message = `🛍️ *NEW ORDER*\n\n`;
      message += `📅 Date: ${orderDate}\n\n`;
      message += `👤 *Customer Information:*\n`;
      message += `Name: ${data.fullName}\n`;
      message += `Email: ${data.email}\n`;
      message += `Phone: ${data.phone}\n\n`;
      message += `📍 *Shipping Address:*\n`;
      message += `Address: ${data.address}\n`;
      message += `City: ${data.city}\n`;
      message += `Zip Code: ${data.zipCode}\n\n`;
      message += `🛒 *Order Items:*\n`;
      
      items.forEach((item, index) => {
        message += `${index + 1}. ${item.name}\n`;
        message += `   Price: ${item.price} MAD\n`;
        message += `   Quantity: ${item.quantity}\n`;
        message += `   Subtotal: ${(item.price * item.quantity).toFixed(2)} MAD\n\n`;
      });
      
      message += `💰 *Total Amount: ${totalPrice.toFixed(2)} MAD*\n`;

      // Create WhatsApp link
      const whatsappNumber = "212705658181"; // Your WhatsApp number
      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

      // Open WhatsApp
      window.open(whatsappUrl, '_blank');

      toast({
        title: "Opening WhatsApp",
        description: "Please send the message in WhatsApp to complete your order.",
      });

      // Clear cart
      clearCart();
      
      // Navigate to home after a short delay
      setTimeout(() => {
        navigate("/");
      }, 1500);

    } catch (error: any) {
      console.error("Error processing order:", error);
      toast({
        title: "Order failed",
        description: "There was an error preparing your order. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow py-12 bg-cream-50">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="text-3xl font-bold text-pink-800 mb-8">{t('payment.method')}</h1>
          
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center gap-3 text-pink-600 mb-6">
                <Package className="h-6 w-6" />
                <span className="font-medium text-lg">{t('shipping.information')}</span>
              </div>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('full.name')}</FormLabel>
                        <FormControl>
                          <Input placeholder={t('enter.full.name')} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="Enter your email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('address')}</FormLabel>
                        <FormControl>
                          <Input placeholder={t('enter.address')} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('city')}</FormLabel>
                          <FormControl>
                            <Input placeholder={t('enter.city')} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="zipCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('zip.code')}</FormLabel>
                          <FormControl>
                            <Input placeholder={t('enter.zip.code')} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('phone.number')}</FormLabel>
                        <FormControl>
                          <Input placeholder={t('enter.phone.number')} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full bg-pink-600 hover:bg-pink-700">
                    {t('save.shipping.details')}
                  </Button>
                </form>
              </Form>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center gap-3 text-pink-600 mb-4">
                <Package className="h-6 w-6" />
                <span className="font-medium text-lg">{t('payment.method')}</span>
              </div>
              <p className="text-cream-700 text-lg">{t('cash.on.delivery.only')}</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Payment;