import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import { CartProvider } from "./contexts/CartContext";
import Index from "./pages/Index";
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
import ShopIngredient from "./pages/ShopIngredient";
import ProductDetail from "./pages/ProductDetail";
import NotFound from "./pages/NotFound";
import Payment from "./pages/Payment";
import CartPage from "./pages/CartPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <CartProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/brands" element={<Brands />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/shop/newly-curated" element={<ShopNewlyCurated />} />
              <Route path="/shop/viral" element={<ShopViral />} />
              <Route path="/shop/best-sellers" element={<ShopBestSellers />} />
              <Route path="/shop/sets" element={<ShopRoutines />} />
              <Route path="/shop/skin-concern" element={<ShopSkinConcern />} />
              <Route path="/shop/skin-type" element={<ShopSkinType />} />
              <Route path="/shop/brand" element={<ShopBrand />} />
              <Route path="/shop/product-type" element={<ShopProductType />} />
              <Route path="/shop/ingredient" element={<ShopIngredient />} />
              <Route path="/product/:productId" element={<ProductDetail />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </CartProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
