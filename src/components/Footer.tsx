
import React from 'react';
import { Mail, Instagram, Facebook, Twitter } from 'lucide-react';

const Footer = () => {
  return <footer className="bg-white border-t border-kblue-200">
      <div className="bg-kblue-50 py-6 text-center">
        <div className="container mx-auto px-4">
          
          
          
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <input type="email" placeholder="Your email address" className="px-4 py-2 border border-kblue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-kblue-500 max-w-xs w-full" />
            <button className="px-6 py-3 bg-knude-700 hover:bg-knude-800 text-white font-medium tracking-wide transition-colors duration-200 transform rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50 whitespace-nowrap">
              SUBSCRIBE
            </button>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h4 className="font-serif text-lg font-medium text-kpink-900 mb-4">SHOP</h4>
            <ul className="space-y-2 text-kpink-700 text-sm">
              <li><a href="#" className="hover:text-kpink-900">Best Sellers</a></li>
              <li><a href="#" className="hover:text-kpink-900">New Arrivals</a></li>
              <li><a href="#" className="hover:text-kpink-900">K-Beauty Sets</a></li>
              <li><a href="#" className="hover:text-kpink-900">Special Offers</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-serif text-lg font-medium text-kpink-900 mb-4">LEARN</h4>
            <ul className="space-y-2 text-kpink-700 text-sm">
              <li><a href="#" className="hover:text-kpink-900">About K-Beauty</a></li>
              <li><a href="#" className="hover:text-kpink-900">Skincare Guides</a></li>
              <li><a href="#" className="hover:text-kpink-900">Ingredient Library</a></li>
              <li><a href="#" className="hover:text-kpink-900">Skin Types</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-serif text-lg font-medium text-kpink-900 mb-4">ABOUT</h4>
            <ul className="space-y-2 text-kpink-700 text-sm">
              <li><a href="#" className="hover:text-kpink-900">Our Story</a></li>
              <li><a href="#" className="hover:text-kpink-900">Contact Us</a></li>
              <li><a href="#" className="hover:text-kpink-900">FAQ</a></li>
              <li><a href="#" className="hover:text-kpink-900">Shipping & Returns</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-serif text-lg font-medium text-kpink-900 mb-4">CONNECT</h4>
            <div className="flex space-x-4 mb-6">
              <a href="#" className="text-kpink-600 hover:text-kpink-800">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-kpink-600 hover:text-kpink-800">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-kpink-600 hover:text-kpink-800">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-kpink-600 hover:text-kpink-800">
                <Mail className="h-5 w-5" />
              </a>
            </div>
            <p className="text-sm text-kpink-700">
              Join our community for exclusive offers, skincare tips, and inspiration.
            </p>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-kblue-100 text-center">
          <p className="text-sm text-kblue-500">
            &copy; {new Date().getFullYear()} K-Beauty Journey. All rights reserved.
          </p>
          <div className="mt-4 flex justify-center space-x-6 text-xs text-kblue-500">
            <a href="#" className="hover:text-kblue-700">Privacy Policy</a>
            <a href="#" className="hover:text-kblue-700">Terms of Service</a>
            <a href="#" className="hover:text-kblue-700">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>;
};

export default Footer;
