import { Link } from 'react-router-dom';

interface LogoProps {
  showText?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function Logo({ showText = true, className = '', size = 'md' }: LogoProps) {
  const sizeClasses = {
    sm: {
      icon: 'h-6 w-6',
      text: 'text-base',
    },
    md: {
      icon: 'h-8 w-8',
      text: 'text-xl',
    },
    lg: {
      icon: 'h-10 w-10',
      text: 'text-2xl',
    },
  };

  const currentSize = sizeClasses[size];

  return (
    <Link to="/" className={`flex items-center gap-2.5 group ${className}`}>
      <div className="relative">
        {/* Logo image */}
        <img
          src="/diemtrend_icon.svg"
          alt="Điểm Trend Logo"
          className={`
            ${currentSize.icon}
            transition-all duration-300 
            group-hover:scale-110 
            drop-shadow-lg
            group-hover:drop-shadow-xl
          `}
        />
        
        {/* Pulse effect on hover */}
        <div className="absolute inset-0 rounded-full bg-primary/20 opacity-0 group-hover:opacity-100 blur-lg transition-opacity duration-300 -z-10" />
      </div>
      
      {showText && (
        <span className={`
          font-display font-bold text-foreground tracking-tight 
          transition-colors duration-200 
          group-hover:text-primary
          ${currentSize.text}
        `}>
          Điểm Trend
        </span>
      )}
    </Link>
  );
}
