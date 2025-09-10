-- Add RLS policies for updating and inserting products
-- Allow authenticated users to update products
CREATE POLICY "Authenticated users can update products" 
ON public.products 
FOR UPDATE 
USING (auth.role() = 'authenticated')
WITH CHECK (auth.role() = 'authenticated');

-- Allow authenticated users to insert products  
CREATE POLICY "Authenticated users can insert products" 
ON public.products 
FOR INSERT 
WITH CHECK (auth.role() = 'authenticated');

-- Allow authenticated users to delete products
CREATE POLICY "Authenticated users can delete products" 
ON public.products 
FOR DELETE 
USING (auth.role() = 'authenticated');