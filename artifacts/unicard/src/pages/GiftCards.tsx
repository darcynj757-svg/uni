import React, { useState, useEffect } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { ConfirmationModal } from '@/components/ConfirmationModal';
import { mockGiftCards } from '@/data/giftCards';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, LayoutGrid, Gamepad2, Star, Play, ShoppingBag, Tag } from 'lucide-react';
import * as SiIcons from 'react-icons/si';

export default function GiftCards() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('Все');
  const [activePrice, setActivePrice] = useState('Любая');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  const categories = [
    { label: 'Все', icon: LayoutGrid },
    { label: 'Игры', icon: Gamepad2 },
    { label: 'Подписки', icon: Star },
    { label: 'Стриминг', icon: Play },
    { label: 'Шопинг', icon: ShoppingBag },
  ];
  const priceRanges = ['Любая', 'до 1000₽', '1000-3000₽', '3000₽+'];

  const filtered = mockGiftCards.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === 'Все' || c.category === activeCategory;
    let matchesPrice = true;
    if (activePrice === 'до 1000₽') matchesPrice = c.prices[0] < 1000;
    if (activePrice === '1000-3000₽') matchesPrice = c.prices.some(p => p >= 1000 && p <= 3000);
    if (activePrice === '3000₽+') matchesPrice = c.prices.some(p => p > 3000);
    
    return matchesSearch && matchesCategory && matchesPrice;
  });

  const handleBuy = (product: any, amount: number) => {
    setSelectedProduct({ ...product, selectedAmount: amount });
    setIsModalOpen(true);
  };

  return (
    <MainLayout>
      <div className="bg-[#F8F9FE] min-h-screen py-12">
        <div className="container mx-auto px-4">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10">
            <div>
              <h1 className="text-4xl font-bold mb-4 text-gradient">Гифт-карты и подписки</h1>
              <p className="text-secondary-foreground text-lg">Пополняйте баланс и оплачивайте любимые сервисы</p>
            </div>
            <div className="w-full md:w-auto relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input 
                placeholder="Поиск сервиса..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 h-12 w-full md:w-80 rounded-full border-border bg-white"
              />
            </div>
          </div>

          <div className="flex flex-col gap-4 mb-8">
            <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
              {categories.map(c => {
                const Icon = c.icon;
                return (
                  <button
                    key={c.label}
                    onClick={() => setActiveCategory(c.label)}
                    className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                      activeCategory === c.label 
                        ? 'bg-foreground text-white' 
                        : 'bg-white text-secondary-foreground border border-border hover:border-primary'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {c.label}
                  </button>
                );
              })}
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
              {priceRanges.map(p => (
                <button
                  key={p}
                  onClick={() => setActivePrice(p)}
                  className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                    activePrice === p 
                      ? 'bg-primary/10 text-primary border border-primary/20' 
                      : 'bg-white text-secondary-foreground border border-border hover:bg-secondary'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-white rounded-3xl h-64 border border-border animate-pulse"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filtered.map(card => {
                const Icon = (SiIcons as any)[card.logo] || SiIcons.SiSteam;
                return (
                  <div key={card.id} className="bg-white rounded-3xl p-6 border border-border hover:shadow-lg transition-all flex flex-col group">
                    <div className="flex justify-between items-start mb-6">
                      <div className="w-14 h-14 rounded-2xl bg-[#F8F9FE] flex items-center justify-center group-hover:bg-primary/5 transition-colors">
                        <Icon className="w-8 h-8 text-foreground" />
                      </div>
                      <div className="flex gap-1">
                        {card.countries.slice(0, 2).map((c, i) => (
                          <span key={i} className="text-[10px] font-bold px-2 py-1 bg-secondary rounded-full text-secondary-foreground">
                            {c}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <h3 className="font-bold text-xl mb-1">{card.name}</h3>
                    <p className="text-xs text-secondary-foreground mb-6">{card.category}</p>
                    
                    <div className="mt-auto">
                      <div className="flex flex-wrap gap-2 mb-4">
                        {card.prices.slice(0, 3).map((p, i) => (
                          <span key={i} className="text-xs font-medium bg-secondary px-2 py-1 rounded-md">
                            {p} ₽
                          </span>
                        ))}
                        {card.prices.length > 3 && <span className="text-xs font-medium text-muted-foreground self-center">и ещё {card.prices.length - 3}</span>}
                      </div>
                      
                      <Button 
                        onClick={() => handleBuy(card, card.prices[0])}
                        className="w-full rounded-xl bg-foreground hover:bg-primary text-white"
                      >
                        Купить от {card.prices[0]} ₽
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          
          {!isLoading && filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="text-xl text-secondary-foreground">Ничего не найдено. Попробуйте изменить фильтры.</p>
            </div>
          )}

        </div>
      </div>
      
      <ConfirmationModal 
        open={isModalOpen} 
        onOpenChange={setIsModalOpen}
        title="Заказ оформлен!"
        description={`Вы заказали ${selectedProduct?.name} номиналом ${selectedProduct?.selectedAmount} ₽. Менеджер свяжется с вами для выдачи кода.`}
      />
    </MainLayout>
  );
}
