import React, { createContext, useState, useContext, ReactNode } from 'react';

type Language = 'en' | 'fr';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// English translations
const enTranslations: Record<string, string> = {
  // Navbar
  'shop.all': 'SHOP ALL',
  'best.sellers': 'BEST SELLERS',
  'brands': 'BRANDS',
  'shipping.banner': 'Free shipping for all orders over $50 & gift included',
  // Product Types
  'product.type': 'PRODUCT TYPE',
  'double.cleansing': 'Double cleansing',
  'exfoliations': 'Exfoliations',
  'toning.lotions': 'Toning lotions',
  'treatments': 'Treatments',
  'masks': 'Masks',
  'eye.care': 'Eye care',
  'moisturizers': 'Moisturizers',
  'sun.protection': 'Sun protection',
  'hair.body': 'Hair & Body',
  'makeup.tools': 'Makeup & Tools',
  // Skin Types
  'skin.type': 'SKIN TYPE',
  'skin.type.description': 'Find products specifically formulated for your skin type',
  'oily': 'Oily',
  'dry': 'Dry',
  'combination': 'Combination',
  'normal': 'Normal',
  // Skin Concerns
  'skin.concern': 'SKIN CONCERNS',
  'skin.concern.description': 'Target specific skin concerns with specialized products',
  'acne': 'Acne',
  'dehydration': 'Dehydration',
  'sebum.control': 'Sebum control/Pores',
  'pigmentation': 'Pigmentation',
  'redness': 'Redness',
  'sensitive': 'Sensitive',
  'anti.aging': 'Anti-aging',
  // Language
  'language': 'Language',
  'english': 'English',
  'french': 'French',
  // Best Sellers Component
  'shop.newly.curated': 'SHOP BY NEWLY CURATED',
  'shop.viral': 'SHOP BY VIRAL K-BEAUTY',
  'shop.best.sellers': 'SHOP BY BEST SELLERS',
  'shop.sets': 'SHOP BY SETS & ROUTINES',
  'view.all.best.sellers': 'View All Best Sellers',
  
  // New Arrivals Component
  'new.arrivals.title': 'Hot New\nK-Beauty Arrivals',
  'new.arrivals.description': 'Fresh drops from your favorite brands! Mediheal, IOPE, Arencia, and Abib bring you the latest in K-beauty innovation.',
  'new.arrivals.card.title': 'New Arrivals',
  'new.arrivals.card.description': 'Explore our latest K-Beauty products',
};

// French translations
const frTranslations: Record<string, string> = {
  // Navbar
  'shop.all': 'TOUT VOIR',
  'best.sellers': 'MEILLEURES VENTES',
  'brands': 'MARQUES',
  'shipping.banner': 'Livraison gratuite pour toute commande +500 dhs & cadeau offert',
  // Product Types
  'product.type': 'TYPE DE PRODUIT',
  'double.cleansing': 'Double nettoyage',
  'exfoliations': 'Exfoliations',
  'toning.lotions': 'Lotions tonifiant',
  'treatments': 'Traitements',
  'masks': 'Masques',
  'eye.care': 'Soin des yeux',
  'moisturizers': 'Hydratants',
  'sun.protection': 'Protection solaire',
  'hair.body': 'Cheveux & Corps',
  'makeup.tools': 'Maquillage & Outils',
  // Skin Types
  'skin.type': 'TYPE DE PEAU',
  'skin.type.description': 'Trouvez des produits spécialement formulés pour votre type de peau',
  'oily': 'Grasse',
  'dry': 'Sèche',
  'combination': 'Mixte',
  'normal': 'Normal',
  // Skin Concerns
  'skin.concern': 'PROBLÈMES DE PEAU',
  'skin.concern.description': 'Ciblez des problèmes de peau spécifiques avec des produits spécialisés',
  'acne': 'Acné',
  'dehydration': 'Déshydratation',
  'sebum.control': 'Contrôle de sébum/Pores',
  'pigmentation': 'Pigmentation',
  'redness': 'Rougeurs',
  'sensitive': 'Sensible',
  'anti.aging': 'Anti-âge',
  // Language
  'language': 'Langue',
  'english': 'Anglais',
  'french': 'Français',
  // Best Sellers Component
  'shop.newly.curated': 'ACHETER PAR NOUVEAUTÉS',
  'shop.viral': 'ACHETER PAR K-BEAUTY VIRAL',
  'shop.best.sellers': 'ACHETER PAR MEILLEURES VENTES',
  'shop.sets': 'ACHETER PAR SETS & ROUTINES',
  'view.all.best.sellers': 'Voir Toutes Les Meilleures Ventes',
  
  // New Arrivals Component
  'new.arrivals.title': 'Nouveautés\nK-Beauty',
  'new.arrivals.description': 'Découvrez les derniers produits de vos marques préférées ! Mediheal, IOPE, Arencia et Abib vous apportent les dernières innovations en K-beauty.',
  'new.arrivals.card.title': 'Nouveautés',
  'new.arrivals.card.description': 'Explorez nos derniers produits K-Beauty',
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('fr');
  const translations = language === 'en' ? enTranslations : frTranslations;

  const t = (key: string): string => {
    return translations[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
