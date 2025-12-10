-- Create function to restore stock when order is cancelled
CREATE OR REPLACE FUNCTION public.restore_stock_on_cancel()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  v_item RECORD;
BEGIN
  -- Only restore stock if status changed to 'cancelled' from something else
  IF NEW.status = 'cancelled' AND OLD.status != 'cancelled' THEN
    -- Loop through all order items and restore stock
    FOR v_item IN 
      SELECT product_id, quantity 
      FROM public.order_items 
      WHERE order_id = NEW.id
    LOOP
      UPDATE public.products
      SET stock_quantity = COALESCE(stock_quantity, 0) + v_item.quantity
      WHERE id = v_item.product_id;
    END LOOP;
  END IF;
  
  RETURN NEW;
END;
$function$;

-- Create trigger on orders table
DROP TRIGGER IF EXISTS restore_stock_on_order_cancel ON public.orders;
CREATE TRIGGER restore_stock_on_order_cancel
  AFTER UPDATE ON public.orders
  FOR EACH ROW
  EXECUTE FUNCTION public.restore_stock_on_cancel();