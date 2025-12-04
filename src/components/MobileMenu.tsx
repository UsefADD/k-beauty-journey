import React from 'react';
import { Link } from 'react-router-dom';
import { X, ChevronDown, Settings, Package, Droplets, Brush, Beaker, Sparkles, Eye, Sun, Umbrella, Scissors } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { useUserRole } from '../hooks/useUserRole';
import { Menu } from 'lucide-react';

interface MobileMenuProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const MobileMenu = ({ open, onOpenChange }: MobileMenuProps) => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { isAdmin } = useUserRole();

  const productTypes = [
    { to: '/shop/product-type/double-nettoyage', label: t('double.cleansing'), icon: Droplets },
    { to: '/shop/product-type/exfoliations', label: t('exfoliations'), icon: Brush },
    { to: '/shop/product-type/lotions', label: t('toning.lotions'), icon: Droplets },
    { to: '/shop/product-type/traitements', label: t('treatments'), icon: Beaker },
    { to: '/shop/product-type/masques', label: t('masks'), icon: Sparkles },
    { to: '/shop/product-type/soin-yeux', label: t('eye.care'), icon: Eye },
    { to: '/shop/product-type/hydratants', label: t('moisturizers'), icon: Droplets },
    { to: '/shop/product-type/protection-solaire', label: t('sun.protection'), icon: Sun },
    { to: '/shop/product-type/cheveux-corps', label: t('hair.body'), icon: Umbrella },
    { to: '/shop/product-type/maquillage', label: t('makeup.tools'), icon: Scissors },
  ];

  const skinTypes = [
    { to: '/shop/skin-type/oily', label: t('oily') },
    { to: '/shop/skin-type/dry', label: t('dry') },
    { to: '/shop/skin-type/combination', label: t('combination') },
    { to: '/shop/skin-type/normal', label: t('normal') },
  ];

  const skinConcerns = [
    { to: '/shop/skin-concern/acne', label: t('acne') },
    { to: '/shop/skin-concern/dehydration', label: t('dehydration') },
    { to: '/shop/skin-concern/sebum-control', label: t('sebum.control') },
    { to: '/shop/skin-concern/pigmentation', label: t('pigmentation') },
    { to: '/shop/skin-concern/redness', label: t('redness') },
    { to: '/shop/skin-concern/sensitive', label: t('sensitive') },
    { to: '/shop/skin-concern/aging', label: t('anti.aging') },
  ];

  const handleLinkClick = () => {
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="w-[300px] sm:w-[350px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-left font-serif text-xl">BLISSFUL.</SheetTitle>
        </SheetHeader>
        
        <div className="mt-6 space-y-4">
          {/* Product Types */}
          <Collapsible>
            <CollapsibleTrigger className="flex items-center justify-between w-full py-2 text-sm font-semibold">
              {t('product.type')}
              <ChevronDown className="h-4 w-4" />
            </CollapsibleTrigger>
            <CollapsibleContent className="pl-4 space-y-2 mt-2">
              {productTypes.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={handleLinkClick}
                  className="flex items-center gap-2 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              ))}
            </CollapsibleContent>
          </Collapsible>

          {/* Skin Types */}
          <Collapsible>
            <CollapsibleTrigger className="flex items-center justify-between w-full py-2 text-sm font-semibold">
              {t('skin.type')}
              <ChevronDown className="h-4 w-4" />
            </CollapsibleTrigger>
            <CollapsibleContent className="pl-4 space-y-2 mt-2">
              {skinTypes.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={handleLinkClick}
                  className="block py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </CollapsibleContent>
          </Collapsible>

          {/* Skin Concerns */}
          <Collapsible>
            <CollapsibleTrigger className="flex items-center justify-between w-full py-2 text-sm font-semibold">
              {t('skin.concern')}
              <ChevronDown className="h-4 w-4" />
            </CollapsibleTrigger>
            <CollapsibleContent className="pl-4 space-y-2 mt-2">
              {skinConcerns.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={handleLinkClick}
                  className="block py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </CollapsibleContent>
          </Collapsible>

          {/* Direct Links */}
          <div className="border-t pt-4 space-y-3">
            <Link
              to="/shop/best-sellers"
              onClick={handleLinkClick}
              className="block py-2 text-sm font-semibold hover:text-muted-foreground transition-colors"
            >
              {t('best.sellers')}
            </Link>
            <Link
              to="/brands"
              onClick={handleLinkClick}
              className="block py-2 text-sm font-semibold hover:text-muted-foreground transition-colors"
            >
              {t('brands')}
            </Link>
            
            {isAdmin && (
              <Link
                to="/admin/orders"
                onClick={handleLinkClick}
                className="flex items-center gap-2 py-2 text-sm font-semibold hover:text-muted-foreground transition-colors"
              >
                <Settings className="h-4 w-4" />
                Orders
              </Link>
            )}
            
            {user && !isAdmin && (
              <Link
                to="/profile"
                onClick={handleLinkClick}
                className="flex items-center gap-2 py-2 text-sm font-semibold hover:text-muted-foreground transition-colors"
              >
                <Package className="h-4 w-4" />
                My Orders
              </Link>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
