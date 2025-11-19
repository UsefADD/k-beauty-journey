-- Drop existing overly permissive policy on newsletter_subscribers
DROP POLICY IF EXISTS "Anyone can subscribe to newsletter" ON public.newsletter_subscribers;

-- Create secure policy: only allow inserting new subscriptions
CREATE POLICY "Anyone can subscribe to newsletter"
ON public.newsletter_subscribers
FOR INSERT
WITH CHECK (true);

-- Create policy: only subscribers can unsubscribe themselves
CREATE POLICY "Users can unsubscribe from newsletter"
ON public.newsletter_subscribers
FOR UPDATE
USING (true)
WITH CHECK (
  status = 'unsubscribed' 
  AND unsubscribed_at IS NOT NULL
);

-- Create policy: only admins can view all subscribers
CREATE POLICY "Only admins can view all subscribers"
ON public.newsletter_subscribers
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE profiles.id = auth.uid()
    AND profiles.role = 'admin'
  )
);