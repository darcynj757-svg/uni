import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { mockGiftCards } from '@/data/giftCards';
import { mockEsim } from '@/data/esim';
import {
  CreditCard, Banknote, Gift, Gamepad2, Signal, Send,
  Globe, Lock, Shield, Smartphone, Zap, Star,
  ShieldCheck, Server, WifiHigh
} from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import * as SiIcons from 'react-icons/si';
import { getImage, handleImageError } from '@/data/images';

export default function Home() {
  const popularGiftCards = mockGiftCards.filter(c => c.popular).slice(0, 8);
  const popularEsim = mockEsim.slice(0, 6);

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        {/* Aurora Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-tr from-primary via-purple-500 to-pink-500 rounded-full blur-[120px] opacity-15 pointer-events-none -z-10 animate-pulse"></div>

        {/* Decorative hero visual */}
        <div className="hidden lg:block absolute right-8 xl:right-16 top-1/2 -translate-y-1/2 w-64 xl:w-80 pointer-events-none">
          <div className="absolute -inset-8 bg-gradient-to-tr from-primary via-purple-500 to-pink-500 rounded-full blur-[90px] opacity-20"></div>
          <img
            src={getImage('card', 0)}
            onError={(e) => handleImageError(e, 'unicard-hero-card', 800, 800)}
            loading="lazy"
            alt="Виртуальная карта Unicard"
            className="relative w-full aspect-square object-cover rounded-3xl shadow-2xl rotate-6"
          />
        </div>
        <div className="hidden lg:block absolute left-8 xl:left-16 top-[60%] w-40 xl:w-48 pointer-events-none">
          <img
            src={getImage('nfc', 0)}
            onError={(e) => handleImageError(e, 'unicard-hero-nfc', 600, 600)}
            loading="lazy"
            alt="Оплата смартфоном NFC"
            className="relative w-full aspect-square object-cover rounded-3xl shadow-xl -rotate-6"
          />
        </div>

        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center gap-4 mb-6">
            <span className="flex items-center gap-1.5 text-sm font-medium bg-secondary px-3 py-1 rounded-full text-secondary-foreground">
              <Lock className="w-4 h-4 text-primary" /> Безопасно
            </span>
            <span className="flex items-center gap-1.5 text-sm font-medium bg-secondary px-3 py-1 rounded-full text-secondary-foreground">
              <Zap className="w-4 h-4 text-primary" /> Быстро
            </span>
            <span className="flex items-center gap-1.5 text-sm font-medium bg-secondary px-3 py-1 rounded-full text-secondary-foreground">
              <Globe className="w-4 h-4 text-primary" /> Везде
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-[64px] font-bold leading-tight tracking-tight max-w-4xl mx-auto mb-6">
            Виртуальные и пластиковые карты <span className="text-gradient">MasterCard и VISA</span>
          </h1>
          
          <p className="text-lg md:text-xl text-secondary-foreground mb-10 max-w-2xl mx-auto">
            Выпуск от 2 минут · Работает с Apple Pay и Google Pay · 0% комиссия первый месяц
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/cards">
              <Button className="w-full sm:w-auto text-lg h-14 px-8 rounded-full bg-gradient-gemini text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all">
                Выпустить карту
              </Button>
            </Link>
            <Link href="/cabinet">
              <Button variant="outline" className="w-full sm:w-auto text-lg h-14 px-8 rounded-full border-2 hover:bg-secondary">
                Личный кабинет
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-[#F8F9FE]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Shield, title: "Безопасность", desc: "Шифрование данных и 3D Secure защита всех транзакций" },
              { icon: Globe, title: "Международные", desc: "Оплата сервисов и покупок в 150+ странах мира" },
              { icon: Smartphone, title: "Apple / Google Pay", desc: "Моментальная привязка к бесконтактной оплате" },
              { icon: Zap, title: "Управление онлайн", desc: "Полный контроль в удобном приложении" }
            ].map((benefit, i) => (
              <div key={i} className="bg-white p-6 rounded-[24px] shadow-sm hover:shadow-md hover:-translate-y-1 transition-all">
                <div className="w-12 h-12 rounded-2xl bg-gradient-gemini p-[1px] mb-4">
                  <div className="w-full h-full bg-white rounded-[15px] flex items-center justify-center">
                    <benefit.icon className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <h3 className="text-lg font-bold mb-2">{benefit.title}</h3>
                <p className="text-secondary-foreground text-sm leading-relaxed">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Payment Banner */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="relative rounded-[32px] overflow-hidden aspect-video md:aspect-[21/9]">
            <img
              src={getImage('nfc', 1)}
              onError={(e) => handleImageError(e, 'unicard-nfc-banner', 1600, 700)}
              loading="lazy"
              alt="Оплата смартфоном где угодно"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-transparent"></div>
            <div className="absolute inset-0 flex items-center">
              <div className="px-8 md:px-16 max-w-xl text-white">
                <h3 className="text-2xl md:text-4xl font-bold mb-4">Платите смартфоном где угодно</h3>
                <p className="text-white/80 text-lg">Привяжите карту Unicard к Apple Pay или Google Pay и забудьте о пластике</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Все наши продукты</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Виртуальные карты", icon: CreditCard, color: "from-blue-500 to-blue-600", href: "/cards" },
              { title: "Пластиковые карты", icon: Banknote, color: "from-violet-500 to-purple-600", href: "/cards" },
              { title: "Гифт-карты", icon: Gift, color: "from-pink-500 to-rose-500", href: "/gift-cards" },
              { title: "Пополнение игр", icon: Gamepad2, color: "from-emerald-500 to-teal-600", href: "/games" },
              { title: "eSIM интернет", icon: Signal, color: "from-sky-500 to-cyan-600", href: "/esim" },
              { title: "Переводы за рубеж", icon: Send, color: "from-amber-500 to-orange-500", href: "/transfers" },
            ].map((prod, i) => (
              <Link key={i} href={prod.href}>
                <div className="group border-gradient-gemini cursor-pointer">
                  <div className="bg-white p-8 rounded-[24px] h-full flex flex-col items-center justify-center text-center shadow-sm hover:shadow-md transition-all">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${prod.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-md`}>
                      <prod.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold">{prod.title}</h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Gift Cards Row */}
      <section className="py-16 bg-[#F8F9FE] overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">Популярные гифт-карты</h2>
            <Link href="/gift-cards"><span className="text-primary font-medium hover:underline cursor-pointer">Все карты</span></Link>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar snap-x">
            {popularGiftCards.map(gc => {
              const Icon = (SiIcons as any)[gc.logo] || SiIcons.SiSteam;
              return (
                <div key={gc.id} className="snap-start shrink-0 w-32 bg-white rounded-3xl p-4 flex flex-col items-center justify-center gap-3 shadow-sm border border-border hover:border-primary transition-colors cursor-pointer">
                  <Icon className="w-10 h-10 text-foreground" />
                  <span className="text-xs font-semibold text-center">{gc.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* eSIM */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">eSIM — интернет в любой стране</h2>
              <p className="text-secondary-foreground text-lg">Оставайтесь на связи без роуминга</p>
            </div>
            <Link href="/esim">
              <Button variant="outline" className="rounded-full hidden sm:flex">Все страны</Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {popularEsim.map(sim => (
              <div key={sim.id} className="bg-[#F8F9FE] p-4 rounded-3xl flex flex-col items-center justify-center gap-2 hover:-translate-y-1 transition-transform cursor-pointer border border-transparent hover:border-primary">
                <span className="text-4xl mb-2">{sim.emoji}</span>
                <span className="font-bold">{sim.country}</span>
                <span className="text-xs text-secondary-foreground bg-white px-2 py-1 rounded-full">от {sim.priceFrom} ₽</span>
              </div>
            ))}
          </div>
          <div className="mt-6 sm:hidden">
            <Link href="/esim">
              <Button className="w-full rounded-full bg-secondary text-foreground hover:bg-secondary/80">Все страны</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* VPN & Proxy */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-[#1a1a2e] to-[#2a2a4a] text-white p-8 md:p-12 rounded-[32px] relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[80px] rounded-full group-hover:bg-primary/40 transition-colors"></div>
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-3xl font-bold mb-4">Unicard VPN</h3>
                <div className="flex flex-col gap-2 mb-6 text-gray-300 text-sm">
                  <span className="flex items-center gap-2"><Lock className="w-4 h-4 text-primary/80" /> Без логов</span>
                  <span className="flex items-center gap-2"><Zap className="w-4 h-4 text-primary/80" /> WireGuard · до 1 Гбит/с</span>
                  <span className="flex items-center gap-2"><Smartphone className="w-4 h-4 text-primary/80" /> iOS, Android, Windows, macOS</span>
                </div>
                <Link href="/vpn">
                  <Button className="bg-white text-black hover:bg-gray-100 rounded-full px-8">Подробнее</Button>
                </Link>
              </div>
            </div>
            
            <div className="bg-gradient-gemini text-white p-8 md:p-12 rounded-[32px] relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 blur-[80px] rounded-full"></div>
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center mb-4">
                  <Server className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-3xl font-bold mb-4">Unicard Proxy</h3>
                <div className="flex flex-col gap-2 mb-6 text-white/80 text-sm">
                  <span className="flex items-center gap-2"><Globe className="w-4 h-4 text-white/70" /> Резидентные и Datacenter</span>
                  <span className="flex items-center gap-2"><Shield className="w-4 h-4 text-white/70" /> IPv4 / IPv6 · HTTP/SOCKS5</span>
                  <span className="flex items-center gap-2"><Zap className="w-4 h-4 text-white/70" /> Мгновенная выдача</span>
                </div>
                <Link href="/proxy">
                  <Button className="bg-white text-black hover:bg-gray-100 rounded-full px-8">Подробнее</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-[#F8F9FE]">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Частые вопросы</h2>
          <Accordion type="single" collapsible className="w-full bg-white rounded-3xl p-6 shadow-sm">
            {[
              { q: "Как выпустить виртуальную карту?", a: "Достаточно зарегистрироваться в Личном кабинете, выбрать нужный BIN и пополнить счет. Карта выпустится моментально и будет доступна для использования." },
              { q: "Какие методы оплаты поддерживаются?", a: "Вы можете пополнить счет через СБП, переводом с карты любого банка РФ, а также криптовалютой (USDT TRC-20, BTC, ETH)." },
              { q: "Можно ли пополнить карту криптовалютой?", a: "Да, мы принимаем стейблкоины и основные криптовалюты. Конвертация в баланс карты происходит автоматически по актуальному курсу." },
              { q: "Работает ли карта с Apple Pay / Google Pay?", a: "Да, большинство наших карт (кроме специальных рекламных BIN) поддерживают привязку к Apple Pay и Google Pay для бесконтактной оплаты." },
              { q: "Как связаться с поддержкой?", a: "Наша поддержка работает с 9:00 до 21:00 по МСК в Telegram @unicard_support. Также вы можете написать нам на email или через форму на сайте." }
            ].map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-b last:border-0 border-border">
                <AccordionTrigger className="text-left font-medium text-lg py-4 hover:no-underline hover:text-primary">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-secondary-foreground leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Отзывы клиентов</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: "Александр М.", date: "12 февраля 2024", text: "Отличный сервис. Выпустил карту за 5 минут, оплатил подписку на ChatGPT, всё прошло без проблем. Рекомендую!" },
              { name: "Елена В.", date: "05 февраля 2024", text: "Покупала гифт-карту для Steam, код пришел моментально. Цены адекватные, интерфейс очень удобный и приятный." },
              { name: "Максим Д.", date: "28 января 2024", text: "Пользуюсь их VPN и картами уже несколько месяцев. Никаких нареканий, поддержка отвечает быстро. Топ за свои деньги." }
            ].map((review, i) => (
              <div key={i} className="bg-white border border-border p-8 rounded-[24px] shadow-sm">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
                </div>
                <p className="text-foreground leading-relaxed mb-6">"{review.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center font-bold text-primary">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-sm">{review.name}</div>
                    <div className="text-xs text-secondary-foreground">{review.date}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </MainLayout>
  );
}
