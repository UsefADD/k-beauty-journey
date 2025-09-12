-- Add how_to_use and ingredients fields to products table
ALTER TABLE public.products 
ADD COLUMN how_to_use TEXT,
ADD COLUMN ingredients TEXT;