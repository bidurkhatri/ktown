-- Create menu categories table
CREATE TABLE public.menu_categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create menu items table
CREATE TABLE public.menu_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  category_id UUID NOT NULL REFERENCES public.menu_categories(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  full_price DECIMAL(10,2),
  half_price DECIMAL(10,2),
  extra_price DECIMAL(10,2),
  is_spicy BOOLEAN NOT NULL DEFAULT false,
  is_vegan BOOLEAN NOT NULL DEFAULT false,
  is_available BOOLEAN NOT NULL DEFAULT true,
  display_order INTEGER NOT NULL DEFAULT 0,
  image_url TEXT,
  emoji TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create profiles table for admin management
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin', 'super_admin')),
  display_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.menu_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policies for menu_categories
CREATE POLICY "Menu categories are viewable by everyone"
ON public.menu_categories FOR SELECT
USING (true);

CREATE POLICY "Only admins can manage menu categories"
ON public.menu_categories FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = auth.uid() 
    AND role IN ('admin', 'super_admin')
  )
);

-- Create policies for menu_items
CREATE POLICY "Menu items are viewable by everyone"
ON public.menu_items FOR SELECT
USING (true);

CREATE POLICY "Only admins can manage menu items"
ON public.menu_items FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = auth.uid() 
    AND role IN ('admin', 'super_admin')
  )
);

-- Create policies for profiles
CREATE POLICY "Users can view their own profile"
ON public.profiles FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile"
ON public.profiles FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile"
ON public.profiles FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all profiles"
ON public.profiles FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = auth.uid() 
    AND role IN ('admin', 'super_admin')
  )
);

-- Create storage bucket for menu images
INSERT INTO storage.buckets (id, name, public) VALUES ('menu-images', 'menu-images', true);

-- Create storage policies
CREATE POLICY "Menu images are publicly accessible"
ON storage.objects FOR SELECT
USING (bucket_id = 'menu-images');

CREATE POLICY "Only admins can upload menu images"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'menu-images' AND
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = auth.uid() 
    AND role IN ('admin', 'super_admin')
  )
);

CREATE POLICY "Only admins can update menu images"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'menu-images' AND
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = auth.uid() 
    AND role IN ('admin', 'super_admin')
  )
);

CREATE POLICY "Only admins can delete menu images"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'menu-images' AND
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = auth.uid() 
    AND role IN ('admin', 'super_admin')
  )
);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_menu_categories_updated_at
  BEFORE UPDATE ON public.menu_categories
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_menu_items_updated_at
  BEFORE UPDATE ON public.menu_items
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default menu categories
INSERT INTO public.menu_categories (name, slug, description, display_order) VALUES
('Let''s Share', 'lets-share', 'Perfect for sharing with friends', 1),
('Chi-Maek', 'chi-maek', 'Korean fried chicken and beer', 2),
('Vegan Seoul', 'vegan-seoul', 'Plant-based Korean delights', 3),
('Sauce Add-ons', 'sauce-add-ons', 'Extra sauces and toppings', 4),
('Sides', 'sides', 'Perfect accompaniments', 5);

-- Insert sample menu items
INSERT INTO public.menu_items (category_id, name, description, full_price, half_price, extra_price, is_spicy, is_vegan, display_order, emoji) VALUES
-- Let's Share
((SELECT id FROM public.menu_categories WHERE slug = 'lets-share'), 'Tteokbokki Skewers', 'Chewy, savoury Korean rice cakes pan-fried and smothered in K-Town chilli paste.', 10.00, NULL, 2.50, true, true, 1, '🍢'),
((SELECT id FROM public.menu_categories WHERE slug = 'lets-share'), 'Corn Ribs & Fries', 'Grilled corn ribs seasoned with Korean spices, loaded with kimchi and gooey melted cheese sauce.', 15.00, NULL, NULL, false, false, 2, '🌽'),
((SELECT id FROM public.menu_categories WHERE slug = 'lets-share'), 'K-Town Mandu Two Ways', 'Korean-style dumplings filled with chicken or pork, tofu, and wombok cabbage. Your choice: Pan-fried or steamed. Served with house-made soy dipping sauce.', 15.00, NULL, NULL, false, false, 3, '🥟'),

