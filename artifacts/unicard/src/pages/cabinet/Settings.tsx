import React, { useState } from 'react';
import { CabinetLayout } from '@/components/layout/CabinetLayout';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';

export default function CabinetSettings() {
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [name, setName] = useState(user?.name || '');
  const [twoFactor, setTwoFactor] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Настройки сохранены",
      description: "Ваши данные успешно обновлены",
    });
  };

  return (
    <CabinetLayout>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Настройки аккаунта</h1>

        <form onSubmit={handleSave} className="space-y-6">
          
          <div className="bg-white rounded-[32px] p-6 md:p-8 border border-border shadow-sm">
            <h3 className="font-bold text-lg mb-6">Профиль</h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Имя</label>
                <Input 
                  value={name} 
                  onChange={(e) => setName(e.target.value)}
                  className="h-12 rounded-xl bg-secondary/50 border-transparent" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email <span className="text-muted-foreground font-normal">(нельзя изменить)</span></label>
                <Input 
                  value={user?.email || ''} 
                  disabled
                  className="h-12 rounded-xl bg-secondary/20 border-transparent opacity-70" 
                />
              </div>
              <div className="space-y-2 pt-2">
                <label className="text-sm font-medium">Язык интерфейса</label>
                <div className="flex gap-2">
                  <div className="px-4 py-2 rounded-xl bg-primary/10 border border-primary/20 text-primary font-bold text-sm cursor-pointer">
                    🇷🇺 Русский
                  </div>
                  <div className="px-4 py-2 rounded-xl bg-secondary border border-border text-secondary-foreground font-medium text-sm cursor-pointer hover:bg-secondary/80">
                    🇬🇧 English
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[32px] p-6 md:p-8 border border-border shadow-sm">
            <h3 className="font-bold text-lg mb-6">Безопасность</h3>
            
            <div className="flex items-center justify-between p-4 bg-[#F8F9FE] rounded-2xl border border-border mb-4">
              <div>
                <p className="font-bold">Двухфакторная аутентификация</p>
                <p className="text-sm text-secondary-foreground">Защитите аккаунт кодом из приложения</p>
              </div>
              <Switch checked={twoFactor} onCheckedChange={setTwoFactor} />
            </div>

            <Button variant="outline" type="button" className="w-full h-12 rounded-xl border-border">
              Изменить пароль
            </Button>
          </div>

          <div className="flex justify-end gap-4">
            <Button type="submit" className="h-12 px-8 rounded-full font-bold bg-foreground text-white hover:bg-primary transition-all">
              Сохранить изменения
            </Button>
          </div>
          
        </form>
      </div>
    </CabinetLayout>
  );
}
