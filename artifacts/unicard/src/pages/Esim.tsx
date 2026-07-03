import React, { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { ConfirmationModal } from '@/components/ConfirmationModal';
import { mockEsim } from '@/data/esim';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Globe2, Signal, Zap } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

export default function Esim() {
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('Страны');
  const [selectedCountry, setSelectedCountry] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const tabs = ['Страны', 'Регионы', 'Глобальный'];

  const filteredCountries = mockEsim.filter(c => 
    c.country.toLowerCase().includes(search.toLowerCase())
  );

  const handleBuy = (country: any, plan: any) => {
    setSelectedCountry(null);
    setIsModalOpen(true);
  };

  return (
    <MainLayout>
      <div className="bg-[#F8F9FE] min-h-screen py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          
          {/* Hero */}
          <div className="bg-gradient-gemini rounded-[32px] p-8 md:p-12 text-white mb-12 flex flex-col md:flex-row items-center justify-between overflow-hidden relative">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 blur-[100px] rounded-full"></div>
            <div className="relative z-10 md:w-2/3">
              <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-sm font-medium mb-4 backdrop-blur-sm">Новинка</span>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">Безлимитный интернет <br/>в 150+ странах</h1>
              <p className="text-white/90 text-lg mb-8 max-w-md">Моментальная доставка QR-кода на email. Никакого роуминга и скрытых платежей.</p>
              <div className="flex gap-4">
                <div className="flex items-center gap-2"><Globe2 className="w-5 h-5"/> 150 стран</div>
                <div className="flex items-center gap-2"><Signal className="w-5 h-5"/> 5G / 4G</div>
                <div className="flex items-center gap-2"><Zap className="w-5 h-5"/> Мгновенно</div>
              </div>
            </div>
            <div className="hidden md:block relative z-10">
              <div className="w-48 h-64 bg-white/10 backdrop-blur-md border border-white/20 rounded-[32px] p-6 shadow-2xl transform rotate-12">
                <div className="w-full h-full border border-dashed border-white/30 rounded-2xl flex items-center justify-center">
                  <div className="text-center">
                    <span className="text-4xl block mb-2">📲</span>
                    <span className="font-bold text-sm">Scan to install</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
            <div className="bg-white p-1 rounded-full flex shadow-sm border border-border w-full md:w-auto">
              {tabs.map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 md:flex-none px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
                    activeTab === tab ? 'bg-primary text-white shadow' : 'text-secondary-foreground hover:bg-secondary'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            
            {activeTab === 'Страны' && (
              <div className="w-full md:w-80 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input 
                  placeholder="Поиск страны..." 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10 h-12 w-full rounded-full border-border bg-white shadow-sm"
                />
              </div>
            )}
          </div>

          {/* Content */}
          {activeTab === 'Страны' && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {filteredCountries.map(c => (
                <div 
                  key={c.id} 
                  onClick={() => setSelectedCountry(c)}
                  className="bg-white p-5 rounded-3xl border border-border hover:border-primary hover:shadow-md transition-all cursor-pointer flex flex-col items-center justify-center text-center gap-3 group"
                >
                  <span className="text-5xl transform group-hover:scale-110 transition-transform">{c.emoji}</span>
                  <div>
                    <h3 className="font-bold text-foreground">{c.country}</h3>
                    <p className="text-xs text-secondary-foreground mt-1 bg-secondary px-2 py-1 rounded-md inline-block">от {c.priceFrom} ₽</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'Регионы' && (
            <div className="text-center py-20 text-secondary-foreground">
              <Globe2 className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
              <h2 className="text-2xl font-bold mb-2 text-foreground">Региональные пакеты</h2>
              <p>Раздел в разработке. Скоро появятся пакеты "Европа", "Азия" и другие.</p>
            </div>
          )}

          {activeTab === 'Глобальный' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div className="bg-white p-8 rounded-[32px] border border-border shadow-sm">
                <div className="w-16 h-16 bg-gradient-gemini rounded-2xl flex items-center justify-center text-white mb-6">
                  <Globe2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Global 10GB</h3>
                <p className="text-secondary-foreground mb-6">Действует в 130 странах. Идеально для путешествий с пересадками.</p>
                <div className="flex items-center gap-4 mb-8">
                  <div className="bg-secondary px-4 py-2 rounded-xl text-sm font-medium">10 GB</div>
                  <div className="bg-secondary px-4 py-2 rounded-xl text-sm font-medium">30 дней</div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-3xl font-bold">4 500 ₽</span>
                  <Button onClick={() => setIsModalOpen(true)} className="rounded-full px-8 bg-foreground">Купить</Button>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Country Details Dialog */}
      <Dialog open={!!selectedCountry} onOpenChange={() => setSelectedCountry(null)}>
        <DialogContent className="sm:max-w-md rounded-3xl p-0 overflow-hidden border-border">
          {selectedCountry && (
            <div>
              <div className="bg-[#F8F9FE] p-8 text-center border-b border-border">
                <span className="text-6xl mb-4 block">{selectedCountry.emoji}</span>
                <DialogTitle className="text-3xl font-bold">{selectedCountry.country}</DialogTitle>
                <p className="text-secondary-foreground mt-2">Выберите подходящий тариф</p>
              </div>
              <div className="p-6 bg-white space-y-4 max-h-[60vh] overflow-y-auto">
                {selectedCountry.plans.map((plan: any, i: number) => (
                  <div key={i} className="border border-border rounded-2xl p-4 flex items-center justify-between hover:border-primary transition-colors">
                    <div>
                      <div className="font-bold text-lg">{plan.gb} GB</div>
                      <div className="text-sm text-secondary-foreground">{plan.days} дней</div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="font-bold text-xl">{plan.price} ₽</div>
                      <Button onClick={() => handleBuy(selectedCountry, plan)} className="rounded-full bg-primary text-white px-6">
                        Купить
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <ConfirmationModal 
        open={isModalOpen} 
        onOpenChange={setIsModalOpen}
        title="eSIM заказана!"
        description="Менеджер свяжется с вами для выдачи QR-кода и инструкций по активации."
      />
    </MainLayout>
  );
}
