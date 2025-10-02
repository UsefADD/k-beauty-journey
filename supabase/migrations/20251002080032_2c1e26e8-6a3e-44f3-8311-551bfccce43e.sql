-- Create product_variants table for different volume options
CREATE TABLE public.product_variants (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id uuid NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  volume text NOT NULL,
  price numeric NOT NULL,
  stock_quantity numeric DEFAULT 0,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.product_variants ENABLE ROW LEVEL SECURITY;

-- Create policies for product_variants
CREATE POLICY "Anyone can view product variants"
  ON public.product_variants
  FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can insert product variants"
  ON public.product_variants
  FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update product variants"
  ON public.product_variants
  FOR UPDATE
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete product variants"
  ON public.product_variants
  FOR DELETE
  USING (auth.role() = 'authenticated');

-- Add trigger for updated_at
CREATE TRIGGER update_product_variants_updated_at
  BEFORE UPDATE ON public.product_variants
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create index for faster queries
CREATE INDEX idx_product_variants_product_id ON public.product_variants(product_id);