
import React from 'react';
import { ShoppingBag, Heart, User, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <>
      <header className="bg-knude-100 py-2 text-center text-sm text-knude-800">
        FREE U.S. SHIPPING $50+ / INT'L SHIPPING $75+
      </header>
      <nav className="bg-white py-4 shadow-sm sticky top-0 z-50">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
          <Link to="/" className="text-2xl font-serif font-bold text-knude-800 mb-4 md:mb-0">
            SOKO GLAM
          </Link>
          
          <div className="space-x-4 md:space-x-8 text-knude-700 text-sm font-medium mb-4 md:mb-0">
            <Link to="/shop" className="hover:text-knude-900 transition-colors">SHOP ALL</Link>
            <a className="hover:text-knude-900 transition-colors" href="#">DISCOVER K-BEAUTY</a>
            <a className="hover:text-knude-900 transition-colors" href="#">BEST SELLERS</a>
            <Link to="/brands" className="hover:text-knude-900 transition-colors">BRANDS</Link>
          </div>
          
          <div className="space-x-6 text-knude-700 flex">
            <Search className="w-5 h-5 hover:text-knude-900 cursor-pointer transition-colors" />
            <User className="w-5 h-5 hover:text-knude-900 cursor-pointer transition-colors" />
            <Heart className="w-5 h-5 hover:text-knude-900 cursor-pointer transition-colors" />
            <ShoppingBag className="w-5 h-5 hover:text-knude-900 cursor-pointer transition-colors" />
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
