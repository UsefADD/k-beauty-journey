import { supabase } from '@/integrations/supabase/client';

export interface Brand {
  id: string;
  name: string;
  description: string;
  image: string;
  productCount: number;
  products: Array<{
    id: string;
    name: string;
    price: string;
    image_url: string;
    product_type: string;
    skin_type_category: string[];
    skin_concern_category: string[];
    volume: string | null;
  }>;
}

// Fetch brands from actual Supabase products
export const fetchBrandsFromProducts = async (): Promise<Brand[]> => {
  try {
    const { data: products, error } = await supabase
      .from('products')
      .select('id, brand, "Product_name", price, image_url, product_type, skin_type_category, skin_concern_category, volume');

    if (error) throw error;

    // Group products by brand (normalize brand names to avoid duplicates)
    const brandGroups = products?.reduce((acc, product) => {
      const brandNameRaw = (product.brand ?? '').toString();
      const brandName = brandNameRaw.trim().toUpperCase(); // Normalize to uppercase for grouping
      const displayName = brandNameRaw.trim(); // Keep original for display
      if (!brandName) return acc; // skip products without a brand
      if (!acc[brandName]) {
        acc[brandName] = { displayName, products: [] };
      }
      acc[brandName].products.push({
        id: product.id,
        name: product.Product_name,
        price: product.price,
        image_url: product.image_url,
        product_type: product.product_type,
        skin_type_category: product.skin_type_category || [],
        skin_concern_category: product.skin_concern_category || [],
        volume: product.volume
      });
      return acc;
    }, {} as Record<string, { displayName: string; products: any[] }>) || {};

    // Convert to Brand objects with unique IDs
    const brands: Brand[] = Object.entries(brandGroups).map(([normalizedName, data], index) => ({
      id: `brand-${index}-${normalizedName.toLowerCase().replace(/\s+/g, '-')}`,
      name: data.displayName,
      description: `Premium K-beauty products from ${data.displayName}`,
      image: data.products[0]?.image_url || '/placeholder.svg',
      productCount: data.products.length,
      products: data.products
    }));

    return brands.sort((a, b) => a.name.localeCompare(b.name));
  } catch (error) {
    console.error('Error fetching brands:', error);
    return [];
  }
};

export const searchBrands = (brands: Brand[], query: string) => 
  brands.filter(brand => 
    brand.name.toLowerCase().includes(query.toLowerCase()) ||
    brand.description.toLowerCase().includes(query.toLowerCase())
  );

export const getBrandsByLetter = (brands: Brand[], letter: string) => 
  brands.filter(brand => brand.name.trim().toUpperCase().startsWith(letter.toUpperCase()));

export const sortBrands = (brands: Brand[], sortBy: 'name' | 'productCount') => {
  return [...brands].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'productCount':
        return b.productCount - a.productCount;
      default:
        return 0;
    }
  });
};