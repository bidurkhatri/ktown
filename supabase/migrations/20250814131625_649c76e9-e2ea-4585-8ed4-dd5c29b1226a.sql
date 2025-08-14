-- Enhance validation triggers for stronger security

-- Update the existing validation function to be more comprehensive
CREATE OR REPLACE FUNCTION public.validate_customer_data()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  -- Validate phone number format (more strict)
  IF NEW.customer_phone IS NOT NULL AND NEW.customer_phone !~ '^[+]?[1-9][0-9\s\-\(\)]{9,}$' THEN
    RAISE EXCEPTION 'Invalid phone number format. Must be at least 10 digits.';
  END IF;
  
  -- Validate email format if provided (more strict)
  IF NEW.guest_email IS NOT NULL AND NEW.guest_email !~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$' THEN
    RAISE EXCEPTION 'Invalid email format';
  END IF;
  
  -- Ensure customer name is not empty and reasonable length
  IF NEW.customer_name IS NOT NULL THEN
    IF length(trim(NEW.customer_name)) < 2 THEN
      RAISE EXCEPTION 'Customer name must be at least 2 characters';
    END IF;
    IF length(trim(NEW.customer_name)) > 100 THEN
      RAISE EXCEPTION 'Customer name too long (max 100 characters)';
    END IF;
  END IF;
  
  -- Validate delivery address for delivery orders
  IF NEW.order_type = 'delivery' AND (NEW.customer_address IS NULL OR length(trim(NEW.customer_address)) < 10) THEN
    RAISE EXCEPTION 'Delivery address must be at least 10 characters for delivery orders';
  END IF;
  
  -- Ensure guest orders have email
  IF NEW.user_id IS NULL AND (NEW.guest_email IS NULL OR length(trim(NEW.guest_email)) = 0) THEN
    RAISE EXCEPTION 'Guest email is required for guest orders';
  END IF;
  
  -- Validate order type
  IF NEW.order_type NOT IN ('pickup', 'delivery') THEN
    RAISE EXCEPTION 'Invalid order type. Must be pickup or delivery';
  END IF;
  
  -- Validate total amount is positive
  IF NEW.total_amount IS NOT NULL AND NEW.total_amount <= 0 THEN
    RAISE EXCEPTION 'Total amount must be greater than 0';
  END IF;
  
  RETURN NEW;
END;
$$;

-- Apply the validation trigger to orders table
DROP TRIGGER IF EXISTS validate_customer_data_trigger ON public.orders;
CREATE TRIGGER validate_customer_data_trigger
  BEFORE INSERT OR UPDATE ON public.orders
  FOR EACH ROW EXECUTE FUNCTION public.validate_customer_data();

-- Create validation function for bookings
CREATE OR REPLACE FUNCTION public.validate_booking_data()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  -- Validate phone number format
  IF NEW.guest_phone IS NOT NULL AND NEW.guest_phone !~ '^[+]?[1-9][0-9\s\-\(\)]{9,}$' THEN
    RAISE EXCEPTION 'Invalid phone number format';
  END IF;
  
  -- Validate email format
  IF NEW.guest_email IS NOT NULL AND NEW.guest_email !~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$' THEN
    RAISE EXCEPTION 'Invalid email format';
  END IF;
  
  -- Validate guest name
  IF NEW.guest_name IS NOT NULL THEN
    IF length(trim(NEW.guest_name)) < 2 THEN
      RAISE EXCEPTION 'Guest name must be at least 2 characters';
    END IF;
    IF length(trim(NEW.guest_name)) > 100 THEN
      RAISE EXCEPTION 'Guest name too long (max 100 characters)';
    END IF;
  END IF;
  
  -- Validate party size
  IF NEW.party_size IS NOT NULL AND (NEW.party_size < 1 OR NEW.party_size > 20) THEN
    RAISE EXCEPTION 'Party size must be between 1 and 20';
  END IF;
  
  -- Validate booking date is not in the past
  IF NEW.booking_date IS NOT NULL AND NEW.booking_date < CURRENT_DATE THEN
    RAISE EXCEPTION 'Booking date cannot be in the past';
  END IF;
  
  -- Validate status
  IF NEW.status NOT IN ('pending', 'confirmed', 'cancelled', 'completed') THEN
    RAISE EXCEPTION 'Invalid booking status';
  END IF;
  
  RETURN NEW;
END;
$$;

-- Apply the validation trigger to bookings table
DROP TRIGGER IF EXISTS validate_booking_data_trigger ON public.bookings;
CREATE TRIGGER validate_booking_data_trigger
  BEFORE INSERT OR UPDATE ON public.bookings
  FOR EACH ROW EXECUTE FUNCTION public.validate_booking_data();