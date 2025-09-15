import React, { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Package, Search, Eye, Printer, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { useUserRole } from "@/hooks/useUserRole";
import { useAuth } from "@/contexts/AuthContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Order {
  id: string;
  order_number: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  shipping_address: string;
  shipping_city: string;
  shipping_zip_code: string;
  total_amount: number;
  status: string;
  created_at: string;
}

interface OrderItem {
  id: string;
  product_name: string;
  product_price: number;
  quantity: number;
  subtotal: number;
}

const AdminOrders: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [showOrderDialog, setShowOrderDialog] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { isAuthenticated, user } = useAuth();
  const { isAdmin, role, loading: roleLoading } = useUserRole();

  // Simple loading check first
  if (roleLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-lg">Checking permissions...</div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // If not authenticated, show access restricted
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <Lock className="h-16 w-16 text-muted-foreground mb-4" />
            <h1 className="text-2xl font-bold mb-2">Please Sign In</h1>
            <p className="text-muted-foreground">
              You need to be logged in to access this page.
            </p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // If not admin, show access restricted
  if (!isAdmin) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <Lock className="h-16 w-16 text-muted-foreground mb-4" />
            <h1 className="text-2xl font-bold mb-2">Access Restricted</h1>
            <p className="text-muted-foreground">
              Admin privileges required. Current role: {role || 'customer'}
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Email: {user?.email}
            </p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Fetch orders
  const { data: orders = [], isLoading } = useQuery({
    queryKey: ['orders'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Order[];
    }
  });

  // Update order status mutation
  const updateOrderStatus = useMutation({
    mutationFn: async ({ orderId, status }: { orderId: string; status: string }) => {
      const { error } = await supabase
        .from('orders')
        .update({ status })
        .eq('id', orderId);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      toast({
        title: "Status updated",
        description: "Order status has been updated successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update order status.",
        variant: "destructive",
      });
    }
  });

  // View order details
  const viewOrderDetails = async (order: Order) => {
    setSelectedOrder(order);
    
    const { data, error } = await supabase
      .from('order_items')
      .select('*')
      .eq('order_id', order.id);
    
    if (error) {
      toast({
        title: "Error",
        description: "Failed to load order details.",
        variant: "destructive",
      });
      return;
    }
    
    setOrderItems(data as OrderItem[]);
    setShowOrderDialog(true);
  };

  // Print order for preparation
  const printOrder = async (order: Order) => {
    const { data, error } = await supabase
      .from('order_items')
      .select('*')
      .eq('order_id', order.id);
    
    if (error) {
      toast({
        title: "Error",
        description: "Failed to load order details for printing.",
        variant: "destructive",
      });
      return;
    }
    
    // Create print content
    const printContent = `
      <html>
        <head>
          <title>Order ${order.order_number} - Preparation</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .header { border-bottom: 2px solid #000; padding-bottom: 10px; margin-bottom: 20px; }
            .section { margin-bottom: 20px; }
            .section h3 { margin-bottom: 10px; border-bottom: 1px solid #ccc; }
            .item { padding: 8px 0; border-bottom: 1px dotted #ccc; }
            .item:last-child { border-bottom: none; }
            .total { font-weight: bold; font-size: 1.2em; margin-top: 15px; }
            .prep-notes { background: #f5f5f5; padding: 15px; margin-top: 20px; }
            @media print { body { margin: 0; } }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>ORDER PREPARATION SHEET</h1>
            <p><strong>Order #:</strong> ${order.order_number}</p>
            <p><strong>Date:</strong> ${format(new Date(order.created_at), 'MMM dd, yyyy HH:mm')}</p>
            <p><strong>Status:</strong> ${order.status.toUpperCase()}</p>
          </div>
          
          <div class="section">
            <h3>CUSTOMER INFORMATION</h3>
            <p><strong>Name:</strong> ${order.customer_name}</p>
            <p><strong>Phone:</strong> ${order.customer_phone || 'N/A'}</p>
            <p><strong>Email:</strong> ${order.customer_email || 'N/A'}</p>
          </div>
          
          <div class="section">
            <h3>SHIPPING ADDRESS</h3>
            <p>${order.shipping_address}</p>
            <p>${order.shipping_city}, ${order.shipping_zip_code}</p>
          </div>
          
          <div class="section">
            <h3>ITEMS TO PREPARE</h3>
            ${data.map(item => `
              <div class="item">
                <strong>${item.product_name}</strong><br>
                Quantity: <strong>${item.quantity}</strong> × $${item.product_price.toFixed(2)} = $${item.subtotal.toFixed(2)}
              </div>
            `).join('')}
            <div class="total">
              TOTAL: $${order.total_amount.toFixed(2)}
            </div>
          </div>
          
          <div class="prep-notes">
            <h3>PREPARATION NOTES</h3>
            <p>☐ Items picked and verified</p>
            <p>☐ Items packed securely</p>
            <p>☐ Shipping label attached</p>
            <p>☐ Ready for pickup/delivery</p>
            <br>
            <p><strong>Prepared by:</strong> ________________</p>
            <p><strong>Date prepared:</strong> ________________</p>
          </div>
        </body>
      </html>
    `;
    
    // Open print window
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(printContent);
      printWindow.document.close();
      printWindow.focus();
      setTimeout(() => {
        printWindow.print();
        printWindow.close();
      }, 250);
    }
  };

  // Filter orders based on search term
  const filteredOrders = useMemo(() => {
    return orders.filter(order =>
      order.order_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer_email?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [orders, searchTerm]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-green-100 text-green-800';
      case 'delivered':
        return 'bg-emerald-100 text-emerald-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-lg">Loading orders...</div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex items-center gap-2 mb-8">
          <Package className="h-8 w-8" />
          <h1 className="text-3xl font-bold">Order Management</h1>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search orders by number, customer name, or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Orders Grid */}
        <div className="grid gap-4">
          {filteredOrders.length === 0 ? (
            <Card>
              <CardContent className="flex items-center justify-center h-32">
                <p className="text-muted-foreground">No orders found</p>
              </CardContent>
            </Card>
          ) : (
            filteredOrders.map((order) => (
              <Card key={order.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-1">
                      <div>
                        <p className="font-semibold text-lg">{order.order_number}</p>
                        <p className="text-sm text-muted-foreground">
                          {format(new Date(order.created_at), 'MMM dd, yyyy HH:mm')}
                        </p>
                      </div>
                      <div>
                        <p className="font-medium">{order.customer_name}</p>
                        <p className="text-sm text-muted-foreground">{order.customer_email}</p>
                        <p className="text-sm text-muted-foreground">{order.customer_phone}</p>
                      </div>
                      <div>
                        <p className="font-semibold">${order.total_amount.toFixed(2)}</p>
                        <p className="text-sm text-muted-foreground">
                          {order.shipping_city}, {order.shipping_zip_code}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                      <Badge className={getStatusColor(order.status)}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </Badge>
                      
                        <div className="flex gap-2">
                         <Button
                           variant="outline"
                           size="sm"
                           onClick={() => viewOrderDetails(order)}
                         >
                           <Eye className="h-4 w-4 mr-1" />
                           View
                         </Button>
                         
                         <Button
                           variant="outline"
                           size="sm"
                           onClick={() => printOrder(order)}
                           className="bg-green-50 hover:bg-green-100"
                         >
                           <Printer className="h-4 w-4 mr-1" />
                           Print
                         </Button>
                        
                        <Select
                          value={order.status}
                          onValueChange={(value) => 
                            updateOrderStatus.mutate({ orderId: order.id, status: value })
                          }
                        >
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="processing">Processing</SelectItem>
                            <SelectItem value="shipped">Shipped</SelectItem>
                            <SelectItem value="delivered">Delivered</SelectItem>
                            <SelectItem value="cancelled">Cancelled</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </main>

      {/* Order Details Dialog */}
      <Dialog open={showOrderDialog} onOpenChange={setShowOrderDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Order Details - {selectedOrder?.order_number}</DialogTitle>
          </DialogHeader>
          
          {selectedOrder && (
            <div className="space-y-6">
              {/* Customer Info */}
              <div>
                <h3 className="font-semibold mb-2">Customer Information</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Name:</span> {selectedOrder.customer_name}
                  </div>
                  <div>
                    <span className="text-muted-foreground">Email:</span> {selectedOrder.customer_email}
                  </div>
                  <div>
                    <span className="text-muted-foreground">Phone:</span> {selectedOrder.customer_phone}
                  </div>
                  <div>
                    <span className="text-muted-foreground">Status:</span>{' '}
                    <Badge className={getStatusColor(selectedOrder.status)}>
                      {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div>
                <h3 className="font-semibold mb-2">Shipping Address</h3>
                <p className="text-sm">
                  {selectedOrder.shipping_address}<br />
                  {selectedOrder.shipping_city}, {selectedOrder.shipping_zip_code}
                </p>
              </div>

              {/* Order Items */}
              <div>
                <h3 className="font-semibold mb-2">Order Items</h3>
                <div className="space-y-2">
                  {orderItems.map((item) => (
                    <div key={item.id} className="flex justify-between items-center py-2 border-b">
                      <div>
                        <p className="font-medium">{item.product_name}</p>
                        <p className="text-sm text-muted-foreground">
                          ${item.product_price.toFixed(2)} x {item.quantity}
                        </p>
                      </div>
                      <p className="font-semibold">${item.subtotal.toFixed(2)}</p>
                    </div>
                  ))}
                  <div className="flex justify-between items-center pt-2 font-semibold text-lg">
                    <span>Total:</span>
                    <span>${selectedOrder.total_amount.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Print Button in Dialog */}
              <div className="flex justify-end pt-4 border-t">
                <Button 
                  onClick={() => printOrder(selectedOrder)}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Printer className="h-4 w-4 mr-2" />
                  Print Preparation Sheet
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default AdminOrders;