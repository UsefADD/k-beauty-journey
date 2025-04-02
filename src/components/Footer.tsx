
import React from 'react';
import { Mail, Instagram, Facebook, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="bg-kblue-50 py-6 text-center">
        <div className="container mx-auto px-4">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Sign Up for Soko Rewards</h3>
          <p className="text-gray-600 mb-6">Earn 200 Points ($10 Value) INSTANTLY!</p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-kblue-500 max-w-xs w-full"
            />
            <button className="k-button-primary whitespace-nowrap">
              SUBSCRIBE
            </button>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h4 className="font-serif text-lg font-medium text-gray-900 mb-4">SHOP</h4>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li><a href="#" className="hover:text-kblue-700">Best Sellers</a></li>
              <li><a href="#" className="hover:text-kblue-700">New Arrivals</a></li>
              <li><a href="#" className="hover:text-kblue-700">K-Beauty Sets</a></li>
              <li><a href="#" className="hover:text-kblue-700">Special Offers</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-serif text-lg font-medium text-gray-900 mb-4">LEARN</h4>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li><a href="#" className="hover:text-kblue-700">About K-Beauty</a></li>
              <li><a href="#" className="hover:text-kblue-700">Skincare Guides</a></li>
              <li><a href="#" className="hover:text-kblue-700">Ingredient Library</a></li>
              <li><a href="#" className="hover:text-kblue-700">Skin Types</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-serif text-lg font-medium text-gray-900 mb-4">ABOUT</h4>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li><a href="#" className="hover:text-kblue-700">Our Story</a></li>
              <li><a href="#" className="hover:text-kblue-700">Contact Us</a></li>
              <li><a href="#" className="hover:text-kblue-700">FAQ</a></li>
              <li><a href="#" className="hover:text-kblue-700">Shipping & Returns</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-serif text-lg font-medium text-gray-900 mb-4">CONNECT</h4>
            <div className="flex space-x-4 mb-6">
              <a href="#" className="text-gray-500 hover:text-kblue-700">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-kblue-700">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-kblue-700">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-kblue-700">
                <Mail className="h-5 w-5" />
              </a>
            </div>
            <p className="text-sm text-gray-600">
              Join our community for exclusive offers, skincare tips, and inspiration.
            </p>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-100 text-center">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} K-Beauty Journey. All rights reserved.
          </p>
          <div className="mt-4 flex justify-center space-x-6 text-xs text-gray-500">
            <a href="#" className="hover:text-kblue-700">Privacy Policy</a>
            <a href="#" className="hover:text-kblue-700">Terms of Service</a>
            <a href="#" className="hover:text-kblue-700">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
