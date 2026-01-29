import { Link, useNavigate } from 'react-router-dom';
import { 
  Menu, 
  X, 
  Search,
  Laptop,
  TrendingUp,
  Film,
  Home,
  Zap,
  LogIn,
  UserPlus
} from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SearchBar } from './SearchBar';
import { Logo } from './Logo';
import { AuthDialog } from './AuthDialog';
import { Button } from './ui/button';
import { TopicCategory } from '@/types/post';
import { topicLabels } from '@/data/mockPosts';
import { cn } from '@/lib/utils';

const topics: TopicCategory[] = ['tech', 'finance', 'entertainment', 'society', 'drama'];

// Icon mapping chuyên nghiệp thay vì emoji
const topicIcons: Record<TopicCategory, React.ReactNode> = {
  tech: <Laptop className="h-4 w-4" />,
  finance: <TrendingUp className="h-4 w-4" />,
  entertainment: <Film className="h-4 w-4" />,
  society: <Home className="h-4 w-4" />,
  drama: <Zap className="h-4 w-4" />,
};

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);
  const [authDialogTab, setAuthDialogTab] = useState<'login' | 'register'>('login');
  const navigate = useNavigate();

  const handleSearch = (query: string) => {
    navigate(`/search?q=${encodeURIComponent(query)}`);
    setIsSearchOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full glass-card border-b border-border/50 backdrop-blur-md bg-background/80">
      <div className="container mx-auto px-3 md:px-4">
        <div className="flex items-center justify-between h-12 md:h-16">
          {/* Logo */}
          <Logo size="sm" className="md:hidden" />
          <Logo size="md" className="hidden md:flex" />

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {topics.map((topic) => (
              <Link
                key={topic}
                to={`/topic/${topic}`}
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-all duration-200 group"
              >
                <span className="transition-transform duration-200 group-hover:scale-110">
                  {topicIcons[topic]}
                </span>
                {topicLabels[topic]}
              </Link>
            ))}
          </nav>

          {/* Desktop Search Bar */}
          <div className="hidden md:block flex-1 max-w-sm mx-6">
            <SearchBar onSearch={handleSearch} />
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setAuthDialogTab('login');
                setIsAuthDialogOpen(true);
              }}
              className="text-sm"
            >
              <LogIn className="h-4 w-4 mr-2" />
              Đăng nhập
            </Button>
            <button
              onClick={() => {
                setAuthDialogTab('register');
                setIsAuthDialogOpen(true);
              }}
              className="relative group text-sm font-medium px-4 py-2 h-9 rounded-lg overflow-hidden transition-all duration-300"
            >
              {/* Gradient border glow on hover */}
              <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/30 via-primary/40 to-primary/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
              
              {/* Border with subtle gradient */}
              <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/20 via-primary/30 to-primary/20 opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Background layer */}
              <span className="absolute inset-[1px] rounded-lg bg-background border border-primary/30 group-hover:border-primary/50 transition-all duration-300" />
              
              {/* Content with gradient text */}
              <span className="relative flex items-center gap-2">
                <UserPlus className="h-4 w-4 text-primary group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
                <span className="text-primary font-semibold group-hover:tracking-wide transition-all duration-300">
                  Đăng ký
                </span>
              </span>
            </button>
          </div>

          {/* Mobile Actions */}
          <div className="flex items-center gap-1 md:hidden">
            {/* Mobile Search Toggle */}
            <button
              onClick={() => {
                setIsSearchOpen(!isSearchOpen);
                if (!isSearchOpen) setIsMobileMenuOpen(false);
              }}
              className={cn(
                "p-2 rounded-lg hover:bg-muted transition-colors duration-200",
                isSearchOpen && "bg-muted"
              )}
              aria-label="Toggle search"
            >
              <Search className="h-5 w-5 transition-transform duration-200" strokeWidth={2} />
            </button>
            
            {/* Mobile Menu Toggle */}
            <button
              onClick={() => {
                setIsMobileMenuOpen(!isMobileMenuOpen);
                if (!isMobileMenuOpen) setIsSearchOpen(false);
              }}
              className={cn(
                "p-2 rounded-lg hover:bg-muted transition-colors duration-200",
                isMobileMenuOpen && "bg-muted"
              )}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5 transition-transform duration-200" strokeWidth={2} />
              ) : (
                <Menu className="h-5 w-5 transition-transform duration-200" strokeWidth={2} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search - Slide down when opened */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-border/50 overflow-hidden"
            >
              <div className="px-3 pb-3 pt-2">
                <SearchBar onSearch={handleSearch} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-border/50 overflow-hidden"
          >
            <nav className="container mx-auto px-4 py-4 flex flex-col gap-1">
              {topics.map((topic) => (
                <Link
                  key={topic}
                  to={`/topic/${topic}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-all duration-200 group"
                >
                  <span className="transition-transform duration-200 group-hover:scale-110">
                    {topicIcons[topic]}
                  </span>
                  {topicLabels[topic]}
                </Link>
              ))}
              
              {/* Mobile Auth Buttons */}
              <div className="flex flex-col gap-2 mt-2 pt-2 border-t border-border/50">
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => {
                    setAuthDialogTab('login');
                    setIsAuthDialogOpen(true);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <LogIn className="h-4 w-4 mr-2" />
                  Đăng nhập
                </Button>
                <button
                  onClick={() => {
                    setAuthDialogTab('register');
                    setIsAuthDialogOpen(true);
                    setIsMobileMenuOpen(false);
                  }}
                  className="relative group w-full flex items-center justify-start px-4 py-3 text-sm font-medium rounded-lg overflow-hidden transition-all duration-300"
                >
                  {/* Gradient border glow on hover */}
                  <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/30 via-primary/40 to-primary/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
                  
                  {/* Border with subtle gradient */}
                  <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/20 via-primary/30 to-primary/20 opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Background layer */}
                  <span className="absolute inset-[1px] rounded-lg bg-background border border-primary/30 group-hover:border-primary/50 transition-all duration-300" />
                  
                  {/* Content */}
                  <span className="relative flex items-center gap-2">
                    <UserPlus className="h-4 w-4 text-primary group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
                    <span className="text-primary font-semibold group-hover:tracking-wide transition-all duration-300">
                      Đăng ký
                    </span>
                  </span>
                </button>
              </div>
            </nav>
          </motion.div>
        )}
        </AnimatePresence>

      {/* Auth Dialog */}
      <AuthDialog 
        open={isAuthDialogOpen} 
        onOpenChange={setIsAuthDialogOpen}
        defaultTab={authDialogTab}
      />
    </header>
  );
}
