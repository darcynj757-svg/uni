import React, { useState } from 'react';
import { CabinetLayout } from '@/components/layout/CabinetLayout';
import { mockCards } from '@/data/cards';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { Plus, Eye, EyeOff, Snowflake, Copy } from 'lucide-react';
import * as SiIcons from 'react-icons/si';

export default function CabinetCards() {
  const [revealedCards, setRevealedCards] = useState<Record<string, boolean>>({});

  const toggleReveal = (id: string) => {
    setRevealedCards(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <CabinetLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Мои карты</h1>
        <Link href="/cards">
          <Button className="rounded-full bg-gradient-gemini text-white shadow-md">
            <Plus className="w-4 h-4 mr-2" /> Выпустить
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {mockCards.map(card => {
          const isRevealed = revealedCards[card.id];
          const isBlue = card.color === 'blue';
          const isFrozen = card.status === 'frozen';
          
          return (
            <div key={card.id} className={`flex flex-col gap-4 ${isFrozen ? 'opacity-80 grayscale-[30%]' : ''}`}>
              
              {/* The Card Visual */}
              <div className={`relative w-full aspect-[1.586] rounded-3xl p-6 text-white overflow-hidden shadow-xl transform transition-transform hover:-translate-y-1 ${
                isBlue ? 'bg-gradient-to-br from-[#4285F4] to-[#2563EB]' : 'bg-gradient-to-br from-[#9B72CB] to-[#7C3AED]'
              }`}>
                {/* Decoration */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/4 translate-x-1/4"></div>
                
                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <span className="font-medium text-sm opacity-90">{card.type}</span>
                    <div className="px-2 py-1 bg-white/20 rounded-md backdrop-blur-sm text-xs font-medium">
                      {isFrozen ? 'Заморожена' : 'Активна'}
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-2xl font-mono tracking-[0.2em] mb-2 opacity-90">
                      {isRevealed ? card.number.replace(/\*/g, '4') : card.number}
                    </div>
                    <div className="flex justify-between items-end">
                      <div>
                        <div className="text-[10px] uppercase opacity-70 mb-0.5">Valid Thru</div>
                        <div className="font-mono text-sm">{card.expiry}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold opacity-90 mb-1">{card.balance} {card.currency}</div>
                        {card.type.includes('VISA') ? (
                          <SiIcons.SiVisa className="w-12 h-12" />
                        ) : (
                          <SiIcons.SiMastercard className="w-10 h-10" />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1 rounded-xl bg-white shadow-sm border-border">
                  Пополнить
                </Button>
                <Button variant="outline" className="flex-1 rounded-xl bg-white shadow-sm border-border">
                  <Snowflake className="w-4 h-4 mr-2" />
                  {isFrozen ? 'Разморозить' : 'Заморозить'}
                </Button>
                <Button 
                  variant="outline" 
                  className={`flex-1 rounded-xl shadow-sm border-border ${isRevealed ? 'bg-secondary text-primary' : 'bg-white'}`}
                  onClick={() => toggleReveal(card.id)}
                >
                  {isRevealed ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
                  Реквизиты
                </Button>
              </div>

              {/* Revealed Details */}
              {isRevealed && (
                <div className="bg-white p-4 rounded-2xl border border-border mt-2 space-y-3 animate-in fade-in slide-in-from-top-2">
                  <div className="flex justify-between items-center p-2 bg-secondary rounded-xl">
                    <span className="text-xs text-secondary-foreground w-16">Номер</span>
                    <span className="font-mono text-sm">{card.number.replace(/\*/g, '4')}</span>
                    <Button variant="ghost" size="icon" className="h-6 w-6"><Copy className="w-3 h-3" /></Button>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-1 flex justify-between items-center p-2 bg-secondary rounded-xl">
                      <span className="text-xs text-secondary-foreground">Срок</span>
                      <span className="font-mono text-sm">{card.expiry}</span>
                    </div>
                    <div className="flex-1 flex justify-between items-center p-2 bg-secondary rounded-xl">
                      <span className="text-xs text-secondary-foreground">CVV</span>
                      <span className="font-mono text-sm">842</span>
                      <Button variant="ghost" size="icon" className="h-6 w-6 -mr-2"><Copy className="w-3 h-3" /></Button>
                    </div>
                  </div>
                </div>
              )}

            </div>
          );
        })}

        {/* Empty add card slot */}
        <Link href="/cards">
          <div className="w-full aspect-[1.586] rounded-3xl border-2 border-dashed border-border hover:border-primary/50 hover:bg-primary/5 cursor-pointer transition-colors flex flex-col items-center justify-center text-secondary-foreground hover:text-primary group">
            <div className="w-12 h-12 rounded-full bg-secondary group-hover:bg-primary/10 flex items-center justify-center mb-4 transition-colors">
              <Plus className="w-6 h-6" />
            </div>
            <span className="font-medium">Выпустить новую карту</span>
          </div>
        </Link>
      </div>
    </CabinetLayout>
  );
}
