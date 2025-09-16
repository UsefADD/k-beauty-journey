import React, { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Eye, Lock, ShoppingBag } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { useUserRole } from "@/hooks/useUserRole";
import { useAuth } from "@/contexts/AuthContext";
import { OrdersStatsCards } from "@/components/OrdersStatsCards";
import { OrdersFilters } from "@/components/OrdersFilters";
import { useOrderStats } from "@/hooks/useOrderStats";
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
    enabled: isAuthenticated && isAdmin,
  });

  // Calculate statistics
  const stats = useOrderStats(orders);

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

  // Filter orders based on search term, status, and date
  const filteredOrders = useMemo(() => {
    return orders.filter(order => {
      const matchesSearch = 
        order.order_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer_email?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
      
      let matchesDate = true;
      if (dateFilter !== 'all') {
        const orderDate = new Date(order.created_at);
        const now = new Date();
        
        switch (dateFilter) {
          case 'today':
            matchesDate = orderDate.toDateString() === now.toDateString();
            break;
          case 'week':
            const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
            matchesDate = orderDate >= weekAgo;
            break;
          case 'month':
            const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
            matchesDate = orderDate >= monthAgo;
            break;
        }
      }
      
      return matchesSearch && matchesStatus && matchesDate;
    });
  }, [orders, searchTerm, statusFilter, dateFilter]);

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

  // Print orders
  const handlePrint = () => {
    window.print();
  };

  // Export to CSV
  const handleExport = () => {
    const csvContent = [
      'Order ID,Customer,Date,Amount,Status',
      ...filteredOrders.map(order => 
        `${order.order_number},"${order.customer_name}",${format(new Date(order.created_at), 'MMM dd, yyyy')},${order.total_amount.toFixed(2)} dhs,${order.status}`
      )
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `orders-${format(new Date(), 'yyyy-MM-dd')}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-admin-warning/10 text-admin-warning border-admin-warning/20';
      case 'processing':
        return 'bg-admin-info/10 text-admin-info border-admin-info/20';
      case 'shipped':
        return 'bg-admin-success/10 text-admin-success border-admin-success/20';
      case 'delivered':
        return 'bg-admin-success/10 text-admin-success border-admin-success/20';
      case 'cancelled':
        return 'bg-admin-danger/10 text-admin-danger border-admin-danger/20';
      default:
        return 'bg-admin-muted/10 text-admin-muted border-admin-muted/20';
    }
  };

  // Loading check
  if (roleLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-admin-background">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-lg text-admin-muted">Checking permissions...</div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Authentication check
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col bg-admin-background">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <Lock className="h-16 w-16 text-admin-muted mb-4" />
            <h1 className="text-2xl font-bold mb-2 text-admin-text">Please Sign In</h1>
            <p className="text-admin-muted">
              You need to be logged in to access this page.
            </p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Admin check
  if (!isAdmin) {
    return (
      <div className="min-h-screen flex flex-col bg-admin-background">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <Lock className="h-16 w-16 text-admin-muted mb-4" />
            <h1 className="text-2xl font-bold mb-2 text-admin-text">Access Restricted</h1>
            <p className="text-admin-muted">
              Admin privileges required. Current role: {role || 'customer'}
            </p>
            <p className="text-sm text-admin-muted mt-2">
              Email: {user?.email}
            </p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-admin-background">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-lg text-admin-muted">Loading orders...</div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-admin-background">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-admin-border">
          <div className="flex items-center gap-3">
            <ShoppingBag className="h-8 w-8 text-admin-primary" />
            <h1 className="text-2xl font-bold text-admin-text">K-Beauty Journey - Orders</h1>
          </div>
          <div className="flex items-center gap-3 text-admin-muted">
            <div className="w-10 h-10 rounded-full bg-admin-primary text-white flex items-center justify-center font-bold">
              A
            </div>
            <div className="text-sm">{user?.email}</div>
          </div>
        </div>

        {/* Statistics Cards */}
        <OrdersStatsCards
          totalOrders={stats.totalOrders}
          pendingOrders={stats.pendingOrders}
          completedOrders={stats.completedOrders}
          totalRevenue={stats.totalRevenue}
          totalOrdersChange={stats.totalOrdersChange}
          pendingOrdersChange={stats.pendingOrdersChange}
          completedOrdersChange={stats.completedOrdersChange}
          revenueChange={stats.revenueChange}
        />

        {/* Filters */}
        <OrdersFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          dateFilter={dateFilter}
          setDateFilter={setDateFilter}
          onPrint={handlePrint}
          onExport={handleExport}
        />

        {/* Orders Table */}
        <Card className="bg-white border-admin-border shadow-admin-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-admin-background border-b border-admin-border">
                  <th className="text-left p-4 font-medium text-admin-text text-sm">Order ID</th>
                  <th className="text-left p-4 font-medium text-admin-text text-sm">Customer</th>
                  <th className="text-left p-4 font-medium text-admin-text text-sm">Date</th>
                  <th className="text-left p-4 font-medium text-admin-text text-sm">Amount</th>
                  <th className="text-left p-4 font-medium text-admin-text text-sm">Status</th>
                  <th className="text-left p-4 font-medium text-admin-text text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center p-8 text-admin-muted">
                      No orders match your filter criteria
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((order) => (
                    <tr key={order.id} className="border-b border-admin-border/50 hover:bg-admin-background/50">
                      <td className="p-4 font-medium text-admin-text">{order.order_number}</td>
                      <td className="p-4 text-admin-text">{order.customer_name}</td>
                      <td className="p-4 text-admin-muted">
                        {format(new Date(order.created_at), 'MMM dd, yyyy')}
                      </td>
                      <td className="p-4 font-medium text-admin-text">
                        {order.total_amount.toFixed(2)} dhs
                      </td>
                      <td className="p-4">
                        <Badge className={`${getStatusColor(order.status)} border`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => viewOrderDetails(order)}
                            className="h-8 w-8 p-0 hover:bg-admin-primary/10"
                          >
                            <Eye className="h-4 w-4 text-admin-muted hover:text-admin-primary" />
                          </Button>
                          <Select
                            value={order.status}
                            onValueChange={(value) => 
                              updateOrderStatus.mutate({ orderId: order.id, status: value })
                            }
                          >
                            <SelectTrigger className="w-28 h-8 text-xs border-admin-border">
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
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
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
                          {item.product_price.toFixed(2)} dhs x {item.quantity}
                        </p>
                      </div>
                      <p className="font-semibold">{item.subtotal.toFixed(2)} dhs</p>
                    </div>
                  ))}
                  <div className="flex justify-between items-center pt-2 font-semibold text-lg">
                    <span>Total:</span>
                    <span>{selectedOrder.total_amount.toFixed(2)} dhs</span>
                  </div>
                </div>
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