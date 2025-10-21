-- Add product_status column to products table
ALTER TABLE public.products
ADD COLUMN product_status text DEFAULT 'new' CHECK (product_status IN ('new', 'coming_soon', 'standard'));

-- Add comment to describe the column
COMMENT ON COLUMN public.products.product_status IS 'Status of the product: new (nouveau), coming_soon (bientôt disponible), or standard';

-- Create index for better query performance
CREATE INDEX idx_products_status ON public.products(product_status);