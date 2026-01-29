import { Facebook, Twitter, MessageSquare, Flame } from 'lucide-react';
import { Platform } from '@/types/post';
import { cn } from '@/lib/utils';

interface PlatformIconProps {
  platform: Platform;
  size?: 'sm' | 'md' | 'lg';
  showBackground?: boolean;
  className?: string;
}

const platformConfig: Record<Platform, { icon: typeof Facebook; label: string; colorClass: string }> = {
  facebook: { icon: Facebook, label: 'Facebook', colorClass: 'text-platform-facebook' },
  twitter: { icon: Twitter, label: 'X (Twitter)', colorClass: 'text-platform-twitter' },
  tiktok: { icon: Flame, label: 'TikTok', colorClass: 'text-platform-tiktok' },
  forum: { icon: MessageSquare, label: 'Diễn đàn', colorClass: 'text-platform-forum' },
};

const sizeConfig = {
  sm: 14,
  md: 18,
  lg: 24,
};

export function PlatformIcon({ platform, size = 'md', showBackground = false, className }: PlatformIconProps) {
  const config = platformConfig[platform];
  const Icon = config.icon;

  if (showBackground) {
    return (
      <div
        className={cn(
          'inline-flex items-center justify-center rounded-full bg-secondary',
          size === 'sm' && 'h-6 w-6',
          size === 'md' && 'h-8 w-8',
          size === 'lg' && 'h-10 w-10',
          className
        )}
        title={config.label}
      >
        <Icon size={sizeConfig[size] - 4} className={config.colorClass} />
      </div>
    );
  }

  return (
    <span title={config.label}>
      <Icon
        size={sizeConfig[size]}
        className={cn(config.colorClass, className)}
      />
    </span>
  );
}
