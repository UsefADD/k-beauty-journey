import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart, Star, Loader2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useCart } from '../contexts/CartContext';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import EditableRating from "../components/EditableRating";
import { useProductReview } from '@/hooks/useProductReview';
import { formatDistance } from 'date-fns';
import { useProducts, Product } from '@/hooks/useProducts';

interface ProductReview {
  rating: number;
  review: string | null;
  created_at: string;
}

const ProductDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const { addItem } = useCart();
  const { getProductReviews } = useProductReview();
  const { fetchSingleProduct } = useProducts();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoadingProduct, setIsLoadingProduct] = useState(true);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [productReviews, setProductReviews] = useState<ProductReview[]>([]);
  const [isLoadingReviews, setIsLoadingReviews] = useState(false);
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    const loadProduct = async () => {
      if (productId) {
        setIsLoadingProduct(true);
        const productData = await fetchSingleProduct(productId);
        console.log('Product data received:', productData);
        if (productData) {
          setProduct(productData);
        } else {
          console.log('No product found, navigating to 404');
          navigate('/404');
        }
        setIsLoadingProduct(false);
      }
    };
    
    loadProduct();
  }, [productId]);

  const handleAddToCart = () => {
    if (product) {
      addItem({
        id: productId || '0',
        name: product.Product_name,
        price: product.price,
        image: product.image_url || '',
      });
    }
  };

  function handleRatingChange(newRating: number, newReview: string) {
    setRating(newRating);
    setReview(newReview);
    fetchProductReviews(); // Refresh reviews after change
  }

  const fetchProductReviews = async () => {
    if (productId) {
      setIsLoadingReviews(true);
      try {
        const reviews = await getProductReviews(productId);
        setProductReviews(reviews as ProductReview[]);
        
        // Calculate average rating
        if (reviews.length > 0) {
          const total = reviews.reduce((sum, item) => sum + Number(item.rating), 0);
          setAverageRating(total / reviews.length);
        }
      } catch (error) {
        console.error("Error fetching product reviews:", error);
      } finally {
        setIsLoadingReviews(false);
      }
    }
  };

  useEffect(() => {
    if (productId) {
      fetchProductReviews();
    }
  }, [productId]);

  if (isLoadingProduct) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
            <Button onClick={() => navigate('/')}>Back to Home</Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const productImages = product.image_url ? [product.image_url] : ['/placeholder.svg'];
  const productPrice = product.price;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow py-12 bg-cream-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-10">
            <div className="md:w-1/2">
              <Carousel className="w-full">
                <CarouselContent>
                  {productImages.map((image, index) => (
                    <CarouselItem key={index}>
                      <div className="aspect-square w-full overflow-hidden rounded-xl bg-cream-100">
                        <img
                          src={image}
                          alt={`${product.Product_name} - View ${index + 1}`}
                          className="h-full w-full object-cover object-center"
                          onError={(e) => {
                            e.currentTarget.src = '/placeholder.svg';
                          }}
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
                <span className="font-medium text-black uppercase text-xs">{product.brand}</span>
              </div>
              <h1 className="text-3xl font-bold text-black mb-3">{product.Product_name}</h1>
              
              <EditableRating 
                rating={rating} 
                review={review} 
                productId={productId || '0'} 
                onChange={handleRatingChange} 
              />
              
              <div className="text-2xl font-bold text-black mb-6">
                {productPrice.toFixed(2)} MAD
              </div>
              
              <div className="flex gap-3 mb-8">
                <Button 
                  onClick={handleAddToCart} 
                  className="flex-1 bg-white text-pink-600 border border-pink-600 hover:bg-pink-50"
                  disabled={!product.stock_quantity || product.stock_quantity <= 0}
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  {product.stock_quantity && product.stock_quantity > 0 ? t('add.to.cart') : t('out.of.stock')}
                </Button>
                <Button variant="outline" className="px-4 border-cream-200">
                  <Heart className="h-5 w-5 text-pink-600" />
                </Button>
              </div>
              
              <div className="mb-6">
                <h3 className="font-medium text-black mb-2">{t('product.description')}</h3>
                <p className="text-black whitespace-pre-line">{product.description}</p>
              </div>
              
              {product["skin type"] && (
                <div className="mb-6">
                  <h3 className="font-medium text-black mb-2">{t('suitable.for')}</h3>
                  <div className="text-black whitespace-pre-line">{product["skin type"]}</div>
                </div>
              )}
            </div>
          </div>
          
          <div className="mt-16">
            <Tabs defaultValue="how-to-use" className="w-full">
              <TabsList className="w-full grid grid-cols-3 gap-2">
                <TabsTrigger value="how-to-use" className="text-black">{t('how.to.use')}</TabsTrigger>
                <TabsTrigger value="ingredients" className="text-black">{t('ingredients')}</TabsTrigger>
                <TabsTrigger value="reviews" className="text-black">Reviews</TabsTrigger>
              </TabsList>
              <TabsContent value="how-to-use" className="mt-6">
                <Card>
                  <CardContent className="pt-6">
                    {product.how_to_use ? (
                      <p className="text-black whitespace-pre-line">{product.how_to_use}</p>
                    ) : (
                      <p className="text-black">Usage instructions not available for this product.</p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="ingredients" className="mt-6">
                <Card>
                  <CardContent className="pt-6">
                    {product.ingredients ? (
                      <p className="text-black whitespace-pre-line">{product.ingredients}</p>
                    ) : (
                      <p className="text-black">Ingredients information not available for this product.</p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="reviews" className="mt-6">
                <Card>
                  <CardContent className="pt-6">
                    {isLoadingReviews ? (
                      <div className="flex justify-center py-8">
                        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
                      </div>
                    ) : productReviews.length > 0 ? (
                      <div className="space-y-6">
                        {productReviews.map((review, index) => (
                          <div key={index} className="border-b pb-4 last:border-b-0">
                            <div className="flex items-center mb-2">
                              <div className="flex items-center mr-2">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-4 w-4 ${
                                      i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="text-sm text-gray-500">
                                {formatDistance(new Date(review.created_at), new Date(), { addSuffix: true })}
                              </span>
                            </div>
                            {review.review && <p className="text-black">{review.review}</p>}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-center py-8 text-gray-500">No reviews yet. Be the first to review this product!</p>
                    )}
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
