
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, MapPin, Phone, Music, Leaf } from 'lucide-react';

const PieDePagina: React.FC = () => {
  return (
    <footer className="bg-choco-brown text-white pt-12 pb-6 relative overflow-hidden">
      {/* Elementos decorativos inspirados en patrones afrocolombianos */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-choco-green via-choco-gold to-choco-blue"></div>
      <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-choco-gold opacity-5"></div>
      <div className="absolute right-10 bottom-20">
        <Music size={60} className="text-white opacity-5" />
      </div>
      <div className="absolute left-1/2 top-20">
        <Leaf size={70} className="text-white opacity-5 rotate-45" />
      </div>
      
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
          {/* Logo y descripción */}
          <div className="col-span-1">
            <Link to="/" className="flex items-center">
              <span className="text-white font-alternates text-2xl font-bold">Tesoros<span className="text-choco-gold">Chocó</span></span>
            </Link>
            <p className="mt-4 text-gray-300 text-sm">
              Conectando artesanos chocoanos con amantes del arte y la cultura. Productos auténticos que preservan nuestra identidad y tradiciones afrocolombianas.
            </p>
            <div className="mt-6 flex space-x-4">
              <a href="#" className="text-choco-gold hover:text-white transition-colors p-2 bg-white/10 rounded-full">
                <Facebook size={18} />
              </a>
              <a href="#" className="text-choco-gold hover:text-white transition-colors p-2 bg-white/10 rounded-full">
                <Instagram size={18} />
              </a>
              <a href="#" className="text-choco-gold hover:text-white transition-colors p-2 bg-white/10 rounded-full">
                <Twitter size={18} />
              </a>
            </div>
          </div>

          {/* Enlaces principales */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-choco-gold font-alternates flex items-center">
              <span className="mr-2 text-2xl">✦</span>
              Enlaces Principales
            </h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-3">
              <Link to="/productos" className="text-gray-300 hover:text-choco-gold hover:pl-1 text-sm transition-all flex items-center">
                <span className="mr-2 opacity-0 group-hover:opacity-100 text-xs">→</span>
                Productos
              </Link>
              <Link to="/artesanos" className="text-gray-300 hover:text-choco-gold hover:pl-1 text-sm transition-all flex items-center">
                <span className="mr-2 opacity-0 group-hover:opacity-100 text-xs">→</span>
                Artesanos
              </Link>
              <Link to="/nosotros" className="text-gray-300 hover:text-choco-gold hover:pl-1 text-sm transition-all flex items-center">
                <span className="mr-2 opacity-0 group-hover:opacity-100 text-xs">→</span>
                Sobre Nosotros
              </Link>
              <Link to="/contacto" className="text-gray-300 hover:text-choco-gold hover:pl-1 text-sm transition-all flex items-center">
                <span className="mr-2 opacity-0 group-hover:opacity-100 text-xs">→</span>
                Contacto
              </Link>
            </div>
          </div>

          {/* Información de Contacto */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-choco-gold font-alternates flex items-center">
              <span className="mr-2 text-2xl">✦</span>
              Comunícate con Nosotros
            </h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <MapPin size={18} className="flex-shrink-0 mr-3 text-choco-gold" />
                <p className="text-gray-300 text-sm">Quibdó, Chocó, Colombia</p>
              </div>
              <div className="flex items-start">
                <Phone size={18} className="flex-shrink-0 mr-3 text-choco-gold" />
                <p className="text-gray-300 text-sm">+57 300 123 4567</p>
              </div>
              <div className="flex items-start">
                <Mail size={18} className="flex-shrink-0 mr-3 text-choco-gold" />
                <p className="text-gray-300 text-sm">info@tesoroschoco.com</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700/50 mt-8 pt-6 text-center">
          <div className="flex justify-center space-x-1 mb-4">
            <div className="h-2 w-2 bg-choco-green rounded-full"></div>
            <div className="h-2 w-2 bg-choco-gold rounded-full"></div>
            <div className="h-2 w-2 bg-choco-blue rounded-full"></div>
            <div className="h-2 w-2 bg-choco-red rounded-full"></div>
          </div>
          
          <p className="text-gray-400 text-sm">© {new Date().getFullYear()} TesorosChocó. Todos los derechos reservados.</p>
          <div className="mt-2 space-x-4 text-xs">
            <Link to="/terminos" className="text-gray-400 hover:text-choco-gold transition-colors">Términos y Condiciones</Link>
            <Link to="/privacidad" className="text-gray-400 hover:text-choco-gold transition-colors">Política de Privacidad</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default PieDePagina;
