import { TopicCategory } from '@/types/post';
import { topicLabels } from '@/data/mockPosts';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface TopicTagProps {
  topic: TopicCategory;
  size?: 'sm' | 'md';
  clickable?: boolean;
  onClick?: () => void;
  className?: string;
}

const topicColors: Record<TopicCategory, string> = {
  tech: 'bg-topic-tech/10 text-topic-tech hover:bg-topic-tech/20',
  finance: 'bg-topic-finance/10 text-topic-finance hover:bg-topic-finance/20',
  entertainment: 'bg-topic-entertainment/10 text-topic-entertainment hover:bg-topic-entertainment/20',
  society: 'bg-topic-society/10 text-topic-society hover:bg-topic-society/20',
  drama: 'bg-topic-drama/10 text-topic-drama hover:bg-topic-drama/20',
};

export function TopicTag({ topic, size = 'md', clickable = false, onClick, className }: TopicTagProps) {
  const Component = clickable ? motion.button : motion.span;

  return (
    <Component
      onClick={onClick}
      className={cn(
        'inline-flex items-center rounded-full font-medium transition-colors',
        topicColors[topic],
        size === 'sm' && 'px-2 py-0.5 text-xs',
        size === 'md' && 'px-3 py-1 text-sm',
        clickable && 'cursor-pointer',
        className
      )}
      whileHover={clickable ? { scale: 1.02 } : undefined}
      whileTap={clickable ? { scale: 0.98 } : undefined}
    >
      {topicLabels[topic]}
    </Component>
  );
}

interface TagPillProps {
  tag: string;
  size?: 'sm' | 'md';
  className?: string;
}

export function TagPill({ tag, size = 'sm', className }: TagPillProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full bg-secondary text-secondary-foreground font-medium',
        size === 'sm' && 'px-2 py-0.5 text-xs',
        size === 'md' && 'px-3 py-1 text-sm',
        className
      )}
    >
      #{tag}
    </span>
  );
}
