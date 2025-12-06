
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { useQuery } from '@tanstack/react-query';
import { Package, ChevronDown, ChevronUp } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface Order {
  id: string;
  order_number: string;
  created_at: string;
  status: string;
  total_amount: number;
  shipping_address: string;
  shipping_city: string;
  shipping_zip_code: string;
}

interface OrderItem {
  id: string;
  product_name: string;
  product_price: number;
  quantity: number;
  subtotal: number;
}

const Profile = () => {
  const { user, isAuthenticated, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [updating, setUpdating] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { t, isRTL } = useLanguage();

  // Fetch user orders
  const { data: orders, isLoading: ordersLoading } = useQuery({
    queryKey: ['user-orders', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Order[];
    },
    enabled: !!user?.id
  });

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/auth');
    }
    if (user) {
      setEmail(user.email || '');
    }
  }, [user, isAuthenticated, loading, navigate]);

  const handleUpdatePassword = async () => {
    try {
      setUpdating(true);
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin + '/update-password',
      });

      if (error) throw error;
      
      toast({
        title: t('profile.password.reset.sent'),
        description: t('profile.password.reset.desc'),
      });
    } catch (error: any) {
      toast({
        title: t('auth.error'),
        description: error.message || t('profile.password.reset.error'),
        variant: "destructive",
      });
    } finally {
      setUpdating(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'shipped': return 'bg-purple-100 text-purple-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending': return t('order.status.pending');
      case 'confirmed': return t('order.status.confirmed');
      case 'shipped': return t('order.status.shipped');
      case 'delivered': return t('order.status.delivered');
      case 'cancelled': return t('order.status.cancelled');
      default: return status;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(isRTL ? 'ar-MA' : 'fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className={`min-h-screen flex flex-col ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <p>{t('profile.loading')}</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex flex-col ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <Navbar />
      <div className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto space-y-8">
          {/* Profile Section */}
          <div className="bg-white p-8 rounded-lg shadow-md border border-pink-100">
            <h1 className="text-2xl font-serif font-bold text-pink-600 mb-6">{t('profile.title')}</h1>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">{t('profile.email')}</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  disabled
                  className="bg-gray-50"
                />
                <p className="text-sm text-gray-500">{t('profile.email.cannot.change')}</p>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-lg font-medium">{t('profile.password.settings')}</h3>
                <Button 
                  onClick={handleUpdatePassword}
                  disabled={updating}
                  variant="outline"
                  className="border-pink-200"
                >
                  {updating ? t('auth.processing') : t('profile.update.password')}
                </Button>
              </div>
            </div>
          </div>

          {/* My Orders Section */}
          <div className="bg-white p-8 rounded-lg shadow-md border border-pink-100">
            <div className="flex items-center gap-3 mb-6">
              <Package className="h-6 w-6 text-pink-600" />
              <h2 className="text-2xl font-serif font-bold text-pink-600">{t('profile.my.orders')}</h2>
            </div>
            
            {ordersLoading ? (
              <p className="text-gray-500">{t('profile.loading')}</p>
            ) : orders && orders.length > 0 ? (
              <Accordion type="single" collapsible className="space-y-4">
                {orders.map((order) => (
                  <AccordionItem 
                    key={order.id} 
                    value={order.id}
                    className="border border-gray-200 rounded-lg px-4"
                  >
                    <AccordionTrigger className="hover:no-underline py-4">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 text-left w-full">
                        <span className="font-semibold text-pink-700">
                          {t('profile.order.number')}{order.order_number}
                        </span>
                        <span className="text-sm text-gray-500">
                          {formatDate(order.created_at)}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium w-fit ${getStatusColor(order.status)}`}>
                          {getStatusLabel(order.status)}
                        </span>
                        <span className="font-bold text-pink-800 sm:ml-auto">
                          {order.total_amount.toFixed(2)} MAD
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-4">
                      <div className="space-y-4 pt-2">
                        <div>
                          <h4 className="font-medium text-gray-700 mb-2">{t('profile.order.shipping')}</h4>
                          <p className="text-sm text-gray-600">
                            {order.shipping_address}<br />
                            {order.shipping_city}, {order.shipping_zip_code}
                          </p>
                        </div>
                        <OrderItems orderId={order.id} t={t} />
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            ) : (
              <p className="text-gray-500 text-center py-8">{t('profile.no.orders')}</p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

// Sub-component for order items
const OrderItems = ({ orderId, t }: { orderId: string; t: (key: string) => string }) => {
  const { data: items, isLoading } = useQuery({
    queryKey: ['order-items', orderId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('order_items')
        .select('*')
        .eq('order_id', orderId);
      
      if (error) throw error;
      return data as OrderItem[];
    }
  });

  if (isLoading) return <p className="text-sm text-gray-500">{t('profile.loading')}</p>;

  return (
    <div>
      <h4 className="font-medium text-gray-700 mb-2">{t('profile.order.items')}</h4>
      <div className="space-y-2">
        {items?.map((item) => (
          <div key={item.id} className="flex justify-between text-sm border-b pb-2">
            <div>
              <span className="font-medium">{item.product_name}</span>
              <span className="text-gray-500 ml-2">x{item.quantity}</span>
            </div>
            <span className="font-medium">{item.subtotal.toFixed(2)} MAD</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
