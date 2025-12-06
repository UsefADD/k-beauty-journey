import React, { useEffect, useMemo, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Package, Truck, MapPin } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useCart } from "@/contexts/CartContext";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

const shippingFormSchema = z.object({
  fullName: z.string().min(1, "Le nom complet est requis").max(100, "Le nom ne doit pas dépasser 100 caractères"),
  email: z.string().email("Email invalide").optional().or(z.literal("")),
  address: z.string().min(1, "L'adresse est requise").max(200, "L'adresse ne doit pas dépasser 200 caractères"),
  city: z.string().min(1, "La ville est requise"),
  zipCode: z.string().optional(),
  phone: z.string().min(1, "Le numéro de téléphone est requis").regex(/^[0-9+\s-]{8,15}$/, "Numéro de téléphone invalide"),
});

// Grandes villes avec leurs tarifs de base
const MAJOR_CITIES: Record<string, number> = {
  "Tanger": 20,
  "Tetouan": 20,
  "Casablanca": 40,
  "Rabat": 40,
  "Agadir": 40,
  "Al Hoceima": 40,
  "Nador": 40,
  "Fès": 40,
  "Bouzenika": 45,
  "Marrakech": 45,
  "Meknès": 45,
  "Oujda": 45,
  "Béni Mellal": 40,
  "Laâyoune": 60,
  "Dakhla": 60,
};

