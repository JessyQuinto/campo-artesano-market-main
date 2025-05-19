
import React from 'react';
import Header from '@/components/layout/Header';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/home/HeroSection';
import CategoryList from '@/components/home/CategoryList';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import TutorialSteps from '@/components/tutorial/TutorialSteps';

const Index = () => {
  return (
    <>
      <Header />
      <Navbar />
      
      <main>
        <HeroSection />
        <CategoryList />
        <FeaturedProducts />
      </main>
      
      <Footer />
      <TutorialSteps />
    </>
  );
};

export default Index;
