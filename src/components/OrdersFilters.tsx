import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Filter, Printer, FileText } from 'lucide-react';

interface OrdersFiltersProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  statusFilter: string;
  setStatusFilter: (value: string) => void;
  dateFilter: string;
  setDateFilter: (value: string) => void;
  onPrint: () => void;
  onExport: () => void;
}

export const OrdersFilters: React.FC<OrdersFiltersProps> = ({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  dateFilter,
  setDateFilter,
  onPrint,
  onExport,
}) => {
  return (
    <>
      <Card className="mb-6 bg-white border-admin-border shadow-admin-card">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-admin-muted mb-2">
                Status
              </label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="border-admin-border">
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="shipped">Shipped</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-admin-muted mb-2">
                Date Range
              </label>
              <Select value={dateFilter} onValueChange={setDateFilter}>
                <SelectTrigger className="border-admin-border">
                  <SelectValue placeholder="All Dates" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Dates</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-admin-muted mb-2">
                Search Orders
              </label>
              <Input
                type="text"
                placeholder="Order ID or Customer"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border-admin-border"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-3 mb-6">
        <Button 
          variant="default" 
          className="bg-admin-primary hover:bg-admin-primary/90 text-white"
        >
          <Filter className="h-4 w-4 mr-2" />
          Apply Filters
        </Button>
        <Button 
          variant="outline"
          onClick={onPrint}
          className="border-admin-border text-admin-success hover:bg-admin-success/10"
        >
          <Printer className="h-4 w-4 mr-2" />
          Print Orders
        </Button>
        <Button 
          variant="outline"
          onClick={onExport}
          className="border-admin-border text-admin-muted hover:bg-admin-background"
        >
          <FileText className="h-4 w-4 mr-2" />
          Export CSV
        </Button>
      </div>
    </>
  );
};