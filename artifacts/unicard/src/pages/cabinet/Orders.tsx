import React, { useState } from 'react';
import { CabinetLayout } from '@/components/layout/CabinetLayout';
import { mockOrders } from '@/data/orders';
import { Button } from '@/components/ui/button';
import { Eye, Copy, ExternalLink } from 'lucide-react';

export default function CabinetOrders() {
  const [revealedCodes, setRevealedCodes] = useState<Record<string, boolean>>({});

  const toggleReveal = (id: string) => {
    setRevealedCodes(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'delivered':
        return <span className="px-2 py-1 bg-green-100 text-green-700 rounded-md text-xs font-bold uppercase">Доставлен</span>;
      case 'paid':
        return <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-md text-xs font-bold uppercase">Оплачен</span>;
      case 'processing':
        return <span className="px-2 py-1 bg-amber-100 text-amber-700 rounded-md text-xs font-bold uppercase">В обработке</span>;
      default:
        return <span className="px-2 py-1 bg-secondary text-secondary-foreground rounded-md text-xs font-bold uppercase">{status}</span>;
    }
  };

  return (
    <CabinetLayout>
      <h1 className="text-2xl font-bold mb-6">Мои заказы</h1>

      <div className="bg-white rounded-3xl border border-border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-secondary/50 text-secondary-foreground">
              <tr>
                <th className="px-6 py-4 font-medium">Заказ</th>
                <th className="px-6 py-4 font-medium">Продукт</th>
                <th className="px-6 py-4 font-medium">Дата</th>
                <th className="px-6 py-4 font-medium">Сумма</th>
                <th className="px-6 py-4 font-medium">Статус</th>
                <th className="px-6 py-4 font-medium">Код / Данные</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {mockOrders.map((order) => (
                <tr key={order.id} className="hover:bg-secondary/20 transition-colors">
                  <td className="px-6 py-4 font-medium text-foreground">{order.id}</td>
                  <td className="px-6 py-4 font-bold">{order.product}</td>
                  <td className="px-6 py-4 text-secondary-foreground">
                    {new Date(order.date).toLocaleDateString('ru-RU')}
                  </td>
                  <td className="px-6 py-4 font-medium">{order.amount} ₽</td>
                  <td className="px-6 py-4">{getStatusBadge(order.status)}</td>
                  <td className="px-6 py-4">
                    {order.code ? (
                      <div className="flex items-center gap-2">
                        {revealedCodes[order.id] ? (
                          <div className="flex items-center gap-2 bg-secondary px-2 py-1 rounded border border-border">
                            <code className="font-mono text-xs">{order.code.replace(/XXXX/g, 'ABCD')}</code>
                            <button className="text-muted-foreground hover:text-foreground"><Copy className="w-3 h-3"/></button>
                          </div>
                        ) : (
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="h-7 text-xs px-2 rounded bg-white"
                            onClick={() => toggleReveal(order.id)}
                          >
                            <Eye className="w-3 h-3 mr-1" /> Показать
                          </Button>
                        )}
                      </div>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </CabinetLayout>
  );
}
