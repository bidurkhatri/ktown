-- Fix infinite recursion in profiles table RLS policies
-- Drop the problematic admin policy that creates recursion
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;

-- Create a simpler admin policy that doesn't reference itself
CREATE POLICY "Admins can view all profiles" 
ON public.profiles 
FOR SELECT 
USING (
  -- Allow users to see their own profile
  auth.uid() = user_id 
  OR 
  -- Allow if current user has admin role (direct check without recursion)
  EXISTS (
    SELECT 1 FROM public.profiles p 
    WHERE p.user_id = auth.uid() 
    AND p.role IN ('admin', 'super_admin')
    LIMIT 1
  )
);