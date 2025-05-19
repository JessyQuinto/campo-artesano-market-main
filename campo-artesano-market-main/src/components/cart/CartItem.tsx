
import React, { useState } from 'react';
import { X, Plus, Minus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CartItem as CartItemType } from '@/context/CartContext';
import { useCart } from '@/hooks/useCart';
import { formatCurrency } from '@/lib/utils';

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { product, quantity } = item;
  const { updateQuantity, removeFromCart } = useCart();
  const [isUpdating, setIsUpdating] = useState(false);
  
  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity <= 0) {
      return;
    }
    
    if (newQuantity > product.stock) {
      return;
    }
    
    setIsUpdating(true);
    updateQuantity(product.id, newQuantity);
    setTimeout(() => setIsUpdating(false), 300);
  };
  
  const totalPrice = (product.discountedPrice || product.price) * quantity;

  return (
    <div className={`flex py-6 border-b ${isUpdating ? 'bg-campo-cream bg-opacity-40' : ''}`}>
      {/* Product Image */}
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
        <Link to={`/producto/${product.slug}`}>
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover object-center"
          />
        </Link>
      </div>

      {/* Product Info */}
      <div className="ml-4 flex flex-1 flex-col">
        <div className="flex justify-between">
          <div>
            <h3 className="text-base font-medium text-campo-dark">
              <Link to={`/producto/${product.slug}`} className="hover:text-campo-brown">
                {product.name}
              </Link>
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              {product.stock < 5 ? `¡Solo quedan ${product.stock}!` : `Stock: ${product.stock}`}
            </p>
          </div>
          <p className="text-right font-medium text-campo-terracotta">
            {formatCurrency(totalPrice)}
          </p>
        </div>
        
        <div className="flex flex-1 items-end justify-between text-sm">
          <div className="flex items-center">
            <button 
              onClick={() => handleQuantityChange(quantity - 1)} 
              className="p-1 text-gray-600 hover:text-campo-brown"
              disabled={quantity <= 1}
            >
              <Minus size={14} />
            </button>
            <span className="mx-2 w-6 text-center">{quantity}</span>
            <button 
              onClick={() => handleQuantityChange(quantity + 1)} 
              className="p-1 text-gray-600 hover:text-campo-brown"
              disabled={quantity >= product.stock}
            >
              <Plus size={14} />
            </button>
          </div>

          <button
            type="button"
            onClick={() => removeFromCart(product.id)}
            className="flex items-center text-campo-brown hover:text-campo-terracotta"
          >
            <X size={16} className="mr-1" />
            <span>Eliminar</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
