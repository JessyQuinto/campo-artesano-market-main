
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingBag } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { formatCurrency } from '@/lib/utils';

interface CartSummaryProps {
  hideCheckoutButton?: boolean;
}

const CartSummary: React.FC<CartSummaryProps> = ({ hideCheckoutButton = false }) => {
  const { items, total } = useCart();
  
  // Calculate subtotal, shipping, tax
  const subtotal = total;
  const shipping = subtotal > 150000 ? 0 : 12000;
  const tax = subtotal * 0.19; // 19% IVA
  const orderTotal = subtotal + shipping;
  
  // Count total items
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="bg-campo-cream rounded-lg p-6 sticky top-24">
      <h2 className="text-lg font-medium text-campo-dark mb-4">Resumen de la orden</h2>
      
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Productos ({totalItems})</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Envío</span>
          <span>
            {shipping === 0 ? (
              <span className="text-green-600">Gratis</span>
            ) : (
              formatCurrency(shipping)
            )}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">IVA (19%)</span>
          <span>{formatCurrency(tax)}</span>
        </div>
        
        {shipping > 0 && (
          <div className="text-xs text-campo-brown mt-2 italic">
            Envío gratis en compras superiores a {formatCurrency(150000)}
          </div>
        )}
        
        <div className="h-px bg-gray-300 my-3"></div>
        
        <div className="flex justify-between font-medium">
          <span>Total</span>
          <span className="text-lg">{formatCurrency(orderTotal)}</span>
        </div>
      </div>
      
      {!hideCheckoutButton && (
        <div className="mt-6">
          <Link
            to="/checkout"
            className="w-full flex items-center justify-center py-3 px-6 rounded-md bg-campo-brown text-white hover:bg-opacity-90"
          >
            <span>Finalizar compra</span>
            <ArrowRight size={18} className="ml-2" />
          </Link>
          
          <Link
            to="/productos"
            className="w-full flex items-center justify-center py-3 px-6 rounded-md border border-campo-brown text-campo-brown hover:bg-campo-cream mt-3"
          >
            <ShoppingBag size={18} className="mr-2" />
            <span>Continuar comprando</span>
          </Link>
        </div>
      )}
    </div>
  );
};

export default CartSummary;
