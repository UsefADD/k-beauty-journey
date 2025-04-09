
import React from 'react';
import { ShoppingBag, Heart, User, Search } from 'lucide-react';
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
          
          <div className="space-x-4 md:space-x-6 text-cream-700 text-sm font-medium mb-4 md:mb-0">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="hover:text-cream-900 transition-colors bg-transparent">SHOP ALL</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4">
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            to="/shop/product-type"
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-pink-50 hover:text-pink-600"
                          >
                            <div className="text-sm font-medium leading-none">TYPE DE PRODUIT</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Shop by product categories including cleansers, toners, and more
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            to="/shop/skin-type"
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-pink-50 hover:text-pink-600"
                          >
                            <div className="text-sm font-medium leading-none">TYPE DE PEAU</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Find products specifically formulated for your skin type
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            to="/shop/skin-concern"
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-pink-50 hover:text-pink-600"
                          >
                            <div className="text-sm font-medium leading-none">PROBLÈMES DE PEAU</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Target specific skin concerns with specialized products
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    </ul>
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
