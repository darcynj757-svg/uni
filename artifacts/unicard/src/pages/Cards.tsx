import React, { useState, useEffect } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { ConfirmationModal } from '@/components/ConfirmationModal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CheckCircle2, ChevronRight, Info } from 'lucide-react';

export default function OrderCard() {
  const [step, setStep] = useState(1);
  const [cardType, setCardType] = useState('Универсальная');
  const [bin, setBin] = useState('bin2');
  const [amount, setAmount] = useState('100');
  const [paymentMethod, setPaymentMethod] = useState('СБП QR');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [calc, setCalc] = useState({ usd: 0, rate: 84, commission: 0, total: 0 });

  const cardTypes = ['Для покупок', 'Универсальная', 'Для Apple Pay и Google Pay', 'Для рекламы', 'Пластиковая'];
  
  const bins = [
    { id: 'bin1', title: 'USD BIN 448591', type: 'MasterCard', fee: 3, desc: 'Хорошо подходит для подписок' },
    { id: 'bin2', title: 'EUR BIN 531992', type: 'Visa', fee: 2.5, desc: 'Идеально для Европы' },
    { id: 'bin3', title: 'USD BIN 404038', type: 'Visa Premium', fee: 2, desc: 'Premium BIN, работает везде' },
  ];

  const paymentMethods = ['СБП QR', 'Крипто −5%', 'P2P', 'Счёт ЛК'];

  useEffect(() => {
    const numAmount = parseFloat(amount) || 0;
    const selectedBin = bins.find(b => b.id === bin);
    const feePercent = selectedBin ? selectedBin.fee : 0;
    const cryptoDiscount = paymentMethod === 'Крипто −5%' ? 0.95 : 1;
    
    const feeAmount = numAmount * (feePercent / 100);
    const totalUsd = numAmount + feeAmount;
    const rate = 84;
    const totalRub = totalUsd * rate * cryptoDiscount;
    
    setCalc({
      usd: numAmount,
      rate,
      commission: feeAmount,
      total: totalRub
    });
  }, [amount, bin, paymentMethod]);

  const handleOrder = () => {
    setIsModalOpen(true);
  };

  return (
    <MainLayout>
      <div className="min-h-screen bg-[#F8F9FE] py-12">
        <div className="container mx-auto px-4 max-w-3xl">
          
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Выпуск новой карты</h1>
            <p className="text-secondary-foreground">Настройте карту под ваши задачи</p>
          </div>

          <div className="bg-white rounded-[32px] p-6 md:p-10 shadow-sm border border-border">
            
            {/* Step 1 */}
            <div className="mb-10">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-primary text-white text-sm flex items-center justify-center">1</span>
                Выберите тип карты
              </h3>
              <div className="flex flex-wrap gap-2">
                {cardTypes.map(t => (
                  <button
                    key={t}
                    onClick={() => setCardType(t)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      cardType === t 
                        ? 'bg-gradient-gemini text-white shadow-md' 
                        : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2 */}
            <div className="mb-10">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-primary text-white text-sm flex items-center justify-center">2</span>
                Выберите BIN
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {bins.map(b => (
                  <div 
                    key={b.id}
                    onClick={() => setBin(b.id)}
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition-all relative ${
                      bin === b.id 
                        ? 'border-primary bg-primary/5' 
                        : 'border-border hover:border-primary/30 bg-white'
                    }`}
                  >
                    {bin === b.id && <CheckCircle2 className="absolute top-3 right-3 w-5 h-5 text-primary" />}
                    <div className="font-bold text-sm mb-1 pr-6">{b.title}</div>
                    <div className="text-xs text-secondary-foreground mb-3">{b.type}</div>
                    <div className="inline-block px-2 py-1 bg-secondary rounded text-xs font-medium mb-2">
                      Комиссия {b.fee}%
                    </div>
                    <div className="text-xs text-muted-foreground leading-tight">{b.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Step 3 */}
            <div className="mb-10">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-primary text-white text-sm flex items-center justify-center">3</span>
                Сумма пополнения ($)
              </h3>
              <div className="relative max-w-sm">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl font-medium text-muted-foreground">$</span>
                <Input 
                  type="number" 
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="pl-8 text-xl h-14 rounded-2xl"
                  min="10"
                  max="10000"
                />
              </div>
              <p className="text-xs text-secondary-foreground mt-2 flex items-center gap-1">
                <Info className="w-3 h-3" /> Минимум $10, Максимум $10,000
              </p>
            </div>

            {/* Step 4 */}
            <div className="mb-10">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-primary text-white text-sm flex items-center justify-center">4</span>
                Способ оплаты
              </h3>
              <div className="flex flex-wrap gap-2">
                {paymentMethods.map(m => (
                  <button
                    key={m}
                    onClick={() => setPaymentMethod(m)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      paymentMethod === m 
                        ? 'bg-primary text-white shadow-md' 
                        : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            {/* Summary */}
            <div className="bg-[#F8F9FE] p-6 rounded-2xl border border-border mb-8">
              <h4 className="font-bold mb-4">Итого к оплате</h4>
              <div className="space-y-2 text-sm mb-4">
                <div className="flex justify-between">
                  <span className="text-secondary-foreground">Сумма пополнения</span>
                  <span className="font-medium">${calc.usd.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondary-foreground">Комиссия выпуска</span>
                  <span className="font-medium">${calc.commission.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondary-foreground">Курс</span>
                  <span className="font-medium">{calc.rate} ₽</span>
                </div>
                {paymentMethod === 'Крипто −5%' && (
                  <div className="flex justify-between text-green-600">
                    <span>Скидка за крипту</span>
                    <span className="font-medium">−5%</span>
                  </div>
                )}
              </div>
              <div className="border-t border-border pt-4 flex justify-between items-end">
                <span className="font-bold text-lg">Итого:</span>
                <span className="text-3xl font-bold text-primary">
                  {new Intl.NumberFormat('ru-RU').format(Math.round(calc.total))} ₽
                </span>
              </div>
            </div>

            <Button 
              onClick={handleOrder}
              className="w-full h-14 rounded-full text-lg font-bold bg-gradient-gemini text-white shadow-lg hover:shadow-xl transition-all"
            >
              Оформить заказ <ChevronRight className="w-5 h-5 ml-1" />
            </Button>
            <p className="text-center text-xs text-secondary-foreground mt-4">
              Нажимая кнопку, вы соглашаетесь с условиями выпуска карты
            </p>
          </div>

        </div>
      </div>
      
      <ConfirmationModal 
        open={isModalOpen} 
        onOpenChange={setIsModalOpen}
        title="Заявка на выпуск принята!"
        description="Менеджер свяжется с вами в Telegram в течение 5 минут для подтверждения оплаты и выдачи реквизитов карты."
      />
    </MainLayout>
  );
}
