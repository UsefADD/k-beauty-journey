import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LanguageSwitcher from './LanguageSwitcher';
import CartIcon from './CartIcon';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-bold text-pink-600">
            My Skincare
          </Link>
          
          <div className="hidden md:flex space-x-4">
            <Link to="/shop" className="hover:text-pink-500">Shop</Link>
            <Link to="/brands" className="hover:text-pink-500">Brands</Link>
            <Link to="/shop/newly-curated" className="hover:text-pink-500">Newly Curated</Link>
            <Link to="/shop/viral" className="hover:text-pink-500">Viral</Link>
            <Link to="/shop/best-sellers" className="hover:text-pink-500">Best Sellers</Link>
          </div>

          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-gray-500 hover:text-pink-500 focus:outline-none focus:text-pink-500">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
          
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <CartIcon />
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-gray-50 py-2">
          <div className="container mx-auto px-4 flex flex-col space-y-2">
            <Link to="/shop" className="hover:text-pink-500">Shop</Link>
            <Link to="/brands" className="hover:text-pink-500">Brands</Link>
            <Link to="/shop/newly-curated" className="hover:text-pink-500">Newly Curated</Link>
            <Link to="/shop/viral" className="hover:text-pink-500">Viral</Link>
            <Link to="/shop/best-sellers" className="hover:text-pink-500">Best Sellers</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
