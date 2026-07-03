import React from 'react';
import { Link } from 'wouter';
import { SiTelegram, SiYoutube, SiInstagram } from 'react-icons/si';

export function Footer() {
  return (
    <footer className="bg-[#1F1F1F] text-white py-12 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="flex flex-col gap-4">
            <Link href="/" className="font-bold text-2xl tracking-tight text-white cursor-pointer">
              UNICARD
            </Link>
            <p className="text-gray-400 text-sm">Виртуальные карты для всего мира</p>
            <div className="flex gap-4 mt-2">
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><SiTelegram className="w-5 h-5" /></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><SiYoutube className="w-5 h-5" /></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><SiInstagram className="w-5 h-5" /></a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-white">Продукты</h4>
            <ul className="flex flex-col gap-2 text-sm text-gray-400">
              <li><Link href="/cards"><span className="hover:text-white cursor-pointer transition-colors">Карты</span></Link></li>
              <li><Link href="/gift-cards"><span className="hover:text-white cursor-pointer transition-colors">Гифт-карты</span></Link></li>
              <li><Link href="/vpn"><span className="hover:text-white cursor-pointer transition-colors">VPN</span></Link></li>
              <li><Link href="/esim"><span className="hover:text-white cursor-pointer transition-colors">eSIM</span></Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-white">Компания</h4>
            <ul className="flex flex-col gap-2 text-sm text-gray-400">
              <li><Link href="/about"><span className="hover:text-white cursor-pointer transition-colors">О нас</span></Link></li>
              <li><Link href="/contacts"><span className="hover:text-white cursor-pointer transition-colors">Контакты</span></Link></li>
              <li><Link href="/blog"><span className="hover:text-white cursor-pointer transition-colors">Блог</span></Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-white">Поддержка</h4>
            <ul className="flex flex-col gap-2 text-sm text-gray-400">
              <li><Link href="/faq"><span className="hover:text-white cursor-pointer transition-colors">FAQ</span></Link></li>
              <li><Link href="/terms"><span className="hover:text-white cursor-pointer transition-colors">Пользовательское соглашение</span></Link></li>
              <li><a href="#" className="hover:text-white transition-colors">Связаться с нами</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>© 2024 Unicard. Все права защищены.</p>
          <div className="flex gap-4">
            <span>ИНН 1234567890</span>
            <Link href="/privacy"><span className="hover:text-gray-300 cursor-pointer">Политика конфиденциальности</span></Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
