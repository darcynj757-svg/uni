import React, { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { ConfirmationModal } from '@/components/ConfirmationModal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SiTelegram } from 'react-icons/si';
import { Mail, Clock, MapPin } from 'lucide-react';

export default function Contacts() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <MainLayout>
      <div className="bg-[#F8F9FE] min-h-screen py-12">
        <div className="container mx-auto px-4 max-w-5xl">
          
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Свяжитесь с нами</h1>
            <p className="text-secondary-foreground text-lg">Поддержка отвечает ежедневно с 9:00 до 21:00 МСК</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white p-8 rounded-3xl border border-border text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <SiTelegram className="w-7 h-7" />
              </div>
              <h3 className="font-bold text-lg mb-2">Telegram</h3>
              <p className="text-secondary-foreground mb-4">Самый быстрый способ</p>
              <a href="#" className="font-bold text-primary hover:underline">@unicard_support</a>
            </div>
            
            <div className="bg-white p-8 rounded-3xl border border-border text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-purple-50 text-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-7 h-7" />
              </div>
              <h3 className="font-bold text-lg mb-2">Email</h3>
              <p className="text-secondary-foreground mb-4">Для партнёров и жалоб</p>
              <a href="mailto:support@unicard.io" className="font-bold text-primary hover:underline">support@unicard.io</a>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-border text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-gray-50 text-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-7 h-7" />
              </div>
              <h3 className="font-bold text-lg mb-2">Рабочие часы</h3>
              <p className="text-secondary-foreground mb-4">Без выходных</p>
              <span className="font-bold text-foreground">9:00 — 21:00 МСК</span>
            </div>
          </div>

          <div className="bg-white rounded-[32px] p-8 md:p-12 border border-border shadow-xl max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-center">Напишите нам</h2>
            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setIsModalOpen(true); }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Ваше имя</label>
                  <Input placeholder="Иван Иванов" className="h-14 rounded-2xl bg-secondary/50 border-transparent" required />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <Input type="email" placeholder="ivan@example.com" className="h-14 rounded-2xl bg-secondary/50 border-transparent" required />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Тема обращения</label>
                <Select required>
                  <SelectTrigger className="h-14 rounded-2xl bg-secondary/50 border-transparent">
                    <SelectValue placeholder="Выберите тему" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="card">Проблема с картой / Оплата</SelectItem>
                    <SelectItem value="order">Вопрос по заказу</SelectItem>
                    <SelectItem value="tech">Техническая ошибка</SelectItem>
                    <SelectItem value="collab">Сотрудничество</SelectItem>
                    <SelectItem value="other">Другое</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Сообщение</label>
                <textarea 
                  className="w-full min-h-[150px] p-4 rounded-2xl bg-secondary/50 border-transparent focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm resize-none"
                  placeholder="Опишите вашу проблему максимально подробно..."
                  required
                ></textarea>
              </div>

              <Button type="submit" className="w-full h-14 rounded-full text-lg font-bold bg-foreground text-white shadow-lg hover:bg-primary transition-all">
                Отправить сообщение
              </Button>
            </form>
          </div>

        </div>
      </div>

      <ConfirmationModal 
        open={isModalOpen} 
        onOpenChange={setIsModalOpen}
        title="Сообщение отправлено!"
        description="Мы получили ваше обращение и ответим на указанный email в ближайшее время."
      />
    </MainLayout>
  );
}
