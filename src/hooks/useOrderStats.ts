import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useUserRole } from "@/hooks/useUserRole";

interface OrderStats {
  totalOrders: number;
  pendingOrders: number;
  completedOrders: number;
  totalRevenue: number;
  monthlyGrowth: {
    orders: number;
    revenue: number;
  };
}

export const useOrderStats = () => {
  const { isAuthenticated } = useAuth();
  const { isAdmin } = useUserRole();

  return useQuery({
    queryKey: ['orderStats'],
    queryFn: async (): Promise<OrderStats> => {
      // Get all orders
      const { data: orders, error } = await supabase
        .from('orders')
        .select('total_amount, status, created_at')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const now = new Date();
      const currentMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0);

      // Calculate current month stats
      const currentMonthOrders = orders.filter(order => 
        new Date(order.created_at) >= currentMonth
      );
      
      // Calculate last month stats
      const lastMonthOrders = orders.filter(order => {
        const orderDate = new Date(order.created_at);
        return orderDate >= lastMonth && orderDate <= lastMonthEnd;
      });

      // Calculate growth percentages
      const lastMonthOrderCount = lastMonthOrders.length;
      const currentMonthOrderCount = currentMonthOrders.length;
      const orderGrowth = lastMonthOrderCount > 0 
        ? ((currentMonthOrderCount - lastMonthOrderCount) / lastMonthOrderCount) * 100 
        : currentMonthOrderCount > 0 ? 100 : 0;

      const lastMonthRevenue = lastMonthOrders.reduce((sum, order) => sum + order.total_amount, 0);
      const currentMonthRevenue = currentMonthOrders.reduce((sum, order) => sum + order.total_amount, 0);
      const revenueGrowth = lastMonthRevenue > 0 
        ? ((currentMonthRevenue - lastMonthRevenue) / lastMonthRevenue) * 100 
        : currentMonthRevenue > 0 ? 100 : 0;

      return {
        totalOrders: orders.length,
        pendingOrders: orders.filter(order => order.status === 'pending').length,
        completedOrders: orders.filter(order => ['delivered', 'shipped'].includes(order.status)).length,
        totalRevenue: orders.reduce((sum, order) => sum + order.total_amount, 0),
        monthlyGrowth: {
          orders: Math.round(orderGrowth),
          revenue: Math.round(revenueGrowth)
        }
      };
    },
    enabled: isAuthenticated && isAdmin,
  });
};