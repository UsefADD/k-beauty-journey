export interface Brand {
  id: string;
  name: string;
  image: string;
  description: string;
  featured: boolean;
  popular: boolean;
  new: boolean;
  country: string;
  established: number;
  specialties: string[];
  productCount: number;
}

export const brandsData: Brand[] = [
  {
    id: 'anua',
    name: 'ANUA',
    image: '/lovable-uploads/0a4e27c6-b495-42eb-9d2d-cdc224286f18.png',
    description: 'Korean skincare brand focusing on gentle, effective formulations.',
    featured: true,
    popular: true,
    new: false,
    country: 'South Korea',
    established: 2019,
    specialties: ['Sensitive Skin', 'Natural Ingredients', 'Gentle Formulas'],
    productCount: 15
  },
  {
    id: 'beauty-of-joseon',
    name: 'BEAUTY OF JOSEON',
    image: '/lovable-uploads/1292278f-f30e-4ca5-abce-a6576522d3a6.png',
    description: 'Traditional Korean beauty meets modern skincare science.',
    featured: true,
    popular: true,
    new: false,
    country: 'South Korea',
    established: 2016,
    specialties: ['Traditional Ingredients', 'Anti-Aging', 'Hydration'],
    productCount: 22
  },
  {
    id: 'cosrx',
    name: 'COSRX',
    image: '/lovable-uploads/23ac0574-5929-4097-8940-9a5d222dc69e.png',
    description: 'Science-based skincare solutions for problematic skin.',
    featured: true,
    popular: true,
    new: false,
    country: 'South Korea',
    established: 2013,
    specialties: ['Acne Treatment', 'BHA/AHA', 'Problem Skin'],
    productCount: 35
  },
  {
    id: 'klairs',
    name: 'KLAIRS',
    image: '/lovable-uploads/2b8e8981-e46b-4281-b85d-36a2136518da.png',
    description: 'Simple, honest skincare for sensitive skin.',
    featured: false,
    popular: true,
    new: false,
    country: 'South Korea',
    established: 2010,
    specialties: ['Sensitive Skin', 'Vitamin C', 'Minimalist'],
    productCount: 18
  },
  {
    id: 'im-from',
    name: "I'M FROM",
    image: '/lovable-uploads/2e3f0b7a-0103-4602-9efe-fabce75ae855.png',
    description: 'Natural ingredients sourced from specific regions.',
    featured: false,
    popular: false,
    new: true,
    country: 'South Korea',
    established: 2017,
    specialties: ['Natural Ingredients', 'Regional Sourcing', 'Honey'],
    productCount: 12
  },
  {
    id: 'neogen',
    name: 'NEOGEN',
    image: '/lovable-uploads/3a07fe99-59ed-4493-b329-82c7eee6cbcf.png',
    description: 'Innovative K-beauty with cutting-edge technology.',
    featured: true,
    popular: true,
    new: false,
    country: 'South Korea',
    established: 2005,
    specialties: ['Innovation', 'Exfoliation', 'Technology'],
    productCount: 28
  },
  {
    id: 'hanyul',
    name: 'HANYUL',
    image: '/lovable-uploads/3eec9cf5-51f5-4226-bffc-88d99d5bf83d.png',
    description: 'Traditional Korean herbal ingredients for modern skincare.',
    featured: false,
    popular: false,
    new: false,
    country: 'South Korea',
    established: 2012,
    specialties: ['Herbal Ingredients', 'Traditional Medicine', 'Premium'],
    productCount: 20
  },
  {
    id: 'then-i-met-you',
    name: 'THEN I MET YOU',
    image: '/lovable-uploads/3f8687b9-677f-4a44-9351-7ad103dcc6a3.png',
    description: 'Luxury Korean skincare with ritual-based approach.',
    featured: false,
    popular: false,
    new: true,
    country: 'South Korea',
    established: 2018,
    specialties: ['Luxury', 'Ritual Skincare', 'Premium Ingredients'],
    productCount: 8
  },
  {
    id: 'isntree',
    name: 'ISNTREE',
    image: '/lovable-uploads/41330e03-a806-4f90-96ce-12336f3d878f.png',
    description: 'Clean, safe skincare with natural ingredients.',
    featured: false,
    popular: true,
    new: false,
    country: 'South Korea',
    established: 2011,
    specialties: ['Clean Beauty', 'Natural Ingredients', 'Hyaluronic Acid'],
    productCount: 16
  },
  {
    id: 'pyunkang-yul',
    name: 'PYUNKANG YUL',
    image: '/lovable-uploads/45aa9abb-88dd-494a-b9f3-e73bc3cc5d32.png',
    description: 'Minimalist skincare developed by dermatologists.',
    featured: false,
    popular: false,
    new: false,
    country: 'South Korea',
    established: 2016,
    specialties: ['Minimalist', 'Dermatologist Developed', 'Sensitive Skin'],
    productCount: 14
  }
];

export const getBrandsByLetter = (letter: string): Brand[] => {
  if (letter === '#') {
    return brandsData.filter(brand => /^[0-9]/.test(brand.name));
  }
  return brandsData.filter(brand => brand.name.startsWith(letter.toUpperCase()));
};

export const getFeaturedBrands = (): Brand[] => {
  return brandsData.filter(brand => brand.featured);
};

export const getPopularBrands = (): Brand[] => {
  return brandsData.filter(brand => brand.popular);
};

export const getNewBrands = (): Brand[] => {
  return brandsData.filter(brand => brand.new);
};

export const searchBrands = (query: string): Brand[] => {
  const lowercaseQuery = query.toLowerCase();
  return brandsData.filter(brand => 
    brand.name.toLowerCase().includes(lowercaseQuery) ||
    brand.description.toLowerCase().includes(lowercaseQuery) ||
    brand.specialties.some(specialty => specialty.toLowerCase().includes(lowercaseQuery))
  );
};