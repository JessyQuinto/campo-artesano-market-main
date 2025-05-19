
import React from 'react';
import { ArrowRight, Leaf, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductCard from '../product/ProductCard';
import { getFeaturedProducts } from '@/data/mockData';

const ProductosDestacados: React.FC = () => {
  // Tomamos solo 3 productos para simplificar
  const productosDestacados = getFeaturedProducts().slice(0, 3);

  return (
    <section className="py-20 relative overflow-hidden featured-products">
      {/* Elementos decorativos con patrones del Pacífico */}
      <div className="absolute -top-20 -left-20 w-64 h-64 bg-choco-green opacity-10 rounded-full blur-2xl"></div>
      <div className="absolute right-0 top-40 w-60 h-60 bg-pacifico-pattern"></div>
      <div className="absolute left-40 bottom-20 rotate-45">
        <Leaf size={120} className="text-choco-green opacity-5" />
      </div>
      
      <div className="container-custom relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center mb-16">
          <div className="text-center md:text-left">
            <span className="inline-block px-4 py-1 rounded-full bg-choco-cream text-choco-brown text-sm font-medium mb-4">
              Artesanías Seleccionadas
            </span>
            <h2 className="section-title text-center md:text-left mb-4 md:mb-0 relative">
              Tesoros Artesanales
              <span className="absolute -top-6 right-10 text-5xl text-choco-gold opacity-20 font-serif rotate-12">✦</span>
            </h2>
          </div>
          <Link to="/productos" className="flex items-center text-choco-blue hover:text-choco-green transition-colors group">
            <span className="mr-2 font-medium">Ver tesoros completos</span>
            <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {productosDestacados.map((producto) => (
            <ProductCard key={producto.id} product={producto} />
          ))}
        </div>
        
        <div className="mt-20 text-center artisan-section">
          <div className="inline-block bg-gradient-to-r from-choco-cream to-white rounded-lg p-8 shadow-lg border-t-4 border-choco-gold">
            <div className="flex flex-col items-center">
              <div className="bg-choco-gold/20 p-3 rounded-full mb-4">
                <ShoppingBag size={28} className="text-choco-brown" />
              </div>
              <h3 className="font-alternates text-xl font-bold text-choco-brown mb-2">¿Eres artesano del Chocó?</h3>
              <p className="text-gray-600 mb-4">Únete a nuestra plataforma y comparte tus creaciones con el mundo</p>
              <Link to="/contacto" className="text-choco-green hover:text-choco-gold transition-all flex items-center font-medium">
                Contáctanos
                <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Franja decorativa con colores del pacífico colombiano */}
      <div className="h-2 w-full bg-gradient-to-r from-choco-green via-choco-gold via-choco-blue to-choco-red mt-16"></div>
    </section>
  );
};

export default ProductosDestacados;
