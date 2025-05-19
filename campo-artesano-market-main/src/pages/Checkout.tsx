
import React from 'react';
import { Navigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CheckoutForm from '@/components/checkout/CheckoutForm';
import { useCart } from '@/hooks/useCart';

const Checkout = () => {
  const { items } = useCart();

  // Redirect to cart if there are no items
  if (items.length === 0) {
    return <Navigate to="/carrito" replace />;
  }

  return (
    <>
      <Header />
      <Navbar />

      <main className="bg-campo-cream min-h-screen">
        <CheckoutForm />
      </main>

      <Footer />
    </>
  );
};

export default Checkout;
