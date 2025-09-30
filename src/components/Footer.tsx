import React from 'react';
import { Mail, Instagram, Facebook, Twitter } from 'lucide-react';
import { Button } from "@/components/ui/button";
const Footer = () => {
  console.info('Render: Footer');
  return <footer className="bg-white border-t border-gray-200">
      <div className="bg-white py-6 text-center">
        <div className="container mx-auto px-4">
          
          
          
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <input type="email" placeholder="Your email address" className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 max-w-xs w-full" />
            <Button>
              Subscribe
            </Button>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h4 className="font-serif text-lg font-bold text-black mb-4">SHOP</h4>
            <ul className="space-y-2 text-cream-700 text-sm">
              <li><a href="#" className="hover:text-gray-800">Best Sellers</a></li>
              <li><a href="#" className="hover:text-gray-800">New Arrivals</a></li>
              <li><a href="#" className="hover:text-gray-800">K-Beauty Sets</a></li>
              <li><a href="#" className="hover:text-gray-800">Special Offers</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-serif text-lg font-bold text-black mb-4">ABOUT</h4>
            <ul className="space-y-2 text-cream-700 text-sm">
              <li><a href="/about" className="hover:text-gray-800">Our Story</a></li>
              <li><a href="#" className="hover:text-gray-800">Contact Us</a></li>
              <li><a href="#" className="hover:text-gray-800">FAQ</a></li>
              <li><a href="#" className="hover:text-gray-800">Shipping & Returns</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-serif text-lg font-bold text-black mb-4">CONNECT</h4>
            <div className="flex space-x-4 mb-6">
              <a href="https://www.instagram.com/blissfulsskin/" target="_blank" rel="noopener noreferrer" className="text-black hover:text-gray-800">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-black hover:text-gray-800">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-black hover:text-gray-800">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-black hover:text-gray-800">
                <Mail className="h-5 w-5" />
              </a>
            </div>
            <p className="text-sm text-zinc-800">
              Join our community for exclusive offers, skincare tips, and inspiration.
            </p>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-100 text-center">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} K-Beauty Journey. All rights reserved.
          </p>
          <div className="mt-4 flex justify-center space-x-6 text-xs text-gray-500">
            <a href="#" className="hover:text-gray-700">Privacy Policy</a>
            <a href="#" className="hover:text-gray-700">Terms of Service</a>
            <a href="#" className="hover:text-gray-700">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;