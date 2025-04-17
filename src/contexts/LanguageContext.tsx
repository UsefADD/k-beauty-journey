import React, { createContext, useContext, useState, ReactNode } from 'react';

interface LanguageContextProps {
  language: string;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

interface LanguageProviderProps {
  children: ReactNode;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState('en');

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'fr' : 'en');
  };

  const translations = {
    en: {
      "home": "Home",
      "brands": "Brands",
      "shop": "Shop",
      "newly.curated": "Newly Curated",
      "viral": "Viral",
      "best.sellers": "Best Sellers",
      "sets": "Sets & Routines",
      "skin.concern": "Skin Concern",
      "skin.type": "Skin Type",
      "brand": "Brand",
      "product.type": "Product Type",
      "ingredient": "Ingredient",
      "search": "Search",
      "account": "Account",
      "cart": "Cart",
      "reviews": "reviews",
      "volume": "Volume",
      "add.to.cart": "Add to cart",
      "out.of.stock": "Out of stock",
      "product.description": "Product Description",
      "suitable.for": "Suitable for",
      "how.to.use": "How to Use",
      "ingredients": "Ingredients",
      "key.ingredients": "Key Ingredients",
      "your.cart": "Your Cart",
      "cart.empty": "Your cart is empty",
      "cart.start.shopping": "Add items to get started",
      "continue.shopping": "Continue Shopping",
      "subtotal": "Subtotal",
      "checkout": "Proceed to Checkout",
    },
    fr: {
      "home": "Accueil",
      "brands": "Marques",
      "shop": "Boutique",
      "newly.curated": "Nouveautés",
      "viral": "Virales",
      "best.sellers": "Meilleures Ventes",
      "sets": "Coffrets et Routines",
      "skin.concern": "Préoccupation de la Peau",
      "skin.type": "Type de Peau",
      "brand": "Marque",
      "product.type": "Type de Produit",
      "ingredient": "Ingrédient",
      "search": "Rechercher",
      "account": "Compte",
      "cart": "Panier",
      "reviews": "avis",
      "volume": "Volume",
      "add.to.cart": "Ajouter au panier",
      "out.of.stock": "Rupture de stock",
      "product.description": "Description du Produit",
      "suitable.for": "Convient pour",
      "how.to.use": "Comment Utiliser",
      "ingredients": "Ingrédients",
      "key.ingredients": "Ingrédients Clés",
      "your.cart": "Votre Panier",
      "cart.empty": "Votre panier est vide",
      "cart.start.shopping": "Ajoutez des articles pour commencer",
      "continue.shopping": "Continuer vos Achats",
      "subtotal": "Sous-total",
      "checkout": "Passer à la Caisse",
    }
  };

  const t = (key: string) => {
    return translations[language as keyof typeof translations][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
