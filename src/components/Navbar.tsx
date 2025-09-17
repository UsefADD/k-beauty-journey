
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, User, Search, Menu } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import UserMenu from './UserMenu';
import SearchDialog from './SearchDialog';

const Navbar = () => {
  const { user } = useAuth();
  const { totalItems } = useCart();
  const location = useLocation();
  const [searchOpen, setSearchOpen] = useState(false);

  const navItems = [
    { name: 'Skincare', path: '/shop' },
    { name: 'CHEVEUX & CORPS', path: '/shop/hair-body' },
    { name: 'MAQUILLAGE & ACCESSOIRES', path: '/shop/makeup' },
    { name: 'COLLECTIONS', path: '/shop/collections' },
    { name: 'NOUVEAU', path: '/shop/newly-curated' },
    { name: 'MARQUES', path: '/brands' },
    { name: 'AIDE', path: '/help' },
    { name: 'SOLDES', path: '/shop/sale' },
  ];

  return (
    <>
      {/* Promotion banner */}
      <div className="bg-gradient-to-r from-secondary to-accent text-center py-3 text-sm">
        <div className="container mx-auto px-4">
          Expédition le jour même | Masque gratuit à partir de 40€ | Livraison gratuite à partir de 50€
        </div>
      </div>

      {/* Main navbar */}
      <nav className="sticky top-0 z-50 w-full bg-white shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="text-xl font-bold" style={{ color: 'hsl(var(--primary))' }}>
              korean skincare.fr
            </Link>

            {/* Navigation Links - Hidden on mobile */}
            <div className="hidden lg:flex items-center space-x-6">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`text-sm font-medium transition-colors duration-200 ${
                    location.pathname === item.path
                      ? 'text-primary'
                      : 'text-foreground hover:text-primary'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Right side icons */}
            <div className="flex items-center space-x-5">
              <Search 
                className="w-5 h-5 text-foreground hover:text-primary cursor-pointer transition-colors"
                onClick={() => setSearchOpen(true)}
              />
              
              {user ? (
                <UserMenu />
              ) : (
                <Link to="/auth" className="text-foreground hover:text-primary transition-colors">
                  <User className="w-5 h-5" />
                </Link>
              )}
              
              <Link to="/cart" className="relative text-foreground hover:text-primary transition-colors">
                <ShoppingBag className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Link>
              
              {/* Mobile menu button */}
              <button className="lg:hidden text-foreground hover:text-primary">
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  );
};

export default Navbar;
