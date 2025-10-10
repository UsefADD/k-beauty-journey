-- Drop existing insecure policies on products table
DROP POLICY IF EXISTS "Authenticated users can delete products" ON public.products;
DROP POLICY IF EXISTS "Authenticated users can insert products" ON public.products;
DROP POLICY IF EXISTS "Authenticated users can update products" ON public.products;

-- Create secure admin-only policies for products
CREATE POLICY "Only admins can delete products"
ON public.products
FOR DELETE
USING (is_admin(auth.uid()));

CREATE POLICY "Only admins can insert products"
ON public.products
FOR INSERT
WITH CHECK (is_admin(auth.uid()));

CREATE POLICY "Only admins can update products"
ON public.products
FOR UPDATE
USING (is_admin(auth.uid()))
WITH CHECK (is_admin(auth.uid()));

-- Drop existing insecure policies on product_variants table
DROP POLICY IF EXISTS "Authenticated users can delete product variants" ON public.product_variants;
DROP POLICY IF EXISTS "Authenticated users can insert product variants" ON public.product_variants;
DROP POLICY IF EXISTS "Authenticated users can update product variants" ON public.product_variants;

-- Create secure admin-only policies for product_variants
CREATE POLICY "Only admins can delete product variants"
ON public.product_variants
FOR DELETE
USING (is_admin(auth.uid()));

CREATE POLICY "Only admins can insert product variants"
ON public.product_variants
FOR INSERT
WITH CHECK (is_admin(auth.uid()));

CREATE POLICY "Only admins can update product variants"
ON public.product_variants
FOR UPDATE
USING (is_admin(auth.uid()))
WITH CHECK (is_admin(auth.uid()));