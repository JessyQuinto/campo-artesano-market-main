
import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { Product, getProductsByCategory, searchProductsByName, getCategoryById } from '@/data/mockData';

interface ProductGridProps {
  initialProducts?: Product[];
  categoryId?: number;
  searchQuery?: string;
}

const ProductGrid: React.FC<ProductGridProps> = ({ 
  initialProducts,
  categoryId,
  searchQuery = ''
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [sortOption, setSortOption] = useState('default');
  const categoryName = categoryId ? getCategoryById(categoryId)?.name : null;

  useEffect(() => {
    let filteredProducts: Product[];

    if (initialProducts) {
      filteredProducts = [...initialProducts];
    } else if (categoryId) {
      filteredProducts = getProductsByCategory(categoryId);
    } else if (searchQuery) {
      filteredProducts = searchProductsByName(searchQuery);
    } else {
      // Default to all products
      filteredProducts = [];
    }

    // Apply sorting
    const sortedProducts = sortProducts(filteredProducts, sortOption);
    setProducts(sortedProducts);
  }, [initialProducts, categoryId, searchQuery, sortOption]);

  const sortProducts = (productsToSort: Product[], option: string): Product[] => {
    const productsCopy = [...productsToSort];

    switch (option) {
      case 'price-asc':
        return productsCopy.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return productsCopy.sort((a, b) => b.price - a.price);
      case 'name-asc':
        return productsCopy.sort((a, b) => a.name.localeCompare(b.name));
      case 'name-desc':
        return productsCopy.sort((a, b) => b.name.localeCompare(a.name));
      case 'rating':
        return productsCopy.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      default:
        return productsCopy;
    }
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value);
  };

  if (products.length === 0) {
    return (
      <div className="py-12 text-center">
        <h3 className="text-xl font-medium text-gray-700">No se encontraron productos</h3>
        <p className="mt-2 text-gray-500">Intenta con otra búsqueda o categoría</p>
      </div>
    );
  }

  return (
    <div className="py-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold text-campo-dark">
            {categoryName ? `Categoría: ${categoryName}` : searchQuery ? `Resultados para "${searchQuery}"` : 'Todos los productos'}
          </h2>
          <p className="text-sm text-gray-500 mt-1">{products.length} productos encontrados</p>
        </div>
        
        <div className="flex items-center">
          <label htmlFor="sort" className="text-sm text-gray-600 mr-2">Ordenar por:</label>
          <select
            id="sort"
            className="border rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-campo-brown"
            value={sortOption}
            onChange={handleSortChange}
          >
            <option value="default">Relevancia</option>
            <option value="price-asc">Precio: Menor a Mayor</option>
            <option value="price-desc">Precio: Mayor a Menor</option>
            <option value="name-asc">Nombre: A-Z</option>
            <option value="name-desc">Nombre: Z-A</option>
            <option value="rating">Calificación</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
