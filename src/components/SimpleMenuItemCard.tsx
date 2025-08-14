import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Flame, Leaf, Plus, Minus } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';

interface SimpleMenuItemCardProps {
  item: {
    id: string;
    name: string;
    description: string;
    full_price: number | null;
    is_spicy: boolean;
    is_vegan: boolean;
    emoji: string | null;
  };
}

const SimpleMenuItemCard = ({ item }: SimpleMenuItemCardProps) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const formatPrice = (price?: number) => price ? `$${price.toFixed(2)}` : 'Price on request';

  const handleAddToCart = async () => {
    if (!item.full_price) {
      toast.error('Please call us to order this item');
      return;
    }

    try {
      await addToCart(item.id, 'full', quantity);
      toast.success(`Added ${quantity}x ${item.name} to cart`);
    } catch (error) {
      toast.error('Failed to add item to cart');
    }
  };

  return (
    <Card className="food-card overflow-hidden">
      <div className="h-32 bg-gradient-to-br from-korean-red/20 to-korean-yellow/20 flex items-center justify-center">
        <span className="text-4xl">{item.emoji || '🍽️'}</span>
      </div>
      
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="korean-subtitle text-lg font-semibold">{item.name}</h3>
          <span className="text-korean-red font-bold text-lg">{formatPrice(item.full_price)}</span>
        </div>
        
        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
          {item.description}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex space-x-1">
            {item.is_spicy && (
              <Badge variant="destructive" className="bg-korean-red text-xs">
                <Flame className="h-3 w-3 mr-1" />
                Spicy
              </Badge>
            )}
            {item.is_vegan && (
              <Badge variant="secondary" className="bg-green-500 text-white text-xs">
                <Leaf className="h-3 w-3 mr-1" />
                Vegan
              </Badge>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="flex items-center border rounded">
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                <Minus className="h-3 w-3" />
              </Button>
              <span className="w-8 text-center text-sm">{quantity}</span>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => setQuantity(quantity + 1)}
              >
                <Plus className="h-3 w-3" />
              </Button>
            </div>
            <Button size="sm" className="btn-korean" onClick={handleAddToCart}>
              Add
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SimpleMenuItemCard;