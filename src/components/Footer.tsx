import React from 'react';
import { Mail, Instagram, Facebook, Twitter } from 'lucide-react';
import NewsletterSignup from './NewsletterSignup';
import { useLanguage } from '../contexts/LanguageContext';

const Footer = () => {
  console.info('Render: Footer');
  const { t, isRTL } = useLanguage();

  return (
    <footer className={`bg-white border-t border-gray-200 ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="bg-white py-6">
        <div className="container mx-auto px-4 max-w-2xl">
          <NewsletterSignup />
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h4 className="font-serif text-lg font-bold text-black mb-4">{t('footer.shop')}</h4>
            <ul className="space-y-2 text-cream-700 text-sm">
              <li><a href="#" className="hover:text-gray-800">{t('footer.best.sellers')}</a></li>
              <li><a href="#" className="hover:text-gray-800">{t('footer.new.arrivals')}</a></li>
              <li><a href="#" className="hover:text-gray-800">{t('footer.kbeauty.sets')}</a></li>
              <li><a href="#" className="hover:text-gray-800">{t('footer.special.offers')}</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-serif text-lg font-bold text-black mb-4">{t('footer.about')}</h4>
            <ul className="space-y-2 text-cream-700 text-sm">
              <li><a href="/about" className="hover:text-gray-800">{t('footer.our.story')}</a></li>
              <li><a href="mailto:blissful.sk.info@gmail.com" className="hover:text-gray-800">{t('footer.contact.us')}</a></li>
              <li><a href="#" className="hover:text-gray-800">{t('footer.faq')}</a></li>
              <li><a href="#" className="hover:text-gray-800">{t('footer.shipping.returns')}</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-serif text-lg font-bold text-black mb-4">{t('footer.connect')}</h4>
            <div className="flex space-x-4 mb-6">
              <a
                href="https://www.instagram.com/blissfulsskin/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black hover:text-gray-800"
                aria-label="Instagram @blissfulsskin"
                title="Instagram @blissfulsskin"
                onClick={(e) => {
                  try {
                    if (window.self !== window.top) {
                      e.preventDefault();
                      window.location.href = 'https://www.instagram.com/blissfulsskin/';
                    }
                  } catch (_) {}
                }}
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-black hover:text-gray-800">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-black hover:text-gray-800">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="mailto:blissful.sk.info@gmail.com" className="text-black hover:text-gray-800">
                <Mail className="h-5 w-5" />
              </a>
            </div>
            <p className="text-sm text-zinc-800">
              {t('footer.community')}
            </p>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-100 text-center">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} {t('footer.rights')}
          </p>
          <div className="mt-4 flex justify-center space-x-6 text-xs text-gray-500">
            <a href="#" className="hover:text-gray-700">{t('footer.privacy')}</a>
            <a href="#" className="hover:text-gray-700">{t('footer.terms')}</a>
            <a href="#" className="hover:text-gray-700">{t('footer.accessibility')}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;