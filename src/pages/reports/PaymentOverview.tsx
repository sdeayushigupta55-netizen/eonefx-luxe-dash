import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { ReportsTabs } from "./ReportsTabs";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, Filter, Info, X } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { mockIncomingPayments, mockOutgoingPayments } from "./reportsData";

interface PaymentCardProps {
  title: string;
  amount: string;
  completed: string;
  pending: string;
  rejected: string;
}

function PaymentCard({ title, amount, completed, pending, rejected }: PaymentCardProps) {
  return (
    <Card className="bg-card border-border/50 p-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground text-sm">{title}</span>
          <Tooltip>
            <TooltipTrigger>
              <Info className="h-3.5 w-3.5 text-muted-foreground" />
            </TooltipTrigger>
            <TooltipContent>{title} transactions</TooltipContent>
          </Tooltip>
        </div>
      </div>
      <p className="text-2xl font-semibold text-foreground mb-3">{amount}</p>
      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs">
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-green-400"></span>
          <span className="text-muted-foreground">Completed: {completed}</span>
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-orange-400"></span>
          <span className="text-muted-foreground">Pending: {pending}</span>
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-red-400"></span>
          <span className="text-muted-foreground">Rejected: {rejected}</span>
        </span>
      </div>
    </Card>
  );
}

export function PaymentOverview() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-primary">Transactions Report</h1>
          <Button variant="outline" className="border-border bg-background text-foreground hover:bg-muted">
            <Download className="h-4 w-4 mr-2" />
            Detailed Report
          </Button>
        </div>
        
        <ReportsTabs />
        
        {/* Filters */}
        <Card className="bg-card border-border/50 p-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex-1 min-w-[200px]">
              <Select>
                <SelectTrigger className="bg-background border-border">
                  <SelectValue placeholder="Search user by name or email" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Users</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Select>
              <SelectTrigger className="w-[180px] bg-background border-border">
                <SelectValue placeholder="-- Select Range --" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="year">This Year</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex items-center gap-2">
              <Input type="date" className="w-[150px] bg-background border-border" />
              <Button variant="ghost" size="icon" className="text-muted-foreground">
                <X className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">Double click for a single date</p>
            <Button variant="outline" className="border-primary text-primary ml-auto">
              <Filter className="h-4 w-4 mr-2" />
              Apply Filter
            </Button>
          </div>
        </Card>
        
        {/* Incoming Transactions */}
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-4">Incoming Transactions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {mockIncomingPayments.map((payment, index) => (
              <PaymentCard key={index} {...payment} />
            ))}
          </div>
        </div>
        
        {/* Outgoing Transactions */}
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-4">Outgoing Transactions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {mockOutgoingPayments.map((payment, index) => (
              <PaymentCard key={index} {...payment} />
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