// Petites villes associées aux grandes villes (avec +5 DHS)
const NEARBY_CITIES: Record<string, string> = {
  // Région Tanger-Tétouan-Al Hoceima
  "asilah": "Tanger",
  "assilah": "Tanger",
  "ksar el kebir": "Tanger",
  "larache": "Tanger",
  "chefchaouen": "Tanger",
  "ouezzane": "Tanger",
  "fahs anjra": "Tanger",
  "gzenaya": "Tanger",
  "jouamaa": "Tanger",
  "martil": "Tetouan",
  "mdiq": "Tetouan",
  "m'diq": "Tetouan",
  "fnideq": "Tetouan",
  "oued laou": "Tetouan",
  "jebha": "Tetouan",
  "imzouren": "Al Hoceima",
  "targuist": "Al Hoceima",
  "bni bouayach": "Al Hoceima",
  "ajdir": "Al Hoceima",
  "issaguen": "Al Hoceima",
  "ketama": "Al Hoceima",
  
  // Région Casablanca-Settat
  "mohammedia": "Casablanca",
  "berrechid": "Casablanca",
  "settat": "Casablanca",
  "el jadida": "Casablanca",
  "benslimane": "Casablanca",
  "mediouna": "Casablanca",
  "nouaceur": "Casablanca",
  "bouskoura": "Casablanca",
  "ain harrouda": "Casablanca",
  "dar bouazza": "Casablanca",
  "azemmour": "Casablanca",
  "sidi bennour": "Casablanca",
  "oualidia": "Casablanca",
  "had soualem": "Casablanca",
  "ain sebaa": "Casablanca",
  "sidi moumen": "Casablanca",
  "hay mohammadi": "Casablanca",
  "ben msik": "Casablanca",
  "sbata": "Casablanca",
  "ain chock": "Casablanca",
  "maarif": "Casablanca",
  "anfa": "Casablanca",
  "sidi maarouf": "Casablanca",
  "lissasfa": "Casablanca",
  "chaouia": "Casablanca",
  "ben ahmed": "Casablanca",
  
  // Région Rabat-Salé-Kénitra
  "sale": "Rabat",
  "salé": "Rabat",
  "temara": "Rabat",
  "témara": "Rabat",
  "kenitra": "Rabat",
  "kénitra": "Rabat",
  "skhirat": "Rabat",
  "harhoura": "Rabat",
  "ain aouda": "Rabat",
  "ain attig": "Rabat",
  "bouknadel": "Rabat",
  "sidi slimane": "Rabat",
  "sidi kacem": "Rabat",
  "mehdia": "Rabat",
  "moulay bousselham": "Rabat",
  "souk el arbaa": "Rabat",
  "khemisset": "Rabat",
  "tiflet": "Rabat",
  "rommani": "Rabat",
  
  // Région Bouzenika
  "bouznika": "Bouzenika",
  "cherrat": "Bouzenika",
  
  // Région Marrakech-Safi
  "safi": "Marrakech",
  "essaouira": "Marrakech",
  "el kelaa des sraghna": "Marrakech",
  "kelaa sraghna": "Marrakech",
  "chichaoua": "Marrakech",
  "ben guerir": "Marrakech",
  "youssoufia": "Marrakech",
  "tahanaout": "Marrakech",
  "ait ourir": "Marrakech",
  "amizmiz": "Marrakech",
  "asni": "Marrakech",
  "imlil": "Marrakech",
  "ouarzazate": "Marrakech",
  "zagora": "Marrakech",
  "errachidia": "Marrakech",
  "tinghir": "Marrakech",
  "rissani": "Marrakech",
  "merzouga": "Marrakech",
  
  // Région Fès-Meknès
  "sefrou": "Fès",
  "moulay yacoub": "Fès",
  "imouzzer kandar": "Fès",
  "ifrane": "Fès",
  "azrou": "Fès",
  "boulemane": "Fès",
  "missour": "Fès",
  "taza": "Fès",
  "guercif": "Fès",
  "taounate": "Fès",
  "el hajeb": "Meknès",
  "ain taoujdate": "Meknès",
  "boufekrane": "Meknès",
  "moulay idriss": "Meknès",
  "volubilis": "Meknès",
  "khénifra": "Meknès",
  "khenifra": "Meknès",
  "midelt": "Meknès",
  
  // Région Souss-Massa (Agadir)
  "inezgane": "Agadir",
  "ait melloul": "Agadir",
  "tiznit": "Agadir",
  "taroudant": "Agadir",
  "biougra": "Agadir",
  "dcheira": "Agadir",
  "oulad teima": "Agadir",
  "aourir": "Agadir",
  "taghazout": "Agadir",
  "tamri": "Agadir",
  "massa": "Agadir",
  "sidi ifni": "Agadir",
  "guelmim": "Agadir",
  "tan tan": "Agadir",
  "assa": "Agadir",
  "tata": "Agadir",
  "tafraout": "Agadir",
  
  // Région Oriental (Oujda)
  "berkane": "Oujda",
  "saïdia": "Oujda",
  "saidia": "Oujda",
  "ahfir": "Oujda",
  "taourirt": "Oujda",
  "jerada": "Oujda",
  "bouarfa": "Oujda",
  "figuig": "Oujda",
  "el aioun": "Oujda",
  
  // Région Nador
  "selouane": "Nador",
  "zaio": "Nador",
  "driouch": "Nador",
  "midar": "Nador",
  "beni ensar": "Nador",
  "ras el ma": "Nador",
  "monte arrouit": "Nador",
  "arekmane": "Nador",
  
  // Région Béni Mellal-Khénifra
  "fquih ben salah": "Béni Mellal",
  "kasba tadla": "Béni Mellal",
  "azilal": "Béni Mellal",
  "demnate": "Béni Mellal",
  "souk sebt": "Béni Mellal",
  "el ksiba": "Béni Mellal",
  "zaouiat cheikh": "Béni Mellal",
  
  // Région Laâyoune-Sakia El Hamra
  "tarfaya": "Laâyoune",
  "boujdour": "Laâyoune",
  "smara": "Laâyoune",
  "es semara": "Laâyoune",
  
  // Région Dakhla-Oued Ed-Dahab
  "bir gandouz": "Dakhla",
  "aousserd": "Dakhla",
  "oued ed dahab": "Dakhla",
};

const MAJOR_CITIES_LIST = Object.keys(MAJOR_CITIES);

type ShippingFormValues = z.infer<typeof shippingFormSchema>;

// Fonction pour calculer le tarif de livraison
const calculateShippingCost = (cityInput: string): { cost: number; nearestCity: string | null; isNearby: boolean } => {
  if (!cityInput) return { cost: 0, nearestCity: null, isNearby: false };
  
  const normalizedCity = cityInput.trim().toLowerCase();
  
  // Vérifier si c'est une grande ville
  for (const majorCity of MAJOR_CITIES_LIST) {
    if (majorCity.toLowerCase() === normalizedCity) {
      return { cost: MAJOR_CITIES[majorCity], nearestCity: majorCity, isNearby: false };
    }
  }
  
  // Vérifier si c'est une petite ville connue
  if (NEARBY_CITIES[normalizedCity]) {
    const nearestCity = NEARBY_CITIES[normalizedCity];
    return { cost: MAJOR_CITIES[nearestCity] + 5, nearestCity, isNearby: true };
  }
  
  // Ville non reconnue - tarif par défaut de 45 DHS
  return { cost: 45, nearestCity: null, isNearby: false };
};

