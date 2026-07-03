# Replit Agent Prompt — Unicard

Скопируй всё, что ниже, в Replit Agent одним сообщением.

---

Build a modern fintech marketplace web app called **Unicard** — a service for virtual & plastic international cards, gift cards, game top-ups, money transfers and eSIM. Russian-language UI. This is a **frontend MVP with mock data** — no real payment processing, no real card issuing (stub all payment actions with a success modal "Заказ создан, менеджер свяжется с вами").

## Tech stack
- Next.js (App Router) + Tailwind CSS
- Mock data in local JSON files (products, cards, transactions, orders)
- Auth: simple email + password with session (can be mocked / local), plus a visible "Войти через Telegram" button (stub)
- Fully responsive (mobile-first), PWA manifest + "Установить приложение" button

## Design — light "Gemini style"
**I will attach reference screenshots — match their mood, gradients and softness. Visual style: follow the screenshots. Structure and pages: follow this spec.**
- Background: pure white `#FFFFFF` with soft off-white sections `#F8F9FE`
- Signature accent: the Gemini gradient — `linear-gradient(135deg, #4285F4 0%, #9B72CB 50%, #D96570 100%)` — used on: primary buttons, hero headline highlight, active states, card-product borders on hover
- Text: `#1F1F1F` primary, `#5F6368` secondary
- Typography: "Google Sans" / fallback Inter. Large friendly headings (48–64px hero), generous letter-spacing on labels
- Shape language: very rounded — 20–28px border-radius on cards, pill-shaped buttons and filter chips
- Soft elevation: subtle shadows `0 4px 24px rgba(66,133,244,0.08)`, thin `#E8EAF2` borders
- Micro-interactions: gentle hover lift on product cards, gradient shimmer on primary CTA, smooth page transitions, skeleton loaders
- A floating soft gradient "aurora" blur behind the hero (Gemini-like ambient glow), respects prefers-reduced-motion

## Pages & routes
1. `/` — Home: hero "Виртуальные и пластиковые карты MasterCard и VISA — выпуск от 2 минут", CTA [Выпустить карту] [Личный кабинет]; 4 benefit cards (Безопасность, Международные платежи, Apple Pay / Google Pay, Управление онлайн); product carousel (gift-карты и игры); блок eSIM по странам; FAQ accordion; отзывы; footer
2. `/cards` — Card ordering page with an **interactive order form**: выбор назначения карты (Для покупок / Универсальная / Для Apple Pay и Google Pay / Для рекламы / Пластиковая), выбор BIN (3 варианта USD/EUR), сумма пополнения USD, способ оплаты (СБП QR / Крипто −5% / P2P / Счёт ЛК), итоговая сумма в ₽ пересчитывается live, кнопка "Оформить заказ"
3. `/gift-cards` — каталог с алфавитным фильтром A–Z, фильтры по категориям (Steam, Подписки, Стриминг, PlayStation, Xbox…), странам и цене (чипы)
4. `/games` — магазин игр, та же каталожная сетка
5. `/recharge` — пополнение игр и сервисов (Telegram Stars, PUBG Mobile, Steam…)
6. `/transfers` — денежные переводы: форма (страна получения, валюта, сумма, тип выплаты — на карту / банковский перевод / кошелёк), шаги "Как это работает" (3 шага), комиссия от 1%
7. `/esim` — eSIM по странам: вкладки Страны / Регионы / Глобальный, карточки направлений с ценой "от … ₽"
8. `/vpn` — собственный VPN-сервис Unicard VPN: hero "Быстрый и безопасный VPN", 3 тарифа-карточки (1 мес / 6 мес / 12 мес, бейдж "Выгодно −40%" на годовом), список локаций серверов с флагами (Нидерланды, Германия, США, Турция, Казахстан…), преимущества (Без логов / До 5 устройств / WireGuard / До 1 Гбит/с), кнопки скачивания iOS / Android / Windows / macOS (заглушки), FAQ
9. `/proxy` — прокси-сервис: конфигуратор покупки — тип (Резидентные / Мобильные / Datacenter IPv4 / IPv6), страна, количество IP, срок (7 / 30 / 90 дней), live-пересчёт цены; таблица сравнения типов; use-cases (парсинг, мультиаккаунты, реклама, SMM)
10. `/contacts` — контакты + форма обратной связи

VPN и Прокси добавить в главное меню и на главную — блок «Ещё сервисы» с двумя большими градиентными карточками.

## Личный кабинет `/cabinet` (после логина) — ключевая часть
Sidebar layout (на мобиле — bottom nav):
- **Дашборд**: приветствие, общий баланс (в ₽ и $), быстрые действия (Пополнить / Выпустить карту / Перевод), последние 5 операций
- **Мои карты**: карточки карт с красивым визуалом (номер \*\*\*\* 4821, срок, баланс, статус Активна/Заморожена), кнопки Пополнить / Заморозить / Реквизиты (реквизиты — по клику, с blur-раскрытием)
- **Заказы**: таблица заказов gift-карт и игр со статусами (Оплачен / Доставлен / В обработке), код товара раскрывается по кнопке
- **Транзакции**: история с фильтрами по дате и типу, иконки категорий
- **Мои подписки (VPN и Прокси)**: активная VPN-подписка (тариф, дата окончания, кнопка "Скачать конфиг / QR WireGuard" — заглушка), список купленных прокси (IP:port, тип, страна, срок, кнопка "Копировать" и "Продлить")
- **Пополнение счёта**: выбор метода (СБП / Крипто USDT / Карта), QR-заглушка
- **Настройки**: профиль, email, переключатель 2FA (визуальный), выход
Seed the cabinet with realistic mock data (2 cards, ~15 transactions, 4 orders).

## Quality bar
- Everything in Russian, ₽ formatting with spaces (3 134 ₽)
- Empty states and loading skeletons everywhere
- Lighthouse-friendly, no layout shift, keyboard focus visible
- Consistent component library: Button, Chip, ProductCard, StatCard, Modal, Accordion

Do NOT integrate real payment APIs, KYC, or crypto — all actions end in a styled confirmation modal.

---

## Follow-up промты (после первой генерации)
1. «Проверь адаптив личного кабинета на 375px, почини переполнения»
2. «Добавь тёмную тему как опцию в настройках, дефолт — светлая»
3. «Сделай страницу /cards: пересчёт итоговой суммы при вводе, курс 1$ = 84 ₽ + комиссия 3%»
