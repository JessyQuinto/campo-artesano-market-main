
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import RegisterForm from '@/components/auth/RegisterForm';

const Register = () => {
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
                <h1 className="text-3xl font-bold text-campo-dark mb-4">Únete a nuestra comunidad</h1>
                <p className="text-gray-600">
                  Regístrate para acceder a beneficios exclusivos, realizar seguimiento de tus pedidos y apoyar directamente a los artesanos rurales.
                </p>
                
                <div className="mt-8 bg-white p-4 rounded-lg border border-gray-200">
                  <h3 className="font-medium text-lg text-campo-brown mb-2">Beneficios de registrarte</h3>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li className="flex items-center">
                      <svg className="h-4 w-4 text-campo-green mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                        <path d="M5 13l4 4L19 7"></path>
                      </svg>
                      Guarda tus direcciones de envío
                    </li>
                    <li className="flex items-center">
                      <svg className="h-4 w-4 text-campo-green mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                        <path d="M5 13l4 4L19 7"></path>
                      </svg>
                      Historial y seguimiento de pedidos
                    </li>
                    <li className="flex items-center">
                      <svg className="h-4 w-4 text-campo-green mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                        <path d="M5 13l4 4L19 7"></path>
                      </svg>
                      Lista de deseos personalizada
                    </li>
                    <li className="flex items-center">
                      <svg className="h-4 w-4 text-campo-green mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                        <path d="M5 13l4 4L19 7"></path>
                      </svg>
                      Ofertas exclusivas para miembros
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="md:col-span-3">
              <RegisterForm />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Register;
