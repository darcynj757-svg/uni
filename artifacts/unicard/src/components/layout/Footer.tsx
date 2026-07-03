import React from 'react';
import { Link } from 'wouter';
import { SiTelegram, SiYoutube, SiInstagram } from 'react-icons/si';
import {
  CreditCard,
  Gift,
  Shield,
  Signal,
  Info,
  Mail,
  Gamepad2,
  Zap,
  ArrowLeftRight,
  Server,
  Briefcase,
  Handshake,
  Star,
  ShieldCheck,
  FileText,
  ScrollText,
  Undo2,
  Building2,
  Hash,
  MapPin,
  Phone,
} from 'lucide-react';

const productLinks = [
  { href: '/cards', label: 'Карты', icon: CreditCard },
  { href: '/gift-cards', label: 'Гифт-карты', icon: Gift },
  { href: '/games', label: 'Игры', icon: Gamepad2 },
  { href: '/recharge', label: 'Пополнение', icon: Zap },
  { href: '/transfers', label: 'Переводы', icon: ArrowLeftRight },
  { href: '/esim', label: 'eSIM', icon: Signal },
  { href: '/vpn', label: 'VPN', icon: Shield },
  { href: '/proxy', label: 'Proxy', icon: Server },
];

const companyLinks = [
  { href: '/about', label: 'О нас', icon: Info },
  { href: '/contacts', label: 'Контакты', icon: Mail },
  { href: '/careers', label: 'Вакансии', icon: Briefcase },
  { href: '/partners', label: 'Партнёрам', icon: Handshake },
  { href: '/reviews', label: 'Отзывы', icon: Star },
];

const legalLinks = [
  { href: '/privacy', label: 'Политика конфиденциальности', icon: ShieldCheck },
  { href: '/terms', label: 'Пользовательское соглашение', icon: FileText },
  { href: '/offer', label: 'Публичная оферта', icon: ScrollText },
  { href: '/refund-policy', label: 'Политика возврата', icon: Undo2 },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#F8F9FE] text-[#1F1F1F] pt-16 pb-8 mt-auto overflow-hidden border-t border-border">
      <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-primary/10 via-purple-500/10 to-pink-500/10 rounded-full blur-[100px] -translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-gradient-to-tr from-primary/10 via-purple-500/10 to-pink-500/10 rounded-full blur-[100px] translate-x-1/3 translate-y-1/3 pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2 sm:col-span-2 md:col-span-1 flex flex-col gap-4">
            <Link href="/" className="font-bold text-2xl tracking-tight cursor-pointer">
              <span className="text-gradient">UNICARD</span>
            </Link>
            <p className="text-secondary-foreground text-sm">Виртуальные карты для всего мира</p>
            <div className="flex gap-3 mt-2">
              <a
                href="#"
                aria-label="Telegram"
                className="w-9 h-9 rounded-full bg-white border border-border flex items-center justify-center text-secondary-foreground hover:text-primary hover:border-primary/40 transition-colors shadow-sm"
              >
                <SiTelegram className="w-4 h-4" />
              </a>
              <a
                href="#"
                aria-label="YouTube"
                className="w-9 h-9 rounded-full bg-white border border-border flex items-center justify-center text-secondary-foreground hover:text-primary hover:border-primary/40 transition-colors shadow-sm"
              >
                <SiYoutube className="w-4 h-4" />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-white border border-border flex items-center justify-center text-secondary-foreground hover:text-primary hover:border-primary/40 transition-colors shadow-sm"
              >
                <SiInstagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Продукты</h4>
            <ul className="flex flex-col gap-3 text-sm text-secondary-foreground">
              {productLinks.map(({ href, label, icon: Icon }) => (
                <li key={href}>
                  <Link href={href}>
                    <span className="flex items-center gap-2 hover:text-primary cursor-pointer transition-colors">
                      <Icon className="w-4 h-4 text-primary/70" />
                      {label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Компания</h4>
            <ul className="flex flex-col gap-3 text-sm text-secondary-foreground">
              {companyLinks.map(({ href, label, icon: Icon }) => (
                <li key={href}>
                  <Link href={href}>
                    <span className="flex items-center gap-2 hover:text-primary cursor-pointer transition-colors">
                      <Icon className="w-4 h-4 text-primary/70" />
                      {label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Документы</h4>
            <ul className="flex flex-col gap-3 text-sm text-secondary-foreground">
              {legalLinks.map(({ href, label, icon: Icon }) => (
                <li key={href}>
                  <Link href={href}>
                    <span className="flex items-center gap-2 hover:text-primary cursor-pointer transition-colors">
                      <Icon className="w-4 h-4 text-primary/70" />
                      {label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-border shadow-sm p-6 md:p-8 mb-8">
          <h4 className="font-semibold mb-5 flex items-center gap-2">
            <Building2 className="w-4 h-4 text-primary/70" />
            Юридическая и business-информация
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-sm text-secondary-foreground">
            <div className="flex items-start gap-3">
              <Building2 className="w-4 h-4 text-primary/70 mt-0.5 shrink-0" />
              <div>
                <p className="text-xs text-secondary-foreground/70 mb-1">Организация</p>
                <p className="text-[#1F1F1F] font-medium">ООО «Юникард»</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Hash className="w-4 h-4 text-primary/70 mt-0.5 shrink-0" />
              <div>
                <p className="text-xs text-secondary-foreground/70 mb-1">ИНН / ОГРН</p>
                <p className="text-[#1F1F1F] font-medium">0000000000 / 0000000000000</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-primary/70 mt-0.5 shrink-0" />
              <div>
                <p className="text-xs text-secondary-foreground/70 mb-1">Юридический адрес</p>
                <p className="text-[#1F1F1F] font-medium">г. Москва, ул. Примерная, д. 1</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="w-4 h-4 text-primary/70 mt-0.5 shrink-0" />
              <div>
                <p className="text-xs text-secondary-foreground/70 mb-1">Поддержка</p>
                <p className="text-[#1F1F1F] font-medium">+7 (000) 000-00-00</p>
                <a href="mailto:support@example.com" className="flex items-center gap-1.5 text-primary hover:underline mt-1">
                  <Mail className="w-3.5 h-3.5" />
                  support@example.com
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-6 flex flex-col gap-2 text-xs text-secondary-foreground/80 text-center md:text-left">
          <p>© {currentYear} UNICARD. Все права защищены.</p>
          <p>
            Контактные и юридические данные, указанные в футере, являются временными плейсхолдерами и будут заменены на актуальные реквизиты компании.
          </p>
        </div>
      </div>
    </footer>
  );
}
