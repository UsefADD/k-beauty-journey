import React, { createContext, useState, useContext, ReactNode } from 'react';

type Language = 'en' | 'fr' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
  isRTL: boolean;
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
  'arabic': 'Arabic',
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
  
  // Product Detail Page
  'add.to.cart': 'Add to Cart',
  'out.of.stock': 'Out of Stock',
  'product.description': 'Description',
  'suitable.for': 'Suitable For',
  'how.to.use': 'How To Use',
  'ingredients': 'Ingredients',
  'key.ingredients': 'Key Ingredients',
  'reviews': 'reviews',
  'volume': 'Volume',
  'payment.method': 'Payment Method',
  'cash.on.delivery.only': 'Cash on delivery only',
  
  // Shipping Form
  'shipping.information': 'Shipping Information',
  'full.name': 'Full Name',
  'enter.full.name': 'Enter your full name',
  'address': 'Address',
  'enter.address': 'Enter your address',
  'city': 'City',
  'enter.city': 'Enter your city',
  'zip.code': 'ZIP Code',
  'enter.zip.code': 'Enter ZIP code',
  'phone.number': 'Phone Number',
  'enter.phone.number': 'Enter your phone number',
  'save.shipping.details': 'Confirm Order via WhatsApp',
  'email': 'Email',
  'enter.email': 'Enter your email',
  
  // Payment Page
  'order.summary': 'Order Summary',
  'subtotal': 'Subtotal',
  'shipping': 'Shipping',
  'total': 'Total',
  'enter.your.city': 'Enter your city',
  'city.not.recognized': 'City not recognized',
  'select.nearest.city': 'City not recognized. Select the nearest major city:',
  'shipping.cost': 'Shipping',
  'near': 'near',
  'empty.cart': 'Empty Cart',
  'empty.cart.message': 'Your cart is empty. Please add items before proceeding to payment.',
  'order.created': 'Order Created',
  'order.created.message': 'Your order has been successfully registered!',
  'insufficient.stock': 'Insufficient Stock',
  'insufficient.stock.message': 'Sorry, some products are no longer available in sufficient quantity.',
  'error': 'Error',
  'error.order.message': 'An error occurred while creating the order. Please try again.',
  'city.required': 'City required',
  'city.required.message': 'Please select your delivery city.',
  
  // Validation messages
  'validation.name.required': 'Full name is required',
  'validation.name.max': 'Name must not exceed 100 characters',
  'validation.email.invalid': 'Invalid email',
  'validation.address.required': 'Address is required',
  'validation.address.max': 'Address must not exceed 200 characters',
  'validation.city.required': 'City is required',
  'validation.phone.required': 'Phone number is required',
  'validation.phone.invalid': 'Invalid phone number',
  
  // Search
  'search.products': 'Search products...',
  'no.results': 'No results found'
};

