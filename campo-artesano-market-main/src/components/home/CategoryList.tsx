
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { categories } from '@/data/mockData';
import { getImageFallback } from '@/lib/utils';

const CategoryList: React.FC = () => {
  // Tomamos solo las categorías principales para simplificar
  const mainCategories = categories.slice(0, 3);
  
  return (
    <section className="py-20 bg-choco-light relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-choco-blue opacity-10 rounded-full blur-2xl"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-choco-gold opacity-10 rounded-full blur-xl"></div>
      
      <div className="container-custom relative z-10">
        <h2 className="section-title text-center mb-16">Explora Nuestras Categorías</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {mainCategories.map((category) => (
            <Link 
              key={category.id} 
              to={`/productos?categoria=${category.slug}`}
              className="group"
            >
              <div className="overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 h-80 card-hover-effect">
                <div className="relative h-full w-full image-hover-zoom">
                  <img 
                    src={category.image || getImageFallback(category.name)} 
                    alt={category.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-choco-brown/90 to-transparent flex flex-col items-center justify-end p-8">
                    <h3 className="text-white text-2xl font-bold mb-2">{category.name}</h3>
                    <div className="w-12 h-1 bg-choco-gold rounded mb-4 transform transition-all duration-500 scale-0 group-hover:scale-100"></div>
                    <p className="text-white/90 text-center">Explora productos</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Link 
            to="/productos" 
            className="inline-flex items-center text-choco-green hover:text-choco-blue transition-colors font-medium"
          >
            Ver todas las categorías
            <ChevronRight className="ml-1 h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CategoryList;
