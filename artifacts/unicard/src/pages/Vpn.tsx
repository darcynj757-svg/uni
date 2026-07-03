import React, { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { ConfirmationModal } from '@/components/ConfirmationModal';
import { mockVpnPlans, mockVpnLocations } from '@/data/vpn';
import { Button } from '@/components/ui/button';
import { Shield, Zap, Lock, Globe, Server, Download, Check } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function Vpn() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <MainLayout>
      {/* Hero */}
      <section className="bg-[#1a1a2e] text-white pt-20 pb-32 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3"></div>
        <div className="container mx-auto px-4 text-center relative z-10 max-w-4xl">
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-sm font-medium mb-6 backdrop-blur-md">
            <Shield className="w-4 h-4 text-primary" /> Premium VPN
          </span>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Быстрый и безопасный <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4285F4] to-[#9B72CB]">VPN от Unicard</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
            Один аккаунт для всех устройств. WireGuard протокол для максимальной скорости и стабильности. Без логов и блокировок.
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-300">
            <div className="flex items-center gap-2"><Lock className="w-4 h-4 text-primary"/> Без логов</div>
            <div className="flex items-center gap-2"><Server className="w-4 h-4 text-primary"/> До 5 устройств</div>
            <div className="flex items-center gap-2"><Zap className="w-4 h-4 text-primary"/> Скорость до 1 Гбит/с</div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="-mt-16 relative z-20 pb-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mockVpnPlans.map(plan => (
              <div 
                key={plan.id}
                className={`bg-white rounded-3xl p-8 shadow-xl flex flex-col ${
                  plan.id === '12months' ? 'border-2 border-primary relative transform md:-translate-y-4' : 'border border-border'
                }`}
              >
                {plan.badge && (
                  <div className={`absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold text-white ${
                    plan.id === '12months' ? 'bg-gradient-gemini' : 'bg-gray-800'
                  }`}>
                    {plan.badge}
                  </div>
                )}
                
                <h3 className="text-xl font-bold text-center mb-2">{plan.name}</h3>
                <div className="text-center mb-6">
                  <span className="text-4xl font-bold">{plan.price} ₽</span>
                  {plan.perMonth && <span className="text-secondary-foreground"> / мес</span>}
                </div>
                
                <ul className="space-y-4 mb-8 flex-1">
                  {[
                    'Неограниченный трафик',
                    'Все локации доступны',
                    'WireGuard протокол',
                    'Поддержка 24/7'
                  ].map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm">
                      <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 text-green-600" />
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <Button 
                  onClick={() => setIsModalOpen(true)}
                  className={`w-full h-12 rounded-full font-bold ${
                    plan.id === '12months' 
                      ? 'bg-gradient-gemini text-white shadow-lg hover:shadow-xl' 
                      : 'bg-secondary text-foreground hover:bg-secondary/80'
                  }`}
                >
                  Подключить
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Locations */}
      <section className="py-20 bg-[#F8F9FE]">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <Globe className="w-12 h-12 mx-auto mb-4 text-primary" />
          <h2 className="text-3xl font-bold mb-12">Серверы по всему миру</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {mockVpnLocations.map((loc, i) => (
              <div key={i} className="bg-white p-4 rounded-2xl flex items-center justify-center gap-3 shadow-sm border border-border">
                <span className="text-2xl">{loc.emoji}</span>
                <span className="font-medium">{loc.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Apps (Stubs) */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h2 className="text-3xl font-bold mb-12">Приложения для любых устройств</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {['iOS', 'Android', 'Windows', 'macOS'].map(os => (
              <Button key={os} variant="outline" className="h-14 px-8 rounded-full border-border hover:border-primary hover:bg-primary/5 flex items-center gap-2">
                <Download className="w-5 h-5 text-primary" />
                Скачать для {os}
              </Button>
            ))}
          </div>
        </div>
      </section>

      <ConfirmationModal 
        open={isModalOpen} 
        onOpenChange={setIsModalOpen}
        title="Заявка принята!"
        description="Менеджер свяжется с вами для оформления подписки и выдачи конфигов WireGuard."
      />
    </MainLayout>
  );
}
