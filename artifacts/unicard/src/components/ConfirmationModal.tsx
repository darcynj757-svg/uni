import React from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { CheckCircle2 } from 'lucide-react';
import { SiTelegram } from 'react-icons/si';

interface ConfirmationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
}

export function ConfirmationModal({ 
  open, 
  onOpenChange,
  title = "Заказ создан!",
  description = "Менеджер свяжется с вами в течение 15 минут"
}: ConfirmationModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md rounded-3xl p-8 border-border">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-2">
            <CheckCircle2 className="w-8 h-8 text-green-600" />
          </div>
          
          <DialogTitle className="text-2xl font-bold">{title}</DialogTitle>
          <DialogDescription className="text-base text-secondary-foreground/80">
            {description}
          </DialogDescription>
          
          <div className="w-full flex flex-col gap-3 mt-6">
            <Button 
              className="w-full rounded-full bg-[#2AABEE] hover:bg-[#229ED9] text-white shadow-md flex items-center gap-2"
              onClick={() => window.open('https://t.me/unicard_support', '_blank')}
            >
              <SiTelegram className="w-5 h-5" />
              Написать в Telegram
            </Button>
            <Button 
              variant="outline" 
              className="w-full rounded-full border-border hover:bg-secondary"
              onClick={() => onOpenChange(false)}
            >
              Закрыть
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
