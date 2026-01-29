import { useState } from 'react';
import { Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  variant?: 'hero' | 'header';
  className?: string;
}

export function SearchBar({ 
  onSearch, 
  placeholder = 'Tìm kiếm tin tức, chủ đề...', 
  variant = 'header',
  className 
}: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  const handleClear = () => {
    setQuery('');
  };

  const isHero = variant === 'hero';

  return (
    <motion.form
      onSubmit={handleSubmit}
      className={cn(
        'relative flex items-center w-full transition-all duration-300',
        isHero ? 'max-w-xl' : 'max-w-sm',
        className
      )}
      animate={{
        scale: isFocused ? 1.01 : 1,
      }}
      transition={{ duration: 0.2 }}
    >
      <div
        className={cn(
          'relative flex items-center w-full rounded-full border transition-all duration-300',
          isHero 
            ? 'glass-card shadow-card px-5 py-3.5' 
            : 'bg-secondary/50 px-4 py-2',
          isFocused 
            ? 'border-primary/50 shadow-hover' 
            : 'border-border hover:border-primary/30'
        )}
      >
        <Search 
          className={cn(
            'shrink-0 transition-colors duration-200',
            isFocused ? 'text-primary' : 'text-muted-foreground',
            isHero ? 'h-5 w-5' : 'h-4 w-4'
          )}
        />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className={cn(
            'flex-1 bg-transparent border-none outline-none placeholder:text-muted-foreground',
            isHero ? 'ml-3 text-base' : 'ml-3 text-sm'
          )}
        />
        <AnimatePresence>
          {query && (
            <motion.button
              type="button"
              onClick={handleClear}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="shrink-0 p-1 rounded-full hover:bg-muted transition-colors"
            >
              <X className="h-4 w-4 text-muted-foreground" />
            </motion.button>
          )}
        </AnimatePresence>
        {isHero && (
          <motion.button
            type="submit"
            className="ml-2 px-5 py-2 bg-primary text-primary-foreground rounded-full font-medium text-sm hover:opacity-90 transition-opacity"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Tìm kiếm
          </motion.button>
        )}
      </div>
    </motion.form>
  );
}
