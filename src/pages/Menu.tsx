import { useState } from 'react';
import Layout from '@/components/Layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Flame, Leaf, Plus } from 'lucide-react';

const Menu = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const menuCategories = [
    { id: 'all', name: 'All Items' },
    { id: 'share', name: "Let's Share" },
    { id: 'chimaek', name: 'Chi-Maek' },
    { id: 'vegan', name: 'Vegan Seoul' },
    { id: 'sides', name: 'Sides' },
    { id: 'sauces', name: 'Sauces' },
  ];

  const menuItems = [
    // Let's Share
    {
      id: 1,
      category: 'share',
      name: 'Tteokbokki Skewers',
      price: '$10',
      extraPrice: '+$2.50 extra',
      description: 'Chewy Korean rice cakes pan-fried & coated in signature chilli paste.',
      image: '/assets/tteokbokki-skewers.jpg',
      spicy: true,
      vegan: true,
    },
    {
      id: 2,
      category: 'share',
      name: 'Korean Corn Dogs',
      price: '$12',
      description: 'Crispy battered hot dogs with potato cubes, served with Korean mustard.',
      spicy: false,
      vegan: false,
    },
    {
      id: 3,
      category: 'share',
      name: 'Kimchi Pancakes',
      price: '$14',
      description: 'Crispy Korean pancakes loaded with fermented kimchi and spring onions.',
      spicy: true,
      vegan: true,
    },

    // Chi-Maek
    {
      id: 4,
      category: 'chimaek',
      name: 'Soyamite Chicken',
      price: '$40 / $25',
      description: 'Light it up like dynamite! Our signature double-fried chicken with explosive Korean spices.',
      spicy: true,
      vegan: false,
    },
    {
      id: 5,
      category: 'chimaek',
      name: 'Buldak Crunch',
      price: '$40 / $25',
      description: 'The Buldak Challenge! Fiery hot chicken that\'ll test your spice tolerance.',
      spicy: true,
      vegan: false,
    },
    {
      id: 6,
      category: 'chimaek',
      name: 'Gangnam Fried',
      price: '$40 / $25',
      description: 'Classic Korean fried chicken with a sweet and savory glaze.',
      spicy: false,
      vegan: false,
    },
    {
      id: 7,
      category: 'chimaek',
      name: 'Kimchi Chicken',
      price: '$40 / $25',
      description: 'Double-fried chicken with fermented kimchi seasoning and tangy sauce.',
      spicy: true,
      vegan: false,
    },

    // Vegan Seoul
    {
      id: 8,
      category: 'vegan',
      name: 'Vegan KFC',
      price: '$40 / $25',
      description: 'Can\'t believe it\'s vegan! Plant-based perfection that rivals the real thing.',
      spicy: false,
      vegan: true,
    },
    {
      id: 9,
      category: 'vegan',
      name: 'Perilla Buckwheat Noodles',
      price: '$18',
      description: 'Nutty buckwheat noodles with perilla oil and fresh vegetables.',
      spicy: false,
      vegan: true,
    },
    {
      id: 10,
      category: 'vegan',
      name: 'Cabbage Jeon',
      price: '$16',
      description: 'Crispy Korean pancakes with fresh cabbage and Korean seasonings.',
      spicy: false,
      vegan: true,
    },

    // Sides
    {
      id: 11,
      category: 'sides',
      name: 'Pickled Radish',
      price: '$5',
      description: 'Fresh, crunchy pickled radish to cleanse your palate.',
      spicy: false,
      vegan: true,
    },
    {
      id: 12,
      category: 'sides',
      name: 'Korean Coleslaw',
      price: '$8',
      description: 'Crispy cabbage salad with Korean dressing and sesame.',
      spicy: false,
      vegan: true,
    },
    {
      id: 13,
      category: 'sides',
      name: 'Steamed Rice',
      price: '$4',
      description: 'Perfect fluffy Korean short-grain rice.',
      spicy: false,
      vegan: true,
    },

    // Sauces
    {
      id: 14,
      category: 'sauces',
      name: 'Gochujang Mayo',
      price: '$3',
      description: 'Creamy Korean chili paste mayo.',
      spicy: true,
      vegan: false,
    },
    {
      id: 15,
      category: 'sauces',
      name: 'Soy Garlic Glaze',
      price: '$3',
      description: 'Sweet and savory Korean glaze.',
      spicy: false,
      vegan: true,
    },
  ];

  const filteredItems = activeFilter === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === activeFilter);

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
            {/* Category Filters */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {menuCategories.map((category) => (
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
                  {item.image && (
                    <div className="h-48 bg-gradient-to-br from-korean-red/20 to-korean-yellow/20 flex items-center justify-center">
                      <span className="text-4xl">🍗</span>
                    </div>
                  )}
                  
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="korean-subtitle text-xl">{item.name}</h3>
                      <div className="text-right">
                        <span className="text-korean-red font-bold text-lg">{item.price}</span>
                        {item.extraPrice && (
                          <div className="text-sm text-muted-foreground">{item.extraPrice}</div>
                        )}
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {item.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex space-x-2">
                        {item.spicy && (
                          <Badge variant="destructive" className="bg-korean-red">
                            <Flame className="h-3 w-3 mr-1" />
                            Spicy
                          </Badge>
                        )}
                        {item.vegan && (
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
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Menu;