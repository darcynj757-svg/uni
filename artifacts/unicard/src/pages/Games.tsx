import React, { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { ConfirmationModal } from '@/components/ConfirmationModal';
import { mockGames } from '@/data/games';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Gamepad2, Monitor, Smartphone } from 'lucide-react';
import { Link } from 'wouter';
import { getImage, handleImageError } from '@/data/images';

export default function Games() {
  const [search, setSearch] = useState('');
  const [activePlatform, setActivePlatform] = useState('Все');
  
  const platforms = [
    { id: 'Все', icon: Gamepad2 },
    { id: 'PC', icon: Monitor },
    { id: 'Mobile', icon: Smartphone },
    { id: 'Console', icon: Gamepad2 }
  ];

  const filtered = mockGames.filter(g => {
    const matchesSearch = g.name.toLowerCase().includes(search.toLowerCase());
    const matchesPlatform = activePlatform === 'Все' || g.platforms.includes(activePlatform);
    return matchesSearch && matchesPlatform;
  });

  return (
    <MainLayout>
      <div className="bg-[#F8F9FE] min-h-screen py-12">
        <div className="container mx-auto px-4">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10">
            <div>
              <h1 className="text-4xl font-bold mb-4">Пополнение игр</h1>
              <p className="text-secondary-foreground text-lg">Донат в популярные игры по UID без передачи аккаунта</p>
            </div>
            <div className="w-full md:w-auto relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input 
                placeholder="Найти игру..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 h-12 w-full md:w-80 rounded-full border-border bg-white"
              />
            </div>
          </div>

          <div className="relative rounded-3xl overflow-hidden aspect-video md:aspect-[21/9] mb-10">
            <img
              src={getImage('gaming', 0)}
              onError={(e) => handleImageError(e, 'unicard-games-banner', 1600, 700)}
              loading="lazy"
              alt="Пополнение баланса в играх"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent"></div>
            <div className="absolute inset-0 flex items-center">
              <div className="px-8 md:px-16 max-w-xl text-white">
                <h3 className="text-2xl md:text-3xl font-bold mb-2">Мгновенный донат в любимые игры</h3>
                <p className="text-white/80">PUBG, Genshin Impact, Free Fire и ещё десятки игр</p>
              </div>
            </div>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-6 hide-scrollbar">
            {platforms.map(p => {
              const Icon = p.icon;
              return (
                <button
                  key={p.id}
                  onClick={() => setActivePlatform(p.id)}
                  className={`whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-medium flex items-center gap-2 transition-all ${
                    activePlatform === p.id 
                      ? 'bg-primary text-white shadow-md' 
                      : 'bg-white text-secondary-foreground border border-border hover:border-primary/50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {p.id}
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filtered.map((game, idx) => (
              <Link key={game.id} href={`/recharge?game=${game.id}`}>
                <div className="bg-white rounded-2xl border border-border hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer h-full flex flex-col group overflow-hidden">
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={getImage('gaming', idx % 2)}
                      onError={(e) => handleImageError(e, `unicard-game-${game.id}`, 600, 340)}
                      loading="lazy"
                      alt={game.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                    <div className="absolute bottom-2 left-2 w-10 h-10 rounded-xl bg-white/90 backdrop-blur flex items-center justify-center font-bold text-lg text-foreground">
                      {game.name.charAt(0)}
                    </div>
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="font-bold text-lg leading-tight mb-1">{game.name}</h3>
                    <p className="text-xs text-secondary-foreground mb-4">{game.publisher}</p>

                    <div className="mt-auto pt-4 border-t border-border flex justify-between items-center">
                      <span className="text-xs font-medium text-secondary-foreground">От {game.minCharge} ₽</span>
                      <div className="flex gap-1">
                        {game.platforms.map(plat => {
                          const PlatIcon = plat === 'PC' ? Monitor : plat === 'Mobile' ? Smartphone : Gamepad2;
                          return (
                            <span key={plat} title={plat} className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center">
                              <PlatIcon className="w-3.5 h-3.5 text-secondary-foreground" />
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
        </div>
      </div>
    </MainLayout>
  );
}
