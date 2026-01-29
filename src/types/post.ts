export type Platform = 'facebook' | 'twitter' | 'tiktok' | 'forum';

export type TopicCategory = 'tech' | 'finance' | 'entertainment' | 'society' | 'drama';

export interface Post {
  id: string;
  title: string;
  summary: string;
  content: string;
  originalUrl: string;
  platform: Platform;
  author: {
    name: string;
    handle: string;
    avatar?: string;
  };
  engagement: {
    likes: number;
    shares: number;
    comments: number;
  };
  comments?: PostComment[];
  topics: TopicCategory[];
  tags: string[];
  publishedAt: string;
  processedAt: string;
  imageUrl?: string;
  sentiment?: 'positive' | 'negative' | 'neutral';
}

export interface PostComment {
  id: string;
  user: string;
  content: string;
  avatar?: string;
  createdAt?: string;
}

export interface SearchFilters {
  platforms: Platform[];
  topics: TopicCategory[];
  dateRange: {
    from?: string;
    to?: string;
  };
  query: string;
}
