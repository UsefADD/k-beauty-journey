import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import { Resend } from "npm:resend@4.0.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
);

const resend = new Resend(Deno.env.get('RESEND_API_KEY'));

serve(async (req) => {
  console.log('Newsletter function called with method:', req.method);
  
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { action, email, subject, content, title } = await req.json();
    console.log('Action:', action);

    // Subscribe to newsletter
    if (action === 'subscribe') {
      const { data, error } = await supabase
        .from('newsletter_subscribers')
        .insert([
          { 
            email: email,
            status: 'subscribed',
            source: 'website'
          }
        ]);

      if (error) {
        console.error('Subscription error:', error);
        if (error.code === '23505') {
          return new Response(
            JSON.stringify({ error: 'Cet email est déjà inscrit à la newsletter' }),
            { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }
        throw error;
      }

      // Send welcome email
      const welcomeEmailResult = await resend.emails.send({
        from: 'Newsletter <onboarding@resend.dev>',
        to: [email],
        subject: 'Bienvenue dans notre newsletter !',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #333;">Merci de vous être inscrit !</h1>
            <p>Nous sommes ravis de vous compter parmi nos abonnés.</p>
            <p>Vous recevrez bientôt nos dernières actualités et offres spéciales.</p>
            <p style="color: #666; font-size: 14px;">Si vous ne souhaitez plus recevoir nos emails, vous pouvez vous désabonner à tout moment.</p>
          </div>
        `,
      });

      console.log('Welcome email sent:', welcomeEmailResult);

      return new Response(
        JSON.stringify({ success: true, message: 'Inscription réussie ! Email de bienvenue envoyé.' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Send newsletter to all subscribers
    if (action === 'send_newsletter') {
      // Check authentication
      const authHeader = req.headers.get('Authorization');
      if (!authHeader) {
        return new Response(
          JSON.stringify({ error: 'Non authentifié' }),
          { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Get user from JWT token
      const token = authHeader.replace('Bearer ', '');
      const { data: { user }, error: authError } = await supabase.auth.getUser(token);

      if (authError || !user) {
        console.error('Auth error:', authError);
        return new Response(
          JSON.stringify({ error: 'Non authentifié' }),
          { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Check if user is admin
      const { data: isAdmin, error: roleError } = await supabase
        .rpc('is_admin', { user_id: user.id });

      if (roleError || !isAdmin) {
        console.error('Role check error:', roleError);
        return new Response(
          JSON.stringify({ error: 'Accès refusé - droits administrateur requis' }),
          { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Get all subscribed emails
      const { data: subscribers, error: fetchError } = await supabase
        .from('newsletter_subscribers')
        .select('email')
        .eq('status', 'subscribed');

      if (fetchError) {
        console.error('Fetch subscribers error:', fetchError);
        throw fetchError;
      }

      if (!subscribers || subscribers.length === 0) {
        return new Response(
          JSON.stringify({ error: 'Aucun abonné trouvé' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      const emailList = subscribers.map(sub => sub.email);
      console.log(`Sending newsletter to ${emailList.length} subscribers`);

      // Send email to all subscribers
      const emailResult = await resend.emails.send({
        from: 'Newsletter <onboarding@resend.dev>',
        to: emailList,
        subject: subject,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #333;">${title}</h1>
            <div style="line-height: 1.6;">
              ${content.replace(/\n/g, '<br>')}
            </div>
            <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
            <p style="color: #666; font-size: 12px;">
              Vous recevez cet email car vous êtes abonné à notre newsletter.
            </p>
          </div>
        `,
      });

      // Save campaign to database
      const { error: campaignError } = await supabase
        .from('newsletter_campaigns')
        .insert([
          {
            title: title,
            subject: subject,
            content: content,
            sent_at: new Date().toISOString(),
            recipient_count: emailList.length,
            sent_by: user.id
          }
        ]);

      if (campaignError) {
        console.error('Campaign save error:', campaignError);
      }

      console.log('Newsletter sent successfully:', emailResult);

      return new Response(
        JSON.stringify({ 
          success: true, 
          message: `Newsletter envoyée à ${emailList.length} abonnés`,
          recipientCount: emailList.length
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ error: 'Action non reconnue' }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error: any) {
    console.error('Error in newsletter function:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'Erreur interne du serveur' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});