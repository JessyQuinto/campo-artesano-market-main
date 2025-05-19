
import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, AlertTriangle } from 'lucide-react';
import Header from '@/components/layout/Header';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CartItem from '@/components/cart/CartItem';
import CartSummary from '@/components/cart/CartSummary';
import { useCart } from '@/hooks/useCart';

const Cart = () => {
  const { items, itemCount, clearCart } = useCart();

  return (
    <>
      <Header />
      <Navbar />

      <main className="bg-white min-h-screen py-8">
        <div className="container-custom">
          <h1 className="text-2xl font-bold mb-6">Mi Carrito</h1>

          {itemCount > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-medium">
                      Productos ({itemCount})
                    </h2>
                    <button
                      onClick={clearCart}
                      className="text-sm text-campo-brown hover:text-campo-terracotta"
                    >
                      Vaciar carrito
                    </button>
                  </div>

                  <div className="divide-y">
                    {items.map((item) => (
                      <CartItem key={item.product.id} item={item} />
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <CartSummary />
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-campo-cream rounded-full mb-4">
                <ShoppingBag size={32} className="text-campo-brown" />
              </div>
              <h2 className="text-2xl font-semibold mb-2">Tu carrito está vacío</h2>
              <p className="text-gray-600 mb-6">
                Agrega algunos productos para comenzar tu compra
              </p>
              <Link
                to="/productos"
                className="btn-primary inline-flex items-center"
              >
                Ver productos
              </Link>
            </div>
          )}

          {itemCount > 0 && (
            <div className="mt-8 bg-yellow-50 border border-yellow-100 rounded-lg p-4 flex items-start">
              <AlertTriangle size={24} className="text-yellow-500 mr-3 flex-shrink-0" />
              <p className="text-sm text-gray-700">
                <span className="font-medium">Nota:</span> Los productos permanecerán en tu carrito durante 7 días. Los precios y la disponibilidad están sujetos a cambios.
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Cart;
