import React, { useState, useEffect } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { ConfirmationModal } from '@/components/ConfirmationModal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Server, Globe, Shield, Terminal, Home, Smartphone, Database, Network, Search, Users, Megaphone, Share2, TrendingUp, MapPin } from 'lucide-react';

export default function Proxy() {
  const [type, setType] = useState('Резидентные');
  const [country, setCountry] = useState('any');
  const [count, setCount] = useState('1');
  const [duration, setDuration] = useState('30');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [total, setTotal] = useState(0);

  const types = [
    { id: 'Резидентные', basePrice: 350, icon: Home },
    { id: 'Мобильные', basePrice: 500, icon: Smartphone },
    { id: 'Datacenter IPv4', basePrice: 150, icon: Server },
    { id: 'IPv6', basePrice: 50, icon: Network },
  ];

  const durations = [
    { label: '7 дней', value: '7', mult: 0.3 },
    { label: '30 дней', value: '30', mult: 1 },
    { label: '90 дней', value: '90', mult: 2.7 }, // 10% discount
  ];

  useEffect(() => {
    const qty = parseInt(count) || 1;
    const activeType = types.find(t => t.id === type) || types[0];
    const activeDuration = durations.find(d => d.value === duration) || durations[1];
    
    setTotal(Math.round(activeType.basePrice * qty * activeDuration.mult));
  }, [type, count, duration]);

  const useCases = [
    { label: 'Парсинг', icon: Search },
    { label: 'Мультиаккаунты', icon: Users },
    { label: 'Реклама', icon: Megaphone },
    { label: 'SMM', icon: Share2 },
    { label: 'SEO', icon: TrendingUp },
    { label: 'Георазблокировка', icon: MapPin },
  ];

  return (
    <MainLayout>
      <div className="bg-[#F8F9FE] min-h-screen py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Unicard <span className="text-gradient">Proxy</span></h1>
            <p className="text-secondary-foreground text-lg max-w-2xl mx-auto">
              Надежные приватные прокси для любых задач. HTTP/SOCKS5.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            
            {/* Configurator */}
            <div className="lg:col-span-2 space-y-6">
              
              <div className="bg-white p-6 md:p-8 rounded-[32px] border border-border shadow-sm">
                <h3 className="font-bold text-lg mb-4">1. Тип прокси</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {types.map(t => {
                    const Icon = t.icon;
                    return (
                      <button
                        key={t.id}
                        onClick={() => setType(t.id)}
                        className={`p-4 rounded-2xl border-2 text-sm font-medium transition-all text-center flex flex-col items-center gap-2 ${
                          type === t.id 
                            ? 'border-primary bg-primary/5 text-primary' 
                            : 'border-border text-secondary-foreground hover:border-primary/30'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        {t.id}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="bg-white p-6 md:p-8 rounded-[32px] border border-border shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-bold text-lg mb-4">2. Локация</h3>
                    <Select value={country} onValueChange={setCountry}>
                      <SelectTrigger className="h-14 rounded-2xl bg-secondary/50 border-transparent">
                        <SelectValue placeholder="Выберите страну" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Любая (Случайно)</SelectItem>
                        <SelectItem value="us">🇺🇸 США</SelectItem>
                        <SelectItem value="uk">🇬🇧 Великобритания</SelectItem>
                        <SelectItem value="de">🇩🇪 Германия</SelectItem>
                        <SelectItem value="nl">🇳🇱 Нидерланды</SelectItem>
                        <SelectItem value="ru">🇷🇺 Россия</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-4">3. Количество IP</h3>
                    <Input 
                      type="number" 
                      value={count}
                      onChange={(e) => setCount(e.target.value)}
                      min="1"
                      max="100"
                      className="h-14 rounded-2xl bg-secondary/50 border-transparent text-lg"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 md:p-8 rounded-[32px] border border-border shadow-sm">
                <h3 className="font-bold text-lg mb-4">4. Срок аренды</h3>
                <div className="flex gap-3">
                  {durations.map(d => (
                    <button
                      key={d.value}
                      onClick={() => setDuration(d.value)}
                      className={`flex-1 p-4 rounded-2xl border-2 font-bold transition-all text-center ${
                        duration === d.value 
                          ? 'border-primary bg-primary/5 text-primary' 
                          : 'border-border text-secondary-foreground hover:border-primary/30'
                      }`}
                    >
                      {d.label}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white p-6 md:p-8 rounded-[32px] border border-border shadow-xl sticky top-24">
                <h3 className="font-bold text-xl mb-6">Ваш заказ</h3>
                
                <div className="space-y-4 text-sm mb-6 pb-6 border-b border-border">
                  <div className="flex justify-between">
                    <span className="text-secondary-foreground">Тип</span>
                    <span className="font-medium text-right">{type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-secondary-foreground">Количество</span>
                    <span className="font-medium">{count} шт.</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-secondary-foreground">Срок</span>
                    <span className="font-medium">{durations.find(d => d.value === duration)?.label}</span>
                  </div>
                </div>

                <div className="flex justify-between items-end mb-8">
                  <span className="font-bold text-lg">К оплате:</span>
                  <span className="text-4xl font-bold text-primary">{total} ₽</span>
                </div>

                <Button 
                  onClick={() => setIsModalOpen(true)}
                  className="w-full h-14 rounded-full text-lg font-bold bg-gradient-gemini text-white shadow-lg hover:shadow-xl transition-all"
                >
                  Купить прокси
                </Button>
              </div>
            </div>

          </div>

          {/* Use Cases */}
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-6">Идеально подходит для:</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {useCases.map(uc => {
                const Icon = uc.icon;
                return (
                  <div key={uc.label} className="bg-white px-5 py-2.5 rounded-full border border-border text-secondary-foreground shadow-sm flex items-center gap-2">
                    <Icon className="w-4 h-4 text-primary" />
                    {uc.label}
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>

      <ConfirmationModal 
        open={isModalOpen} 
        onOpenChange={setIsModalOpen}
        title="Заказ оформлен!"
        description="Менеджер свяжется с вами для выдачи списка прокси и данных для доступа."
      />
    </MainLayout>
  );
}