const Payment = () => {
  const { t } = useLanguage();
  const { items, totalPrice, clearCart } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [showCitySelector, setShowCitySelector] = useState(false);
  const [selectedNearestCity, setSelectedNearestCity] = useState<string | null>(null);
  
  const form = useForm<ShippingFormValues>({
    resolver: zodResolver(shippingFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      address: "",
      city: "",
      zipCode: "",
      phone: "",
    },
  });

  const cityInput = form.watch("city");
  
  const shippingInfo = useMemo(() => {
    if (selectedNearestCity) {
      return { 
        cost: MAJOR_CITIES[selectedNearestCity] + 5, 
        nearestCity: selectedNearestCity, 
        isNearby: true 
      };
    }
    return calculateShippingCost(cityInput);
  }, [cityInput, selectedNearestCity]);
  
  const shippingCost = shippingInfo.cost;

  const grandTotal = totalPrice + shippingCost;
  
  // Check if there are any items in the cart
  useEffect(() => {
    if (items.length === 0) {
      toast({
        title: "Empty Cart",
        description: "Your cart is empty. Please add items before proceeding to payment.",
      });
      navigate('/shop');
    }
  }, [items, navigate, toast]);

  const onSubmit = async (data: ShippingFormValues) => {
    try {
      // Prepare order items for database
      const orderItems = items.map(item => ({
        product_id: item.id,
        product_name: item.name,
        product_price: item.price,
        quantity: item.quantity
      }));

      // Create order in database (this will reduce stock atomically)
      const { data: orderData, error } = await supabase.rpc('create_order', {
        p_customer_name: data.fullName,
        p_customer_email: data.email,
        p_customer_phone: data.phone,
        p_shipping_address: data.address,
        p_shipping_city: data.city,
        p_shipping_zip_code: data.zipCode,
        p_total_amount: grandTotal,
        p_items: orderItems as any,
        p_user_id: user?.id || null
      });

      if (error) {
        console.error('Order creation error:', error);
        // Check if it's a stock error
        if (error.message.includes('Insufficient stock')) {
          toast({
            title: "Stock insuffisant",
            description: "Désolé, certains produits ne sont plus disponibles en quantité suffisante.",
            variant: "destructive",
          });
          return;
        }
        throw error;
      }

      // Order created successfully, now format WhatsApp message
      const orderNumber = orderData?.[0]?.order_number || '';
      const orderDate = new Date().toLocaleString();
      let message = `🛍️ *NEW ORDER ${orderNumber}*\n\n`;
      message += `📅 Date: ${orderDate}\n\n`;
      message += `👤 *Customer Information:*\n`;
      message += `Name: ${data.fullName}\n`;
      message += `Email: ${data.email}\n`;
      message += `Phone: ${data.phone}\n\n`;
      message += `📍 *Shipping Address:*\n`;
      message += `Address: ${data.address}\n`;
      message += `City: ${data.city}\n`;
      message += `Zip Code: ${data.zipCode}\n\n`;
      message += `🛒 *Order Items:*\n`;
      
      items.forEach((item, index) => {
        message += `${index + 1}. ${item.name}\n`;
        message += `   Price: ${item.price} MAD\n`;
        message += `   Quantity: ${item.quantity}\n`;
        message += `   Subtotal: ${(item.price * item.quantity).toFixed(2)} MAD\n\n`;
      });
      
      message += `📦 *Frais de livraison: ${shippingCost} MAD*\n`;
      message += `💰 *Total Amount: ${grandTotal.toFixed(2)} MAD*\n`;

      // Create WhatsApp link
      const whatsappNumber = "212705658181";
      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

      // Open WhatsApp
      window.open(whatsappUrl, '_blank');

      toast({
        title: "Commande créée",
        description: `Votre commande ${orderNumber} a été enregistrée avec succès!`,
      });

      // Clear cart
      clearCart();
      
      // Navigate to home with confirmation state
      setTimeout(() => {
        navigate("/", { state: { orderConfirmed: true } });
      }, 1500);

    } catch (error: any) {
      console.error("Error processing order:", error);
      console.error("Error details:", {
        message: error?.message,
        details: error?.details,
        hint: error?.hint,
        code: error?.code
      });
      toast({
        title: "Erreur",
        description: error?.message || "Une erreur s'est produite lors de la création de la commande. Veuillez réessayer.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow py-12 bg-cream-50">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="text-3xl font-bold text-pink-800 mb-8">{t('payment.method')}</h1>
          
          <div className="space-y-8">
            {/* Order Summary */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="font-semibold text-lg mb-4">Récapitulatif</h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Sous-total</span>
                  <span>{totalPrice.toFixed(2)} MAD</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-2">
                    <Truck className="h-4 w-4" />
                    Livraison {cityInput && `(${cityInput})`}
                  </span>
                  <span>
                    {shippingCost > 0 ? (
                      <>
                        {shippingCost} MAD
                        {shippingInfo.isNearby && (
                          <span className="text-xs text-muted-foreground ml-1">
                            (proche de {shippingInfo.nearestCity})
                          </span>
                        )}
                      </>
                    ) : cityInput ? (
                      <span className="text-amber-600 text-sm">Ville non reconnue - sélectionnez ci-dessous</span>
                    ) : (
                      "Entrez votre ville"
                    )}
                  </span>
                </div>
                <div className="border-t pt-2 mt-2 flex justify-between font-semibold text-base">
                  <span>Total</span>
                  <span>{grandTotal.toFixed(2)} MAD</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center gap-3 text-pink-600 mb-6">
                <Package className="h-6 w-6" />
                <span className="font-medium text-lg">{t('shipping.information')}</span>
              </div>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('full.name')}</FormLabel>
                        <FormControl>
                          <Input placeholder={t('enter.full.name')} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="Enter your email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('address')}</FormLabel>
                        <FormControl>
                          <Input placeholder={t('enter.address')} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('city')}</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Entrez votre ville" 
                              {...field}
                              onChange={(e) => {
                                field.onChange(e);
                                setSelectedNearestCity(null);
                                setShowCitySelector(false);
                              }}
                            />
                          </FormControl>
                          {/* Afficher les suggestions si ville non reconnue */}
                          {cityInput && shippingCost === 0 && (
                            <div className="mt-2 p-3 bg-amber-50 border border-amber-200 rounded-md">
                              <p className="text-sm text-amber-800 mb-2 flex items-center gap-1">
                                <MapPin className="h-4 w-4" />
                                Ville non reconnue. Sélectionnez la grande ville la plus proche :
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {MAJOR_CITIES_LIST.map((city) => (
                                  <Button
                                    key={city}
                                    type="button"
                                    variant={selectedNearestCity === city ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => setSelectedNearestCity(city)}
                                    className="text-xs"
                                  >
                                    {city} ({MAJOR_CITIES[city] + 5} MAD)
                                  </Button>
                                ))}
                              </div>
                            </div>
                          )}
                          {/* Afficher le tarif calculé */}
                          {shippingCost > 0 && (
                            <p className="text-sm text-green-600 mt-1">
                              ✓ Livraison : {shippingCost} MAD
                              {shippingInfo.isNearby && ` (proche de ${shippingInfo.nearestCity})`}
                            </p>
                          )}
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="zipCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('zip.code')}</FormLabel>
                          <FormControl>
                            <Input placeholder={t('enter.zip.code')} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('phone.number')}</FormLabel>
                        <FormControl>
                          <Input placeholder={t('enter.phone.number')} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full bg-pink-600 hover:bg-pink-700">
                    {t('save.shipping.details')}
                  </Button>
                </form>
              </Form>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center gap-3 text-pink-600 mb-4">
                <Package className="h-6 w-6" />
                <span className="font-medium text-lg">{t('payment.method')}</span>
              </div>
              <p className="text-cream-700 text-lg">{t('cash.on.delivery.only')}</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Payment;