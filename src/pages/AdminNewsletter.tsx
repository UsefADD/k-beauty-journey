import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useUserRole } from '@/hooks/useUserRole';
import { Mail, Users, Send } from 'lucide-react';

const AdminNewsletter = () => {
  const { user } = useAuth();
  const { isAdmin } = useUserRole();
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [subscribers, setSubscribers] = useState([]);
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    if (isAdmin) {
      fetchSubscribers();
      fetchCampaigns();
    }
  }, [isAdmin]);

  const fetchSubscribers = async () => {
    try {
      const { data, error } = await supabase
        .from('newsletter_subscribers')
        .select('*')
        .eq('status', 'subscribed')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSubscribers(data || []);
    } catch (error) {
      console.error('Error fetching subscribers:', error);
    }
  };

  const fetchCampaigns = async () => {
    try {
      const { data, error } = await supabase
        .from('newsletter_campaigns')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) throw error;
      setCampaigns(data || []);
    } catch (error) {
      console.error('Error fetching campaigns:', error);
    }
  };

  const handleSendNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !subject || !content) {
      toast.error('Veuillez remplir tous les champs');
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('send-newsletter', {
        body: { 
          action: 'send_newsletter',
          title,
          subject,
          content
        }
      });

      if (error) throw error;

      toast.success(`Newsletter envoyée avec succès !`);
      setTitle('');
      setSubject('');
      setContent('');
      fetchCampaigns();
    } catch (error: any) {
      console.error('Newsletter send error:', error);
      toast.error(error.message || 'Erreur lors de l\'envoi');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAdmin) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground">Accès non autorisé</h1>
          <p className="text-muted-foreground mt-2">Vous devez être administrateur pour accéder à cette page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-foreground">Gestion Newsletter</h1>
      
      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Abonnés actifs</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{subscribers.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Campaigns envoyées</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{campaigns.length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Send Newsletter Form */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Send className="h-5 w-5" />
            Envoyer une Newsletter
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSendNewsletter} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground">Titre</label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Titre de la newsletter"
                disabled={isLoading}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Sujet de l'email</label>
              <Input
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Sujet qui apparaîtra dans l'email"
                disabled={isLoading}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Contenu</label>
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Contenu de la newsletter..."
                rows={10}
                disabled={isLoading}
              />
            </div>
            <Button type="submit" disabled={isLoading || subscribers.length === 0}>
              {isLoading ? 'Envoi en cours...' : `Envoyer à ${subscribers.length} abonnés`}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Recent Campaigns */}
      <Card>
        <CardHeader>
          <CardTitle>Campagnes récentes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {campaigns.map((campaign: any) => (
              <div key={campaign.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-semibold text-foreground">{campaign.title}</h4>
                  <p className="text-sm text-muted-foreground">{campaign.subject}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(campaign.sent_at).toLocaleDateString('fr-FR')}
                  </p>
                </div>
                <Badge variant="secondary">
                  {campaign.recipient_count} destinataires
                </Badge>
              </div>
            ))}
            {campaigns.length === 0 && (
              <p className="text-muted-foreground text-center py-4">Aucune campagne envoyée</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminNewsletter;