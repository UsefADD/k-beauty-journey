-- Update columns to support multiple values using arrays
ALTER TABLE public.products 
  ALTER COLUMN skin_type_category TYPE text[] USING CASE 
    WHEN skin_type_category IS NULL THEN NULL 
    ELSE ARRAY[skin_type_category] 
  END;

ALTER TABLE public.products 
  ALTER COLUMN skin_concern_category TYPE text[] USING CASE 
    WHEN skin_concern_category IS NULL THEN NULL 
    ELSE ARRAY[skin_concern_category] 
  END;

ALTER TABLE public.products 
  ALTER COLUMN skin_concern_subcategory TYPE text[] USING CASE 
    WHEN skin_concern_subcategory IS NULL THEN NULL 
    ELSE ARRAY[skin_concern_subcategory] 
  END;

-- Add indexes for better performance when filtering by arrays
CREATE INDEX idx_products_skin_type_category_gin ON public.products USING GIN(skin_type_category);
CREATE INDEX idx_products_skin_concern_category_gin ON public.products USING GIN(skin_concern_category);
CREATE INDEX idx_products_skin_concern_subcategory_gin ON public.products USING GIN(skin_concern_subcategory);

-- Example: Update a product to have multiple skin concerns and skin types
UPDATE public.products 
SET 
  skin_type_category = ARRAY['Oily', 'Combination', 'Normal'],
  skin_concern_category = ARRAY['Acne', 'Hydration', 'Anti-Aging'],
  skin_concern_subcategory = ARRAY['Blackheads', 'Dehydration', 'Fine Lines']
WHERE id = '20187c36-b283-4d48-b501-6811b5111584';