// French translations
const frTranslations: Record<string, string> = {
  // Navbar
  'shop.all': 'TOUT VOIR',
  'best.sellers': 'MEILLEURES VENTES',
  'brands': 'MARQUES',
  'shipping.banner': 'Livraison gratuite pour toute commande +800 dhs & cadeau offert',
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
  'arabic': 'Arabe',
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
  
  // Product Detail Page
  'add.to.cart': 'Ajouter au Panier',
  'out.of.stock': 'Rupture de Stock',
  'product.description': 'Description',
  'suitable.for': 'Convient Pour',
  'how.to.use': 'Comment Utiliser',
  'ingredients': 'Ingrédients',
  'key.ingredients': 'Ingrédients Clés',
  'reviews': 'avis',
  'volume': 'Volume',
  'payment.method': 'Mode de Paiement',
  'cash.on.delivery.only': 'Paiement à la livraison uniquement',
  
  // Shipping Form
  'shipping.information': 'Informations de Livraison',
  'full.name': 'Nom Complet',
  'enter.full.name': 'Entrez votre nom complet',
  'address': 'Adresse',
  'enter.address': 'Entrez votre adresse',
  'city': 'Ville',
  'enter.city': 'Entrez votre ville',
  'zip.code': 'Code Postal',
  'enter.zip.code': 'Entrez le code postal',
  'phone.number': 'Numéro de Téléphone',
  'enter.phone.number': 'Entrez votre numéro de téléphone',
  'save.shipping.details': 'Confirmer la Commande via WhatsApp',
  'email': 'Email',
  'enter.email': 'Entrez votre email',
  
  // Payment Page
  'order.summary': 'Récapitulatif',
  'subtotal': 'Sous-total',
  'shipping': 'Livraison',
  'total': 'Total',
  'enter.your.city': 'Entrez votre ville',
  'city.not.recognized': 'Ville non reconnue',
  'select.nearest.city': 'Ville non reconnue. Sélectionnez la grande ville la plus proche :',
  'shipping.cost': 'Livraison',
  'near': 'proche de',
  'empty.cart': 'Panier Vide',
  'empty.cart.message': 'Votre panier est vide. Veuillez ajouter des articles avant de procéder au paiement.',
  'order.created': 'Commande Créée',
  'order.created.message': 'Votre commande a été enregistrée avec succès !',
  'insufficient.stock': 'Stock Insuffisant',
  'insufficient.stock.message': 'Désolé, certains produits ne sont plus disponibles en quantité suffisante.',
  'error': 'Erreur',
  'error.order.message': 'Une erreur s\'est produite lors de la création de la commande. Veuillez réessayer.',
  'city.required': 'Ville requise',
  'city.required.message': 'Veuillez sélectionner votre ville de livraison.',
  
  // Validation messages
  'validation.name.required': 'Le nom complet est requis',
  'validation.name.max': 'Le nom ne doit pas dépasser 100 caractères',
  'validation.email.invalid': 'Email invalide',
  'validation.address.required': 'L\'adresse est requise',
  'validation.address.max': 'L\'adresse ne doit pas dépasser 200 caractères',
  'validation.city.required': 'La ville est requise',
  'validation.phone.required': 'Le numéro de téléphone est requis',
  'validation.phone.invalid': 'Numéro de téléphone invalide',
  
  // Search
  'search.products': 'Rechercher des produits...',
  'no.results': 'Aucun résultat trouvé'
};

