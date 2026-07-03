import React from 'react';
import { CabinetLayout } from '@/components/layout/CabinetLayout';
import { useAuth } from '@/context/AuthContext';
import { mockTransactions } from '@/data/transactions';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { ArrowUpRight, ArrowDownRight, Plus, RefreshCw, Send, Gamepad2, ShoppingBag, Music, Wifi, MonitorPlay, Cloud, Shield } from 'lucide-react';

const iconMap: Record<string, any> = {
  Gamepad2, ShoppingBag, Music, Send, ArrowDownToLine: ArrowDownRight, Wifi, MonitorPlay, Cloud, Shield
};

export default function Dashboard() {
  const { user } = useAuth();
  if (!user) return null;

  const recentTransactions = mockTransactions.slice(0, 5);

  return (
    <CabinetLayout>
      <h1 className="text-2xl font-bold mb-6">Добрый день, {user.name.split(' ')[0]}!</h1>
      
      {/* Balances */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="bg-white rounded-3xl p-6 border border-border shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/4 group-hover:bg-primary/10 transition-colors"></div>
          <p className="text-secondary-foreground text-sm font-medium mb-1">Баланс ₽</p>
          <h2 className="text-4xl font-bold text-foreground">
            {new Intl.NumberFormat('ru-RU').format(user.balance)} ₽
          </h2>
        </div>
        
        <div className="bg-white rounded-3xl p-6 border border-border shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/4 group-hover:bg-purple-500/10 transition-colors"></div>
          <p className="text-secondary-foreground text-sm font-medium mb-1">Баланс $</p>
          <h2 className="text-4xl font-bold text-foreground">
            ${user.balanceUSD}
          </h2>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex gap-3 overflow-x-auto pb-4 hide-scrollbar mb-8">
        <Link href="/cabinet/topup">
          <Button className="rounded-full bg-foreground text-white hover:bg-primary shrink-0">
            <Plus className="w-4 h-4 mr-2" /> Пополнить счёт
          </Button>
        </Link>
        <Link href="/cards">
          <Button variant="outline" className="rounded-full bg-white shrink-0">
            <CreditCardIcon className="w-4 h-4 mr-2" /> Выпустить карту
          </Button>
        </Link>
        <Link href="/transfers">
          <Button variant="outline" className="rounded-full bg-white shrink-0">
            <Send className="w-4 h-4 mr-2" /> Перевод
          </Button>
        </Link>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-3xl border border-border shadow-sm overflow-hidden">
        <div className="p-6 border-b border-border flex justify-between items-center">
          <h3 className="font-bold text-lg">Последние операции</h3>
          <Link href="/cabinet/transactions">
            <span className="text-sm font-medium text-primary hover:underline cursor-pointer">Все операции</span>
          </Link>
        </div>
        <div className="p-2">
          {recentTransactions.map((tx, idx) => {
            const Icon = iconMap[tx.iconName] || ShoppingBag;
            const isIncome = tx.type === 'income';
            
            return (
              <div key={tx.id} className={`flex items-center justify-between p-4 rounded-2xl hover:bg-secondary/50 transition-colors ${idx !== recentTransactions.length - 1 ? 'border-b border-border' : ''}`}>
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    isIncome ? 'bg-green-100 text-green-600' : 'bg-secondary text-foreground'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-sm">{tx.description}</p>
                    <p className="text-xs text-secondary-foreground">{new Date(tx.date).toLocaleString('ru-RU', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}</p>
                  </div>
                </div>
                <div className={`font-bold ${isIncome ? 'text-green-600' : 'text-foreground'}`}>
                  {isIncome ? '+' : '−'} {tx.amount} ₽
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </CabinetLayout>
  );
}

// Simple fallback icon since we can't import CreditCard twice easily
const CreditCardIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>
);
