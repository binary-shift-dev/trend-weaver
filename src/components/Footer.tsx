import { Link } from 'react-router-dom';
import { 
  Facebook, 
  MessageSquare,
  Laptop,
  TrendingUp,
  Film,
  Home,
  Zap
} from 'lucide-react';
import { Logo } from './Logo';
import { TopicCategory } from '@/types/post';
import { topicLabels } from '@/data/mockPosts';

const topics: TopicCategory[] = ['tech', 'finance', 'entertainment', 'society', 'drama'];

// Icon mapping chuyên nghiệp thay vì emoji
const topicIcons: Record<TopicCategory, React.ReactNode> = {
  tech: <Laptop className="h-4 w-4" />,
  finance: <TrendingUp className="h-4 w-4" />,
  entertainment: <Film className="h-4 w-4" />,
  society: <Home className="h-4 w-4" />,
  drama: <Zap className="h-4 w-4" />,
};

export function Footer() {
  return (
    <footer className="border-t border-border bg-card mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="mb-4">
              <Logo size="md" />
            </div>
            <p className="text-muted-foreground text-sm max-w-md leading-relaxed mb-4">
              Tổng hợp tin tức nóng nhất từ các mạng xã hội Việt Nam. 
              Được xử lý bởi AI để mang đến nội dung chất lượng và cập nhật nhanh nhất.
            </p>
            <p className="text-muted-foreground text-xs">
              Được tạo bởi{' '}
              <a 
                href="https://www.linkedin.com/in/vietdoo/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline font-medium transition-colors"
              >
                DO QUOC VIET
              </a>
            </p>
            <div className="flex items-center gap-4 mt-6">
              <a href="#" className="p-2 rounded-lg bg-muted/50 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-muted/50 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a href="#" className="p-2 rounded-lg bg-muted/50 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
                <MessageSquare className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Topics */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Chủ đề</h4>
            <ul className="space-y-2">
              {topics.map((topic) => (
                <li key={topic}>
                  <Link
                    to={`/topic/${topic}`}
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-all duration-200 group"
                  >
                    <span className="transition-transform duration-200 group-hover:scale-110">
                      {topicIcons[topic]}
                    </span>
                    {topicLabels[topic]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Liên kết</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Giới thiệu
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Chính sách bảo mật
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Điều khoản sử dụng
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Liên hệ
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Điểm Trend (diemtrend.vn). Bản quyền thuộc về Điểm Trend.
          </p>
        </div>
      </div>
    </footer>
  );
}
