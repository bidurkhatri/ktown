-- Create storage bucket for menu images
INSERT INTO storage.buckets (id, name, public) VALUES ('menu-images', 'menu-images', true);

-- Create table to store menu image information
CREATE TABLE public.menu_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  is_active BOOLEAN DEFAULT false,
  uploaded_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS on menu_images table
ALTER TABLE public.menu_images ENABLE ROW LEVEL SECURITY;

-- Create policies for menu_images
CREATE POLICY "Public can view active menu images" 
ON public.menu_images 
FOR SELECT 
USING (is_active = true);

CREATE POLICY "Admins can manage menu images" 
ON public.menu_images 
FOR ALL 
USING (EXISTS (
  SELECT 1 FROM profiles 
  WHERE profiles.user_id = auth.uid() 
  AND profiles.role = ANY(ARRAY['admin', 'super_admin'])
));

-- Create storage policies for menu-images bucket
CREATE POLICY "Public can view menu images" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'menu-images');

CREATE POLICY "Admins can upload menu images" 
ON storage.objects 
FOR INSERT 
WITH CHECK (
  bucket_id = 'menu-images' AND
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.user_id = auth.uid() 
    AND profiles.role = ANY(ARRAY['admin', 'super_admin'])
  )
);

CREATE POLICY "Admins can update menu images" 
ON storage.objects 
FOR UPDATE 
USING (
  bucket_id = 'menu-images' AND
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.user_id = auth.uid() 
    AND profiles.role = ANY(ARRAY['admin', 'super_admin'])
  )
);

CREATE POLICY "Admins can delete menu images" 
ON storage.objects 
FOR DELETE 
USING (
  bucket_id = 'menu-images' AND
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.user_id = auth.uid() 
    AND profiles.role = ANY(ARRAY['admin', 'super_admin'])
  )
);

-- Create trigger for updated_at
CREATE TRIGGER update_menu_images_updated_at
BEFORE UPDATE ON public.menu_images
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();