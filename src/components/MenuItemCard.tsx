import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

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
  const formatPrice = (price?: number) => price ? `$${price.toFixed(2)}` : '';

  const getAvailablePrices = () => {
    const prices = [];
    if (item.full_price) prices.push({ label: 'Full', price: item.full_price });
    if (item.half_price) prices.push({ label: 'Half', price: item.half_price });
    if (item.extra_price) prices.push({ label: 'Extra', price: item.extra_price });
    return prices;
  };

  const availablePrices = getAvailablePrices();

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

          {/* Prices */}
          {availablePrices.length > 0 && (
            <div className="space-y-2">
              <div className="grid gap-2">
                {availablePrices.map((priceOption) => (
                  <div key={priceOption.label} className="flex justify-between items-center">
                    <span className="text-sm font-medium">{priceOption.label}:</span>
                    <span className="text-lg font-bold text-primary">
                      {formatPrice(priceOption.price)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {availablePrices.length === 0 && (
            <div className="text-center py-2">
              <span className="text-muted-foreground">Price on request</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MenuItemCard;