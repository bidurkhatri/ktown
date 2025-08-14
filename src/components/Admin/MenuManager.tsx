import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';
import MenuItemForm from './MenuItemForm';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  full_price: number | null;
  half_price: number | null;
  extra_price: number | null;
  is_spicy: boolean;
  is_vegan: boolean;
  is_available: boolean;
  display_order: number;
  emoji: string | null;
  image_url: string | null;
  category_id: string;
  menu_categories: {
    name: string;
  };
}

const MenuManager = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      const { data, error } = await supabase
        .from('menu_items')
        .select(`
          *,
          menu_categories (
            name
          )
        `)
        .order('display_order');

      if (error) {
        toast.error('Failed to fetch menu items');
        console.error(error);
      } else {
        setMenuItems(data || []);
      }
    } catch (error) {
      toast.error('Failed to fetch menu items');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this menu item?')) return;

    try {
      const { error } = await supabase
        .from('menu_items')
        .delete()
        .eq('id', id);

      if (error) {
        toast.error('Failed to delete menu item');
        console.error(error);
      } else {
        toast.success('Menu item deleted successfully');
        fetchMenuItems();
      }
    } catch (error) {
      toast.error('Failed to delete menu item');
      console.error(error);
    }
  };

  const handleToggleAvailability = async (item: MenuItem) => {
    try {
      const { error } = await supabase
        .from('menu_items')
        .update({ is_available: !item.is_available })
        .eq('id', item.id);

      if (error) {
        toast.error('Failed to update availability');
        console.error(error);
      } else {
        toast.success(`Item ${!item.is_available ? 'enabled' : 'disabled'}`);
        fetchMenuItems();
      }
    } catch (error) {
      toast.error('Failed to update availability');
      console.error(error);
    }
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingItem(null);
    fetchMenuItems();
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-korean-red mx-auto mb-4"></div>
        <p>Loading menu items...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="korean-subtitle text-2xl">Menu Items</h2>
        <Button 
          onClick={() => setShowForm(true)}
          className="btn-korean"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Menu Item
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {menuItems.map((item) => (
          <Card key={item.id} className={`${!item.is_available ? 'opacity-60' : ''}`}>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg flex items-center gap-2">
                  {item.emoji && <span className="text-2xl">{item.emoji}</span>}
                  {item.name}
                </CardTitle>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleToggleAvailability(item)}
                    title={item.is_available ? 'Disable item' : 'Enable item'}
                  >
                    {item.is_available ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setEditingItem(item);
                      setShowForm(true);
                    }}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(item.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="text-sm text-muted-foreground">
                {item.menu_categories.name}
              </div>
            </CardHeader>
            
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground line-clamp-2">
                {item.description}
              </p>
              
              <div className="flex flex-wrap gap-2">
                {item.full_price && (
                  <Badge variant="outline">
                    Full: ${item.full_price}
                  </Badge>
                )}
                {item.half_price && (
                  <Badge variant="outline">
                    Half: ${item.half_price}
                  </Badge>
                )}
                {item.extra_price && (
                  <Badge variant="outline">
                    Extra: +${item.extra_price}
                  </Badge>
                )}
              </div>
              
              <div className="flex gap-2">
                {item.is_spicy && (
                  <Badge variant="destructive" className="bg-korean-red">
                    🌶️ Spicy
                  </Badge>
                )}
                {item.is_vegan && (
                  <Badge variant="secondary" className="bg-green-500 text-white">
                    🌱 Vegan
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {showForm && (
        <MenuItemForm
          item={editingItem}
          onClose={handleFormClose}
        />
      )}
    </div>
  );
};

export default MenuManager;