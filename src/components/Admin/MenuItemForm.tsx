import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';

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
}

interface Category {
  id: string;
  name: string;
}

interface MenuItemFormProps {
  item: MenuItem | null;
  onClose: () => void;
}

const MenuItemForm = ({ item, onClose }: MenuItemFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    full_price: '',
    half_price: '',
    extra_price: '',
    is_spicy: false,
    is_vegan: false,
    is_available: true,
    display_order: 0,
    emoji: '',
    category_id: '',
  });
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCategories();
    if (item) {
      setFormData({
        name: item.name,
        description: item.description,
        full_price: item.full_price?.toString() || '',
        half_price: item.half_price?.toString() || '',
        extra_price: item.extra_price?.toString() || '',
        is_spicy: item.is_spicy,
        is_vegan: item.is_vegan,
        is_available: item.is_available,
        display_order: item.display_order,
        emoji: item.emoji || '',
        category_id: item.category_id,
      });
    }
  }, [item]);

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('menu_categories')
        .select('id, name')
        .eq('is_active', true)
        .order('display_order');

      if (error) {
        toast.error('Failed to fetch categories');
        console.error(error);
      } else {
        setCategories(data || []);
      }
    } catch (error) {
      toast.error('Failed to fetch categories');
      console.error(error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const submitData = {
        name: formData.name,
        description: formData.description,
        full_price: formData.full_price ? parseFloat(formData.full_price) : null,
        half_price: formData.half_price ? parseFloat(formData.half_price) : null,
        extra_price: formData.extra_price ? parseFloat(formData.extra_price) : null,
        is_spicy: formData.is_spicy,
        is_vegan: formData.is_vegan,
        is_available: formData.is_available,
        display_order: formData.display_order,
        emoji: formData.emoji || null,
        category_id: formData.category_id,
      };

      let error;
      if (item) {
        ({ error } = await supabase
          .from('menu_items')
          .update(submitData)
          .eq('id', item.id));
      } else {
        ({ error } = await supabase
          .from('menu_items')
          .insert([submitData]));
      }

      if (error) {
        toast.error(`Failed to ${item ? 'update' : 'create'} menu item`);
        console.error(error);
      } else {
        toast.success(`Menu item ${item ? 'updated' : 'created'} successfully`);
        onClose();
      }
    } catch (error) {
      toast.error(`Failed to ${item ? 'update' : 'create'} menu item`);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="korean-subtitle">
            {item ? 'Edit Menu Item' : 'Add New Menu Item'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="emoji">Emoji</Label>
              <Input
                id="emoji"
                value={formData.emoji}
                onChange={(e) => handleInputChange('emoji', e.target.value)}
                placeholder="🍗"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows={3}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category *</Label>
            <Select value={formData.category_id} onValueChange={(value) => handleInputChange('category_id', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="full_price">Full Price</Label>
              <Input
                id="full_price"
                type="number"
                step="0.01"
                value={formData.full_price}
                onChange={(e) => handleInputChange('full_price', e.target.value)}
                placeholder="40.00"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="half_price">Half Price</Label>
              <Input
                id="half_price"
                type="number"
                step="0.01"
                value={formData.half_price}
                onChange={(e) => handleInputChange('half_price', e.target.value)}
                placeholder="25.00"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="extra_price">Extra Price</Label>
              <Input
                id="extra_price"
                type="number"
                step="0.01"
                value={formData.extra_price}
                onChange={(e) => handleInputChange('extra_price', e.target.value)}
                placeholder="2.50"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="display_order">Display Order</Label>
            <Input
              id="display_order"
              type="number"
              value={formData.display_order}
              onChange={(e) => handleInputChange('display_order', parseInt(e.target.value) || 0)}
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="is_spicy"
                checked={formData.is_spicy}
                onCheckedChange={(checked) => handleInputChange('is_spicy', checked)}
              />
              <Label htmlFor="is_spicy">Spicy 🌶️</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="is_vegan"
                checked={formData.is_vegan}
                onCheckedChange={(checked) => handleInputChange('is_vegan', checked)}
              />
              <Label htmlFor="is_vegan">Vegan 🌱</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="is_available"
                checked={formData.is_available}
                onCheckedChange={(checked) => handleInputChange('is_available', checked)}
              />
              <Label htmlFor="is_available">Available</Label>
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="btn-korean" disabled={loading}>
              {loading ? 'Saving...' : (item ? 'Update' : 'Create')}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default MenuItemForm;