import { motion } from 'framer-motion';
import { Platform, TopicCategory } from '@/types/post';
import { topicLabels } from '@/data/mockPosts';
import { PlatformIcon } from './ui/PlatformIcon';
import { cn } from '@/lib/utils';

interface FilterBarProps {
  selectedPlatforms: Platform[];
  selectedTopics: TopicCategory[];
  onPlatformsChange: (platforms: Platform[]) => void;
  onTopicsChange: (topics: TopicCategory[]) => void;
}

const platforms: Platform[] = ['facebook', 'twitter', 'tiktok', 'forum'];
const topics: TopicCategory[] = ['tech', 'finance', 'entertainment', 'society', 'drama'];

const platformLabels: Record<Platform, string> = {
  facebook: 'Facebook',
  twitter: 'X',
  tiktok: 'TikTok',
  forum: 'Diễn đàn',
};

export function FilterBar({ 
  selectedPlatforms, 
  selectedTopics, 
  onPlatformsChange, 
  onTopicsChange 
}: FilterBarProps) {
  const togglePlatform = (platform: Platform) => {
    if (selectedPlatforms.includes(platform)) {
      onPlatformsChange(selectedPlatforms.filter((p) => p !== platform));
    } else {
      onPlatformsChange([...selectedPlatforms, platform]);
    }
  };

  const toggleTopic = (topic: TopicCategory) => {
    if (selectedTopics.includes(topic)) {
      onTopicsChange(selectedTopics.filter((t) => t !== topic));
    } else {
      onTopicsChange([...selectedTopics, topic]);
    }
  };

  return (
    <motion.div 
      className="flex flex-col gap-4 mb-8 p-4 rounded-xl bg-muted/50 border border-border/50"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
    >
      {/* Platform Filters */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm font-medium text-muted-foreground mr-2">Nền tảng:</span>
        {platforms.map((platform) => (
          <motion.button
            key={platform}
            onClick={() => togglePlatform(platform)}
            className={cn(
              'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all',
              'border',
              selectedPlatforms.includes(platform)
                ? 'bg-primary text-primary-foreground border-primary'
                : 'bg-background text-muted-foreground border-border hover:border-primary/50'
            )}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <PlatformIcon platform={platform} size="sm" />
            {platformLabels[platform]}
          </motion.button>
        ))}
      </div>

      {/* Topic Filters */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm font-medium text-muted-foreground mr-2">Chủ đề:</span>
        {topics.map((topic) => (
          <motion.button
            key={topic}
            onClick={() => toggleTopic(topic)}
            className={cn(
              'px-3 py-1.5 rounded-full text-sm font-medium transition-all',
              'border',
              selectedTopics.includes(topic)
                ? 'bg-primary text-primary-foreground border-primary'
                : 'bg-background text-muted-foreground border-border hover:border-primary/50'
            )}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {topicLabels[topic]}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
