
import React, { createContext, useReducer, useContext, useEffect } from 'react';
import { Product, getProductById } from '../data/mockData';
import { useToast } from '@/hooks/use-toast';

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  total: number;
}

type CartAction = 
  | { type: 'ADD_TO_CART'; payload: { product: Product; quantity: number } }
  | { type: 'REMOVE_FROM_CART'; payload: number }  // product id
  | { type: 'UPDATE_QUANTITY'; payload: { productId: number; quantity: number } }
  | { type: 'CLEAR_CART' };

const calculateTotal = (items: CartItem[]): number => {
  return items.reduce((total, item) => {
    const price = item.product.discountedPrice || item.product.price;
    return total + price * item.quantity;
  }, 0);
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const { product, quantity } = action.payload;
      const existingItemIndex = state.items.findIndex(item => item.product.id === product.id);
      
      if (existingItemIndex >= 0) {
        // Item already exists, update quantity
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + quantity
        };
        return {
          ...state,
          items: updatedItems,
          total: calculateTotal(updatedItems)
        };
      }
      
      // Item doesn't exist, add it
      const updatedItems = [...state.items, { product, quantity }];
      return {
        ...state,
        items: updatedItems,
        total: calculateTotal(updatedItems)
      };
    }
    
    case 'REMOVE_FROM_CART': {
      const updatedItems = state.items.filter(item => item.product.id !== action.payload);
      return {
        ...state,
        items: updatedItems,
        total: calculateTotal(updatedItems)
      };
    }
    
    case 'UPDATE_QUANTITY': {
      const { productId, quantity } = action.payload;
      if (quantity <= 0) {
        // If quantity is 0 or less, remove item
        return cartReducer(state, { type: 'REMOVE_FROM_CART', payload: productId });
      }
      
      const updatedItems = state.items.map(item => 
        item.product.id === productId ? { ...item, quantity } : item
      );
      
      return {
        ...state,
        items: updatedItems,
        total: calculateTotal(updatedItems)
      };
    }
    
    case 'CLEAR_CART':
      return {
        items: [],
        total: 0
      };
    
    default:
      return state;
  }
};

const CART_STORAGE_KEY = 'campo-artesano-cart';

// Save cart items IDs and quantities only
const saveCartToStorage = (items: CartItem[]) => {
  const simplifiedItems = items.map(item => ({
    productId: item.product.id,
    quantity: item.quantity
  }));
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(simplifiedItems));
};

// Load and reconstruct cart items from storage
const loadCartFromStorage = (): CartItem[] => {
  try {
    const storedItems = localStorage.getItem(CART_STORAGE_KEY);
    if (!storedItems) return [];
    
    const parsedItems = JSON.parse(storedItems) as { productId: number; quantity: number }[];
    
    // Reconstruct cart items with full product data
    const cartItems = parsedItems.map(item => {
      const product = getProductById(item.productId);
      if (!product) return null;
      return { product, quantity: item.quantity };
    }).filter(Boolean) as CartItem[];
    
    return cartItems;
  } catch (error) {
    console.error("Error loading cart from storage:", error);
    return [];
  }
};

export interface CartContextType {
  items: CartItem[];
  total: number;
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const initialItems = React.useMemo(() => loadCartFromStorage(), []);
  const initialState: CartState = {
    items: initialItems,
    total: calculateTotal(initialItems)
  };
  
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const { toast } = useToast();
  
  // Save cart to localStorage whenever it changes
  useEffect(() => {
    saveCartToStorage(state.items);
  }, [state.items]);
  
  const addToCart = (product: Product, quantity: number) => {
    dispatch({ type: 'ADD_TO_CART', payload: { product, quantity } });
    toast({
      title: "Añadido al carrito",
      description: `${product.name} (${quantity}) añadido al carrito`,
    });
  };
  
  const removeFromCart = (productId: number) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
    toast({
      title: "Producto eliminado",
      description: "El producto ha sido eliminado del carrito",
    });
  };
  
  const updateQuantity = (productId: number, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity } });
  };
  
  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
    toast({
      title: "Carrito vacío",
      description: "Todos los productos han sido eliminados del carrito",
    });
  };

  const itemCount = state.items.reduce((count, item) => count + item.quantity, 0);
  
  return (
    <CartContext.Provider 
      value={{ 
        items: state.items, 
        total: state.total,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        itemCount
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
