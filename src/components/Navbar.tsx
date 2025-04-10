
import React from 'react';
import { ShoppingBag, Heart, User, Search, Droplets, Brush, Beaker, Sparkles, Eye, Sun, Umbrella, Scissors } from 'lucide-react';
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

const Navbar = () => {
  return <>
      <div className="bg-pink-600 text-white py-1 overflow-hidden whitespace-nowrap relative">
        <div className="animate-marquee inline-block">
          <span className="mx-4">Livraison gratuite pour toute commande +500 dhs & cadeau offert</span>
          <span className="mx-4">Livraison gratuite pour toute commande +500 dhs & cadeau offert</span>
          <span className="mx-4">Livraison gratuite pour toute commande +500 dhs & cadeau offert</span>
        </div>
      </div>
      
      <nav className="bg-white py-4 shadow-sm sticky top-0 z-50">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
          <Link to="/" className="text-2xl font-serif font-bold text-cream-800 mb-4 md:mb-0">
            BLISSFUL.
          </Link>
          
          <div className="space-x-4 md:space-x-6 text-cream-700 text-sm font-medium mb-4 md:mb-0 flex items-center">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="hover:text-cream-900 transition-colors bg-transparent">SHOP ALL</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="flex w-[900px] p-4">
                      <div className="w-1/3 pr-4">
                        <NavigationMenuLink asChild>
                          <Link
                            to="/shop/product-type"
                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-pink-50 to-pink-100 p-4 no-underline outline-none focus:shadow-md"
                          >
                            <div className="text-lg font-medium text-pink-800">TYPE DE PRODUIT</div>
                            <div className="mt-4 grid grid-cols-2 gap-2">
                              <Link to="/shop/product-type/double-nettoyage" className="group flex items-center rounded-md bg-white p-2 text-sm font-medium transition-colors hover:bg-pink-100">
                                <Droplets className="mr-2 h-4 w-4 text-pink-600" />
                                <span>Double nettoyage</span>
                              </Link>
                              <Link to="/shop/product-type/exfoliations" className="group flex items-center rounded-md bg-white p-2 text-sm font-medium transition-colors hover:bg-pink-100">
                                <Brush className="mr-2 h-4 w-4 text-pink-600" />
                                <span>Exfoliations</span>
                              </Link>
                              <Link to="/shop/product-type/lotions" className="group flex items-center rounded-md bg-white p-2 text-sm font-medium transition-colors hover:bg-pink-100">
                                <Droplets className="mr-2 h-4 w-4 text-pink-600" />
                                <span>Lotions tonifiant</span>
                              </Link>
                              <Link to="/shop/product-type/traitements" className="group flex items-center rounded-md bg-white p-2 text-sm font-medium transition-colors hover:bg-pink-100">
                                <Beaker className="mr-2 h-4 w-4 text-pink-600" />
                                <span>Traitements</span>
                              </Link>
                              <Link to="/shop/product-type/masques" className="group flex items-center rounded-md bg-white p-2 text-sm font-medium transition-colors hover:bg-pink-100">
                                <Sparkles className="mr-2 h-4 w-4 text-pink-600" />
                                <span>Masques</span>
                              </Link>
                              <Link to="/shop/product-type/soin-yeux" className="group flex items-center rounded-md bg-white p-2 text-sm font-medium transition-colors hover:bg-pink-100">
                                <Eye className="mr-2 h-4 w-4 text-pink-600" />
                                <span>Soin des yeux</span>
                              </Link>
                              <Link to="/shop/product-type/hydratants" className="group flex items-center rounded-md bg-white p-2 text-sm font-medium transition-colors hover:bg-pink-100">
                                <Droplets className="mr-2 h-4 w-4 text-pink-600" />
                                <span>Hydratants</span>
                              </Link>
                              <Link to="/shop/product-type/protection" className="group flex items-center rounded-md bg-white p-2 text-sm font-medium transition-colors hover:bg-pink-100">
                                <Sun className="mr-2 h-4 w-4 text-pink-600" />
                                <span>Protection solaire</span>
                              </Link>
                              <Link to="/shop/product-type/cheveux-corps" className="group flex items-center rounded-md bg-white p-2 text-sm font-medium transition-colors hover:bg-pink-100">
                                <Umbrella className="mr-2 h-4 w-4 text-pink-600" />
                                <span>Cheveux & Corps</span>
                              </Link>
                              <Link to="/shop/product-type/maquillage" className="group flex items-center rounded-md bg-white p-2 text-sm font-medium transition-colors hover:bg-pink-100">
                                <Scissors className="mr-2 h-4 w-4 text-pink-600" />
                                <span>Maquillage & Outils</span>
                              </Link>
                            </div>
                          </Link>
                        </NavigationMenuLink>
                      </div>
                      <div className="w-1/3 px-4">
                        <NavigationMenuLink asChild>
                          <Link
                            to="/shop/skin-type"
                            className="block h-full select-none space-y-1 rounded-md p-4 leading-none no-underline outline-none transition-colors hover:bg-pink-50 hover:text-pink-600 bg-gradient-to-b from-pink-50 to-pink-100"
                          >
                            <div className="text-lg font-medium leading-none text-pink-800">TYPE DE PEAU</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground mt-2">
                              Find products specifically formulated for your skin type
                            </p>
                            <div className="mt-4 grid grid-cols-2 gap-2">
                              <Link to="/shop/skin-type/oily" className="group flex items-center rounded-md bg-white p-2 text-sm font-medium transition-colors hover:bg-pink-100">
                                <span>Grasse</span>
                              </Link>
                              <Link to="/shop/skin-type/dry" className="group flex items-center rounded-md bg-white p-2 text-sm font-medium transition-colors hover:bg-pink-100">
                                <span>Sèche</span>
                              </Link>
                              <Link to="/shop/skin-type/combination" className="group flex items-center rounded-md bg-white p-2 text-sm font-medium transition-colors hover:bg-pink-100">
                                <span>Mixte</span>
                              </Link>
                              <Link to="/shop/skin-type/normal" className="group flex items-center rounded-md bg-white p-2 text-sm font-medium transition-colors hover:bg-pink-100">
                                <span>Normal</span>
                              </Link>
                            </div>
                          </Link>
                        </NavigationMenuLink>
                      </div>
                      <div className="w-1/3 pl-4">
                        <NavigationMenuLink asChild>
                          <Link
                            to="/shop/skin-concern"
                            className="block h-full select-none space-y-1 rounded-md p-4 leading-none no-underline outline-none transition-colors hover:bg-pink-50 hover:text-pink-600 bg-gradient-to-b from-pink-50 to-pink-100"
                          >
                            <div className="text-lg font-medium leading-none text-pink-800">PROBLÈMES DE PEAU</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground mt-2">
                              Target specific skin concerns with specialized products
                            </p>
                            <div className="mt-4 grid grid-cols-2 gap-2">
                              <Link to="/shop/skin-concern/acne" className="group flex items-center rounded-md bg-white p-2 text-sm font-medium transition-colors hover:bg-pink-100">
                                <span>Acné</span>
                              </Link>
                              <Link to="/shop/skin-concern/dehydration" className="group flex items-center rounded-md bg-white p-2 text-sm font-medium transition-colors hover:bg-pink-100">
                                <span>Déshydratation</span>
                              </Link>
                              <Link to="/shop/skin-concern/sebum-control" className="group flex items-center rounded-md bg-white p-2 text-sm font-medium transition-colors hover:bg-pink-100">
                                <span>Contrôle de sébum/Pores</span>
                              </Link>
                              <Link to="/shop/skin-concern/pigmentation" className="group flex items-center rounded-md bg-white p-2 text-sm font-medium transition-colors hover:bg-pink-100">
                                <span>Pigmentation</span>
                              </Link>
                              <Link to="/shop/skin-concern/redness" className="group flex items-center rounded-md bg-white p-2 text-sm font-medium transition-colors hover:bg-pink-100">
                                <span>Rougeurs</span>
                              </Link>
                              <Link to="/shop/skin-concern/sensitive" className="group flex items-center rounded-md bg-white p-2 text-sm font-medium transition-colors hover:bg-pink-100">
                                <span>Sensible</span>
                              </Link>
                              <Link to="/shop/skin-concern/aging" className="group flex items-center rounded-md bg-white p-2 text-sm font-medium transition-colors hover:bg-pink-100">
                                <span>Anti-âge</span>
                              </Link>
                            </div>
                          </Link>
                        </NavigationMenuLink>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            <a className="hover:text-cream-900 transition-colors zigzag-underline" href="#">DISCOVER K-BEAUTY</a>
            <Link to="/shop/best-sellers" className="hover:text-cream-900 transition-colors zigzag-underline">BEST SELLERS</Link>
            <Link to="/brands" className="hover:text-cream-900 transition-colors zigzag-underline">BRANDS</Link>
          </div>
          
          <div className="space-x-6 text-cream-700 flex">
            <Search className="w-5 h-5 hover:text-cream-900 cursor-pointer transition-colors" />
            <User className="w-5 h-5 hover:text-cream-900 cursor-pointer transition-colors" />
            <Heart className="w-5 h-5 hover:text-cream-900 cursor-pointer transition-colors" />
            <ShoppingBag className="w-5 h-5 hover:text-cream-900 cursor-pointer transition-colors" />
          </div>
        </div>
      </nav>
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
