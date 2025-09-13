import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Package } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useCart } from "@/contexts/CartContext";
import { useInventory } from "@/hooks/useInventory";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
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
  const { updateStock, checkStock } = useInventory();
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
      // Prepare order items payload
      const orderItems = items.map(item => ({
        product_id: item.id,
        product_name: item.name,
        product_price: item.price,
        quantity: item.quantity,
      }));

      // Optional client-side stock check for UX
      for (const item of items) {
        if (!checkStock(item.id, item.quantity)) {
          toast({
            title: "Insufficient stock",
            description: `Sorry, ${item.name} is out of stock or has insufficient quantity.`,
            variant: "destructive",
          });
          return;
        }
      }

      // Create order transactionally via secure RPC
      const { data: result, error: rpcError } = await supabase.rpc('create_order', {
        p_customer_name: data.fullName,
        p_customer_email: data.email,
        p_customer_phone: data.phone,
        p_shipping_address: data.address,
        p_shipping_city: data.city,
        p_shipping_zip_code: data.zipCode,
        p_total_amount: totalPrice,
        p_items: orderItems,
      });

      if (rpcError) throw rpcError as any;

      const orderNumber = Array.isArray(result) ? (result[0] as any)?.order_number : (result as any)?.order_number;

      toast({
        title: "Order placed successfully",
        description: `Your order ${orderNumber ?? ''} has been placed and will be processed soon.`,
      });

      clearCart();
      navigate("/");
    } catch (error: any) {
      console.error("Error processing order:", error);
      const description = error?.message?.includes("Insufficient stock")
        ? error.message
        : "There was an error processing your order. Please try again.";
      toast({
        title: "Order failed",
        description,
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