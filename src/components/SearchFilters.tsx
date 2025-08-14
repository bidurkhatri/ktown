import { useState, useEffect } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface SearchFiltersProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  priceRange: [number, number];
  onPriceRangeChange: (range: [number, number]) => void;
  filters: {
    isSpicy: boolean;
    isVegan: boolean;
    hasHalfPrice: boolean;
    hasExtraPrice: boolean;
  };
  onFiltersChange: (filters: any) => void;
  categories: Array<{ id: string; name: string; slug: string }>;
  selectedCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

const SearchFilters = ({
  searchTerm,
  onSearchChange,
  priceRange,
  onPriceRangeChange,
  filters,
  onFiltersChange,
  categories,
  selectedCategory,
  onCategoryChange,
}: SearchFiltersProps) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleFilterChange = (key: string, value: boolean) => {
    onFiltersChange({
      ...filters,
      [key]: value,
    });
  };

  const clearAllFilters = () => {
    onSearchChange('');
    onPriceRangeChange([0, 50]);
    onFiltersChange({
      isSpicy: false,
      isVegan: false,
      hasHalfPrice: false,
      hasExtraPrice: false,
    });
    onCategoryChange('all');
  };

  const activeFiltersCount = Object.values(filters).filter(Boolean).length + 
    (searchTerm ? 1 : 0) + 
    (selectedCategory !== 'all' ? 1 : 0) +
    (priceRange[0] > 0 || priceRange[1] < 50 ? 1 : 0);

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search dishes..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 pr-4"
        />
      </div>

      {/* Category Filter Buttons */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant={selectedCategory === 'all' ? 'default' : 'outline'}
          size="sm"
          onClick={() => onCategoryChange('all')}
          className="rounded-full"
        >
          All
        </Button>
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? 'default' : 'outline'}
            size="sm"
            onClick={() => onCategoryChange(category.id)}
            className="rounded-full"
          >
            {category.name}
          </Button>
        ))}
      </div>

      {/* Advanced Filters */}
      <div className="flex items-center gap-2">
        <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filters
              {activeFiltersCount > 0 && (
                <Badge variant="secondary" className="ml-2 text-xs">
                  {activeFiltersCount}
                </Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-4">
            <div className="space-y-4">
              <h4 className="font-medium">Advanced Filters</h4>
              
              {/* Price Range */}
              <div>
                <Label className="text-sm font-medium">
                  Price Range: ${priceRange[0]} - ${priceRange[1]}
                </Label>
                <Slider
                  value={priceRange}
                  onValueChange={(value) => onPriceRangeChange(value as [number, number])}
                  max={50}
                  step={1}
                  className="mt-2"
                />
              </div>

              {/* Dietary Options */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Dietary Options</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="spicy"
                      checked={filters.isSpicy}
                      onCheckedChange={(checked) => handleFilterChange('isSpicy', !!checked)}
                    />
                    <Label htmlFor="spicy" className="text-sm">🌶️ Spicy</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="vegan"
                      checked={filters.isVegan}
                      onCheckedChange={(checked) => handleFilterChange('isVegan', !!checked)}
                    />
                    <Label htmlFor="vegan" className="text-sm">🌱 Vegan</Label>
                  </div>
                </div>
              </div>

              {/* Price Options */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Price Options</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="halfPrice"
                      checked={filters.hasHalfPrice}
                      onCheckedChange={(checked) => handleFilterChange('hasHalfPrice', !!checked)}
                    />
                    <Label htmlFor="halfPrice" className="text-sm">Half Portions Available</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="extraPrice"
                      checked={filters.hasExtraPrice}
                      onCheckedChange={(checked) => handleFilterChange('hasExtraPrice', !!checked)}
                    />
                    <Label htmlFor="extraPrice" className="text-sm">Extra Portions Available</Label>
                  </div>
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>

        {activeFiltersCount > 0 && (
          <Button variant="ghost" size="sm" onClick={clearAllFilters}>
            <X className="h-4 w-4 mr-2" />
            Clear All
          </Button>
        )}
      </div>

      {/* Active Filters Display */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap gap-2">
          {searchTerm && (
            <Badge variant="secondary" className="gap-1">
              Search: "{searchTerm}"
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => onSearchChange('')}
              />
            </Badge>
          )}
          {selectedCategory !== 'all' && (
            <Badge variant="secondary" className="gap-1">
              Category: {categories.find(c => c.id === selectedCategory)?.name}
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => onCategoryChange('all')}
              />
            </Badge>
          )}
          {(priceRange[0] > 0 || priceRange[1] < 50) && (
            <Badge variant="secondary" className="gap-1">
              Price: ${priceRange[0]} - ${priceRange[1]}
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => onPriceRangeChange([0, 50])}
              />
            </Badge>
          )}
          {Object.entries(filters).map(([key, value]) => {
            if (!value) return null;
            const labels: Record<string, string> = {
              isSpicy: '🌶️ Spicy',
              isVegan: '🌱 Vegan',
              hasHalfPrice: 'Half Portions',
              hasExtraPrice: 'Extra Portions',
            };
            return (
              <Badge key={key} variant="secondary" className="gap-1">
                {labels[key]}
                <X 
                  className="h-3 w-3 cursor-pointer" 
                  onClick={() => handleFilterChange(key, false)}
                />
              </Badge>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SearchFilters;