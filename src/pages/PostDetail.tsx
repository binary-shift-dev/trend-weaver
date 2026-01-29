import { FormEvent, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Heart, MessageCircle, Share2, Clock } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { PostCard } from '@/components/PostCard';
import { PlatformIcon } from '@/components/ui/PlatformIcon';
import { TopicTag, TagPill } from '@/components/ui/TopicTag';
import { mockPosts } from '@/data/mockPosts';
import { Button } from '@/components/ui/button';
import { PostComment } from '@/types/post';

function formatNumber(num: number): string {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return num.toString();
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

const PostDetail = () => {
  const { id } = useParams<{ id: string }>();
  const post = mockPosts.find((p) => p.id === id);
  const [likes, setLikes] = useState(post?.engagement.likes ?? 0);
  const [shares, setShares] = useState(post?.engagement.shares ?? 0);
  const [commentCount, setCommentCount] = useState(post?.engagement.comments ?? 0);
  const [commentInput, setCommentInput] = useState('');
  const [comments, setComments] = useState<PostComment[]>(post?.comments ?? []);
  
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [id]);

  useEffect(() => {
    setLikes(post?.engagement.likes ?? 0);
    setShares(post?.engagement.shares ?? 0);
    setCommentCount(post?.engagement.comments ?? post?.comments?.length ?? 0);
    setCommentInput('');
    setComments(post?.comments ?? []);
  }, [post]);

  const handleLike = () => setLikes((prev) => prev + 1);
  const handleShare = () => setShares((prev) => prev + 1);
  const handleCommentSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const content = commentInput.trim();
    if (!content) return;
    const newComment: PostComment = {
      id: `local-${Date.now()}`,
      user: 'Bạn đọc',
      content,
      createdAt: new Date().toISOString(),
    };
    setComments((prev) => [newComment, ...prev]);
    setCommentCount((prev) => prev + 1);
    setCommentInput('');
  };
  
  const relatedPosts = mockPosts
    .filter((p) => p.id !== id && p.topics.some((t) => post?.topics.includes(t)))
    .slice(0, 3);

  if (!post) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-16 text-center">
          <h1 className="font-display text-3xl font-bold mb-4">Không tìm thấy bài viết</h1>
          <p className="text-muted-foreground mb-8">Bài viết bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.</p>
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
        {/* Hero Image */}
        {post.imageUrl && (
          <motion.div
            className="relative h-56 md:h-80 w-full overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <img
              src={post.imageUrl}
              alt={post.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
          </motion.div>
        )}

        <div className="container mx-auto px-4 -mt-28 relative z-10">
          <motion.article
            className="max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Back Link */}
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
            >
              <ArrowLeft className="h-4 w-4" />
              Về trang chủ
            </Link>

            {/* Content Card */}
            <div className="glass-card rounded-2xl border border-border/50 shadow-card p-5 md:p-8">
              {/* Topics */}
              <div className="flex flex-wrap gap-2 mb-4">
                {post.topics.map((topic) => (
                  <TopicTag key={topic} topic={topic} />
                ))}
              </div>

              {/* Title */}
              <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4 text-balance vn-text">
                {post.title}
              </h1>

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-4 mb-6 pb-6 border-b border-border">
                <div className="flex items-center gap-2">
                  <PlatformIcon platform={post.platform} size="md" showBackground />
                  <div>
                    <p className="text-sm font-medium text-foreground">{post.author.name}</p>
                    <p className="text-xs text-muted-foreground">{post.author.handle}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  {formatDate(post.publishedAt)}
                </div>
              </div>

              {/* Summary */}
              <div className="mb-6 p-4 rounded-xl bg-primary/5 border border-primary/10">
                <p className="text-sm font-medium text-primary mb-1">🤖 AI Tóm tắt</p>
                <p className="text-foreground leading-relaxed vn-text">{post.summary}</p>
              </div>

              {/* Content */}
              <div className="prose prose-lg max-w-none mb-8">
                <p className="text-foreground leading-relaxed whitespace-pre-wrap vn-text">
                  {post.content}
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {post.tags.map((tag) => (
                  <TagPill key={tag} tag={tag} size="md" />
                ))}
              </div>

              {/* Engagement & Actions */}
              <div className="flex flex-col gap-4 pt-6 border-t border-border">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                    <Button variant="secondary" size="sm" className="flex items-center gap-1.5" onClick={handleLike}>
                      <Heart className="h-4 w-4" />
                      {formatNumber(likes)} lượt thích
                    </Button>
                    <Button variant="secondary" size="sm" className="flex items-center gap-1.5" onClick={() => setCommentInput((prev) => prev || '')}>
                      <MessageCircle className="h-4 w-4" />
                      {formatNumber(commentCount)} bình luận
                    </Button>
                    <Button variant="secondary" size="sm" className="flex items-center gap-1.5" onClick={handleShare}>
                      <Share2 className="h-4 w-4" />
                      {formatNumber(shares)} chia sẻ
                    </Button>
                  </div>
                  
                  <a
                    href={post.originalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" size="sm">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Xem bài gốc
                    </Button>
                  </a>
                </div>

                <form onSubmit={handleCommentSubmit} className="space-y-3">
                  <label className="text-sm font-medium text-foreground">Thêm bình luận</label>
                  <div className="flex flex-col md:flex-row gap-3">
                    <input
                      value={commentInput}
                      onChange={(e) => setCommentInput(e.target.value)}
                      placeholder="Chia sẻ suy nghĩ của bạn..."
                      className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                    <Button type="submit" size="sm">
                      Gửi
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Đang hiển thị {comments.length} bình luận mẫu (tổng {formatNumber(commentCount)}, lưu tạm tại trang)
                  </p>
                </form>

                {comments.length > 0 && (
                  <div className="space-y-3">
                    {comments.map((comment) => (
                      <div
                        key={comment.id}
                        className="p-3 rounded-lg border border-border/60 bg-muted/30 flex gap-3"
                      >
                        <div className="h-10 w-10 rounded-full bg-secondary overflow-hidden flex-shrink-0 border border-border/60">
                          {comment.avatar ? (
                            <img src={comment.avatar} alt={comment.user} className="h-full w-full object-cover" />
                          ) : (
                            <div className="h-full w-full flex items-center justify-center text-xs font-semibold text-muted-foreground">
                              {comment.user.charAt(0)}
                            </div>
                          )}
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                            {comment.user}
                            {comment.createdAt && (
                              <span className="text-xs text-muted-foreground">
                                {new Date(comment.createdAt).toLocaleString('vi-VN', { hour: '2-digit', minute: '2-digit', hour12: false })}
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-foreground leading-relaxed vn-text">{comment.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.article>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <motion.section
              className="max-w-5xl mx-auto mt-12 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                Bài viết liên quan
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
                {relatedPosts.map((relatedPost, index) => (
                  <PostCard key={relatedPost.id} post={relatedPost} variant="compact" index={index} />
                ))}
              </div>
            </motion.section>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PostDetail;
