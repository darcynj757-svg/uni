import React, { useState } from 'react';
import { CabinetLayout } from '@/components/layout/CabinetLayout';
import { ConfirmationModal } from '@/components/ConfirmationModal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { QrCode, CreditCard, Bitcoin } from 'lucide-react';

export default function CabinetTopup() {
  const [method, setMethod] = useState('sbp');
  const [amount, setAmount] = useState('1000');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const methods = [
    { id: 'sbp', label: 'СБП (QR-код)', icon: QrCode, fee: '0%' },
    { id: 'crypto', label: 'Крипто USDT', icon: Bitcoin, fee: '0%' },
    { id: 'card', label: 'Банковская карта', icon: CreditCard, fee: '2%' }
  ];

  return (
    <CabinetLayout>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Пополнение счёта</h1>

        <div className="bg-white rounded-[32px] p-6 md:p-10 border border-border shadow-sm">
          
          <div className="mb-8">
            <h3 className="font-bold text-lg mb-4">Выберите способ</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {methods.map(m => {
                const Icon = m.icon;
                return (
                  <button
                    key={m.id}
                    onClick={() => setMethod(m.id)}
                    className={`p-4 rounded-2xl border-2 flex flex-col items-center justify-center gap-2 transition-all ${
                      method === m.id 
                        ? 'border-primary bg-primary/5 text-primary' 
                        : 'border-border text-secondary-foreground hover:border-primary/30'
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                    <span className="font-medium text-sm text-foreground">{m.label}</span>
                    <span className="text-xs bg-secondary px-2 py-0.5 rounded text-secondary-foreground">Ком. {m.fee}</span>
                  </button>
                )
              })}
            </div>
          </div>

          <div className="mb-8">
            <h3 className="font-bold text-lg mb-4">Сумма в рублях</h3>
            <div className="relative">
              <Input 
                type="number" 
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="h-16 text-2xl font-bold rounded-2xl bg-secondary/50 border-transparent pr-12 text-center"
              />
              <span className="absolute right-6 top-1/2 -translate-y-1/2 text-2xl text-muted-foreground font-medium">₽</span>
            </div>
            <div className="flex justify-center gap-2 mt-4">
              {[1000, 5000, 10000].map(val => (
                <button
                  key={val}
                  onClick={() => setAmount(val.toString())}
                  className="px-4 py-1.5 rounded-full bg-secondary text-sm font-medium hover:bg-secondary/80 transition-colors"
                >
                  {val} ₽
                </button>
              ))}
            </div>
          </div>

          {/* Dynamic Content Based on Method */}
          <div className="bg-[#F8F9FE] p-6 rounded-2xl border border-border mb-8 text-center min-h-[200px] flex flex-col items-center justify-center">
            {method === 'sbp' && (
              <>
                <div className="w-32 h-32 bg-white rounded-xl border border-border flex items-center justify-center mb-4 p-2 shadow-sm">
                  <div className="w-full h-full bg-[url('https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=unicard_stub')] bg-contain bg-center bg-no-repeat opacity-80"></div>
                </div>
                <p className="font-bold">Отсканируйте QR-код в приложении банка</p>
                <p className="text-sm text-secondary-foreground mt-1">Оплата зачислится моментально</p>
              </>
            )}

            {method === 'crypto' && (
              <>
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm text-primary">
                  <Bitcoin className="w-6 h-6" />
                </div>
                <p className="font-bold mb-2">Отправьте USDT (TRC-20)</p>
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-border">
                  <code className="text-sm font-mono">TXXXXXXXXXXXXX_STUB_ADDRESS</code>
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0 rounded-md">Коп.</Button>
                </div>
                <p className="text-xs text-secondary-foreground mt-4 max-w-xs">
                  Сумма в крипте будет рассчитана по актуальному курсу Binance +2% в момент зачисления (обычно 2-5 минут).
                </p>
              </>
            )}

            {method === 'card' && (
              <div className="w-full max-w-sm text-left">
                <div className="space-y-4">
                  <Input placeholder="Номер карты" className="h-12 rounded-xl bg-white border-border" />
                  <div className="flex gap-4">
                    <Input placeholder="MM/YY" className="h-12 rounded-xl bg-white border-border flex-1" />
                    <Input placeholder="CVC" className="h-12 rounded-xl bg-white border-border flex-1" />
                  </div>
                </div>
              </div>
            )}
          </div>

          <Button 
            onClick={() => setIsModalOpen(true)}
            className="w-full h-14 rounded-full text-lg font-bold bg-foreground text-white shadow-lg hover:bg-primary transition-all"
          >
            {method === 'card' ? `Оплатить ${amount} ₽` : 'Я оплатил'}
          </Button>

        </div>
      </div>

      <ConfirmationModal 
        open={isModalOpen} 
        onOpenChange={setIsModalOpen}
        title="Ожидаем поступления"
        description="Деньги поступят на ваш баланс в течение нескольких минут после подтверждения сети или банка."
      />
    </CabinetLayout>
  );
}
