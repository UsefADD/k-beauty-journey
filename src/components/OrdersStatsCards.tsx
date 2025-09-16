import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatsCardsProps {
  totalOrders: number;
  pendingOrders: number;
  completedOrders: number;
  totalRevenue: number;
  totalOrdersChange: number;
  pendingOrdersChange: number;
  completedOrdersChange: number;
  revenueChange: number;
}

export const OrdersStatsCards: React.FC<StatsCardsProps> = ({
  totalOrders,
  pendingOrders,
  completedOrders,
  totalRevenue,
  totalOrdersChange,
  pendingOrdersChange,
  completedOrdersChange,
  revenueChange,
}) => {
  const StatCard = ({ title, value, change, isRevenue = false }: { 
    title: string; 
    value: number; 
    change: number; 
    isRevenue?: boolean;
  }) => (
    <Card className="bg-white border-admin-border">
      <CardContent className="p-6">
        <h3 className="text-sm font-medium text-admin-muted mb-3">{title}</h3>
        <div className="text-2xl font-bold text-admin-primary mb-2">
          {isRevenue ? `${value.toFixed(2)} dhs` : value.toLocaleString()}
        </div>
        <div className={`text-sm flex items-center gap-1 ${change >= 0 ? 'text-admin-success' : 'text-admin-danger'}`}>
          {change >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
          {Math.abs(change)}% from last month
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
      <StatCard 
        title="TOTAL ORDERS" 
        value={totalOrders} 
        change={totalOrdersChange} 
      />
      <StatCard 
        title="PENDING ORDERS" 
        value={pendingOrders} 
        change={pendingOrdersChange} 
      />
      <StatCard 
        title="COMPLETED ORDERS" 
        value={completedOrders} 
        change={completedOrdersChange} 
      />
      <StatCard 
        title="REVENUE" 
        value={totalRevenue} 
        change={revenueChange} 
        isRevenue 
      />
    </div>
  );
};