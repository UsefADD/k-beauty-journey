
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useInventory } from '../hooks/useInventory';
import AddProductForm from '../components/AddProductForm';
import BackgroundProcessor from '../components/BackgroundProcessor';
import { 
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Package } from "lucide-react";

const AdminInventory = () => {
  const { products, isLoading } = useInventory();
  const [searchTerm, setSearchTerm] = React.useState('');

  const filteredProducts = React.useMemo(() => {
    if (!products) return [];
    return products.filter(product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [products, searchTerm]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow py-12 bg-cream-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-knude-900 font-serif flex items-center">
              <Package className="mr-2 h-6 w-6" />
              Inventory Management
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 space-y-6">
              <AddProductForm />
              <BackgroundProcessor />
            </div>
            
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="mb-6">
                  <Input 
                    placeholder="Search products..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="max-w-sm"
                  />
                </div>
                
                {isLoading ? (
                  <div className="text-center py-8">Loading products...</div>
                ) : (
                  <Table>
                    <TableCaption>Inventory of products</TableCaption>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Product</TableHead>
                        <TableHead>Brand</TableHead>
                        <TableHead>Price (MAD)</TableHead>
                        <TableHead className="text-right">Stock</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredProducts.length > 0 ? (
                        filteredProducts.map((product) => (
                          <TableRow key={product.id}>
                            <TableCell className="font-medium">{product.name}</TableCell>
                            <TableCell>{product.brand}</TableCell>
                            <TableCell>{product.price.toFixed(2)}</TableCell>
                            <TableCell className="text-right">{product.stock_quantity}</TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={4} className="text-center py-4">
                            No products found
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminInventory;
