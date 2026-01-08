import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { ReportsTabs } from "./ReportsTabs";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Filter, Search, AlertTriangle, X } from "lucide-react";

export function ReferralNetworkStats() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold text-primary">Referral Network Report</h1>
        
        <ReportsTabs />
        
        {/* Filters */}
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex-1 min-w-[200px] max-w-[300px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search with email"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-background border-border"
              />
            </div>
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
        
        {/* Empty State */}
        <Card className="bg-muted/30 border-border/50 p-16">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mb-4">
              <AlertTriangle className="h-8 w-8 text-red-400" />
            </div>
            <p className="text-muted-foreground text-lg">
              Search by email to view the referral network and their payments.
            </p>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
