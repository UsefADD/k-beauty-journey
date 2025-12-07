import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useLanguage } from '@/contexts/LanguageContext';
import { MessageCircle, CheckCircle, Send, ExternalLink } from 'lucide-react';

interface WhatsAppOrderDialogProps {
  isOpen: boolean;
  onClose: () => void;
  whatsappUrl: string;
  orderNumber: string;
}

const WhatsAppOrderDialog: React.FC<WhatsAppOrderDialogProps> = ({
  isOpen,
  onClose,
  whatsappUrl,
  orderNumber
}) => {
  const { t, isRTL } = useLanguage();

  const handleOpenWhatsApp = () => {
    window.open(whatsappUrl, '_blank');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`sm:max-w-md ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-green-600">
            <CheckCircle className="h-6 w-6" />
            {t('whatsapp.dialog.title')}
          </DialogTitle>
          <DialogDescription className="text-base">
            {t('whatsapp.dialog.order.number')}: <strong>{orderNumber}</strong>
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          {/* Step 1 */}
          <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
            <div className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">
              1
            </div>
            <div>
              <p className="font-medium text-green-800">{t('whatsapp.step1.title')}</p>
              <p className="text-sm text-green-700">{t('whatsapp.step1.desc')}</p>
            </div>
          </div>
          
          {/* Step 2 */}
          <div className="flex items-start gap-3 p-3 bg-amber-50 rounded-lg border border-amber-200">
            <div className="flex-shrink-0 w-8 h-8 bg-amber-600 text-white rounded-full flex items-center justify-center font-bold">
              2
            </div>
            <div>
              <p className="font-medium text-amber-800">{t('whatsapp.step2.title')}</p>
              <p className="text-sm text-amber-700">{t('whatsapp.step2.desc')}</p>
            </div>
          </div>
          
          {/* Step 3 */}
          <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
              3
            </div>
            <div>
              <p className="font-medium text-blue-800">{t('whatsapp.step3.title')}</p>
              <p className="text-sm text-blue-700">{t('whatsapp.step3.desc')}</p>
            </div>
          </div>
          
          {/* Important notice */}
          <div className="p-3 bg-pink-50 rounded-lg border border-pink-200">
            <p className="text-sm text-pink-800 font-medium flex items-center gap-2">
              <Send className="h-4 w-4" />
              {t('whatsapp.important.notice')}
            </p>
          </div>
        </div>

        <DialogFooter className="flex flex-col gap-2 sm:flex-col">
          <Button 
            onClick={handleOpenWhatsApp}
            className="w-full bg-green-600 hover:bg-green-700 text-white gap-2"
          >
            <MessageCircle className="h-5 w-5" />
            {t('whatsapp.open.button')}
            <ExternalLink className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            onClick={onClose}
            className="w-full"
          >
            {t('whatsapp.close.button')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default WhatsAppOrderDialog;
