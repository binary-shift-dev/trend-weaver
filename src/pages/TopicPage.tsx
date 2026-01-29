import { useParams, Link } from 'react-router-dom';
import { useMemo, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { PostCard } from '@/components/PostCard';
import { getRandomizedPosts, topicLabels, topicDescriptions } from '@/data/mockPosts';
import { Laptop, TrendingUp, Film, Home, Zap } from 'lucide-react';
import { TopicCategory } from '@/types/post';
import { Button } from '@/components/ui/button';

// Icon mapping chuyên nghiệp thay vì emoji
const topicIcons: Record<TopicCategory, ReactNode> = {
  tech: <Laptop className="h-12 w-12" />,
  finance: <TrendingUp className="h-12 w-12" />,
  entertainment: <Film className="h-12 w-12" />,
  society: <Home className="h-12 w-12" />,
  drama: <Zap className="h-12 w-12" />,
};

const TopicPage = () => {
  const { topic } = useParams<{ topic: string }>();
  const topicKey = topic as TopicCategory;
  
  const isValidTopic = topicKey && topicLabels[topicKey];
  const randomizedPosts = useMemo(() => getRandomizedPosts(), []);
  const topicPosts = randomizedPosts.filter((post) => post.topics.includes(topicKey));

  if (!isValidTopic) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-16 text-center">
          <h1 className="font-display text-3xl font-bold mb-4">Không tìm thấy chủ đề</h1>
          <p className="text-muted-foreground mb-8">Chủ đề bạn đang tìm kiếm không tồn tại.</p>
          <Link to="/">
            <Button>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Về trang chủ
            </Button>
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Topic Hero */}
        <section className="relative py-12 md:py-16 overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          </div>
          
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-2xl"
            >
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
              >
                <ArrowLeft className="h-4 w-4" />
                Về trang chủ
              </Link>
              
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 text-primary border border-primary/20">
                  {topicIcons[topicKey]}
                </div>
                <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                  {topicLabels[topicKey]}
                </h1>
              </div>
              
              <p className="text-lg text-muted-foreground leading-relaxed">
                {topicDescriptions[topicKey]}
              </p>
              
              <p className="text-sm text-muted-foreground mt-4">
                {topicPosts.length} bài viết
              </p>
            </motion.div>
          </div>
        </section>

        {/* Posts Grid */}
        <section className="container mx-auto px-4 pb-12">
          {topicPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {topicPosts.map((post, index) => (
                <PostCard key={post.id} post={post} index={index} />
              ))}
            </div>
          ) : (
            <motion.div
              className="text-center py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="text-muted-foreground text-lg">
                Chưa có bài viết nào trong chủ đề này.
              </p>
              <Link to="/" className="text-primary hover:underline mt-4 inline-block">
                Xem tất cả bài viết
              </Link>
            </motion.div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default TopicPage;
