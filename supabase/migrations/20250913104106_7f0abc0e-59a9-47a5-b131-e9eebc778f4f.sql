-- Ensure create_order RPC runs with elevated privileges to bypass RLS safely
BEGIN;

-- Make sure the function exists with SECURITY DEFINER and is owned by postgres (superuser)
ALTER FUNCTION public.create_order(
  p_customer_name text,
  p_customer_email text,
  p_customer_phone text,
  p_shipping_address text,
  p_shipping_city text,
  p_shipping_zip_code text,
  p_total_amount numeric,
  p_items jsonb
) OWNER TO postgres;

-- Regrant execute just in case
GRANT EXECUTE ON FUNCTION public.create_order(
  text, text, text, text, text, text, numeric, jsonb
) TO anon, authenticated;

COMMIT;