import React, { useState } from 'react';
import { CabinetLayout } from '@/components/layout/CabinetLayout';
import { mockTransactions } from '@/data/transactions';
import { ArrowDownRight, Send, Gamepad2, ShoppingBag, Music, Wifi, MonitorPlay, Cloud, Shield } from 'lucide-react';
import { Input } from '@/components/ui/input';

const iconMap: Record<string, any> = {
  Gamepad2, ShoppingBag, Music, Send, ArrowDownToLine: ArrowDownRight, Wifi, MonitorPlay, Cloud, Shield
};

export default function CabinetTransactions() {
  const [filter, setFilter] = useState('Все');
  
  const filters = ['Все', 'Доход', 'Расход', 'Переводы'];

  const filtered = mockTransactions.filter(tx => {
    if (filter === 'Все') return true;
    if (filter === 'Доход') return tx.type === 'income';
    if (filter === 'Расход') return tx.type === 'expense';
    if (filter === 'Переводы') return tx.type === 'transfer';
    return true;
  });

  return (
    <CabinetLayout>
      <h1 className="text-2xl font-bold mb-6">История транзакций</h1>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar w-full md:w-auto">
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                filter === f 
                  ? 'bg-foreground text-white' 
                  : 'bg-white border border-border text-secondary-foreground hover:bg-secondary'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="flex gap-2 md:ml-auto">
          <Input type="date" className="h-10 rounded-full bg-white border-border w-auto" />
          <span className="self-center text-muted-foreground">—</span>
          <Input type="date" className="h-10 rounded-full bg-white border-border w-auto" />
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-border shadow-sm overflow-hidden">
        <div className="divide-y divide-border">
          {filtered.map((tx) => {
            const Icon = iconMap[tx.iconName] || ShoppingBag;
            const isIncome = tx.type === 'income';
            
            return (
              <div key={tx.id} className="flex items-center justify-between p-4 md:p-6 hover:bg-secondary/30 transition-colors">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${
                    isIncome ? 'bg-green-100 text-green-600' : 'bg-secondary text-foreground'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold">{tx.description}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs font-medium px-2 py-0.5 rounded bg-secondary text-secondary-foreground">
                        {tx.type === 'transfer' ? 'Перевод' : tx.category}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {new Date(tx.date).toLocaleString('ru-RU', { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                </div>
                <div className={`font-bold text-lg whitespace-nowrap ${isIncome ? 'text-green-600' : 'text-foreground'}`}>
                  {isIncome ? '+' : '−'} {new Intl.NumberFormat('ru-RU').format(tx.amount)} ₽
                </div>
              </div>
            );
          })}
        </div>
        {filtered.length === 0 && (
          <div className="p-12 text-center text-secondary-foreground">
            Транзакций не найдено
          </div>
        )}
      </div>
    </CabinetLayout>
  );
}
