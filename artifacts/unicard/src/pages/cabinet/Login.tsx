import React, { useState } from 'react';
import { useLocation, Link } from 'wouter';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SiTelegram } from 'react-icons/si';
import { Eye, EyeOff } from 'lucide-react';

export default function Login() {
  const [location, setLocation] = useLocation();
  const { login } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      login();
      setLocation('/cabinet');
    }
  };

  return (
    <div className="min-h-screen bg-[#1a1a2e] flex items-center justify-center relative overflow-hidden font-sans p-4">
      {/* Aurora Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-[#4285F4] via-[#9B72CB] to-[#D96570] rounded-full blur-[150px] opacity-20 pointer-events-none"></div>
      
      <div className="bg-white rounded-[32px] p-8 md:p-12 w-full max-w-md relative z-10 shadow-2xl">
        <div className="text-center mb-8">
          <Link href="/">
            <span className="font-bold text-3xl tracking-tight text-gradient cursor-pointer inline-block mb-6">
              UNICARD
            </span>
          </Link>
          <h1 className="text-2xl font-bold text-foreground">Добро пожаловать!</h1>
          <p className="text-secondary-foreground text-sm mt-2">Войдите, чтобы управлять финансами</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 mb-6">
          <div>
            <Input 
              type="email" 
              placeholder="Email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-14 rounded-2xl bg-secondary/50 border-transparent px-4"
              required
            />
          </div>
          <div className="relative">
            <Input 
              type={showPassword ? 'text' : 'password'} 
              placeholder="Пароль" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-14 rounded-2xl bg-secondary/50 border-transparent px-4 pr-12"
              required
            />
            <button 
              type="button"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          <div className="text-right">
            <a href="#" className="text-sm text-primary font-medium hover:underline">Забыли пароль?</a>
          </div>
          <Button type="submit" className="w-full h-14 rounded-full text-lg font-bold bg-gradient-gemini text-white shadow-lg">
            Войти
          </Button>
        </form>

        <div className="relative flex items-center py-4 mb-6">
          <div className="flex-grow border-t border-border"></div>
          <span className="flex-shrink-0 mx-4 text-muted-foreground text-sm">или</span>
          <div className="flex-grow border-t border-border"></div>
        </div>

        <Button 
          type="button" 
          variant="outline" 
          className="w-full h-14 rounded-full border-2 text-foreground font-semibold flex items-center justify-center gap-2 hover:bg-[#F4F9FF] hover:border-[#2AABEE] hover:text-[#2AABEE] transition-colors"
          onClick={() => {
            console.log('Telegram login stub');
            login();
            setLocation('/cabinet');
          }}
        >
          <SiTelegram className="w-5 h-5 text-[#2AABEE]" />
          Войти через Telegram
        </Button>

        <p className="text-center text-sm text-secondary-foreground mt-8">
          Нет аккаунта? <a href="#" className="text-primary font-bold hover:underline">Зарегистрироваться</a>
        </p>
      </div>
    </div>
  );
}
