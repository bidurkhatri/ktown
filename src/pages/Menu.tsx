import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import Layout from '@/components/Layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Flame, Leaf, Plus } from 'lucide-react';
import { toast } from 'sonner';

interface MenuCategory {
  id: string;
  name: string;
  slug: string;
  display_order: number;
}

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
  emoji: string | null;
  category_id: string;
}

const Menu = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [categories, setCategories] = useState<MenuCategory[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch categories
      const { data: categoriesData, error: categoriesError } = await supabase
        .from('menu_categories')
        .select('id, name, slug, display_order')
        .eq('is_active', true)
        .order('display_order');

      if (categoriesError) {
        toast.error('Failed to load categories');
        console.error(categoriesError);
      } else {
        setCategories(categoriesData || []);
      }

      // Fetch menu items
      const { data: itemsData, error: itemsError } = await supabase
        .from('menu_items')
        .select('*')
        .eq('is_available', true)
        .order('display_order');

      if (itemsError) {
        toast.error('Failed to load menu items');
        console.error(itemsError);
      } else {
        setMenuItems(itemsData || []);
      }
    } catch (error) {
      toast.error('Failed to load menu data');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (item: MenuItem) => {
    const prices = [];
    if (item.full_price) prices.push(`$${item.full_price}`);
    if (item.half_price) prices.push(`$${item.half_price}`);
    return prices.join(' / ') || 'Price on request';
  };

  const filteredItems = activeFilter === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category_id === activeFilter);

  return (
    <Layout>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <section className="py-16 bg-gradient-to-r from-korean-red to-korean-yellow text-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="korean-title text-5xl md:text-7xl mb-4">
              Our Menu
            </h1>
            <p className="text-xl md:text-2xl max-w-2xl mx-auto">
              Authentic Korean flavours meet Newtown vibes
            </p>
          </div>
        </section>

        {/* Menu Content */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-korean-red mx-auto mb-4"></div>
                <p>Loading delicious menu...</p>
              </div>
            ) : (
              <>
                {/* Category Filters */}
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                  <Button
                    onClick={() => setActiveFilter('all')}
                    variant={activeFilter === 'all' ? 'default' : 'outline'}
                    className={activeFilter === 'all' ? 'btn-korean' : 'btn-outline-korean'}
                  >
                    All Items
                  </Button>
                  {categories.map((category) => (
                    <Button
                      key={category.id}
                      onClick={() => setActiveFilter(category.id)}
                      variant={activeFilter === category.id ? 'default' : 'outline'}
                      className={activeFilter === category.id ? 'btn-korean' : 'btn-outline-korean'}
                    >
                      {category.name}
                    </Button>
                  ))}
                </div>

                {/* Menu Items Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredItems.map((item) => (
                    <Card key={item.id} className="food-card overflow-hidden">
                      <div className="h-48 bg-gradient-to-br from-korean-red/20 to-korean-yellow/20 flex items-center justify-center">
                        <span className="text-6xl">{item.emoji || '🍽️'}</span>
                      </div>
                      
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-3">
                          <h3 className="korean-subtitle text-xl">{item.name}</h3>
                          <div className="text-right">
                            <span className="text-korean-red font-bold text-lg">{formatPrice(item)}</span>
                            {item.extra_price && (
                              <div className="text-sm text-muted-foreground">Extra: +${item.extra_price}</div>
                            )}
                          </div>
                        </div>
                        
                        <p className="text-muted-foreground mb-4 leading-relaxed">
                          {item.description}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex space-x-2">
                            {item.is_spicy && (
                              <Badge variant="destructive" className="bg-korean-red">
                                <Flame className="h-3 w-3 mr-1" />
                                Spicy
                              </Badge>
                            )}
                            {item.is_vegan && (
                              <Badge variant="secondary" className="bg-green-500 text-white">
                                <Leaf className="h-3 w-3 mr-1" />
                                Vegan
                              </Badge>
                            )}
                          </div>
                          
                          <Button size="sm" className="btn-korean">
                            <Plus className="h-4 w-4 mr-1" />
                            Add
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {filteredItems.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground text-lg">No items found in this category.</p>
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Menu;