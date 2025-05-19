
import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { Product, getProducerById } from '@/data/mockData';
import { useCart } from '@/hooks/useCart';
import { formatCurrency } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const producer = getProducerById(product.producerId);
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <Link to={`/producto/${product.slug}`} className="block card-product group">
      <div className="relative overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {product.stock < 5 && product.stock > 0 && (
          <div className="absolute top-2 left-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded-md">
            ¡Últimas unidades!
          </div>
        )}
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white font-medium text-lg">Agotado</span>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-medium text-campo-dark truncate group-hover:text-campo-brown transition-colors">
              {product.name}
            </h3>
            <p className="text-sm text-gray-500 mt-1">Por {producer?.name}</p>
          </div>
          <div className="text-right">
            <p className="font-medium text-campo-terracotta">{formatCurrency(product.price)}</p>
          </div>
        </div>
        
        <div className="mt-4 flex justify-between items-center">
          <div className="flex items-center">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <svg 
                  key={i}
                  xmlns="http://www.w3.org/2000/svg" 
                  className={`h-4 w-4 ${i < Math.floor(product.rating || 0) ? 'text-yellow-500' : 'text-gray-300'}`}
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              ))}
            </div>
            <span className="text-xs text-gray-500 ml-1">({product.rating})</span>
          </div>
          
          {product.stock > 0 && (
            <button
              onClick={handleAddToCart}
              className="p-2 rounded-full bg-campo-cream text-campo-brown hover:bg-campo-brown hover:text-white transition-colors"
              aria-label="Añadir al carrito"
            >
              <ShoppingCart size={18} />
            </button>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
