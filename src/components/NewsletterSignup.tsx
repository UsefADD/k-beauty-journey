import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

const NewsletterSignup = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error('Veuillez entrer votre adresse email');
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

      toast.success('Inscription réussie ! Vérifiez votre email.');
      setEmail('');
    } catch (error: any) {
      console.error('Newsletter subscription error:', error);
      toast.error(error.message || 'Erreur lors de l\'inscription');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-card p-6 rounded-lg border">
      <h3 className="text-xl font-semibold mb-4 text-foreground">
        Inscrivez-vous à notre newsletter
      </h3>
      <p className="text-muted-foreground mb-4">
        Recevez nos dernières actualités et offres spéciales directement dans votre boîte email.
      </p>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          type="email"
          placeholder="Votre adresse email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1"
          disabled={isLoading}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Inscription...' : 'S\'inscrire'}
        </Button>
      </form>
    </div>
  );
};

export default NewsletterSignup;