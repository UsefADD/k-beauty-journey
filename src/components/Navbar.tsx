
import React from 'react';
import { ShoppingBag, Heart, User, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

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
          
          <div className="space-x-4 md:space-x-8 text-cream-700 text-sm font-medium mb-4 md:mb-0">
            <Link to="/shop" className="hover:text-cream-900 transition-colors">SHOP ALL</Link>
            <a className="hover:text-cream-900 transition-colors" href="#">DISCOVER K-BEAUTY</a>
            <a className="hover:text-cream-900 transition-colors" href="#">BEST SELLERS</a>
            <Link to="/brands" className="hover:text-cream-900 transition-colors">BRANDS</Link>
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
