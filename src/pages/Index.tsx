import { useMemo } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { HeroSection } from '@/components/HeroSection';
import { TrendingFeed } from '@/components/TrendingFeed';
import { getRandomizedPosts } from '@/data/mockPosts';

const Index = () => {
  const randomizedPosts = useMemo(() => getRandomizedPosts(), []);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <div className="container mx-auto px-2 md:px-4">
          <TrendingFeed posts={randomizedPosts} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
