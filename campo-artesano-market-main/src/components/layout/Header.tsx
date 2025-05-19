
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Search, ShoppingCart, User, TreePalm } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/hooks/useAuth';
import { useTutorial } from '@/hooks/useTutorial';

const Encabezado = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { itemCount } = useCart();
  const { isAuthenticated, user, logout } = useAuth();
  const { iniciarTutorial } = useTutorial();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Redirigir a la página de resultados de búsqueda
    window.location.href = `/productos?search=${encodeURIComponent(searchQuery)}`;
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* Franja superior con los colores de la bandera chocoana */}
      <div className="h-1.5 w-full bg-gradient-to-r from-choco-green via-choco-gold to-choco-blue"></div>
      
      <div className="container-custom py-4">
        <div className="flex items-center justify-between">
          {/* Logo con elementos de la cultura chocoana */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <TreePalm size={24} className="text-choco-green mr-2" />
              <span className="text-choco-brown font-alternates text-2xl font-bold">Tesoros<span className="text-choco-gold">Chocó</span></span>
            </Link>
          </div>

          {/* Búsqueda con estilo Pacífico */}
          <div className="hidden md:flex items-center search-products">
            <form onSubmit={handleSearch} className="relative flex-grow max-w-md mx-4">
              <input
                type="search"
                placeholder="Buscar tesoros artesanales..."
                className="w-full rounded-full border border-choco-gold/30 py-2 px-4 focus:outline-none focus:ring-1 focus:ring-choco-gold/50 font-alternates text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="submit"
                className="absolute right-0 top-0 mt-2 mr-3 text-choco-gold hover:text-choco-brown transition-colors"
              >
                <Search size={20} />
              </button>
            </form>
          </div>

          {/* Navegación con elementos culturales */}
          <nav className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="relative group">
                <button className="flex items-center gap-2 text-choco-brown hover:text-choco-green transition-colors">
                  <User size={20} />
                  <span>{user?.name}</span>
                </button>
                <div className="absolute right-0 w-48 mt-2 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 border-t-2 border-choco-gold">
                  <div className="py-1">
                    <Link to="/perfil" className="block px-4 py-2 text-sm text-choco-dark hover:bg-choco-cream">Mi Perfil</Link>
                    <Link to="/pedidos" className="block px-4 py-2 text-sm text-choco-dark hover:bg-choco-cream">Mis Pedidos</Link>
                    <button onClick={logout} className="w-full text-left block px-4 py-2 text-sm text-choco-dark hover:bg-choco-cream">Cerrar Sesión</button>
                  </div>
                </div>
              </div>
            ) : (
              <Link to="/login" className="bg-choco-brown hover:bg-choco-brown/90 text-white py-1.5 px-3 rounded-md transition-colors flex items-center">
                <User size={18} className="mr-1" />
                <span>Iniciar Sesión</span>
              </Link>
            )}
            <Link to="/carrito" className="cart-icon relative text-choco-dark hover:text-choco-gold transition-colors">
              <ShoppingCart size={24} />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-choco-red text-white rounded-full h-5 w-5 flex items-center justify-center text-xs font-bold">
                  {itemCount}
                </span>
              )}
            </Link>
            <button 
              onClick={iniciarTutorial} 
              className="text-xs bg-choco-cream border border-choco-gold text-choco-brown rounded-full px-3 py-1 hover:bg-choco-gold hover:text-choco-dark transition-colors"
            >
              ¿Primera vez?
            </button>
          </nav>

          {/* Botón del menú móvil */}
          <div className="md:hidden flex items-center">
            <Link to="/carrito" className="cart-icon relative text-choco-dark hover:text-choco-gold mr-4">
              <ShoppingCart size={24} />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-choco-red text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
                  {itemCount}
                </span>
              )}
            </Link>
            <button onClick={toggleMenu} className="text-choco-gold p-1 rounded-md hover:bg-choco-cream/50 transition-colors">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Barra de búsqueda móvil */}
        <div className="mt-4 md:hidden search-products">
          <form onSubmit={handleSearch}>
            <div className="relative">
              <input
                type="search"
                placeholder="Buscar tesoros artesanales..."
                className="w-full rounded-full border border-choco-gold/30 py-2 px-4 focus:outline-none focus:ring-1 focus:ring-choco-gold/50 text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="submit"
                className="absolute right-0 top-0 mt-2 mr-3 text-choco-gold"
              >
                <Search size={20} />
              </button>
            </div>
          </form>
        </div>

        {/* Menú móvil con elementos culturales */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-choco-gold/20 pt-4 bg-pattern-afro bg-opacity-5">
            <div className="flex flex-col space-y-3">
              <Link to="/" className="text-choco-brown hover:text-choco-gold flex items-center" onClick={toggleMenu}>
                <span className="mr-2 text-choco-gold text-sm">✦</span>
                Inicio
              </Link>
              <Link to="/productos" className="text-choco-brown hover:text-choco-gold flex items-center" onClick={toggleMenu}>
                <span className="mr-2 text-choco-gold text-sm">✦</span>
                Productos
              </Link>
              <Link to="/artesanos" className="text-choco-brown hover:text-choco-gold flex items-center" onClick={toggleMenu}>
                <span className="mr-2 text-choco-gold text-sm">✦</span>
                Artesanos
              </Link>
              <Link to="/nosotros" className="text-choco-brown hover:text-choco-gold flex items-center" onClick={toggleMenu}>
                <span className="mr-2 text-choco-gold text-sm">✦</span>
                Nosotros
              </Link>
              {isAuthenticated ? (
                <>
                  <Link to="/perfil" className="text-choco-brown hover:text-choco-gold flex items-center" onClick={toggleMenu}>
                    <span className="mr-2 text-choco-gold text-sm">✦</span>
                    Mi Perfil
                  </Link>
                  <Link to="/pedidos" className="text-choco-brown hover:text-choco-gold flex items-center" onClick={toggleMenu}>
                    <span className="mr-2 text-choco-gold text-sm">✦</span>
                    Mis Pedidos
                  </Link>
                  <button 
                    onClick={() => { logout(); toggleMenu(); }} 
                    className="text-left text-choco-brown hover:text-choco-gold flex items-center"
                  >
                    <span className="mr-2 text-choco-gold text-sm">✦</span>
                    Cerrar Sesión
                  </button>
                </>
              ) : (
                <Link to="/login" className="bg-choco-brown text-white py-1.5 px-3 rounded-md hover:bg-choco-brown/90 transition-colors flex items-center w-max" onClick={toggleMenu}>
                  <span className="mr-2 text-white text-sm">✦</span>
                  Iniciar Sesión
                </Link>
              )}
              <button 
                onClick={() => { iniciarTutorial(); toggleMenu(); }} 
                className="text-xs bg-choco-gold/20 text-choco-brown rounded-lg px-4 py-2 hover:bg-choco-gold/40 transition-colors self-start flex items-center"
              >
                <TreePalm size={14} className="mr-2 text-choco-green" />
                Descubre nuestro sitio
              </button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Encabezado;
