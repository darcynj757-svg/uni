import React from 'react';
import { CabinetLayout } from '@/components/layout/CabinetLayout';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Shield, Server, Download, QrCode, Copy, ExternalLink, Plus } from 'lucide-react';
import { Link } from 'wouter';

export default function CabinetSubscriptions() {
  const { user } = useAuth();
  if (!user) return null;

  return (
    <CabinetLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Мои подписки</h1>
        <Link href="/vpn">
          <Button variant="outline" className="rounded-full bg-white">
            <Plus className="w-4 h-4 mr-2" /> Купить подписку
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        
        {/* VPN Section */}
        <div className="bg-white rounded-[32px] p-6 border border-border shadow-sm flex flex-col">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-gemini p-[1px]">
              <div className="w-full h-full bg-white rounded-[11px] flex items-center justify-center">
                <Shield className="w-6 h-6 text-primary" />
              </div>
            </div>
            <div>
              <h2 className="text-xl font-bold">Unicard VPN</h2>
              <p className="text-sm text-secondary-foreground">До 5 устройств одновременно</p>
            </div>
          </div>

          <div className="bg-secondary/50 rounded-2xl p-4 mb-6 flex-1">
            {user.vpnSubscription?.active ? (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Статус</span>
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-bold uppercase">Активна</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Тариф</span>
                  <span className="font-bold">{user.vpnSubscription.plan}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Действует до</span>
                  <span className="font-medium text-secondary-foreground">{new Date(user.vpnSubscription.expiresAt).toLocaleDateString('ru-RU')}</span>
                </div>
              </div>
            ) : (
              <div className="text-center py-6 text-secondary-foreground">
                У вас нет активной подписки VPN
              </div>
            )}
          </div>

          <div className="flex gap-2">
            <Button className="flex-1 rounded-xl bg-foreground hover:bg-primary text-white" disabled={!user.vpnSubscription?.active}>
              <Download className="w-4 h-4 mr-2" /> Конфиг
            </Button>
            <Button variant="outline" className="flex-1 rounded-xl bg-white" disabled={!user.vpnSubscription?.active}>
              <QrCode className="w-4 h-4 mr-2" /> QR-код
            </Button>
          </div>
        </div>

        {/* Proxy Section */}
        <div className="bg-white rounded-[32px] p-6 border border-border shadow-sm flex flex-col">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center">
              <Server className="w-6 h-6 text-gray-700" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold">Мои прокси</h2>
              <p className="text-sm text-secondary-foreground">Активных: {user.proxyList?.length || 0}</p>
            </div>
            <Link href="/proxy">
              <Button size="icon" variant="ghost" className="rounded-full bg-secondary">
                <Plus className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="flex-1">
            {user.proxyList && user.proxyList.length > 0 ? (
              <div className="space-y-3">
                {user.proxyList.map((proxy, i) => (
                  <div key={i} className="border border-border rounded-2xl p-4 text-sm hover:border-primary/50 transition-colors">
                    <div className="flex justify-between mb-2">
                      <span className="font-bold font-mono text-base">{proxy.ip}:{proxy.port}</span>
                      <span className="text-xs font-bold bg-secondary px-2 py-0.5 rounded uppercase">{proxy.country}</span>
                    </div>
                    <div className="flex justify-between text-secondary-foreground mb-3">
                      <span>{proxy.type}</span>
                      <span>До {new Date(proxy.expiresAt).toLocaleDateString('ru-RU')}</span>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="h-8 flex-1 rounded-lg bg-white">
                        <Copy className="w-3 h-3 mr-2" /> Копировать
                      </Button>
                      <Button size="sm" variant="outline" className="h-8 flex-1 rounded-lg bg-white text-primary border-primary/20">
                        Продлить
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-center text-secondary-foreground bg-secondary/30 rounded-2xl p-6">
                У вас нет активных прокси
              </div>
            )}
          </div>
        </div>

      </div>
    </CabinetLayout>
  );
}
