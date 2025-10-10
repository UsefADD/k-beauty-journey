import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useProductWithDetails } from '../hooks/useProductWithDetails';
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const formSchema = z.object({
  name: z.string().min(2, { message: "Le nom du produit doit contenir au moins 2 caractères." }),
  brand: z.string().min(1, { message: "La marque est requise." }),
  price: z.string().min(1, { message: "Le prix est requis." }),
  description: z.string().optional(),
  product_type: z.string().optional(),
  product_subtype: z.string().optional(),
  how_to_use: z.string().optional(),
  ingredients: z.string().optional(),
  volume: z.string().optional(),
  images: z.array(z.object({
    image_url: z.string().url({ message: "URL d'image invalide." }),
    display_order: z.coerce.number().int().nonnegative(),
  })).default([]),
  variants: z.array(z.object({
    volume: z.string().min(1, { message: "Le volume est requis." }),
    price: z.coerce.number().positive({ message: "Le prix doit être positif." }),
    stock_quantity: z.coerce.number().int().nonnegative({ message: "Le stock doit être positif." }),
  })).default([]),
});

type FormValues = z.infer<typeof formSchema>;

const AddProductForm: React.FC = () => {
  const { addProductWithDetails } = useProductWithDetails();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      brand: '',
      price: '',
      description: '',
      product_type: '',
      product_subtype: '',
      how_to_use: '',
      ingredients: '',
      volume: '',
      images: [],
      variants: [],
    },
  });

  const { fields: imageFields, append: appendImage, remove: removeImage } = useFieldArray({
    control: form.control,
    name: "images",
  });

  const { fields: variantFields, append: appendVariant, remove: removeVariant } = useFieldArray({
    control: form.control,
    name: "variants",
  });

  const onSubmit = async (values: FormValues) => {
    const productData = {
      Product_name: values.name,
      brand: values.brand,
      price: values.price,
      description: values.description || '',
      product_type: values.product_type || '',
      product_subtype: values.product_subtype || '',
      how_to_use: values.how_to_use || '',
      ingredients: values.ingredients || '',
      volume: values.volume || '',
      images: values.images,
      variants: values.variants,
    };
    
    addProductWithDetails.mutate(productData);
    if (!addProductWithDetails.isError) {
      form.reset();
    }
  };

  return (
    <div className="p-6 bg-background rounded-lg shadow-md space-y-6">
      <h2 className="text-2xl font-serif font-medium mb-6">Ajouter un nouveau produit</h2>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Informations de base */}
          <Card>
            <CardHeader>
              <CardTitle>Informations de base</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom du produit</FormLabel>
                    <FormControl>
                      <Input placeholder="Entrez le nom du produit" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="brand"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Marque</FormLabel>
                    <FormControl>
                      <Input placeholder="Entrez la marque" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Prix (MAD)</FormLabel>
                      <FormControl>
                        <Input placeholder="289" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="volume"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Volume</FormLabel>
                      <FormControl>
                        <Input placeholder="50ml" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Description du produit" 
                        className="resize-none h-24" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="product_type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type de produit</FormLabel>
                      <FormControl>
                        <Input placeholder="Sérum" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="product_subtype"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sous-type</FormLabel>
                      <FormControl>
                        <Input placeholder="Hydratant" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="how_to_use"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mode d'emploi</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Comment utiliser le produit" 
                        className="resize-none h-24" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="ingredients"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ingrédients</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Liste des ingrédients" 
                        className="resize-none h-24" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Images */}
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>Images du produit</span>
                <Button
                  type="button"
                  size="sm"
                  onClick={() => appendImage({ image_url: '', display_order: imageFields.length })}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Ajouter une image
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {imageFields.length === 0 ? (
                <p className="text-sm text-muted-foreground">Aucune image ajoutée</p>
              ) : (
                imageFields.map((field, index) => (
                  <div key={field.id} className="flex gap-4 items-end">
                    <FormField
                      control={form.control}
                      name={`images.${index}.image_url`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>URL de l'image {index + 1}</FormLabel>
                          <FormControl>
                            <Input placeholder="https://exemple.com/image.jpg" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`images.${index}.display_order`}
                      render={({ field }) => (
                        <FormItem className="w-24">
                          <FormLabel>Ordre</FormLabel>
                          <FormControl>
                            <Input type="number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      onClick={() => removeImage(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))
              )}
            </CardContent>
          </Card>

          {/* Variantes */}
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>Variantes du produit</span>
                <Button
                  type="button"
                  size="sm"
                  onClick={() => appendVariant({ volume: '', price: 0, stock_quantity: 0 })}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Ajouter une variante
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {variantFields.length === 0 ? (
                <p className="text-sm text-muted-foreground">Aucune variante ajoutée</p>
              ) : (
                variantFields.map((field, index) => (
                  <div key={field.id} className="flex gap-4 items-end">
                    <FormField
                      control={form.control}
                      name={`variants.${index}.volume`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>Volume</FormLabel>
                          <FormControl>
                            <Input placeholder="50ml" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`variants.${index}.price`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>Prix (MAD)</FormLabel>
                          <FormControl>
                            <Input type="number" step="0.01" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`variants.${index}.stock_quantity`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>Stock</FormLabel>
                          <FormControl>
                            <Input type="number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      onClick={() => removeVariant(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))
              )}
            </CardContent>
          </Card>

          <Button 
            type="submit" 
            className="w-full"
            disabled={addProductWithDetails.isPending}
          >
            {addProductWithDetails.isPending ? "Ajout en cours..." : "Ajouter le produit"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default AddProductForm;