// Arabic translations
const arTranslations: Record<string, string> = {
  // Navbar
  'shop.all': 'تسوق الكل',
  'best.sellers': 'الأكثر مبيعاً',
  'brands': 'الماركات',
  'shipping.banner': 'شحن مجاني لجميع الطلبات أكثر من 800 درهم وهدية مجانية',
  // Product Types
  'product.type': 'نوع المنتج',
  'double.cleansing': 'التنظيف المزدوج',
  'exfoliations': 'التقشير',
  'toning.lotions': 'اللوشن المنشط',
  'treatments': 'العلاجات',
  'masks': 'الأقنعة',
  'eye.care': 'العناية بالعين',
  'moisturizers': 'المرطبات',
  'sun.protection': 'الحماية من الشمس',
  'hair.body': 'الشعر والجسم',
  'makeup.tools': 'المكياج والأدوات',
  // Skin Types
  'skin.type': 'نوع البشرة',
  'skin.type.description': 'اعثر على منتجات مصممة خصيصاً لنوع بشرتك',
  'oily': 'دهنية',
  'dry': 'جافة',
  'combination': 'مختلطة',
  'normal': 'عادية',
  // Skin Concerns
  'skin.concern': 'مشاكل البشرة',
  'skin.concern.description': 'استهدف مشاكل البشرة المحددة بمنتجات متخصصة',
  'acne': 'حب الشباب',
  'dehydration': 'الجفاف',
  'sebum.control': 'التحكم بالدهون/المسام',
  'pigmentation': 'التصبغات',
  'redness': 'الاحمرار',
  'sensitive': 'حساسة',
  'anti.aging': 'مكافحة الشيخوخة',
  // Language
  'language': 'اللغة',
  'english': 'الإنجليزية',
  'french': 'الفرنسية',
  'arabic': 'العربية',
  // Best Sellers Component
  'shop.newly.curated': 'تسوق الجديد',
  'shop.viral': 'تسوق K-BEAUTY الرائج',
  'shop.best.sellers': 'تسوق الأكثر مبيعاً',
  'shop.sets': 'تسوق المجموعات والروتين',
  'view.all.best.sellers': 'عرض جميع الأكثر مبيعاً',
  
  // New Arrivals Component
  'new.arrivals.title': 'وصولات\nK-Beauty الجديدة',
  'new.arrivals.description': 'منتجات جديدة من ماركاتك المفضلة! Mediheal، IOPE، Arencia و Abib يقدمون لك أحدث ابتكارات K-beauty.',
  'new.arrivals.card.title': 'المنتجات الجديدة',
  'new.arrivals.card.description': 'اكتشف أحدث منتجات K-Beauty',
  
  // Product Detail Page
  'add.to.cart': 'أضف إلى السلة',
  'out.of.stock': 'نفذت الكمية',
  'product.description': 'الوصف',
  'suitable.for': 'مناسب لـ',
  'how.to.use': 'طريقة الاستخدام',
  'ingredients': 'المكونات',
  'key.ingredients': 'المكونات الرئيسية',
  'reviews': 'تقييمات',
  'volume': 'الحجم',
  'payment.method': 'طريقة الدفع',
  'cash.on.delivery.only': 'الدفع عند الاستلام فقط',
  
  // Shipping Form
  'shipping.information': 'معلومات الشحن',
  'full.name': 'الاسم الكامل',
  'enter.full.name': 'أدخل اسمك الكامل',
  'address': 'العنوان',
  'enter.address': 'أدخل عنوانك',
  'city': 'المدينة',
  'enter.city': 'أدخل مدينتك',
  'zip.code': 'الرمز البريدي',
  'enter.zip.code': 'أدخل الرمز البريدي',
  'phone.number': 'رقم الهاتف',
  'enter.phone.number': 'أدخل رقم هاتفك',
  'save.shipping.details': 'تأكيد الطلب عبر واتساب',
  'email': 'البريد الإلكتروني',
  'enter.email': 'أدخل بريدك الإلكتروني',
  
  // Payment Page
  'order.summary': 'ملخص الطلب',
  'subtotal': 'المجموع الفرعي',
  'shipping': 'الشحن',
  'total': 'المجموع',
  'enter.your.city': 'أدخل مدينتك',
  'city.not.recognized': 'المدينة غير معروفة',
  'select.nearest.city': 'المدينة غير معروفة. اختر أقرب مدينة كبيرة:',
  'shipping.cost': 'الشحن',
  'near': 'قريب من',
  'empty.cart': 'السلة فارغة',
  'empty.cart.message': 'سلتك فارغة. يرجى إضافة منتجات قبل المتابعة للدفع.',
  'order.created': 'تم إنشاء الطلب',
  'order.created.message': 'تم تسجيل طلبك بنجاح!',
  'insufficient.stock': 'المخزون غير كافٍ',
  'insufficient.stock.message': 'عذراً، بعض المنتجات لم تعد متوفرة بالكمية المطلوبة.',
  'error': 'خطأ',
  'error.order.message': 'حدث خطأ أثناء إنشاء الطلب. يرجى المحاولة مرة أخرى.',
  'city.required': 'المدينة مطلوبة',
  'city.required.message': 'يرجى اختيار مدينة التوصيل.',
  
  // Validation messages
  'validation.name.required': 'الاسم الكامل مطلوب',
  'validation.name.max': 'الاسم يجب ألا يتجاوز 100 حرف',
  'validation.email.invalid': 'بريد إلكتروني غير صالح',
  'validation.address.required': 'العنوان مطلوب',
  'validation.address.max': 'العنوان يجب ألا يتجاوز 200 حرف',
  'validation.city.required': 'المدينة مطلوبة',
  'validation.phone.required': 'رقم الهاتف مطلوب',
  'validation.phone.invalid': 'رقم الهاتف غير صالح',
  
  // Search
  'search.products': 'البحث عن منتجات...',
  'no.results': 'لم يتم العثور على نتائج'
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('fr');
  
  const getTranslations = () => {
    switch (language) {
      case 'en':
        return enTranslations;
      case 'ar':
        return arTranslations;
      default:
        return frTranslations;
    }
  };

  const t = (key: string): string => {
    return getTranslations()[key] || key;
  };

  const isRTL = language === 'ar';

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
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