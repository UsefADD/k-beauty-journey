
import React, { useState } from 'react';
import { ShoppingBag, Heart, Search, Droplets, Brush, Beaker, Sparkles, Eye, Sun, Umbrella, Scissors, Globe, Settings, Package } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { useLanguage } from '../contexts/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';
import SearchDialog from './SearchDialog';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { useUserRole } from '../hooks/useUserRole';
import UserMenu from './UserMenu';
import { Button } from "@/components/ui/button";

const Navbar = () => {
  console.info('Render: Navbar');
  const { t } = useLanguage();
  const [searchOpen, setSearchOpen] = useState(false);
  const { totalItems } = useCart();
  const { user } = useAuth();
  const { isAdmin } = useUserRole();

  return <>
      <div className="text-black py-1 overflow-hidden whitespace-nowrap relative border-b border-gray-100" style={{background: 'var(--gradient-pastel)'}}>
        <div className="animate-marquee inline-block">
          <span className="mx-4 font-medium">{t('shipping.banner')}</span>
          <span className="mx-4 font-medium">{t('shipping.banner')}</span>
          <span className="mx-4 font-medium">{t('shipping.banner')}</span>
        </div>
      </div>
      
      <nav className="bg-white py-4 shadow-sm sticky top-0 z-50">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
          <Link to="/" className="text-2xl font-serif font-bold text-black mb-4 md:mb-0">
            BLISSFUL.
          </Link>
          
          <div className="space-x-4 md:space-x-6 text-black text-sm font-bold mb-4 md:mb-0 flex items-center">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="hover:text-gray-800 transition-colors bg-transparent">{t('shop.all')}</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="flex w-[900px] p-4">
                        <div className="w-1/3 pr-4">
                           <div className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-gray-50 to-gray-100 p-4 no-underline outline-none focus:shadow-md">
                             <div className="text-lg font-medium text-black">{t('product.type')}</div>
                            <div className="mt-4 grid grid-cols-2 gap-2">
                               <Link to="/shop/product-type/double-nettoyage" className="group flex items-center rounded-md bg-white p-2 text-sm font-medium transition-colors hover:bg-gray-100">
                                 <Droplets className="mr-2 h-4 w-4 text-black" />
                                <span>{t('double.cleansing')}</span>
                              </Link>
                               <Link to="/shop/product-type/exfoliations" className="group flex items-center rounded-md bg-white p-2 text-sm font-medium transition-colors hover:bg-gray-100">
                                 <Brush className="mr-2 h-4 w-4 text-black" />
                                <span>{t('exfoliations')}</span>
                              </Link>
                              <Link to="/shop/product-type/lotions" className="group flex items-center rounded-md bg-white p-2 text-sm font-medium transition-colors hover:bg-gray-100">
                                 <Droplets className="mr-2 h-4 w-4 text-black" />
                                <span>{t('toning.lotions')}</span>
                              </Link>
                              <Link to="/shop/product-type/traitements" className="group flex items-center rounded-md bg-white p-2 text-sm font-medium transition-colors hover:bg-gray-100">
                                <Beaker className="mr-2 h-4 w-4 text-black" />
                                <span>{t('treatments')}</span>
                              </Link>
                              <Link to="/shop/product-type/masques" className="group flex items-center rounded-md bg-white p-2 text-sm font-medium transition-colors hover:bg-gray-100">
                                <Sparkles className="mr-2 h-4 w-4 text-black" />
                                <span>{t('masks')}</span>
                              </Link>
                              <Link to="/shop/product-type/soin-yeux" className="group flex items-center rounded-md bg-white p-2 text-sm font-medium transition-colors hover:bg-gray-100">
                                <Eye className="mr-2 h-4 w-4 text-black" />
                                <span>{t('eye.care')}</span>
                              </Link>
                              <Link to="/shop/product-type/hydratants" className="group flex items-center rounded-md bg-white p-2 text-sm font-medium transition-colors hover:bg-gray-100">
                                <Droplets className="mr-2 h-4 w-4 text-black" />
                                <span>{t('moisturizers')}</span>
                              </Link>
                              <Link to="/shop/product-type/protection" className="group flex items-center rounded-md bg-white p-2 text-sm font-medium transition-colors hover:bg-gray-100">
                                <Sun className="mr-2 h-4 w-4 text-black" />
                                <span>{t('sun.protection')}</span>
                              </Link>
                              <Link to="/shop/product-type/cheveux-corps" className="group flex items-center rounded-md bg-white p-2 text-sm font-medium transition-colors hover:bg-gray-100">
                                <Umbrella className="mr-2 h-4 w-4 text-black" />
                                <span>{t('hair.body')}</span>
                              </Link>
                              <Link to="/shop/product-type/maquillage" className="group flex items-center rounded-md bg-white p-2 text-sm font-medium transition-colors hover:bg-gray-100">
                                <Scissors className="mr-2 h-4 w-4 text-black" />
                                <span>{t('makeup.tools')}</span>
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div className="w-1/3 px-4">
                           <div className="block h-full select-none space-y-1 rounded-md p-4 leading-none no-underline outline-none transition-colors hover:bg-gray-50 hover:text-black bg-gradient-to-b from-gray-50 to-gray-100">
                             <div className="text-lg font-medium leading-none text-black">{t('skin.type')}</div>
                             <p className="line-clamp-2 text-sm leading-snug text-black mt-2">
                              {t('skin.type.description')}
                            </p>
                            <div className="mt-4 grid grid-cols-2 gap-2">
                              <Link to="/shop/skin-type/oily" className="group flex items-center rounded-md bg-white p-2 text-sm font-medium transition-colors hover:bg-gray-100">
                                <span>{t('oily')}</span>
                              </Link>
                              <Link to="/shop/skin-type/dry" className="group flex items-center rounded-md bg-white p-2 text-sm font-medium transition-colors hover:bg-gray-100">
                                <span>{t('dry')}</span>
                              </Link>
                              <Link to="/shop/skin-type/combination" className="group flex items-center rounded-md bg-white p-2 text-sm font-medium transition-colors hover:bg-gray-100">
                                <span>{t('combination')}</span>
                              </Link>
                              <Link to="/shop/skin-type/normal" className="group flex items-center rounded-md bg-white p-2 text-sm font-medium transition-colors hover:bg-pink-100">
                                <span>{t('normal')}</span>
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div className="w-1/3 pl-4">
                           <div className="block h-full select-none space-y-1 rounded-md p-4 leading-none no-underline outline-none transition-colors hover:bg-gray-50 hover:text-black bg-gradient-to-b from-gray-50 to-gray-100">
                             <div className="text-lg font-medium leading-none text-black">{t('skin.concern')}</div>
                             <p className="line-clamp-2 text-sm leading-snug text-black mt-2">
                              {t('skin.concern.description')}
                            </p>
                            <div className="mt-4 grid grid-cols-2 gap-2">
                              <Link to="/shop/skin-concern/acne" className="group flex items-center rounded-md bg-white p-2 text-sm font-medium transition-colors hover:bg-pink-100">
                                <span>{t('acne')}</span>
                              </Link>
                              <Link to="/shop/skin-concern/dehydration" className="group flex items-center rounded-md bg-white p-2 text-sm font-medium transition-colors hover:bg-pink-100">
                                <span>{t('dehydration')}</span>
                              </Link>
                              <Link to="/shop/skin-concern/sebum-control" className="group flex items-center rounded-md bg-white p-2 text-sm font-medium transition-colors hover:bg-pink-100">
                                <span>{t('sebum.control')}</span>
                              </Link>
                              <Link to="/shop/skin-concern/pigmentation" className="group flex items-center rounded-md bg-white p-2 text-sm font-medium transition-colors hover:bg-pink-100">
                                <span>{t('pigmentation')}</span>
                              </Link>
                              <Link to="/shop/skin-concern/redness" className="group flex items-center rounded-md bg-white p-2 text-sm font-medium transition-colors hover:bg-pink-100">
                                <span>{t('redness')}</span>
                              </Link>
                              <Link to="/shop/skin-concern/sensitive" className="group flex items-center rounded-md bg-white p-2 text-sm font-medium transition-colors hover:bg-pink-100">
                                <span>{t('sensitive')}</span>
                              </Link>
                              <Link to="/shop/skin-concern/aging" className="group flex items-center rounded-md bg-white p-2 text-sm font-medium transition-colors hover:bg-pink-100">
                                <span>{t('anti.aging')}</span>
                              </Link>
                            </div>
                          </div>
                        </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            <Link to="/shop/best-sellers" className="hover:text-gray-800 transition-colors zigzag-underline">
              {t('best.sellers')}
            </Link>
            <Link to="/brands" className="hover:text-gray-800 transition-colors zigzag-underline">
              {t('brands')}
            </Link>
            {/* Admin Orders Link - Only for admins */}
            {isAdmin && (
              <Link to="/admin/orders" className="hover:text-gray-800 transition-colors zigzag-underline flex items-center gap-1">
                <Settings className="w-4 h-4" />
                Orders
              </Link>
            )}
            
            {/* My Orders Link - Only for regular customers */}
            {user && !isAdmin && (
              <Link to="/profile" className="hover:text-gray-800 transition-colors zigzag-underline flex items-center gap-1">
                <Package className="w-4 h-4" />
                My Orders
              </Link>
            )}
          </div>
          
          <div className="space-x-6 text-black flex items-center">
            <Search 
              className="w-5 h-5 hover:text-gray-800 cursor-pointer transition-colors" 
              onClick={() => setSearchOpen(true)}
            />
            <Button className="h-8 px-3 hidden sm:inline-flex" variant="default" onClick={() => setSearchOpen(true)}>
              Rechercher
            </Button>
            <UserMenu />
            <Heart className="w-5 h-5 hover:text-gray-800 cursor-pointer transition-colors" />
            <div className="relative inline-flex items-center">
              <Link to="/cart">
                <ShoppingBag className="w-5 h-5 hover:text-gray-800 cursor-pointer transition-colors" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-black text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow">
                    {totalItems}
                  </span>
                )}
              </Link>
            </div>
            <LanguageSwitcher />
          </div>
        </div>
      </nav>
      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
      <style>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </>;
};
export default Navbar;
