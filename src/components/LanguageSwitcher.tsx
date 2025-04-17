
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe } from 'lucide-react';

const LanguageSwitcher = () => {
  const { language, toggleLanguage, t } = useLanguage();

  // Get the setLanguage function from context
  const context = useLanguage();
  const setLanguage = (lang: string) => {
    if (context.language !== lang) {
      context.toggleLanguage();
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-transparent">
          <Globe className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem 
          onClick={() => setLanguage('en')}
          className={language === 'en' ? 'bg-pink-50 text-pink-600 font-medium' : ''}
        >
          {t('english')}
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setLanguage('fr')}
          className={language === 'fr' ? 'bg-pink-50 text-pink-600 font-medium' : ''}
        >
          {t('french')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
