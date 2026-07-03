import React, { useState, useEffect } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { ConfirmationModal } from '@/components/ConfirmationModal';
import { mockGames } from '@/data/games';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Gamepad2, User, Package, ChevronRight } from 'lucide-react';

export default function Recharge() {
  const searchParams = new URLSearchParams(window.location.search);
  const initialGameId = searchParams.get('game');
  
  const [selectedGame, setSelectedGame] = useState<any>(
    initialGameId ? mockGames.find(g => g.id === initialGameId) || mockGames[0] : mockGames[0]
  );
  
  const [playerId, setPlayerId] = useState('');
  const [amount, setAmount] = useState(60);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fake packages based on selected game
  const packages = [
    { uc: 60, rub: 60 },
    { uc: 300, rub: 290 },
    { uc: 600, rub: 550 },
    { uc: 1500, rub: 1400 },
    { uc: 3000, rub: 2750 },
    { uc: 6000, rub: 5200 },
  ];

  return (
    <MainLayout>
      <div className="min-h-screen bg-[#F8F9FE] py-12">
        <div className="container mx-auto px-4 max-w-5xl">
          
          <h1 className="text-3xl font-bold mb-8 flex items-center gap-3">
            <Gamepad2 className="w-8 h-8 text-primary" /> Прямое пополнение
          </h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Form Column */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white p-6 rounded-3xl border border-border shadow-sm">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><Gamepad2 className="w-5 h-5 text-primary" /> 1. Выберите игру</h3>
                <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
                  {mockGames.slice(0, 10).map(g => (
                    <button
                      key={g.id}
                      onClick={() => setSelectedGame(g)}
                      className={`shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                        selectedGame.id === g.id 
                          ? 'bg-primary text-white' 
                          : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                      }`}
                    >
                      {g.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-border shadow-sm">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><User className="w-5 h-5 text-primary" /> 2. Введите ID игрока</h3>
                <Input 
                  placeholder="Например: 5123456789" 
                  value={playerId}
                  onChange={(e) => setPlayerId(e.target.value)}
                  className="h-14 rounded-2xl text-lg bg-secondary/50 border-transparent focus:bg-white"
                />
                <p className="text-xs text-muted-foreground mt-2">ID можно найти в профиле игры под аватаром.</p>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-border shadow-sm">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><Package className="w-5 h-5 text-primary" /> 3. Выберите пакет</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {packages.map((pkg, i) => (
                    <button
                      key={i}
                      onClick={() => setAmount(pkg.rub)}
                      className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center justify-center gap-1 ${
                        amount === pkg.rub 
                          ? 'border-primary bg-primary/5' 
                          : 'border-border hover:border-primary/30'
                      }`}
                    >
                      <span className="font-bold text-lg text-foreground">{pkg.uc}</span>
                      <span className="text-xs text-secondary-foreground">Валюты</span>
                      <span className="mt-2 text-sm font-bold bg-secondary px-3 py-1 rounded-full">{pkg.rub} ₽</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Summary Column */}
            <div className="lg:col-span-1">
              <div className="bg-white p-6 rounded-3xl border border-border shadow-sm sticky top-24">
                <div className="flex items-center gap-4 mb-6 border-b border-border pb-6">
                  <div className="w-16 h-16 bg-gradient-gemini rounded-2xl p-[1px]">
                    <div className="w-full h-full bg-white rounded-[15px] flex items-center justify-center font-bold text-2xl text-primary">
                      {selectedGame.name.charAt(0)}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg leading-tight">{selectedGame.name}</h4>
                    <p className="text-sm text-secondary-foreground">Мгновенное пополнение</p>
                  </div>
                </div>

                <div className="space-y-3 text-sm mb-6">
                  <div className="flex justify-between">
                    <span className="text-secondary-foreground">ID игрока</span>
                    <span className="font-medium truncate max-w-[150px]">{playerId || 'Не указан'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-secondary-foreground">Пакет</span>
                    <span className="font-medium">{packages.find(p => p.rub === amount)?.uc || 0} валюты</span>
                  </div>
                </div>

                <div className="border-t border-border pt-4 mb-6">
                  <div className="flex justify-between items-end mb-1">
                    <span className="font-bold">К оплате:</span>
                    <span className="text-3xl font-bold text-primary">{amount} ₽</span>
                  </div>
                </div>

                <Button 
                  onClick={() => setIsModalOpen(true)}
                  disabled={!playerId}
                  className="w-full h-14 rounded-full text-lg font-bold bg-foreground text-white shadow-lg hover:bg-primary transition-all"
                >
                  Оплатить
                </Button>
              </div>
            </div>

          </div>
        </div>
      </div>

      <ConfirmationModal 
        open={isModalOpen} 
        onOpenChange={setIsModalOpen}
        title="Заказ оформлен!"
        description={`Заказ на пополнение ${selectedGame.name} принят. Менеджер свяжется с вами для подтверждения.`}
      />
    </MainLayout>
  );
}
