import { useMemo } from 'react';

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

export const useOrderStats = (orders: Order[]) => {
  return useMemo(() => {
    const totalOrders = orders.length;
    const pendingOrders = orders.filter(order => order.status === 'pending').length;
    const completedOrders = orders.filter(order => order.status === 'completed' || order.status === 'delivered').length;
    const totalRevenue = orders
      .filter(order => order.status === 'completed' || order.status === 'delivered')
      .reduce((sum, order) => sum + order.total_amount, 0);

    // Calculate previous month stats (mock calculation for demo)
    const currentMonth = new Date().getMonth();
    const previousMonthOrders = orders.filter(order => {
      const orderMonth = new Date(order.created_at).getMonth();
      return orderMonth === currentMonth - 1;
    });
    
    const previousTotalOrders = previousMonthOrders.length;
    const previousPendingOrders = previousMonthOrders.filter(order => order.status === 'pending').length;
    const previousCompletedOrders = previousMonthOrders.filter(order => order.status === 'completed' || order.status === 'delivered').length;
    const previousRevenue = previousMonthOrders
      .filter(order => order.status === 'completed' || order.status === 'delivered')
      .reduce((sum, order) => sum + order.total_amount, 0);

    // Calculate percentage changes
    const totalOrdersChange = previousTotalOrders > 0 
      ? Math.round(((totalOrders - previousTotalOrders) / previousTotalOrders) * 100)
      : 0;
    const pendingOrdersChange = previousPendingOrders > 0 
      ? Math.round(((pendingOrders - previousPendingOrders) / previousPendingOrders) * 100)
      : 0;
    const completedOrdersChange = previousCompletedOrders > 0 
      ? Math.round(((completedOrders - previousCompletedOrders) / previousCompletedOrders) * 100)
      : 0;
    const revenueChange = previousRevenue > 0 
      ? Math.round(((totalRevenue - previousRevenue) / previousRevenue) * 100)
      : 0;

    return {
      totalOrders,
      pendingOrders,
      completedOrders,
      totalRevenue,
      totalOrdersChange,
      pendingOrdersChange,
      completedOrdersChange,
      revenueChange,
    };
  }, [orders]);
};