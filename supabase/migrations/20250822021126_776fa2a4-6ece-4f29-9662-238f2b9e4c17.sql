-- Update RLS policies to allow public read access to menu categories and items
-- This allows anyone to view the menu without authentication

-- Drop existing policies for menu_categories
DROP POLICY IF EXISTS "Anyone can view active categories" ON public.menu_categories;
DROP POLICY IF EXISTS "Admins can manage categories" ON public.menu_categories;

-- Create new policies for menu_categories
CREATE POLICY "Public can view active categories" 
ON public.menu_categories 
FOR SELECT 
USING (is_active = true);

CREATE POLICY "Admins can manage categories" 
ON public.menu_categories 
FOR ALL 
USING (EXISTS (
  SELECT 1 FROM profiles 
  WHERE profiles.user_id = auth.uid() 
  AND profiles.role = ANY(ARRAY['admin', 'super_admin'])
));

-- Drop existing policies for menu_items
DROP POLICY IF EXISTS "Anyone can view available menu items" ON public.menu_items;
DROP POLICY IF EXISTS "Admins can manage menu items" ON public.menu_items;

-- Create new policies for menu_items
CREATE POLICY "Public can view available menu items" 
ON public.menu_items 
FOR SELECT 
USING (is_available = true);

CREATE POLICY "Admins can manage menu items" 
ON public.menu_items 
FOR ALL 
USING (EXISTS (
  SELECT 1 FROM profiles 
  WHERE profiles.user_id = auth.uid() 
  AND profiles.role = ANY(ARRAY['admin', 'super_admin'])
));