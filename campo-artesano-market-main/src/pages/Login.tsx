
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import LoginForm from '@/components/auth/LoginForm';

const Login = () => {
  return (
    <>
      <Header />

      <main className="bg-campo-cream min-h-screen py-12">
        <div className="container-custom max-w-4xl">
          <div className="mb-6">
            <Link to="/" className="text-campo-brown hover:text-campo-terracotta inline-flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Volver al inicio
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            <div className="md:col-span-2 flex flex-col justify-center">
              <div className="text-center md:text-left">
                <h1 className="text-3xl font-bold text-campo-dark mb-4">Bienvenido de nuevo</h1>
                <p className="text-gray-600">
                  Inicia sesión con tu cuenta para continuar explorando productos artesanales únicos y apoyar a nuestros artesanos locales.
                </p>
              </div>
            </div>
            <div className="md:col-span-3">
              <LoginForm />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Login;
