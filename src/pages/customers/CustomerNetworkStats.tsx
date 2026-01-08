import { useParams } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Filter, X, ChevronLeft, ChevronRight, Search } from "lucide-react";
import { mockCustomers } from "@/components/dashboard/customers/customersData";

export function CustomerNetworkStats() {
  const { customerId } = useParams();

  const customer = mockCustomers.all.find(c => c.id === Number(customerId)) || mockCustomers.all[0];

  const networkData = [
    {
      id: 1,
      name: customer.name,
      email: customer.email,
      level: 0,
      totalIncoming: "5,000.00 USD",
      totalOutgoing: "0.00 USD",
      totalIBBonus: "0.00 USD",
    },
  ];

  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold text-foreground mb-6">Referral Network Report</h1>

        {/* Filters */}
        <Card className="bg-card border-border mb-6">
          <CardContent className="p-4">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <Input 
                  defaultValue={customer.email}
                  className="w-[250px] bg-background border-border"
                />
                <Button variant="ghost" size="icon" className="text-muted-foreground">
                  <Search className="h-4 w-4" />
                </Button>
              </div>

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

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Incoming Total</p>
              <p className="text-2xl font-bold text-foreground">5000</p>
              <div className="flex items-center gap-4 mt-2 text-xs">
                <span className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-green-500"></span>
                  Completed: 0
                </span>
                <span className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-orange-500"></span>
                  Pending: 5000
                </span>
                <span className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-red-500"></span>
                  Rejected: 0
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Outgoing Total</p>
              <p className="text-2xl font-bold text-foreground">0</p>
              <div className="flex items-center gap-4 mt-2 text-xs">
                <span className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-green-500"></span>
                  Completed: 0
                </span>
                <span className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-orange-500"></span>
                  Pending: 0
                </span>
                <span className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-red-500"></span>
                  Rejected: 0
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Demo Deposit</p>
              <p className="text-2xl font-bold text-foreground">0</p>
              <div className="flex items-center gap-4 mt-2 text-xs">
                <span className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-green-500"></span>
                  Completed: 0
                </span>
                <span className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-orange-500"></span>
                  Pending: 0
                </span>
                <span className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-red-500"></span>
                  Rejected: 0
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">IB Bonus</p>
              <p className="text-2xl font-bold text-foreground">0</p>
              <div className="flex items-center gap-4 mt-2 text-xs">
                <span className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-green-500"></span>
                  Completed: 0
                </span>
                <span className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-orange-500"></span>
                  Pending: 0
                </span>
                <span className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-red-500"></span>
                  Rejected: 0
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Table Controls */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Show</span>
            <Select defaultValue="10">
              <SelectTrigger className="w-[80px] bg-background border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="25">25</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectContent>
            </Select>
            <span className="text-sm text-muted-foreground">Entries</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Search:</span>
            <Input className="w-[200px] bg-background border-border" />
          </div>
        </div>

        {/* Network Table */}
        <Card className="bg-card border-border mb-8">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="text-left py-4 px-4 text-xs font-semibold text-muted-foreground uppercase">User</th>
                  <th className="text-left py-4 px-4 text-xs font-semibold text-muted-foreground uppercase">Level</th>
                  <th className="text-left py-4 px-4 text-xs font-semibold text-muted-foreground uppercase">Total Incoming</th>
                  <th className="text-left py-4 px-4 text-xs font-semibold text-muted-foreground uppercase">Total Outgoing</th>
                  <th className="text-left py-4 px-4 text-xs font-semibold text-muted-foreground uppercase">Total IB Bonus</th>
                  <th className="text-left py-4 px-4 text-xs font-semibold text-muted-foreground uppercase">Action</th>
                </tr>
              </thead>
              <tbody>
                {networkData.map((row) => (
                  <tr key={row.id} className="border-b border-border/50 hover:bg-muted/20">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarFallback className="bg-primary/20 text-primary text-sm font-medium">
                            {row.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium text-foreground">{row.name}</p>
                          <p className="text-xs text-muted-foreground">{row.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-sm text-foreground">{row.level}</td>
                    <td className="py-4 px-4 text-sm text-foreground">{row.totalIncoming}</td>
                    <td className="py-4 px-4 text-sm text-foreground">{row.totalOutgoing}</td>
                    <td className="py-4 px-4 text-sm text-foreground">{row.totalIBBonus}</td>
                    <td className="py-4 px-4">
                      <Button variant="ghost" size="sm" className="text-primary">+</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-between px-4 py-4 border-t border-border">
            <p className="text-sm text-muted-foreground">Showing 1 to 1 of 1 entries</p>
            <div className="flex items-center gap-2">
              <button className="p-2 rounded-lg border border-border hover:bg-muted disabled:opacity-50" disabled>
                <ChevronLeft className="h-4 w-4 text-muted-foreground" />
              </button>
              <button className="h-8 w-8 rounded-lg bg-primary text-primary-foreground text-sm font-medium">1</button>
              <button className="p-2 rounded-lg border border-border hover:bg-muted disabled:opacity-50" disabled>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>
          </div>
        </Card>

        {/* Referral Network Tree */}
        <h2 className="text-lg font-semibold text-foreground mb-4">Referral Network Tree</h2>
        <Card className="bg-card border-border">
          <CardContent className="p-8 text-center text-muted-foreground">
            <p>No referral network data available</p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
