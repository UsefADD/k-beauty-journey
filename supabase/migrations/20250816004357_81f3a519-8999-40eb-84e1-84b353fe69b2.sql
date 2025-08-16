-- Add product categorization columns to products table
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS product_type text;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS product_subtype text;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS skin_type_category text;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS skin_concern_category text;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS skin_concern_subcategory text;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_products_product_type ON public.products(product_type);
CREATE INDEX IF NOT EXISTS idx_products_skin_type_category ON public.products(skin_type_category);
CREATE INDEX IF NOT EXISTS idx_products_skin_concern_category ON public.products(skin_concern_category);

-- Insert some example data to demonstrate categories
UPDATE public.products SET 
  product_type = 'Skincare',
  product_subtype = 'Cleanser',
  skin_type_category = 'Dry',
  skin_concern_category = 'Hydration'
WHERE id IN (SELECT id FROM public.products LIMIT 3);

UPDATE public.products SET 
  product_type = 'Skincare',
  product_subtype = 'Serum',
  skin_type_category = 'Oily',
  skin_concern_category = 'Acne',
  skin_concern_subcategory = 'Blackheads'
WHERE id IN (SELECT id FROM public.products OFFSET 3 LIMIT 3);

UPDATE public.products SET 
  product_type = 'Makeup',
  product_subtype = 'Foundation',
  skin_type_category = 'Combination',
  skin_concern_category = 'Anti-aging',
  skin_concern_subcategory = 'Fine Lines'
WHERE id IN (SELECT id FROM public.products OFFSET 6 LIMIT 3);