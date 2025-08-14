-- Fix remaining security vulnerabilities in RLS policies

-- 1. Fix bookings table - remove guest access to viewing other bookings
DROP POLICY IF EXISTS "Users can view their own bookings" ON public.bookings;
CREATE POLICY "Users can view their own bookings" 
ON public.bookings 
FOR SELECT 
USING (auth.uid() = user_id);

-- Add admin access separately
CREATE POLICY "Admins can view all bookings" 
ON public.bookings 
FOR SELECT 
USING (EXISTS (
  SELECT 1 FROM profiles 
  WHERE profiles.user_id = auth.uid() 
  AND profiles.role IN ('admin', 'super_admin')
));

-- 2. Fix orders table - remove guest email access for viewing orders
DROP POLICY IF EXISTS "Users can view their own orders" ON public.orders;
CREATE POLICY "Users can view their own orders" 
ON public.orders 
FOR SELECT 
USING (auth.uid() = user_id);

-- Add admin access for orders
CREATE POLICY "Admins can view all orders" 
ON public.orders 
FOR SELECT 
USING (EXISTS (
  SELECT 1 FROM profiles 
  WHERE profiles.user_id = auth.uid() 
  AND profiles.role IN ('admin', 'super_admin')
));

-- 3. Fix order_items table - strengthen insert policy
DROP POLICY IF EXISTS "Users can create order items" ON public.order_items;
CREATE POLICY "Users can create order items" 
ON public.order_items 
FOR INSERT 
WITH CHECK (
  EXISTS (
    SELECT 1 FROM orders 
    WHERE orders.id = order_items.order_id 
    AND (
      (orders.user_id = auth.uid()) OR 
      (orders.user_id IS NULL AND orders.guest_email IS NOT NULL)
    )
  )
);

-- Update order_items view policy for better security
DROP POLICY IF EXISTS "Users can view order items for their orders" ON public.order_items;
CREATE POLICY "Users can view order items for their orders" 
ON public.order_items 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM orders 
    WHERE orders.id = order_items.order_id 
    AND orders.user_id = auth.uid()
  )
);

-- Add admin access for order items
CREATE POLICY "Admins can view all order items" 
ON public.order_items 
FOR SELECT 
USING (EXISTS (
  SELECT 1 FROM profiles 
  WHERE profiles.user_id = auth.uid() 
  AND profiles.role IN ('admin', 'super_admin')
));

-- 4. Strengthen cart session security - require stronger session IDs
DROP POLICY IF EXISTS "Users can view their cart items" ON public.cart_items;
DROP POLICY IF EXISTS "Users can insert cart items" ON public.cart_items;
DROP POLICY IF EXISTS "Users can update their cart items" ON public.cart_items;
DROP POLICY IF EXISTS "Users can delete their cart items" ON public.cart_items;

CREATE POLICY "Users can view their cart items" 
ON public.cart_items 
FOR SELECT 
USING (
  (auth.uid() IS NOT NULL AND user_id = auth.uid()) OR
  (auth.uid() IS NULL AND session_id IS NOT NULL AND length(session_id) >= 32)
);

CREATE POLICY "Users can insert cart items" 
ON public.cart_items 
FOR INSERT 
WITH CHECK (
  (auth.uid() IS NOT NULL AND user_id = auth.uid()) OR
  (auth.uid() IS NULL AND session_id IS NOT NULL AND length(session_id) >= 32)
);

CREATE POLICY "Users can update their cart items" 
ON public.cart_items 
FOR UPDATE 
USING (
  (auth.uid() IS NOT NULL AND user_id = auth.uid()) OR
  (auth.uid() IS NULL AND session_id IS NOT NULL AND length(session_id) >= 32)
);

CREATE POLICY "Users can delete their cart items" 
ON public.cart_items 
FOR DELETE 
USING (
  (auth.uid() IS NOT NULL AND user_id = auth.uid()) OR
  (auth.uid() IS NULL AND session_id IS NOT NULL AND length(session_id) >= 32)
);