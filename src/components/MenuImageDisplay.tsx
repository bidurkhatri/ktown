import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface MenuImage {
  id: string;
  name: string;
  file_path: string;
  is_active: boolean;
}

const MenuImageDisplay = () => {
  const [activeMenuImage, setActiveMenuImage] = useState<MenuImage | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchActiveMenuImage();
  }, []);

  const fetchActiveMenuImage = async () => {
    try {
      const { data, error } = await supabase
        .from('menu_images')
        .select('*')
        .eq('is_active', true)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching active menu image:', error);
        return;
      }

      setActiveMenuImage(data || null);
    } catch (error) {
      console.error('Error fetching menu image:', error);
    } finally {
      setLoading(false);
    }
  };

  const getImageUrl = (filePath: string) => {
    return supabase.storage.from('menu-images').getPublicUrl(filePath).data.publicUrl;
  };

  if (loading) {
    return (
      <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center">
        <p className="text-gray-500">Loading menu...</p>
      </div>
    );
  }

  if (!activeMenuImage) {
    return (
      <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
        <p className="text-gray-500">No menu image available</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <img
        src={getImageUrl(activeMenuImage.file_path)}
        alt={activeMenuImage.name}
        className="w-full h-auto rounded-lg shadow-lg"
        style={{ maxHeight: '800px', objectFit: 'contain' }}
      />
    </div>
  );
};

export default MenuImageDisplay;