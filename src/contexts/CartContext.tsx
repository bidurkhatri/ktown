import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

export interface CartItem {
  id: string;
  menu_item_id: string;
  quantity: number;
  price_type: 'full' | 'half' | 'extra';
  menu_item: {
    id: string;
    name: string;
    description: string;
    full_price?: number;
    half_price?: number;
    extra_price?: number;
    emoji?: string;
    image_url?: string;
  };
}

interface CartContextType {
  items: CartItem[];
  addToCart: (menuItemId: string, priceType: 'full' | 'half' | 'extra', quantity?: number) => Promise<void>;
  removeFromCart: (cartItemId: string) => Promise<void>;
  updateQuantity: (cartItemId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  getTotalPrice: () => number;
  getTotalItems: () => number;
  loading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

// Generate a secure session ID for guest users (32+ characters for security)
const getSessionId = () => {
  let sessionId = localStorage.getItem('cart_session_id');
  if (!sessionId || sessionId.length < 32) {
    // Generate a cryptographically secure 64-character session ID
    sessionId = crypto.randomUUID() + crypto.randomUUID().replace(/-/g, '');
    localStorage.setItem('cart_session_id', sessionId);
  }
  return sessionId;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  // Fetch cart items
  const fetchCartItems = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('cart_items')
        .select(`
          id,
          menu_item_id,
          quantity,
          price_type,
          menu_item:menu_items(
            id,
            name,
            description,
            full_price,
            half_price,
            extra_price,
            emoji,
            image_url
          )
        `);

      if (user) {
        query = query.eq('user_id', user.id);
      } else {
        query = query.eq('session_id', getSessionId());
      }

      const { data, error } = await query;
      if (error) throw error;
      setItems((data || []) as CartItem[]);
    } catch (error) {
      console.error('Error fetching cart items:', error);
      toast({
        title: "Error",
        description: "Failed to load cart items",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, [user]);

  const addToCart = async (menuItemId: string, priceType: 'full' | 'half' | 'extra', quantity = 1) => {
    try {
      const cartData: any = {
        menu_item_id: menuItemId,
        quantity,
        price_type: priceType,
      };

      if (user) {
        cartData.user_id = user.id;
      } else {
        cartData.session_id = getSessionId();
      }

      const { error } = await supabase
        .from('cart_items')
        .upsert(cartData, {
          onConflict: user ? 'user_id,menu_item_id,price_type' : 'session_id,menu_item_id,price_type'
        });

      if (error) throw error;

      await fetchCartItems();
      toast({
        title: "Added to cart",
        description: "Item has been added to your cart",
      });
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast({
        title: "Error",
        description: "Failed to add item to cart",
        variant: "destructive",
      });
    }
  };

  const removeFromCart = async (cartItemId: string) => {
    try {
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('id', cartItemId);

      if (error) throw error;

      await fetchCartItems();
      toast({
        title: "Item removed",
        description: "Item has been removed from your cart",
      });
    } catch (error) {
      console.error('Error removing from cart:', error);
      toast({
        title: "Error",
        description: "Failed to remove item from cart",
        variant: "destructive",
      });
    }
  };

  const updateQuantity = async (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      await removeFromCart(cartItemId);
      return;
    }

    try {
      const { error } = await supabase
        .from('cart_items')
        .update({ quantity })
        .eq('id', cartItemId);

      if (error) throw error;

      await fetchCartItems();
    } catch (error) {
      console.error('Error updating quantity:', error);
      toast({
        title: "Error",
        description: "Failed to update item quantity",
        variant: "destructive",
      });
    }
  };

  const clearCart = async () => {
    try {
      let query = supabase.from('cart_items').delete();

      if (user) {
        query = query.eq('user_id', user.id);
      } else {
        query = query.eq('session_id', getSessionId());
      }

      const { error } = await query;
      if (error) throw error;

      setItems([]);
      toast({
        title: "Cart cleared",
        description: "All items have been removed from your cart",
      });
    } catch (error) {
      console.error('Error clearing cart:', error);
      toast({
        title: "Error",
        description: "Failed to clear cart",
        variant: "destructive",
      });
    }
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => {
      const price = item.menu_item[`${item.price_type}_price` as keyof typeof item.menu_item] as number || 0;
      return total + (price * item.quantity);
    }, 0);
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getTotalPrice,
      getTotalItems,
      loading,
    }}>
      {children}
    </CartContext.Provider>
  );
};