-- Create a public read policy for products table
-- This allows anyone to view products (needed for e-commerce)
CREATE POLICY "Anyone can view products" 
ON public.products 
FOR SELECT 
USING (true);

-- Optional: Add policies for authenticated users to manage products
-- Uncomment these if you want to allow authenticated users to add/edit products
-- CREATE POLICY "Authenticated users can add products" 
-- ON public.products 
-- FOR INSERT 
-- WITH CHECK (auth.role() = 'authenticated');

-- CREATE POLICY "Authenticated users can update products" 
-- ON public.products 
-- FOR UPDATE 
-- USING (auth.role() = 'authenticated');

-- CREATE POLICY "Authenticated users can delete products" 
-- ON public.products 
-- FOR DELETE 
-- USING (auth.role() = 'authenticated');