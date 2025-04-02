
import React from 'react';
import { ShoppingBag, Heart, User, Search } from 'lucide-react';

const Navbar = () => {
  return (
    <>
      <header className="bg-kblue-50 py-2 text-center text-sm text-gray-600">
        FREE U.S. SHIPPING $50+ / INT'L SHIPPING $75+
      </header>
      <nav className="bg-white py-4 shadow-sm sticky top-0 z-50">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
          <div className="text-2xl font-serif font-bold text-kblue-800 mb-4 md:mb-0">
            SOKO GLAM
          </div>
          
          <div className="space-x-4 md:space-x-8 text-gray-700 text-sm font-medium mb-4 md:mb-0">
            <a className="hover:text-kblue-700 transition-colors" href="#">SHOP ALL</a>
            <a className="hover:text-kblue-700 transition-colors" href="#">DISCOVER K-BEAUTY</a>
            <a className="hover:text-kblue-700 transition-colors" href="#">BEST SELLERS</a>
            <a className="hover:text-kblue-700 transition-colors" href="#">BRANDS</a>
          </div>
          
          <div className="space-x-6 text-gray-700 flex">
            <Search className="w-5 h-5 hover:text-kblue-700 cursor-pointer transition-colors" />
            <User className="w-5 h-5 hover:text-kblue-700 cursor-pointer transition-colors" />
            <Heart className="w-5 h-5 hover:text-kblue-700 cursor-pointer transition-colors" />
            <ShoppingBag className="w-5 h-5 hover:text-kblue-700 cursor-pointer transition-colors" />
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
