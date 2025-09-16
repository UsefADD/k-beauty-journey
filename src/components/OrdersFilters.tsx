import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Printer, FileDown } from "lucide-react";

interface OrdersFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  statusFilter: string;
  onStatusFilterChange: (value: string) => void;
  dateFilter: string;
  onDateFilterChange: (value: string) => void;
  onPrint: () => void;
  onExport: () => void;
}

const OrdersFilters: React.FC<OrdersFiltersProps> = ({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  dateFilter,
  onDateFilterChange,
  onPrint,
  onExport
}) => {
  return (
    <div className="space-y-4 mb-6">
      {/* Filters Row */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1 min-w-0">
          <label className="text-sm font-medium text-muted-foreground mb-2 block">
            Search
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Order ID or Customer"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="w-full lg:w-48">
          <label className="text-sm font-medium text-muted-foreground mb-2 block">
            Status
          </label>
          <Select value={statusFilter} onValueChange={onStatusFilterChange}>
            <SelectTrigger>
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

        <div className="w-full lg:w-48">
          <label className="text-sm font-medium text-muted-foreground mb-2 block">
            Date
          </label>
          <Select value={dateFilter} onValueChange={onDateFilterChange}>
            <SelectTrigger>
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
      </div>

      {/* Actions Row */}
      <div className="flex flex-wrap gap-3">
        <Button 
          onClick={onPrint}
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          <Printer className="h-4 w-4 mr-2" />
          Print Orders
        </Button>
        <Button 
          onClick={onExport}
          variant="outline"
          className="border-purple-200 text-purple-700 hover:bg-purple-50"
        >
          <FileDown className="h-4 w-4 mr-2" />
          Export CSV
        </Button>
      </div>
    </div>
  );
};

export default OrdersFilters;