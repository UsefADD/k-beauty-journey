-- Create a secure, transactional function to create an order and its items, and decrement stock
CREATE OR REPLACE FUNCTION public.create_order(
  p_customer_name text,
  p_customer_email text,
  p_customer_phone text,
  p_shipping_address text,
  p_shipping_city text,
  p_shipping_zip_code text,
  p_total_amount numeric,
  p_items jsonb
)
RETURNS TABLE(order_id uuid, order_number text)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_order_id uuid;
  v_order_number text;
  v_item jsonb;
  v_product_id uuid;
  v_qty integer;
  v_name text;
  v_price numeric;
  v_current_stock numeric;
BEGIN
  -- Generate order number
  v_order_number := public.generate_order_number();

  -- Create the order
  INSERT INTO public.orders (
    order_number, customer_name, customer_email, customer_phone,
    shipping_address, shipping_city, shipping_zip_code,
    total_amount, status
  ) VALUES (
    v_order_number, p_customer_name, p_customer_email, p_customer_phone,
    p_shipping_address, p_shipping_city, p_shipping_zip_code,
    p_total_amount, 'pending'
  )
  RETURNING id INTO v_order_id;

  -- Create order items and update stock atomically
  FOR v_item IN SELECT jsonb_array_elements(p_items)
  LOOP
    v_product_id := (v_item->>'product_id')::uuid;
    v_qty := COALESCE((v_item->>'quantity')::int, 0);
    v_name := v_item->>'product_name';
    v_price := (v_item->>'product_price')::numeric;

    -- Lock the product row and check stock
    SELECT stock_quantity INTO v_current_stock
    FROM public.products
    WHERE id = v_product_id
    FOR UPDATE;

    IF v_current_stock IS NULL OR v_current_stock < v_qty THEN
      RAISE EXCEPTION 'Insufficient stock for %', v_name;
    END IF;

    -- Insert order item
    INSERT INTO public.order_items (
      order_id, product_id, product_name, product_price, quantity, subtotal
    ) VALUES (
      v_order_id, v_product_id, v_name, v_price, v_qty, v_price * v_qty
    );

    -- Decrement stock
    UPDATE public.products
    SET stock_quantity = v_current_stock - v_qty
    WHERE id = v_product_id;
  END LOOP;

  RETURN QUERY SELECT v_order_id, v_order_number;
END;
$$;

-- Allow calling the function from client (anon or authenticated)
GRANT EXECUTE ON FUNCTION public.create_order(
  text, text, text, text, text, text, numeric, jsonb
) TO anon, authenticated;