import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Minus, ShoppingCart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

interface MenuItemCardProps {
  item: {
    id: string;
    name: string;
    description: string;
    full_price?: number;
    half_price?: number;
    extra_price?: number;
    is_spicy: boolean;
    is_vegan: boolean;
    emoji?: string;
    image_url?: string;
  };
}

const MenuItemCard = ({ item }: MenuItemCardProps) => {
  const { addToCart } = useCart();
  const [selectedPriceType, setSelectedPriceType] = useState<'full' | 'half' | 'extra'>('full');
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  const formatPrice = (price?: number) => price ? `$${price.toFixed(2)}` : '';

  const getCurrentPrice = () => {
    switch (selectedPriceType) {
      case 'half':
        return item.half_price;
      case 'extra':
        return item.extra_price;
      default:
        return item.full_price;
    }
  };

  const getAvailablePriceTypes = () => {
    const types = [];
    if (item.full_price) types.push({ value: 'full', label: `Full ${formatPrice(item.full_price)}` });
    if (item.half_price) types.push({ value: 'half', label: `Half ${formatPrice(item.half_price)}` });
    if (item.extra_price) types.push({ value: 'extra', label: `Extra ${formatPrice(item.extra_price)}` });
    return types;
  };

  const handleAddToCart = async () => {
    setIsAdding(true);
    try {
      await addToCart(item.id, selectedPriceType, quantity);
      setQuantity(1); // Reset quantity after adding
    } finally {
      setIsAdding(false);
    }
  };

  const priceTypes = getAvailablePriceTypes();
  const currentPrice = getCurrentPrice();

  // Set default price type to the first available option
  if (priceTypes.length > 0 && !priceTypes.find(type => type.value === selectedPriceType)) {
    setSelectedPriceType(priceTypes[0].value as 'full' | 'half' | 'extra');
  }

  return (
    <Card className="h-full hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                {item.emoji && <span className="text-2xl">{item.emoji}</span>}
                {item.name}
              </h3>
              <p className="text-muted-foreground text-sm mt-1 line-clamp-2">
                {item.description}
              </p>
            </div>
          </div>

          {/* Badges */}
          <div className="flex gap-2">
            {item.is_spicy && (
              <Badge variant="secondary" className="text-xs">
                🌶️ Spicy
              </Badge>
            )}
            {item.is_vegan && (
              <Badge variant="secondary" className="text-xs">
                🌱 Vegan
              </Badge>
            )}
          </div>

          {/* Price Selection */}
          {priceTypes.length > 0 && (
            <div className="space-y-2">
              <Select
                value={selectedPriceType}
                onValueChange={(value) => setSelectedPriceType(value as 'full' | 'half' | 'extra')}
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {priceTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Quantity and Add to Cart */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-8 text-center font-medium">{quantity}</span>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => setQuantity(quantity + 1)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            
            <Button
              onClick={handleAddToCart}
              disabled={!currentPrice || isAdding}
              className="flex-1"
              size="sm"
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              {isAdding ? 'Adding...' : `Add ${formatPrice((currentPrice || 0) * quantity)}`}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MenuItemCard;