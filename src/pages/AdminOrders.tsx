import React, { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Package, Eye, Printer, Lock } from "lucide-react";
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
import OrdersStatsCards from "@/components/OrdersStatsCards";
import OrdersFilters from "@/components/OrdersFilters";

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
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [showOrderDialog, setShowOrderDialog] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { isAuthenticated, user } = useAuth();
  const { isAdmin, role, loading: roleLoading } = useUserRole();

  // Fetch orders (only when admin)
  const { data: orders = [], isLoading, error } = useQuery({
    queryKey: ['orders'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data as Order[];
    },
    enabled: isAuthenticated && isAdmin, // prevent running for non-admins or before role resolves
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
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update order status.",
        variant: "destructive",
      });
    }
  });

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

  // Filter orders based on search term, status, and date
  const filteredOrders = useMemo(() => {
    let filtered = orders;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(order =>
        order.order_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer_email?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by status
    if (statusFilter !== "all") {
      filtered = filtered.filter(order => order.status === statusFilter);
    }

    // Filter by date
    if (dateFilter !== "all") {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const thisWeekStart = new Date(today.getTime() - (today.getDay() * 24 * 60 * 60 * 1000));
      const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);

      filtered = filtered.filter(order => {
        const orderDate = new Date(order.created_at);
        switch (dateFilter) {
          case "today":
            return orderDate >= today;
          case "week":
            return orderDate >= thisWeekStart;
          case "month":
            return orderDate >= thisMonthStart;
          default:
            return true;
        }
      });
    }

    return filtered;
  }, [orders, searchTerm, statusFilter, dateFilter]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'processing':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'shipped':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'delivered':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handlePrintOrders = () => {
    // Create a print-friendly version of the orders table
    const printContent = `
      <html>
        <head>
          <title>Orders Report</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            h1 { text-align: center; margin-bottom: 30px; }
            table { width: 100%; border-collapse: collapse; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f5f5f5; font-weight: bold; }
            .status { padding: 4px 8px; border-radius: 4px; font-size: 12px; }
            .status-pending { background-color: #fef3c7; color: #92400e; }
            .status-processing { background-color: #dbeafe; color: #1e40af; }
            .status-shipped { background-color: #d1fae5; color: #065f46; }
            .status-delivered { background-color: #d1fae5; color: #064e3b; }
            .status-cancelled { background-color: #fee2e2; color: #991b1b; }
            @media print { body { margin: 0; } }
          </style>
        </head>
        <body>
          <h1>Orders Report</h1>
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${filteredOrders.map(order => `
                <tr>
                  <td>${order.order_number}</td>
                  <td>${order.customer_name}</td>
                  <td>${format(new Date(order.created_at), 'MMM dd, yyyy')}</td>
                  <td>$${order.total_amount.toFixed(2)}</td>
                  <td><span class="status status-${order.status}">${order.status.charAt(0).toUpperCase() + order.status.slice(1)}</span></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </body>
      </html>
    `;
    
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

  const handleExportCSV = () => {
    const csvHeaders = ['Order ID', 'Customer', 'Email', 'Phone', 'Date', 'Amount', 'Status', 'Shipping Address'];
    const csvData = filteredOrders.map(order => [
      order.order_number,
      order.customer_name,
      order.customer_email || '',
      order.customer_phone || '',
      format(new Date(order.created_at), 'yyyy-MM-dd'),
      order.total_amount.toFixed(2),
      order.status,
      `"${order.shipping_address}, ${order.shipping_city}, ${order.shipping_zip_code}"`
    ]);

    const csvContent = [csvHeaders, ...csvData]
      .map(row => row.join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `orders-${format(new Date(), 'yyyy-MM-dd')}.csv`;
    link.click();
    window.URL.revokeObjectURL(url);
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
      <main className="flex-1 container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Package className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold">Orders Management</h1>
        </div>

        {/* Statistics Cards */}
        <OrdersStatsCards />

        {/* Filters */}
        <OrdersFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          dateFilter={dateFilter}
          onDateFilterChange={setDateFilter}
          onPrint={handlePrintOrders}
          onExport={handleExportCSV}
        />

        {/* Orders Table */}
        <Card className="shadow-sm">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="font-semibold">Order ID</TableHead>
                  <TableHead className="font-semibold">Customer</TableHead>
                  <TableHead className="font-semibold">Date</TableHead>
                  <TableHead className="font-semibold">Amount</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="font-semibold">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-12">
                      <div className="text-muted-foreground">
                        <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p className="text-lg font-medium">No orders found</p>
                        <p className="text-sm">Try adjusting your search or filter criteria</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredOrders.map((order) => (
                    <TableRow key={order.id} className="hover:bg-muted/50 transition-colors">
                      <TableCell>
                        <div>
                          <p className="font-semibold text-sm">{order.order_number}</p>
                          <p className="text-xs text-muted-foreground">
                            {format(new Date(order.created_at), 'MMM dd, yyyy')}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium text-sm">{order.customer_name}</p>
                          <p className="text-xs text-muted-foreground">{order.customer_email}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <p className="text-sm">
                          {format(new Date(order.created_at), 'MMM dd, yyyy')}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {format(new Date(order.created_at), 'HH:mm')}
                        </p>
                      </TableCell>
                      <TableCell>
                        <p className="font-semibold text-sm">
                          ${order.total_amount.toFixed(2)}
                        </p>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Badge 
                            variant="outline" 
                            className={`text-xs font-medium ${getStatusColor(order.status)}`}
                          >
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </Badge>
                          <Select
                            value={order.status}
                            onValueChange={(value) => 
                              updateOrderStatus.mutate({ orderId: order.id, status: value })
                            }
                          >
                            <SelectTrigger className="h-8 w-28 text-xs">
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
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => viewOrderDetails(order)}
                            className="h-8 w-8 p-0"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => printOrder(order)}
                            className="h-8 w-8 p-0 text-green-600 hover:text-green-700 hover:bg-green-50"
                          >
                            <Printer className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
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