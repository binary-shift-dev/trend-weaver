import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { PostCard } from '@/components/PostCard';
import { FilterBar } from '@/components/FilterBar';
import { useMemo, useState } from 'react';
import { Platform, TopicCategory } from '@/types/post';
import { getRandomizedPosts } from '@/data/mockPosts';

// Normalize Vietnamese text for search (remove diacritics)
function normalizeVietnamese(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D');
}

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const [selectedPlatforms, setSelectedPlatforms] = useState<Platform[]>([]);
  const [selectedTopics, setSelectedTopics] = useState<TopicCategory[]>([]);
  const randomizedPosts = useMemo(() => getRandomizedPosts(), []);

  // Filter posts based on search query and filters (supports Vietnamese with/without diacritics)
  const filteredPosts = randomizedPosts.filter((post) => {
    const normalizedQuery = normalizeVietnamese(query);
    const matchesQuery = !query || 
      normalizeVietnamese(post.title).includes(normalizedQuery) ||
      normalizeVietnamese(post.summary).includes(normalizedQuery) ||
      post.tags.some(tag => normalizeVietnamese(tag).includes(normalizedQuery)) ||
      normalizeVietnamese(post.author.name).includes(normalizedQuery);
    
    const platformMatch = selectedPlatforms.length === 0 || selectedPlatforms.includes(post.platform);
    const topicMatch = selectedTopics.length === 0 || post.topics.some((t) => selectedTopics.includes(t));
    
    return matchesQuery && platformMatch && topicMatch;
  });

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Search Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-3 mb-2">
            <Search className="h-6 w-6 text-primary" />
            <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">
              {query ? (
                <>
                  Kết quả cho "<span className="text-primary">{query}</span>"
                </>
              ) : (
                'Tất cả bài viết'
              )}
            </h1>
          </div>
          <p className="text-muted-foreground">
            Tìm thấy {filteredPosts.length} kết quả
          </p>
        </motion.div>

        {/* Filters */}
        <FilterBar
          selectedPlatforms={selectedPlatforms}
          selectedTopics={selectedTopics}
          onPlatformsChange={setSelectedPlatforms}
          onTopicsChange={setSelectedTopics}
        />

        {/* Results Grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post, index) => (
              <PostCard key={post.id} post={post} index={index} />
            ))}
          </div>
        ) : (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Search className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
            <h2 className="font-display text-xl font-semibold mb-2">Không tìm thấy kết quả</h2>
            <p className="text-muted-foreground mb-6">
              Thử thay đổi từ khóa hoặc bộ lọc để tìm kiếm.
            </p>
            <button
              onClick={() => {
                setSelectedPlatforms([]);
                setSelectedTopics([]);
              }}
              className="text-primary hover:underline"
            >
              Xóa tất cả bộ lọc
            </button>
          </motion.div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default SearchResults;
