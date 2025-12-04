-- Add sale price columns to products table
ALTER TABLE public.products 
ADD COLUMN sale_price numeric DEFAULT NULL,
ADD COLUMN is_on_sale boolean DEFAULT false;

-- Add comment for clarity
COMMENT ON COLUMN public.products.sale_price IS 'Discounted price when product is on sale';
COMMENT ON COLUMN public.products.is_on_sale IS 'Flag to indicate if product is currently on sale';