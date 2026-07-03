import React from 'react';
import { Link, useLocation } from 'wouter';
import { useAuth } from '@/context/AuthContext';
import { 
  LayoutDashboard, 
  CreditCard, 
  ShoppingBag, 
  ArrowLeftRight, 
  Shield, 
  Wallet, 
  Settings,
  LogOut,
  Bell
} from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

const navItems = [
  { icon: LayoutDashboard, label: 'Дашборд', href: '/cabinet' },
  { icon: CreditCard, label: 'Мои карты', href: '/cabinet/cards' },
  { icon: ShoppingBag, label: 'Заказы', href: '/cabinet/orders' },
  { icon: ArrowLeftRight, label: 'Транзакции', href: '/cabinet/transactions' },
  { icon: Shield, label: 'Подписки', href: '/cabinet/subscriptions' },
  { icon: Wallet, label: 'Пополнение счёта', href: '/cabinet/topup' },
  { icon: Settings, label: 'Настройки', href: '/cabinet/settings' },
];

export function CabinetLayout({ children }: { children: React.ReactNode }) {
  const [location, setLocation] = useLocation();
  const { user, logout, isLoggedIn } = useAuth();

  // Protect route
  React.useEffect(() => {
    if (!isLoggedIn) {
      setLocation('/cabinet/login');
    }
  }, [isLoggedIn, setLocation]);

  if (!isLoggedIn || !user) return null;

  return (
    <div className="min-h-[100dvh] bg-[#F8F9FE] flex flex-col md:flex-row font-sans">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 bg-white border-r border-border flex-col h-screen sticky top-0">
        <div className="p-6 border-b border-border">
          <Link href="/">
            <span className="font-bold text-2xl tracking-tight text-gradient cursor-pointer block text-center">
              UNICARD
            </span>
          </Link>
        </div>
        
        <div className="p-4 flex-1 overflow-y-auto">
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location === item.href;
              return (
                <Link key={item.href} href={item.href}>
                  <div className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all ${
                    isActive 
                      ? 'bg-primary/10 text-primary font-medium' 
                      : 'text-secondary-foreground hover:bg-secondary'
                  }`}>
                    <Icon className={`w-5 h-5 ${isActive ? 'text-primary' : 'text-secondary-foreground/70'}`} />
                    {item.label}
                  </div>
                </Link>
              );
            })}
          </nav>
        </div>
        
        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-3 mb-4">
            <Avatar className="h-10 w-10 border border-border">
              <AvatarFallback className="bg-gradient-gemini text-white font-medium">
                {user.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="overflow-hidden">
              <p className="text-sm font-medium truncate">{user.name}</p>
              <p className="text-xs text-muted-foreground truncate">{user.email}</p>
            </div>
          </div>
          <Button 
            variant="outline" 
            className="w-full flex items-center justify-center gap-2 text-destructive hover:bg-destructive/10 border-destructive/20 rounded-xl"
            onClick={() => {
              logout();
              setLocation('/');
            }}
          >
            <LogOut className="w-4 h-4" />
            Выйти
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 pb-16 md:pb-0">
        <header className="bg-white border-b border-border h-16 flex items-center justify-between px-4 md:px-8 sticky top-0 z-10">
          <div className="md:hidden">
            <Link href="/">
              <span className="font-bold text-xl tracking-tight text-gradient cursor-pointer">
                UNICARD
              </span>
            </Link>
          </div>
          <div className="hidden md:block font-medium text-lg">
            {navItems.find(i => i.href === location)?.label || 'Личный кабинет'}
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-secondary-foreground hover:bg-secondary rounded-full transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-destructive rounded-full border border-white"></span>
            </button>
            <div className="md:hidden">
              <Avatar className="h-8 w-8 border border-border">
                <AvatarFallback className="bg-gradient-gemini text-white text-xs">
                  {user.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>
        
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          <div className="max-w-5xl mx-auto">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t border-border flex items-center justify-around p-2 z-50 pb-safe">
        {[
          { icon: LayoutDashboard, href: '/cabinet' },
          { icon: CreditCard, href: '/cabinet/cards' },
          { icon: ArrowLeftRight, href: '/cabinet/transactions' },
          { icon: Settings, href: '/cabinet/settings' }
        ].map((item) => {
          const Icon = item.icon;
          const isActive = location === item.href;
          return (
            <Link key={item.href} href={item.href}>
              <div className={`p-3 rounded-full flex flex-col items-center justify-center transition-colors cursor-pointer ${
                isActive ? 'text-primary' : 'text-secondary-foreground/70'
              }`}>
                <Icon className="w-6 h-6" />
                {isActive && <div className="w-1 h-1 bg-primary rounded-full mt-1 absolute bottom-1"></div>}
              </div>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
