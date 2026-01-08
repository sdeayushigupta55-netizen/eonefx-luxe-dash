import { useParams, useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Filter, X } from "lucide-react";
import { mockCustomers } from "@/components/dashboard/customers/customersData";

const transactionTypes = [
  { label: "Deposit", value: 0, completed: 0, pending: 0, rejected: 0 },
  { label: "Manual Deposit", value: 0, completed: 0, pending: 0, rejected: 0 },
  { label: "Voucher Deposit", value: 0, completed: 0, pending: 0, rejected: 0 },
  { label: "IB Bonus", value: 0, completed: 0, pending: 0, rejected: 0 },
  { label: "Demo Deposit", value: 0, completed: 0, pending: 0, rejected: 0 },
  { label: "External Receive Money", value: 0, completed: 0, pending: 0, rejected: 0 },
  { label: "Internal Receive Money", value: 0, completed: 0, pending: 0, rejected: 0 },
  { label: "Referral", value: 0, completed: 0, pending: 0, rejected: 0 },
  { label: "Signup Bonus", value: 0, completed: 0, pending: 0, rejected: 0 },
  { label: "Bonus", value: 0, completed: 0, pending: 0, rejected: 0 },
  { label: "Bonus Refund", value: 0, completed: 0, pending: 0, rejected: 0 },
  { label: "Refund", value: 0, completed: 0, pending: 0, rejected: 0 },
];

const outgoingTypes = [
  { label: "Withdraw", value: 0, completed: 0, pending: 0, rejected: 0 },
  { label: "Manual Withdraw", value: 0, completed: 0, pending: 0, rejected: 0 },
  { label: "Demo Withdraw", value: 0, completed: 0, pending: 0, rejected: 0 },
  { label: "External Transfer", value: 0, completed: 0, pending: 0, rejected: 0 },
  { label: "Internal Transfer", value: 0, completed: 0, pending: 0, rejected: 0 },
  { label: "Bonus Deduction", value: 0, completed: 0, pending: 0, rejected: 0 },
  { label: "Fund Deduction", value: 0, completed: 0, pending: 0, rejected: 0 },
  { label: "Penalty", value: 0, completed: 0, pending: 0, rejected: 0 },
];

export function CustomerPaymentStats() {
  const { customerId } = useParams();
  const navigate = useNavigate();

  const customer = mockCustomers.all.find(c => c.id === Number(customerId)) || mockCustomers.all[0];

  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold text-foreground mb-6">Transactions Report</h1>

        {/* Filters */}
        <Card className="bg-card border-border mb-6">
          <CardContent className="p-4">
            <div className="flex flex-wrap items-center gap-4">
              <Select defaultValue={customer.email}>
                <SelectTrigger className="w-[300px] bg-background border-border">
                  <SelectValue placeholder="Select customer" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={customer.email}>{customer.name} ({customer.email})</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="w-[200px] bg-background border-border">
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
                <Input 
                  placeholder="Created At" 
                  className="w-[200px] bg-background border-border"
                />
                <Button variant="ghost" size="icon" className="text-muted-foreground">
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <Button className="bg-card border border-border text-foreground hover:bg-muted">
                <Filter className="h-4 w-4 mr-2" />
                Apply Filter
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">Double click for a single date</p>
          </CardContent>
        </Card>

        {/* Incoming Transactions */}
        <h2 className="text-lg font-semibold text-foreground mb-4">Incoming Transactions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {transactionTypes.map((type) => (
            <Card key={type.label} className="bg-card border-border">
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground">{type.label}</p>
                <p className="text-2xl font-bold text-foreground">${type.value}</p>
                <div className="flex items-center gap-4 mt-2 text-xs">
                  <span className="flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-green-500"></span>
                    Completed: {type.completed}$
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-orange-500"></span>
                    Pending: {type.pending}$
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-red-500"></span>
                    Rejected: {type.rejected}$
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Outgoing Transactions */}
        <h2 className="text-lg font-semibold text-foreground mb-4">Outgoing Transactions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {outgoingTypes.map((type) => (
            <Card key={type.label} className="bg-card border-border">
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground">{type.label}</p>
                <p className="text-2xl font-bold text-foreground">${type.value}</p>
                <div className="flex items-center gap-4 mt-2 text-xs">
                  <span className="flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-green-500"></span>
                    Completed: {type.completed}$
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-orange-500"></span>
                    Pending: {type.pending}$
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-red-500"></span>
                    Rejected: {type.rejected}$
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
