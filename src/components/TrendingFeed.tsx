import { useState } from 'react';
import { motion } from 'framer-motion';
import { Post, Platform, TopicCategory } from '@/types/post';
import { PostCard } from './PostCard';
import { FilterBar } from './FilterBar';

interface TrendingFeedProps {
  posts: Post[];
  title?: string;
  showFilters?: boolean;
}

export function TrendingFeed({ posts, title = 'Đang Hot', showFilters = true }: TrendingFeedProps) {
  const [selectedPlatforms, setSelectedPlatforms] = useState<Platform[]>([]);
  const [selectedTopics, setSelectedTopics] = useState<TopicCategory[]>([]);

  const filteredPosts = posts.filter((post) => {
    const platformMatch = selectedPlatforms.length === 0 || selectedPlatforms.includes(post.platform);
    const topicMatch = selectedTopics.length === 0 || post.topics.some((t) => selectedTopics.includes(t));
    return platformMatch && topicMatch;
  });

  return (
    <section className="py-4 md:py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 md:mb-6">
        <motion.h2 
          className="font-display text-2xl md:text-3xl font-bold text-foreground flex items-center gap-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          🔥 {title}
        </motion.h2>
      </div>

      {showFilters && (
        <FilterBar
          selectedPlatforms={selectedPlatforms}
          selectedTopics={selectedTopics}
          onPlatformsChange={setSelectedPlatforms}
          onTopicsChange={setSelectedTopics}
        />
      )}

      {/* Masonry layout với CSS columns - tự động phân chia bất đối xứng */}
      <div className="masonry-layout columns-2 md:columns-2 lg:columns-3">
        {filteredPosts.map((post, index) => (
          <div key={post.id} className="break-inside-avoid mb-2 md:mb-6 inline-block w-full">
            <PostCard 
              post={post} 
              variant={index === 0 ? 'featured' : 'default'}
              index={index}
            />
          </div>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <motion.div 
          className="text-center py-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <p className="text-muted-foreground text-lg">Không có bài viết nào phù hợp với bộ lọc.</p>
          <button
            onClick={() => {
              setSelectedPlatforms([]);
              setSelectedTopics([]);
            }}
            className="mt-4 text-primary hover:underline"
          >
            Xóa tất cả bộ lọc
          </button>
        </motion.div>
      )}
    </section>
  );
}
