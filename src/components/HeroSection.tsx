import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, TrendingUp, Zap } from 'lucide-react';
import { SearchBar } from './SearchBar';
import { popularKeywords } from '@/data/mockPosts';
import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  Tooltip,
  Area,
  AreaChart,
  CartesianGrid,
} from 'recharts';

export function HeroSection() {
  const navigate = useNavigate();

  const handleSearch = (query: string) => {
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  // Mock trend for hot events in last 12h (2h buckets, realtime labels)
  const now = Date.now();
  const formatTime = (ts: number) =>
    new Intl.DateTimeFormat('vi-VN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).format(ts);

  const chartData = [
    {
      label: formatTime(now - 12 * 60 * 60 * 1000),
      value: 48,
      title: 'Vàng SJC biến động mạnh đầu phiên',
      link: 'https://vnexpress.net',
      image: 'https://images.unsplash.com/photo-1521996319423-6ce2e0c56c68?w=400&h=220&fit=crop',
    },
    {
      label: formatTime(now - 10 * 60 * 60 * 1000),
      value: 52,
      title: 'Chung kết U23: Việt Nam thắng nghẹt thở',
      link: 'https://vnexpress.net',
      image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&h=220&fit=crop',
    },
    {
      label: formatTime(now - 8 * 60 * 60 * 1000),
      value: 61,
      title: 'Đại hội Đảng XIV: Khai mạc và các văn kiện chính',
      link: 'https://vnexpress.net/khai-mac-dai-hoi-dang-xiv-5007548.html',
      image:
        'https://i1-vnexpress.vnecdn.net/2026/01/20/cafe6c7c79c4f69aafd5-176887613-7296-2413-1768876166.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=OHIgKRIpDi9mn6HFsS5G9A',
    },
    {
      label: formatTime(now - 6 * 60 * 60 * 1000),
      value: 70,
      title: 'Drama MXH: Chủ đề #GenZ tranh luận sôi nổi',
      link: 'https://tiktok.com',
      image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=400&fit=crop',
    },
    {
      label: formatTime(now - 4 * 60 * 60 * 1000),
      value: 78,
      title: 'Startup AI Việt gọi vốn thành công 25 triệu USD',
      link: 'https://facebook.com',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop',
    },
    {
      label: formatTime(now - 2 * 60 * 60 * 1000),
      value: 85,
      title: 'Chỉ số VN-Index bật tăng cuối phiên',
      link: 'https://vnexpress.net',
      image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&h=400&fit=crop',
    },
    {
      label: formatTime(now),
      value: 92,
      title: 'Sự kiện hot: Bài phát biểu Tổng Bí thư, tương tác tăng mạnh',
      link: 'https://vnexpress.net/khai-mac-dai-hoi-dang-xiv-5007548.html',
      image:
        'https://i1-vnexpress.vnecdn.net/2026/01/20/cafe6c7c79c4f69aafd5-176887613-7296-2413-1768876166.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=OHIgKRIpDi9mn6HFsS5G9A',
    },
  ];

  const latest = chartData[chartData.length - 1];
  const prev = chartData[Math.max(0, chartData.length - 2)];
  const delta = latest.value - prev.value;
  const deltaPercent = prev.value ? Math.round((delta / prev.value) * 100) : 0;
  const scoreContext = {
    label: 'Top 5% · Rất nóng',
    scale: 'Thang 0-100 (chỉ số nhiệt)',
    deltaText: `${delta >= 0 ? '+' : ''}${deltaPercent}% vs 2h trước`,
  };

  const CustomTooltip = ({
    active,
    payload,
  }: {
    active?: boolean;
    payload?: { value: number; payload: (typeof chartData)[number] }[];
  }) => {
    if (!active || !payload || !payload.length) return null;
    const p = payload[0].payload;
    return (
      <div className="chart-tooltip">
        <div className="chart-tooltip__img" style={{ backgroundImage: `url(${p.image})` }} />
        <div className="chart-tooltip__body">
          <p className="chart-tooltip__label">{p.label}</p>
          <p className="chart-tooltip__title">{p.title}</p>
          {/* <a href={p.link} target="_blank" rel="noopener noreferrer" className="chart-tooltip__link">
            Xem bài
          </a> */}
        </div>
      </div>
    );
  };

  return (
    <section className="relative overflow-hidden py-12 md:py-20">
      {/* Background mesh */}
      <div className="absolute inset-0 -z-10 hero-mesh" />

      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-12">
          {/* Left: content */}
          <motion.div
            className="flex-1 max-w-3xl text-center md:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Sparkles className="h-4 w-4" />
              Điểm Trend MXH Việt Nam
            </motion.div>

            {/* Heading */}
            <motion.h1
              className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-5 text-balance leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Đang <span className="text-primary">Hot</span> trên MXH hôm nay
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="text-base md:text-lg text-muted-foreground mb-8 max-w-xl md:max-w-2xl text-balance leading-relaxed mx-auto md:mx-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Tổng hợp tin viral từ Facebook, TikTok, X và các diễn đàn. AI tóm tắt để bạn nắm bắt nhanh nhất.
            </motion.p>

            {/* Search Bar */}
            <motion.div
              className="flex justify-center md:justify-start mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <SearchBar onSearch={handleSearch} variant="hero" placeholder="Tìm kiếm tin tức, chủ đề, hashtag..." />
            </motion.div>

            {/* Popular Keywords */}
            <motion.div
              className="flex flex-wrap justify-center md:justify-start gap-2 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <span className="text-sm text-muted-foreground">Hot:</span>
              {popularKeywords.slice(0, 5).map((keyword) => (
                <button
                  key={keyword}
                  onClick={() => handleSearch(keyword)}
                  className="text-sm px-3 py-1 rounded-full bg-secondary hover:bg-secondary/80 text-secondary-foreground transition-colors"
                >
                  {keyword}
                </button>
              ))}
            </motion.div>

            {/* Stats */}
            <motion.div
              className="flex flex-wrap justify-center md:justify-start gap-6 md:gap-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              <div className="flex items-center gap-2 text-muted-foreground">
                <TrendingUp className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">
                  <strong className="text-foreground">1M+</strong> bài phân tích/ngày
                </span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Zap className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">
                  Cập nhật <strong className="text-foreground">realtime</strong>
                </span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: brand visual (desktop) */}
          <div className="hidden md:flex flex-1 justify-center">
            <Link to="/#" className="relative w-full max-w-[620px] hero-chart-card block focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2">
              <div className="chart-header">
                <div>
                  <p className="chart-eyebrow">Powered by Behex</p>
                  <h3 className="chart-title">Sự kiện hot trong 12 giờ qua</h3>
                  <p className="chart-subtitle">Chỉ số nhiệt sự kiện nổi bật (giờ thực, cập nhật liên tục)</p>
                </div>
                <div className="chart-kpi">
                  <div className="chart-kpi-score">{latest.value} điểm</div>
                  <div className="chart-kpi-context">{scoreContext.label}</div>
                  <div className="chart-kpi-delta">{scoreContext.deltaText}</div>
                </div>
              </div>

              <div className="chart-body">
                <ResponsiveContainer width="100%" height={220}>
                  <AreaChart data={chartData} margin={{ left: 0, right: 0, top: 10, bottom: 0 }}>
                    <defs>
                      <linearGradient id="heroArea" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.35} />
                        <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                    <XAxis
                      dataKey="label"
                      tickLine={false}
                      axisLine={false}
                      tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                    />
                    <Tooltip
                      cursor={{ stroke: 'hsl(var(--primary))', strokeWidth: 1, opacity: 0.3 }}
                      content={<CustomTooltip />}
                    />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2.4}
                      fill="url(#heroArea)"
                      dot={{ r: 3, fill: 'hsl(var(--primary))', strokeWidth: 0 }}
                      activeDot={{ r: 5 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="hsla(var(--primary), 0.65)"
                      strokeWidth={1.2}
                      dot={false}
                      strokeDasharray="5 6"
                    />
                  </AreaChart>
                </ResponsiveContainer>

                <div className="chart-kpis">
                  <div className="chart-pill">
                    <span className="dot success" />
                    Sự kiện active: 42
                  </div>
                  <div className="chart-pill">
                    <span className="dot info" />
                    Top tags: #ĐạiHộiĐảng, #BóngĐá, #Vàng
                  </div>
                  <div className="chart-pill">
                    <span className="dot warn" />
                    Peak: 21h (+18%)
                  </div>
                </div>
              </div>

              <div className="hero-noise" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
