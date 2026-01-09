import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { ReportsTabs } from "./ReportsTabs";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Eye, Search, Filter, Download, X, DollarSign, CheckCircle, Clock } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { mockTransactions } from "./reportsData";

export function Transactions() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  const handleDetailedReport = () => {
    const params = new URLSearchParams();
    if (searchTerm) params.set("search", searchTerm);
    if (statusFilter !== "all") params.set("status", statusFilter);
    if (typeFilter !== "all") params.set("type", typeFilter);
    
    const queryString = params.toString();
    navigate(`/reports/payment-overview${queryString ? `?${queryString}` : ""}`);
  };

  const stats = [
    { label: "Total", value: "$ 29233.25", icon: DollarSign, color: "text-primary" },
    { label: "Completed", value: "$ 18112", icon: CheckCircle, color: "text-green-400" },
    { label: "Pending", value: "$ 5199.75", icon: Clock, color: "text-orange-400" },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Success":
        return "bg-green-500/20 text-green-400";
      case "Cancelled":
        return "bg-red-500/20 text-red-400";
      case "Pending":
        return "bg-orange-500/20 text-orange-400";
      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "Refund":
        return "bg-cyan-500/20 text-cyan-400";
      case "Withdraw":
        return "bg-purple-500/20 text-purple-400";
      case "Manual Deposit":
        return "bg-blue-500/20 text-blue-400";
      case "Deposit":
        return "bg-green-500/20 text-green-400";
      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold ">All Transactions</h1>
          <Button 
            onClick={handleDetailedReport}
            className="bg-background border border-border text-foreground hover:bg-muted transition-colors"
          >
            <Download className="h-4 w-4 mr-2" />
            Detailed Report
          </Button>
        </div>
        
        <ReportsTabs />
        
        {/* Filters */}
        <Card className="bg-card border-border/50 p-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by Email, Username, Name"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-background border-border"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px] bg-background border-border">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="success">Success</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[180px] bg-background border-border">
                <SelectValue placeholder="Transaction Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="deposit">Deposit</SelectItem>
                <SelectItem value="withdraw">Withdraw</SelectItem>
                <SelectItem value="refund">Refund</SelectItem>
              </SelectContent>
            </Select>
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
            <Input type="date" className="w-[150px] bg-background border-border" placeholder="Created At" />
            <Button variant="outline" className="border-border">
              <X className="h-4 w-4" />
            </Button>
            <Button variant="outline" className="border-primary text-primary">
              <Filter className="h-4 w-4 mr-2" />
              Apply Filter
            </Button>
            <Button variant="outline" className="border-border">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </Card>
        
        {/* Stats Cards */}
        <div className="flex justify-end">
          <div className="grid grid-cols-3 gap-4">
            {stats.map((stat, index) => (
              <Card key={index} className="bg-card border-border/50 p-4 min-w-[150px]">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className={`text-xl font-semibold ${stat.color}`}>{stat.value}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
        
        {/* Table */}
        <Card className="bg-card border-border/50 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-border/50 hover:bg-transparent">
                <TableHead className="text-muted-foreground">DATE</TableHead>
                <TableHead className="text-muted-foreground">USER</TableHead>
                <TableHead className="text-muted-foreground">DETAIL</TableHead>
                <TableHead className="text-muted-foreground">TRANSACTION ID</TableHead>
                <TableHead className="text-muted-foreground">TYPE</TableHead>
                <TableHead className="text-muted-foreground">ACCOUNT</TableHead>
                <TableHead className="text-muted-foreground">AMOUNT</TableHead>
                <TableHead className="text-muted-foreground">GATEWAY</TableHead>
                <TableHead className="text-muted-foreground">ACTION BY</TableHead>
                <TableHead className="text-muted-foreground">STATUS</TableHead>
                <TableHead className="text-muted-foreground">ACTION</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockTransactions.map((tx) => (
                <TableRow key={tx.id} className="border-border/50 hover:bg-accent/5">
                  <TableCell className="text-muted-foreground text-sm">{tx.date}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-sm font-medium">
                        {tx.userName.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{tx.userName}</p>
                        <p className="text-xs text-muted-foreground">{tx.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-foreground text-sm max-w-[200px] truncate">{tx.detail}</TableCell>
                  <TableCell className="text-muted-foreground text-sm">{tx.transactionId}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getTypeBadge(tx.type)}`}>
                      {tx.type}
                    </span>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{tx.account}</TableCell>
                  <TableCell className={tx.amountColor === "green" ? "text-green-400" : "text-red-400"}>
                    {tx.amount}
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">{tx.gateway}</TableCell>
                  <TableCell className="text-muted-foreground text-sm">{tx.actionBy}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusBadge(tx.status)}`}>
                      {tx.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button className="p-1.5 rounded hover:bg-blue-500/20 text-muted-foreground hover:text-blue-400 transition-colors">
                          <Eye className="h-4 w-4" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>View</TooltipContent>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </DashboardLayout>
  );
}
