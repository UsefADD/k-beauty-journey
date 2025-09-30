
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

const ShopCategories = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const { t } = useLanguage();
  
  const categories = [
    { key: 'newly-curated', name: 'SHOP BY NEWLY CURATED', path: '/shop/newly-curated' },
    { key: 'viral', name: 'SHOP BY VIRAL K-BEAUTY', path: '/shop/viral' },
    { key: 'best-sellers', name: 'SHOP BY BEST SELLERS', path: '/shop/best-sellers' },
    { key: 'skin-concern', name: 'SHOP BY SKIN CONCERN', path: '/shop/skin-concern' },
    { key: 'brand', name: 'SHOP BY BRAND', path: '/shop/brand' },
    { key: 'product-type', name: 'SHOP BY PRODUCT TYPE', path: '/shop/product-type' },
    { key: 'ingredient', name: 'SHOP BY INGREDIENT', path: '/shop/ingredient' },
    { key: 'sets', name: 'SHOP BY SETS & ROUTINES', path: '/shop/sets' },
  ];

  return null;
};

export default ShopCategories;
