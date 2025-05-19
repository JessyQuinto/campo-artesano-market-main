
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Drum, TreePalm, Music } from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <div className="relative min-h-[85vh] flex items-center overflow-hidden bg-gradient-to-b from-choco-light to-white">
      {/* Elementos decorativos inspirados en patrones afrocolombianos */}
      <div className="absolute inset-0 afro-pattern opacity-20"></div>
      <div className="absolute -top-20 left-20 h-40 w-40 bg-choco-gold opacity-20 rounded-full blur-2xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 h-64 w-64 bg-choco-green opacity-10 rounded-full blur-3xl"></div>
      
      <div className="absolute left-10 top-40 animate-tambor">
        <Drum size={60} className="text-choco-red opacity-20" />
      </div>
      
      <div className="absolute right-10 top-60 animate-ola">
        <TreePalm size={80} className="text-choco-green opacity-20" />
      </div>
      
      <div className="absolute left-1/2 bottom-20 animate-ola-pacifico">
        <Music size={40} className="text-choco-blue opacity-20" />
      </div>
      
      <div className="container-custom relative z-10 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 text-center lg:text-left">
            <span className="inline-block px-4 py-2 rounded-full bg-choco-gold/20 text-choco-brown font-medium text-sm mb-4">
              Artesanía Afrocolombiana del Pacífico
            </span>
            
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              <span className="block text-choco-green animate-fade-in font-alternates">Tesoros del Chocó</span>
              <span className="block text-choco-blue mt-2 font-serif">Arte con Historia</span>
            </h1>
            
            <p className="text-lg text-gray-700 mb-8 max-w-lg mx-auto lg:mx-0">
              Descubre la riqueza cultural del Pacífico colombiano a través de productos artesanales auténticos, creados por manos que preservan tradiciones ancestrales afrocolombianas.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
              <Link
                to="/productos"
                className="btn-primary text-lg px-8 py-3 rounded-lg flex items-center justify-center bg-gradient-pacifico"
              >
                Explorar Tesoros
              </Link>
              <Link
                to="/artesanos"
                className="btn-outline text-lg px-8 py-3 rounded-lg flex items-center justify-center group"
              >
                Conoce los Artesanos
                <ChevronRight className="ml-1 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
          
          <div className="lg:col-span-6 relative">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-pacifico-arena opacity-20 rounded-full"></div>
            <div className="relative h-[450px] rounded-2xl overflow-hidden shadow-xl producto-afrocolombiano animate-float">
              <div className="absolute inset-0 bg-gradient-to-r from-choco-brown/40 to-transparent z-10"></div>
              <img
                className="h-full w-full object-cover"
                src="https://images.unsplash.com/photo-1590856029826-c7a73142bbf1?q=80&w=2073&auto=format&fit=crop"
                alt="Artesanía del Chocó"
              />
              
              {/* Elementos decorativos */}
              <div className="absolute top-5 right-5 bg-white/80 backdrop-blur-sm p-2 rounded-lg shadow-lg z-20">
                <p className="text-xs font-medium text-choco-brown">Arte Chocoano</p>
              </div>
              
              <div className="absolute bottom-5 left-5 bg-choco-gold/90 backdrop-blur-sm py-2 px-4 rounded-lg shadow-lg z-20">
                <p className="text-sm font-bold text-white">Tejido Ancestral</p>
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-choco-blue opacity-20 rounded-full blur-xl"></div>
          </div>
        </div>
        
        <div className="absolute bottom-10 left-0 right-0 flex justify-center">
          <div className="flex space-x-2 bg-white/50 backdrop-blur-sm py-2 px-6 rounded-full shadow-lg">
            <span className="h-2 w-2 rounded-full bg-choco-green"></span>
            <span className="h-2 w-2 rounded-full bg-choco-gold"></span>
            <span className="h-2 w-2 rounded-full bg-choco-blue"></span>
            <span className="h-2 w-2 rounded-full bg-choco-red"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
