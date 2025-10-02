-- Add volume column to products table
ALTER TABLE public.products 
ADD COLUMN volume text;