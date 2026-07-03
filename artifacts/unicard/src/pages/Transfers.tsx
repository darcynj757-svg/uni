import React, { useState, useEffect } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { ConfirmationModal } from '@/components/ConfirmationModal';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CreditCard, Globe2, Building2, Wallet, ClipboardList, DollarSign, CheckCircle2 } from 'lucide-react';
import { getImage, handleImageError } from '@/data/images';

export default function Transfers() {
  const [amount, setAmount] = useState('1000');
  const [country, setCountry] = useState('turkey');
  const [currency, setCurrency] = useState('EUR');
  const [method, setMethod] = useState('card');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [calc, setCalc] = useState({ commission: 0, total: 0 });

  const methods = [
    { id: 'card', label: 'На карту', icon: CreditCard },
    { id: 'bank', label: 'Банковский перевод', icon: Building2 },
    { id: 'wallet', label: 'Кошелёк', icon: Wallet },
  ];

  const popularDestinations = [
    { name: 'Турция', flag: '🇹🇷', id: 'turkey' },
    { name: 'США', flag: '🇺🇸', id: 'usa' },
    { name: 'ОАЭ', flag: '🇦🇪', id: 'uae' },
    { name: 'Китай', flag: '🇨🇳', id: 'china' },
    { name: 'Казахстан', flag: '🇰🇿', id: 'kz' },
    { name: 'Европа', flag: '🇪🇺', id: 'eu' },
  ];

  useEffect(() => {
    const numAmount = parseFloat(amount) || 0;
    // Mock commission logic: 2% + 50 rub fixed
    const fee = (numAmount * 0.02) + 50;
    setCalc({
      commission: fee,
      total: numAmount + fee
    });
  }, [amount]);

  return (
    <MainLayout>
      <div className="bg-[#F8F9FE] min-h-screen py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Международные <span className="text-gradient">переводы</span></h1>
            <p className="text-secondary-foreground text-lg max-w-2xl mx-auto">
              Быстрые переводы в 50+ стран мира. На карты, банковские счета и электронные кошельки.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            
            {/* Left side - Visuals */}
            <div className="order-2 lg:order-1">
              <div className="relative rounded-3xl overflow-hidden aspect-video mb-8">
                <img
                  src={getImage('travel', 0)}
                  onError={(e) => handleImageError(e, 'unicard-transfers-banner', 1000, 560)}
                  loading="lazy"
                  alt="Международные переводы"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>
                <div className="absolute bottom-5 left-5 text-white">
                  <p className="text-lg font-bold">Переводите деньги куда угодно</p>
                </div>
              </div>

              <h2 className="text-2xl font-bold mb-6">Популярные направления</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-12">
                {popularDestinations.map(dest => (
                  <button 
                    key={dest.id}
                    onClick={() => setCountry(dest.id)}
                    className={`p-4 rounded-2xl flex flex-col items-center gap-2 transition-all bg-white border ${
                      country === dest.id ? 'border-primary shadow-md' : 'border-border hover:border-primary/50 hover:shadow-sm'
                    }`}
                  >
                    <span className="text-3xl">{dest.flag}</span>
                    <span className="font-medium text-sm">{dest.name}</span>
                  </button>
                ))}
              </div>

              <div className="bg-white rounded-[32px] p-8 border border-border shadow-sm">
                <h2 className="text-2xl font-bold mb-6">Как это работает?</h2>
                <div className="space-y-6">
                  {[
                    { step: 1, title: 'Заполните данные', desc: 'Укажите страну, сумму и реквизиты получателя', icon: ClipboardList },
                    { step: 2, title: 'Оплатите перевод', desc: 'С российской карты или через баланс Личного кабинета', icon: DollarSign },
                    { step: 3, title: 'Деньги доставлены', desc: 'Обычно перевод занимает от 5 минут до 1 рабочего дня', icon: CheckCircle2 },
                  ].map((s) => (
                    <div key={s.step} className="flex gap-4">
                      <div className="w-10 h-10 shrink-0 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                        <s.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold">{s.title}</h4>
                        <p className="text-sm text-secondary-foreground">{s.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right side - Form */}
            <div className="order-1 lg:order-2 bg-white rounded-[32px] p-6 md:p-8 border border-border shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10"></div>
              
              <h3 className="text-2xl font-bold mb-6">Отправить деньги</h3>
              
              <div className="space-y-6">
                
                <div className="space-y-3">
                  <label className="text-sm font-medium">Страна и валюта получения</label>
                  <div className="flex gap-2">
                    <Select value={country} onValueChange={setCountry}>
                      <SelectTrigger className="w-[60%] h-14 rounded-2xl bg-secondary/50 border-transparent">
                        <SelectValue placeholder="Выберите страну" />
                      </SelectTrigger>
                      <SelectContent>
                        {popularDestinations.map(d => (
                          <SelectItem key={d.id} value={d.id}>{d.flag} {d.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    
                    <Select value={currency} onValueChange={setCurrency}>
                      <SelectTrigger className="w-[40%] h-14 rounded-2xl bg-secondary/50 border-transparent">
                        <SelectValue placeholder="Валюта" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="EUR">EUR</SelectItem>
                        <SelectItem value="USD">USD</SelectItem>
                        <SelectItem value="TRY">TRY</SelectItem>
                        <SelectItem value="AED">AED</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-medium">Сумма отправления (₽)</label>
                  <div className="relative">
                    <Input 
                      type="number" 
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="h-14 text-xl rounded-2xl bg-secondary/50 border-transparent pr-12"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">₽</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-medium">Способ зачисления</label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {methods.map(m => {
                      const Icon = m.icon;
                      return (
                        <button
                          key={m.id}
                          onClick={() => setMethod(m.id)}
                          className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all ${
                            method === m.id ? 'border-primary bg-primary/5 text-primary' : 'border-border text-secondary-foreground hover:bg-secondary'
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                          <span className="text-xs font-medium text-center">{m.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="bg-[#F8F9FE] p-5 rounded-2xl border border-border">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-secondary-foreground">Сумма перевода</span>
                    <span className="font-medium">{amount || 0} ₽</span>
                  </div>
                  <div className="flex justify-between text-sm mb-4">
                    <span className="text-secondary-foreground flex items-center gap-1">
                      Комиссия сервиса
                    </span>
                    <span className="font-medium">{calc.commission.toFixed(0)} ₽</span>
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t border-border">
                    <span className="font-bold">К списанию</span>
                    <span className="text-2xl font-bold text-primary">{calc.total.toFixed(0)} ₽</span>
                  </div>
                </div>

                <Button 
                  onClick={() => setIsModalOpen(true)}
                  className="w-full h-14 rounded-full text-lg font-bold bg-gradient-gemini text-white shadow-lg hover:shadow-xl transition-all"
                >
                  Продолжить
                </Button>

              </div>
            </div>

          </div>
        </div>
      </div>

      <ConfirmationModal 
        open={isModalOpen} 
        onOpenChange={setIsModalOpen}
        title="Заявка принята!"
        description="Менеджер свяжется с вами для уточнения реквизитов получателя и проведения платежа."
      />
    </MainLayout>
  );
}
