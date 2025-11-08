-- Add seasons column to products table
ALTER TABLE public.products 
ADD COLUMN seasons text[] DEFAULT '{}';

COMMENT ON COLUMN public.products.seasons IS 'Seasonal tags for products (e.g., printemps, été, automne, hiver)';