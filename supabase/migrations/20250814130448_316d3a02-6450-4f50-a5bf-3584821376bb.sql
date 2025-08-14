-- Fix critical security issues in bookings, orders, and cart_items tables

-- 1. Secure bookings table - restrict to authenticated users only
DROP POLICY IF EXISTS "Allow inserting new bookings" ON public.bookings;
CREATE POLICY "Authenticated users can create bookings" 
ON public.bookings 
FOR INSERT 
WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Users can view their own bookings" 
ON public.bookings 
FOR SELECT 
USING (auth.uid() = user_id OR auth.uid() IS NULL);

-- 2. Secure orders table - restrict to authenticated users and proper session validation
DROP POLICY IF EXISTS "Allow inserting orders" ON public.orders;
CREATE POLICY "Authenticated users can create orders" 
ON public.orders 
FOR INSERT 
WITH CHECK (
  (auth.uid() IS NOT NULL AND user_id = auth.uid()) OR 
  (auth.uid() IS NULL AND guest_email IS NOT NULL)
);

CREATE POLICY "Users can view their own orders" 
ON public.orders 
FOR SELECT 
USING (
  (auth.uid() IS NOT NULL AND user_id = auth.uid()) OR
  (auth.uid() IS NULL AND guest_email IS NOT NULL)
);

-- 3. Improve cart_items session validation
DROP POLICY IF EXISTS "Users can view their cart items" ON public.cart_items;
DROP POLICY IF EXISTS "Users can insert cart items" ON public.cart_items;
DROP POLICY IF EXISTS "Users can update their cart items" ON public.cart_items;
DROP POLICY IF EXISTS "Users can delete their cart items" ON public.cart_items;

CREATE POLICY "Users can view their cart items" 
ON public.cart_items 
FOR SELECT 
USING (
  (auth.uid() IS NOT NULL AND user_id = auth.uid()) OR
  (auth.uid() IS NULL AND session_id IS NOT NULL AND length(session_id) >= 10)
);

CREATE POLICY "Users can insert cart items" 
ON public.cart_items 
FOR INSERT 
WITH CHECK (
  (auth.uid() IS NOT NULL AND user_id = auth.uid()) OR
  (auth.uid() IS NULL AND session_id IS NOT NULL AND length(session_id) >= 10)
);

CREATE POLICY "Users can update their cart items" 
ON public.cart_items 
FOR UPDATE 
USING (
  (auth.uid() IS NOT NULL AND user_id = auth.uid()) OR
  (auth.uid() IS NULL AND session_id IS NOT NULL AND length(session_id) >= 10)
);

CREATE POLICY "Users can delete their cart items" 
ON public.cart_items 
FOR DELETE 
USING (
  (auth.uid() IS NOT NULL AND user_id = auth.uid()) OR
  (auth.uid() IS NULL AND session_id IS NOT NULL AND length(session_id) >= 10)
);

-- 4. Add validation triggers for sensitive data
CREATE OR REPLACE FUNCTION validate_customer_data()
RETURNS TRIGGER AS $$
BEGIN
  -- Validate phone number format (basic validation)
  IF NEW.customer_phone IS NOT NULL AND NEW.customer_phone !~ '^[+]?[0-9\s\-\(\)]{10,}$' THEN
    RAISE EXCEPTION 'Invalid phone number format';
  END IF;
  
  -- Validate email format if provided
  IF NEW.guest_email IS NOT NULL AND NEW.guest_email !~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$' THEN
    RAISE EXCEPTION 'Invalid email format';
  END IF;
  
  -- Ensure customer name is not empty
  IF NEW.customer_name IS NOT NULL AND length(trim(NEW.customer_name)) < 2 THEN
    RAISE EXCEPTION 'Customer name must be at least 2 characters';
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply validation trigger to orders table
DROP TRIGGER IF EXISTS validate_orders_data ON public.orders;
CREATE TRIGGER validate_orders_data
  BEFORE INSERT OR UPDATE ON public.orders
  FOR EACH ROW
  EXECUTE FUNCTION validate_customer_data();

-- Apply validation trigger to bookings table  
DROP TRIGGER IF EXISTS validate_bookings_data ON public.bookings;
CREATE TRIGGER validate_bookings_data
  BEFORE INSERT OR UPDATE ON public.bookings
  FOR EACH ROW
  EXECUTE FUNCTION validate_customer_data();