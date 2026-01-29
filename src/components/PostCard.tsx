import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, Share2, Clock, ExternalLink } from 'lucide-react';
import { Post } from '@/types/post';
import { PlatformIcon } from './ui/PlatformIcon';
import { TopicTag, TagPill } from './ui/TopicTag';
import { cn } from '@/lib/utils';

interface PostCardProps {
  post: Post;
  variant?: 'default' | 'featured' | 'compact';
  index?: number;
}

function formatNumber(num: number): string {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return num.toString();
}

function formatTimeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
  
  if (diffInMinutes < 1) return 'Vừa xong';
  if (diffInMinutes < 60) return `${diffInMinutes} phút trước`;
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours} giờ trước`;
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays === 1) return 'Hôm qua';
  return `${diffInDays} ngày trước`;
}

export function PostCard({ post, variant = 'default', index = 0 }: PostCardProps) {
  const isFeatured = variant === 'featured';
  const isCompact = variant === 'compact';

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className={cn(
        'group relative rounded-lg md:rounded-xl overflow-hidden transition-all duration-300',
        'glass-card border border-border/50',
        'hover:shadow-hover hover:border-primary/20',
        'w-full'
      )}
    >
      <Link to={`/post/${post.id}`} className="block">
        {/* Image */}
        {post.imageUrl && !isCompact && (
          <div className={cn(
            'relative overflow-hidden',
            isFeatured ? 'h-56 md:h-72' : 'h-32 md:h-44'
          )}>
            <img
              src={post.imageUrl}
              alt={post.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/35 via-background/10 to-transparent" />
            
            {/* Platform Badge */}
            <div className="absolute top-2 left-2 md:top-3 md:left-3">
              <PlatformIcon platform={post.platform} size="md" showBackground />
            </div>

            {/* Sentiment Badge */}
            {post.sentiment && (
              <div className={cn(
                'absolute top-2 right-2 md:top-3 md:right-3 px-1.5 md:px-2 py-0.5 md:py-1 rounded-full text-[10px] md:text-xs font-medium',
                post.sentiment === 'positive' && 'bg-green-500/20 text-green-600',
                post.sentiment === 'negative' && 'bg-red-500/20 text-red-600',
                post.sentiment === 'neutral' && 'bg-gray-500/20 text-gray-600'
              )}>
                {post.sentiment === 'positive' ? '😊' : post.sentiment === 'negative' ? '😠' : '😐'}
              </div>
            )}
          </div>
        )}

        {/* Content */}
        <div className={cn('p-3 md:p-4', isCompact && 'flex gap-3 md:gap-4 items-start')}>
          {isCompact && post.imageUrl && (
            <div className="relative w-24 h-16 md:w-28 md:h-20 rounded-lg overflow-hidden shrink-0 border border-border/50">
              <img
                src={post.imageUrl}
                alt={post.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/25 via-transparent to-transparent" />
              <div className="absolute top-1.5 left-1.5">
                <PlatformIcon platform={post.platform} size="sm" showBackground />
              </div>
            </div>
          )}
          
          <div className="flex-1 min-w-0 space-y-1.5">
            {/* Topics */}
            <div className="flex flex-wrap gap-1 md:gap-1.5 mb-1.5 md:mb-2">
              {post.topics.map((topic) => (
                <TopicTag key={topic} topic={topic} size="sm" />
              ))}
            </div>

            {/* Title */}
            <h3 className={cn(
              'font-display font-semibold text-foreground leading-snug mb-1 md:mb-1.5 vn-text',
              'group-hover:text-primary transition-colors',
              isFeatured ? 'text-base md:text-lg lg:text-xl' : 'text-sm md:text-base',
              isCompact && 'text-sm md:text-base line-clamp-2'
            )}>
              {post.title}
            </h3>

            {/* Summary */}
            {!isCompact && (
              <p className={cn(
                'text-muted-foreground text-xs md:text-sm leading-relaxed mb-2 md:mb-3 vn-text',
                isFeatured ? 'line-clamp-2 md:line-clamp-3' : 'line-clamp-2'
              )}>
                {post.summary}
              </p>
            )}

            {/* Tags */}
            {!isCompact && (
              <div className="flex flex-wrap gap-1 md:gap-1.5 mb-2 md:mb-3">
                {post.tags.slice(0, 3).map((tag) => (
                  <TagPill key={tag} tag={tag} />
                ))}
              </div>
            )}

            {/* Meta */}
            <div className="flex items-center justify-between text-[10px] md:text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5 md:gap-3">
                <span className="flex items-center gap-0.5 md:gap-1">
                  <Heart className="h-3 w-3 md:h-3.5 md:w-3.5" />
                  {formatNumber(post.engagement.likes)}
                </span>
                <span className="flex items-center gap-0.5 md:gap-1">
                  <MessageCircle className="h-3 w-3 md:h-3.5 md:w-3.5" />
                  {formatNumber(post.engagement.comments)}
                </span>
                <span className="flex items-center gap-0.5 md:gap-1">
                  <Share2 className="h-3 w-3 md:h-3.5 md:w-3.5" />
                  {formatNumber(post.engagement.shares)}
                </span>
              </div>
              <span className="flex items-center gap-0.5 md:gap-1">
                <Clock className="h-3 w-3 md:h-3.5 md:w-3.5" />
                {formatTimeAgo(post.publishedAt)}
              </span>
            </div>
          </div>
        </div>
      </Link>

      {/* External Link Button */}
      <a
        href={post.originalUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => e.stopPropagation()}
        className="absolute bottom-2 right-2 md:bottom-3 md:right-3 p-1.5 md:p-2 rounded-full bg-background/80 backdrop-blur-sm border border-border/50 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-background"
        title="Xem bài gốc"
      >
        <ExternalLink className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground" />
      </a>
    </motion.article>
  );
}
