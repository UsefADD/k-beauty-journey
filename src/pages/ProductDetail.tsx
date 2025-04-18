import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useParams } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useCart } from '../contexts/CartContext';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const ProductDetail = () => {
  const { productId } = useParams();
  const { t, language } = useLanguage();
  const { addItem } = useCart();
  
  const product = {
    id: productId,
    name: language === 'fr' ? "Bean Essence" : "Bean Essence",
    brand: "MIXSOON",
    price: 280,
    rating: 4.8,
    reviewCount: 124,
    images: [
      "/lovable-uploads/2e3f0b7a-0103-4602-9efe-fabce75ae855.png",
      "/lovable-uploads/3f8687b9-677f-4a44-9351-7ad103dcc6a3.png",
      "/lovable-uploads/41330e03-a806-4f90-96ce-12336f3d878f.png"
    ],
    description: language === 'fr' 
      ? "La Bean Essence MIXSOON est une essence purifiante infusée de haricot qui aide à améliorer et à affiner la texture de la peau pour un résultat lisse et sans tache. L'extrait de haricot contenu dans la formule élimine..."
      : "The MIXSOON Bean Essence is a purifying essence infused with bean extract that helps improve and refine skin texture for a smooth and spotless result. The bean extract in the formula eliminates...",
    usageInstructions: language === 'fr'
      ? `Appliquez chaque jour 2 à 3 pressions de pompe de l'essence mixsoon Bean que vous étalez et tapotez sur votre peau pour bénéficier d'un visage sain. Appliquez ensuite une crème hydratante.

Cette essence agit également comme un peeling délicat : si vous souhaitez profiter d'un effet exfoliant, appliquez-la sur la peau propre et sèche, puis massez en exécutant des mouvements circulaires. Utilisez ensuite un coton démaquillant pour éliminer les restes de produits, puis tonifiez la peau et appliquez une crème hydratante.`
      : "Apply 2-3 pumps of the Mixsoon Bean Essence daily, spread and pat onto your skin for a healthy complexion. Follow with a moisturizing cream.

This essence also acts as a gentle peeling: if you want to enjoy an exfoliating effect, apply it on clean, dry skin, then massage using circular motions. Then use a makeup remover cotton to eliminate product residue, tone the skin, and apply a moisturizing cream.",
    ingredients: "Bean Extract (77.78%), Methylpropanediol, Triethylhexanoin, Hydrogenated Poly(C6-14 Olefin), Hydrogenated Polydecene, Pentaerythrityl Tetraethylhexanoate, 1,2-Hexanediol, Glycerin, Butylene Glycol, Water, Dimethicone, Cetyl Ethylhexanoate, Cetearyl Alcohol, Cetearyl Glucoside.",
    inStock: true,
    volume: "150ml",
    skinTypes: language === 'fr' 
      ? ["Tous types de peau", "Particulièrement adapté aux peaux sèches et ternes"]
      : ["All skin types", "Especially good for dry and dull skin"],
    keyIngredients: ["Bean Extract", "Glycerin", "Butylene Glycol"],
    benefits: language === 'fr'
      ? [
          "Éclaircit et illumine la peau",
          "Hydrate en profondeur",
          "Apaise et calme la peau",
          "Améliore le teint"
        ]
      : [
          "Brightens and illuminates skin",
          "Deeply hydrates",
          "Soothes and calms skin",
          "Improves complexion"
        ]
  };

  const handleAddToCart = () => {
    addItem({
      id: productId || '0',
      name: product.name,
      price: product.price,
      image: product.images[0],
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow py-12 bg-cream-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-10">
            <div className="md:w-1/2">
              <Carousel className="w-full">
                <CarouselContent>
                  {product.images.map((image, index) => (
                    <CarouselItem key={index}>
                      <div className="aspect-square w-full overflow-hidden rounded-xl bg-cream-100">
                        <img
                          src={image}
                          alt={`${product.name} - View ${index + 1}`}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="border-cream-300 text-cream-700 hover:bg-cream-200 hover:text-cream-900" />
                <CarouselNext className="border-cream-300 text-cream-700 hover:bg-cream-200 hover:text-cream-900" />
              </Carousel>
            </div>
            
            <div className="md:w-1/2">
              <div className="mb-2">
                <span className="font-medium text-pink-600 uppercase text-xs">{product.brand}</span>
              </div>
              <h1 className="text-3xl font-bold text-pink-800 mb-3">{product.name}</h1>
              
              <div className="flex items-center mb-4">
                <div className="flex items-center mr-3">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-4 w-4 ${i < Math.floor(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} 
                    />
                  ))}
                </div>
                <span className="text-sm text-cream-700">
                  {product.rating} ({product.reviewCount} {t('reviews')})
                </span>
              </div>
              
              <div className="text-2xl font-bold text-pink-800 mb-6">
                {product.price.toFixed(2)} MAD
              </div>
              
              <div className="mb-6">
                <span className="text-cream-700">{t('volume')}: {product.volume}</span>
              </div>
              
              <div className="flex gap-3 mb-8">
                <Button 
                  onClick={handleAddToCart} 
                  className="flex-1 bg-white text-pink-600 border border-pink-600 hover:bg-pink-50"
                  disabled={!product.inStock}
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  {product.inStock ? t('add.to.cart') : t('out.of.stock')}
                </Button>
                <Button variant="outline" className="px-4 border-cream-200">
                  <Heart className="h-5 w-5 text-pink-600" />
                </Button>
              </div>
              
              <div className="mb-6">
                <h3 className="font-medium text-cream-900 mb-2">{t('product.description')}</h3>
                <p className="text-cream-700">{product.description}</p>
              </div>
              
              <div className="mb-6">
                <h3 className="font-medium text-cream-900 mb-2">{t('suitable.for')}</h3>
                <ul className="list-disc pl-5 text-cream-700">
                  {product.skinTypes.map((type, index) => (
                    <li key={index}>{type}</li>
                  ))}
                </ul>
              </div>
              
              <div className="mb-6">
                <h3 className="font-medium text-cream-900 mb-2">{t('key.benefits')}</h3>
                <ul className="list-disc pl-5 text-cream-700">
                  {product.benefits.map((benefit, index) => (
                    <li key={index} className="mb-2">{benefit}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          
          <div className="mt-16">
            <Tabs defaultValue="how-to-use" className="w-full">
              <TabsList className="w-full grid grid-cols-3 gap-2">
                <TabsTrigger value="how-to-use">{t('how.to.use')}</TabsTrigger>
                <TabsTrigger value="ingredients">{t('ingredients')}</TabsTrigger>
                <TabsTrigger value="key-ingredients">{t('key.ingredients')}</TabsTrigger>
              </TabsList>
              <TabsContent value="how-to-use" className="mt-6">
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-cream-700">{product.usageInstructions}</p>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="ingredients" className="mt-6">
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-cream-700">{product.ingredients}</p>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="key-ingredients" className="mt-6">
                <Card>
                  <CardContent className="pt-6">
                    <ul className="list-disc pl-5 text-cream-700">
                      {product.keyIngredients.map((ingredient, index) => (
                        <li key={index} className="mb-2">{ingredient}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetail;
