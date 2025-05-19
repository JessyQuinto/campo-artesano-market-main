
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProductGrid from '@/components/product/ProductGrid';
import { categories, products, searchProductsByName, getProductsByCategory } from '@/data/mockData';

const Products = () => {
  const [searchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Get query parameters
    const categorySlug = searchParams.get('categoria');
    const query = searchParams.get('search');

    if (categorySlug) {
      // Find category ID from slug
      const category = categories.find(cat => cat.slug === categorySlug);
      if (category) {
        const categoryProducts = getProductsByCategory(category.id);
        setFilteredProducts(categoryProducts);
        setSelectedCategory(category.id);
        setSearchQuery('');
      }
    } else if (query) {
      // Search products by query
      const searchResults = searchProductsByName(query);
      setFilteredProducts(searchResults);
      setSelectedCategory(null);
      setSearchQuery(query);
    } else {
      // Show all products
      setFilteredProducts(products);
      setSelectedCategory(null);
      setSearchQuery('');
    }
  }, [searchParams]);

  return (
    <>
      <Header />
      <Navbar />

      <main className="bg-white min-h-screen">
        <div className="container-custom py-8">
          <ProductGrid 
            initialProducts={filteredProducts} 
            categoryId={selectedCategory || undefined}
            searchQuery={searchQuery}
          />
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Products;
