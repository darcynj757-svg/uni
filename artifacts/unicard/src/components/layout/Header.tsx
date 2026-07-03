import React from 'react';
import { Link, useLocation } from 'wouter';
import { useAuth } from '@/context/AuthContext';
import { Menu, X, CreditCard, Gift, Gamepad2, Zap, ArrowRightLeft, Signal, Shield, Server } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Header() {
  const [location] = useLocation();
  const { isLoggedIn } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navLinks = [
    { label: 'Карты', href: '/cards', icon: CreditCard },
    { label: 'Гифт-карты', href: '/gift-cards', icon: Gift },
    { label: 'Игры', href: '/games', icon: Gamepad2 },
    { label: 'Пополнение', href: '/recharge', icon: Zap },
    { label: 'Переводы', href: '/transfers', icon: ArrowRightLeft },
    { label: 'eSIM', href: '/esim', icon: Signal },
    { label: 'VPN', href: '/vpn', icon: Shield },
    { label: 'Прокси', href: '/proxy', icon: Server },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-border shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="font-bold text-2xl tracking-tight text-gradient cursor-pointer">
            UNICARD
          </Link>
          
          <nav className="hidden md:flex items-center gap-5">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = location === link.href;
              return (
                <Link key={link.href} href={link.href}>
                  <span className={`flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-primary cursor-pointer ${active ? 'text-primary' : 'text-secondary-foreground/80'}`}>
                    <Icon className={`w-3.5 h-3.5 ${active ? 'text-primary' : 'text-muted-foreground'}`} />
                    {link.label}
                  </span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary text-sm font-medium border border-border">
            <span>🇷🇺</span>
            <span>RU</span>
          </div>
          <Link href={isLoggedIn ? '/cabinet' : '/cabinet/login'}>
            <Button className="rounded-full bg-gradient-gemini hover:opacity-90 text-white font-medium border-0 shadow-md">
              Личный кабинет
            </Button>
          </Link>
        </div>

        <button 
          className="md:hidden p-2 text-foreground"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-white border-b border-border shadow-lg py-4 px-4 flex flex-col gap-4 z-50">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link key={link.href} href={link.href}>
                <span 
                  className="flex items-center gap-3 text-lg font-medium py-2 border-b border-secondary/50 cursor-pointer"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Icon className="w-5 h-5 text-primary" />
                  {link.label}
                </span>
              </Link>
            );
          })}
          <div className="flex flex-col gap-4 mt-4">
            <Link href={isLoggedIn ? '/cabinet' : '/cabinet/login'}>
              <Button 
                className="w-full rounded-full bg-gradient-gemini hover:opacity-90 text-white font-medium border-0"
                onClick={() => setMobileMenuOpen(false)}
              >
                Личный кабинет
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
