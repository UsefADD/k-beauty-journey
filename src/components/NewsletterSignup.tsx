import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '../contexts/LanguageContext';

const NewsletterSignup = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { t, isRTL } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error(t('newsletter.email.required'));
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('send-newsletter', {
        body: { 
          action: 'subscribe', 
          email: email 
        }
      });

      if (error) throw error;

      toast.success(t('newsletter.success'));
      setEmail('');
    } catch (error: any) {
      console.error('Newsletter subscription error:', error);
      toast.error(error.message || t('newsletter.error'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`bg-card p-6 rounded-lg border ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <h3 className="text-xl font-semibold mb-4 text-foreground">
        {t('newsletter.title')}
      </h3>
      <p className="text-muted-foreground mb-4">
        {t('newsletter.description')}
      </p>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          type="email"
          placeholder={t('newsletter.placeholder')}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1"
          disabled={isLoading}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? t('newsletter.subscribing') : t('newsletter.subscribe')}
        </Button>
      </form>
    </div>
  );
};

export default NewsletterSignup;