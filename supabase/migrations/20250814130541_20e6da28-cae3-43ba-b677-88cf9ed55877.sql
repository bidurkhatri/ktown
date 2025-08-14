-- Fix function search path security issue
CREATE OR REPLACE FUNCTION validate_customer_data()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  -- Validate phone number format
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
$$;