
import { Toaster } from "@/components/ui/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import { CartProvider } from "./contexts/CartContext";
import { AuthProvider } from "./contexts/AuthContext";
import Index from "./pages/Index";
import About from "./pages/About";
import Brands from "./pages/Brands";
import Shop from "./pages/Shop";
import ShopNewlyCurated from "./pages/ShopNewlyCurated";
import ShopViral from "./pages/ShopViral";
import ShopBestSellers from "./pages/ShopBestSellers";
import ShopRoutines from "./pages/ShopRoutines";
import ShopSkinConcern from "./pages/ShopSkinConcern";
import ShopBrand from "./pages/ShopBrand";
import ShopProductType from "./pages/ShopProductType";
import ShopSkinType from "./pages/ShopSkinType";
import ShopSkinTypeProducts from "./pages/ShopSkinTypeProducts";
import ShopIngredient from "./pages/ShopIngredient";
import ProductDetail from "./pages/ProductDetail";
import BrandProducts from "./pages/BrandProducts";
import NotFound from "./pages/NotFound";
import Payment from "./pages/Payment";
import CartPage from "./pages/CartPage";
import AdminInventory from "./pages/AdminInventory";
import AdminOrders from "./pages/AdminOrders";
import AdminNewsletter from "./pages/AdminNewsletter";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import BlogArticle from "./pages/BlogArticle";
import ErrorBoundary from "./components/ErrorBoundary";

const queryClient = new QueryClient();

const App = () => (
  <ErrorBoundary name="App Root">
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <AuthProvider>
          <CartProvider>
            <Toaster />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/about" element={<About />} />
                <Route path="/brands" element={<Brands />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/shop/newly-curated" element={<ShopNewlyCurated />} />
                <Route path="/shop/viral" element={<ShopViral />} />
                <Route path="/shop/best-sellers" element={<ShopBestSellers />} />
                <Route path="/shop/sets" element={<ShopRoutines />} />
                <Route path="/shop/skin-concern" element={<ShopSkinConcern />} />
                <Route path="/shop/skin-type" element={<ShopSkinType />} />
                <Route path="/shop/skin-type/:skinType" element={<ShopSkinTypeProducts />} />
                <Route path="/shop/skin-type/:skinType/:subtype" element={<ShopSkinTypeProducts />} />
                <Route path="/shop/brand" element={<ShopBrand />} />
                <Route path="/shop/brand/:brandName" element={<BrandProducts />} />
                <Route path="/shop/product-type" element={<ShopProductType />} />
                <Route path="/shop/product-type/:type" element={<ShopProductType />} />
                <Route path="/shop/product-type/:type/:subtype" element={<ShopProductType />} />
                <Route path="/shop/ingredient" element={<ShopIngredient />} />
                <Route path="/product/:productId" element={<ProductDetail />} />
                <Route path="/payment" element={<Payment />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/admin/inventory" element={<AdminInventory />} />
                <Route path="/admin/orders" element={<AdminOrders />} />
                <Route path="/admin/newsletter" element={<AdminNewsletter />} />
                <Route path="/blog/:articleId" element={<BlogArticle />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </CartProvider>
        </AuthProvider>
      </LanguageProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
