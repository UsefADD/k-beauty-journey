
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Package } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useCart } from '../contexts/CartContext';
import { useInventory } from '../hooks/useInventory';
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from 'react-router-dom';

interface ShippingFormValues {
  fullName: string;
  address: string;
  city: string;
  zipCode: string;
  phone: string;
}

const Payment = () => {
  const { t } = useLanguage();
  const { items, totalPrice, clearCart } = useCart();
  const { updateStock, checkStock } = useInventory();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const form = useForm<ShippingFormValues>({
    defaultValues: {
      fullName: "",
      address: "",
      city: "",
      zipCode: "",
      phone: "",
    },
  });

  const onSubmit = async (data: ShippingFormValues) => {
    // Check if all items are in stock
    const stockCheck = items.every(item => checkStock(item.id, item.quantity));
    
    if (!stockCheck) {
      toast({
        variant: "destructive",
        title: "Out of Stock",
        description: "Some items in your cart are no longer available in the requested quantity.",
      });
      return;
    }

    try {
      // Update stock for each item
      for (const item of items) {
        await updateStock.mutateAsync({
          productId: item.id,
          quantity: item.quantity,
        });
      }

      // Order successful
      toast({
        title: "Order Placed Successfully!",
        description: "Thank you for your purchase. We'll deliver your items soon.",
      });

      // Clear the cart and redirect to home
      clearCart();
      navigate('/');
      
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "There was an error processing your order. Please try again.",
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
                <span className="font-medium text-lg">Shipping Information</span>
              </div>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your full name" {...field} />
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
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your address" {...field} />
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
                          <FormLabel>City</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your city" {...field} />
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
                          <FormLabel>ZIP Code</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter ZIP code" {...field} />
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
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your phone number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full bg-pink-600 hover:bg-pink-700">
                    Save Shipping Details
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
