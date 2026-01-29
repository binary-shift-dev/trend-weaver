import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Mail, Lock, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AuthDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultTab?: 'login' | 'register';
}

export function AuthDialog({ open, onOpenChange, defaultTab = 'login' }: AuthDialogProps) {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>(defaultTab);

  // Sync activeTab with defaultTab when dialog opens
  useEffect(() => {
    if (open) {
      setActiveTab(defaultTab);
    }
  }, [open, defaultTab]);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [registerForm, setRegisterForm] = useState({ 
    name: '', 
    email: '', 
    password: '', 
    confirmPassword: '' 
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // TODO: Implement login logic
    setTimeout(() => {
      setIsLoading(false);
      console.log('Login:', loginForm);
      onOpenChange(false);
    }, 1000);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (registerForm.password !== registerForm.confirmPassword) {
      alert('Mật khẩu xác nhận không khớp!');
      return;
    }
    setIsLoading(true);
    // TODO: Implement register logic
    setTimeout(() => {
      setIsLoading(false);
      console.log('Register:', registerForm);
      // Switch to login tab after successful registration
      setActiveTab('login');
      setLoginForm({ email: registerForm.email, password: '' });
    }, 1000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md border-primary/20 bg-gradient-to-br from-background via-background to-muted/30">
        {/* Decorative gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 rounded-lg opacity-50 pointer-events-none" />
        
        <DialogHeader className="relative z-10">
          <DialogTitle className="text-2xl text-center font-bold bg-gradient-to-r from-foreground via-foreground to-foreground/80 bg-clip-text text-transparent">
            {activeTab === 'login' ? 'Đăng nhập' : 'Đăng ký'}
          </DialogTitle>
          <DialogDescription className="text-center text-muted-foreground">
            {activeTab === 'login' 
              ? 'Chào mừng trở lại! Vui lòng đăng nhập vào tài khoản của bạn.'
              : 'Tạo tài khoản mới để trải nghiệm đầy đủ tính năng.'}
          </DialogDescription>
        </DialogHeader>

        {/* Tab Switcher - Elegant style */}
        <div className="relative flex gap-2 mb-6 p-1 bg-muted/50 rounded-lg">
          <button
            onClick={() => setActiveTab('login')}
            className={cn(
              "relative flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-300 z-10",
              activeTab === 'login'
                ? "text-primary font-semibold"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {activeTab === 'login' && (
              <span className="absolute inset-0 rounded-md bg-gradient-to-r from-primary/10 via-primary/15 to-primary/10 border border-primary/30" />
            )}
            <span className="relative">Đăng nhập</span>
          </button>
          <button
            onClick={() => setActiveTab('register')}
            className={cn(
              "relative flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-300 z-10",
              activeTab === 'register'
                ? "text-primary font-semibold"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {activeTab === 'register' && (
              <span className="absolute inset-0 rounded-md bg-gradient-to-r from-primary/10 via-primary/15 to-primary/10 border border-primary/30" />
            )}
            <span className="relative">Đăng ký</span>
          </button>
        </div>

        {/* Login Form */}
        {activeTab === 'login' && (
          <form onSubmit={handleLogin} className="space-y-4 relative z-10">
            <div className="space-y-2">
              <Label htmlFor="login-email" className="text-sm font-medium">Email</Label>
              <div className="relative group">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input
                  id="login-email"
                  type="email"
                  placeholder="your@email.com"
                  value={loginForm.email}
                  onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                  className="pl-10 border-border focus-visible:border-primary/50 focus-visible:ring-primary/20 transition-all"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="login-password" className="text-sm font-medium">Mật khẩu</Label>
              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input
                  id="login-password"
                  type="password"
                  placeholder="••••••••"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                  className="pl-10 border-border focus-visible:border-primary/50 focus-visible:ring-primary/20 transition-all"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer group/checkbox">
                <input 
                  type="checkbox" 
                  className="h-4 w-4 rounded border-border text-primary focus:ring-primary/20 focus:ring-2 transition-all cursor-pointer" 
                />
                <span className="text-muted-foreground group-hover/checkbox:text-foreground transition-colors">Ghi nhớ đăng nhập</span>
              </label>
              <button
                type="button"
                className="text-primary/80 hover:text-primary hover:underline transition-colors font-medium"
                onClick={() => {
                  // TODO: Implement forgot password
                  alert('Tính năng quên mật khẩu sẽ được thêm sau');
                }}
              >
                Quên mật khẩu?
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="relative group w-full h-10 rounded-lg overflow-hidden transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {/* Gradient border glow */}
              <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/30 via-primary/40 to-primary/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
              
              {/* Border with gradient */}
              <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/20 via-primary/30 to-primary/20 opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Background */}
              <span className="absolute inset-[1px] rounded-lg bg-background border border-primary/30 group-hover:border-primary/50 transition-all duration-300" />
              
              {/* Content */}
              <span className="relative flex items-center justify-center h-full text-primary font-semibold">
                {isLoading ? 'Đang xử lý...' : 'Đăng nhập'}
              </span>
            </button>
          </form>
        )}

        {/* Register Form */}
        {activeTab === 'register' && (
          <form onSubmit={handleRegister} className="space-y-4 relative z-10">
            <div className="space-y-2">
              <Label htmlFor="register-name" className="text-sm font-medium">Họ và tên</Label>
              <div className="relative group">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input
                  id="register-name"
                  type="text"
                  placeholder="Nguyễn Văn A"
                  value={registerForm.name}
                  onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })}
                  className="pl-10 border-border focus-visible:border-primary/50 focus-visible:ring-primary/20 transition-all"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="register-email" className="text-sm font-medium">Email</Label>
              <div className="relative group">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input
                  id="register-email"
                  type="email"
                  placeholder="your@email.com"
                  value={registerForm.email}
                  onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                  className="pl-10 border-border focus-visible:border-primary/50 focus-visible:ring-primary/20 transition-all"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="register-password" className="text-sm font-medium">Mật khẩu</Label>
              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input
                  id="register-password"
                  type="password"
                  placeholder="••••••••"
                  value={registerForm.password}
                  onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                  className="pl-10 border-border focus-visible:border-primary/50 focus-visible:ring-primary/20 transition-all"
                  required
                  minLength={6}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="register-confirm-password" className="text-sm font-medium">Xác nhận mật khẩu</Label>
              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input
                  id="register-confirm-password"
                  type="password"
                  placeholder="••••••••"
                  value={registerForm.confirmPassword}
                  onChange={(e) => setRegisterForm({ ...registerForm, confirmPassword: e.target.value })}
                  className="pl-10 border-border focus-visible:border-primary/50 focus-visible:ring-primary/20 transition-all"
                  required
                  minLength={6}
                />
              </div>
            </div>

            <div className="flex items-start gap-2 text-sm">
              <input 
                type="checkbox" 
                className="mt-1 h-4 w-4 rounded border-border text-primary focus:ring-primary/20 focus:ring-2 transition-all cursor-pointer" 
                required 
              />
              <label className="text-muted-foreground leading-relaxed">
                Tôi đồng ý với{' '}
                <a href="#" className="text-primary/80 hover:text-primary hover:underline transition-colors font-medium">
                  Điều khoản sử dụng
                </a>
                {' '}và{' '}
                <a href="#" className="text-primary/80 hover:text-primary hover:underline transition-colors font-medium">
                  Chính sách bảo mật
                </a>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="relative group w-full h-10 rounded-lg overflow-hidden transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {/* Gradient border glow */}
              <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/30 via-primary/40 to-primary/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
              
              {/* Border with gradient */}
              <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/20 via-primary/30 to-primary/20 opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Background */}
              <span className="absolute inset-[1px] rounded-lg bg-background border border-primary/30 group-hover:border-primary/50 transition-all duration-300" />
              
              {/* Content */}
              <span className="relative flex items-center justify-center h-full text-primary font-semibold">
                {isLoading ? 'Đang xử lý...' : 'Đăng ký'}
              </span>
            </button>
          </form>
        )}

        {/* Social Login */}
        <div className="relative mt-6 z-10">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border/50" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-3 text-muted-foreground font-medium">Hoặc tiếp tục với</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-4 relative z-10">
          <button
            type="button"
            className="relative group flex items-center justify-center w-full h-10 rounded-lg border border-border hover:border-primary/30 transition-all duration-300 bg-background hover:bg-muted/50"
          >
            <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            <span className="text-sm font-medium text-foreground">Google</span>
          </button>
          <button
            type="button"
            className="relative group flex items-center justify-center w-full h-10 rounded-lg border border-border hover:border-primary/30 transition-all duration-300 bg-background hover:bg-muted/50"
          >
            <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            <span className="text-sm font-medium text-foreground">Facebook</span>
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