-- Chi-Maek
((SELECT id FROM public.menu_categories WHERE slug = 'chi-maek'), 'Soyamite', 'Light it up like dynamite! Our soy glaze with roasted garlic – sweet, savoury, and addictive.', 40.00, 25.00, NULL, false, false, 1, '🍗'),
((SELECT id FROM public.menu_categories WHERE slug = 'chi-maek'), 'Buldak Crunch', 'The Buldak Challenge! Tongue-tingling, fiery hot chicken glazed in K-Town chilli paste. Extra heat available if you dare.', 40.00, 25.00, NULL, true, false, 2, '🔥'),
((SELECT id FROM public.menu_categories WHERE slug = 'chi-maek'), 'Kimchi Chicken', 'Kimchi Attack! Brined in house-made kimchi juice, double-fried, topped with sautéed kimchi & melted cheese.', 40.00, 25.00, NULL, true, false, 3, '🥬'),
((SELECT id FROM public.menu_categories WHERE slug = 'chi-maek'), 'Gangnam Fried', 'Oppa Gangnam Style! Crispy chicken seasoned with our secret K-Town spice blend, served with salt & pepper on the side.', 37.00, 19.00, NULL, false, false, 4, '🎤'),

-- Vegan Seoul
((SELECT id FROM public.menu_categories WHERE slug = 'vegan-seoul'), 'Vegan KFC', 'Can''t believe it''s vegan! Crispy battered enoki mushrooms coated in 100% Korean rice flour, tossed in gluten-free gochujang and soy glaze.', 40.00, 25.00, NULL, false, true, 1, '🍄'),
((SELECT id FROM public.menu_categories WHERE slug = 'vegan-seoul'), 'Perilla Buckwheat Noodles', 'Makk-Guksu – Cold Korean buckwheat noodles in gluten-free soy with perilla leaves, roasted seaweed flakes, and roasted perilla seeds.', 19.00, NULL, NULL, false, true, 2, '🥗'),
((SELECT id FROM public.menu_categories WHERE slug = 'vegan-seoul'), 'Cabbage Jeon', 'Jeon Jeon – Pan-seared wombok cabbage in a light rice flour batter, served with gluten-free soy, chilli flakes, and sesame seeds.', 16.00, NULL, NULL, false, true, 3, '🥬'),

-- Sauce Add-ons
((SELECT id FROM public.menu_categories WHERE slug = 'sauce-add-ons'), 'Soy & Garlic', 'Classic Korean flavor combination', 2.50, NULL, NULL, false, true, 1, '🥄'),
((SELECT id FROM public.menu_categories WHERE slug = 'sauce-add-ons'), 'Kimchi Cheese', 'Spicy kimchi with melted cheese', 2.50, NULL, NULL, true, false, 2, '🧀'),
((SELECT id FROM public.menu_categories WHERE slug = 'sauce-add-ons'), 'Gochujang', 'Traditional Korean chili paste', 2.50, NULL, NULL, true, true, 3, '🌶️'),

-- Sides
((SELECT id FROM public.menu_categories WHERE slug = 'sides'), 'Classic Fries', 'Golden crispy fries', 5.00, NULL, NULL, false, true, 1, '🍟'),
((SELECT id FROM public.menu_categories WHERE slug = 'sides'), 'Korean Fishcake Fries', 'Unique Korean-style fishcake fries', 5.00, NULL, NULL, false, false, 2, '🍠'),
((SELECT id FROM public.menu_categories WHERE slug = 'sides'), 'House Kimchi', 'Traditional fermented cabbage', 3.00, NULL, NULL, true, true, 3, '🥬');