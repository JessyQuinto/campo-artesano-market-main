
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProductDetail from '@/components/product/ProductDetail';
import { Product, products } from '@/data/mockData';

const ProductDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    // Find product by slug
    const foundProduct = products.find(p => p.slug === slug) || null;
    setProduct(foundProduct);
    setIsLoading(false);
  }, [slug]);

  return (
    <>
      <Header />
      <Navbar />

      <main className="bg-white min-h-screen">
        {isLoading ? (
          <div className="py-16 text-center">
            <p className="text-gray-600">Cargando...</p>
          </div>
        ) : product ? (
          <ProductDetail product={product} />
        ) : (
          <div className="container-custom py-16 text-center">
            <h2 className="text-2xl font-bold text-gray-700">Producto no encontrado</h2>
            <p className="mt-4 text-gray-600">
              Lo sentimos, el producto que estás buscando no está disponible.
            </p>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
};

export default ProductDetailPage;
