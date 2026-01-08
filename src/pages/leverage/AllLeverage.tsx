import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Search, Filter, Download } from "lucide-react";

export default function AllLeverage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Empty data to match the reference
  const leverageData: any[] = [];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-medium text-muted-foreground">All Leverage Updates</h1>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-4">
          <div className="relative flex-1 min-w-[200px] max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by Name, Email"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-card border-border"
            />
          </div>
          <Input
            placeholder="Account Number"
            className="w-[180px] bg-card border-border"
          />
          <Input
            type="date"
            placeholder="dd-mm-yyyy"
            className="w-[180px] bg-card border-border"
          />
          <Button variant="outline" className="border-border">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" className="border-border">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>

        {/* Table Card */}
        <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="border-border bg-muted/30 hover:bg-muted/30">
                <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wider py-4">
                  Account Number
                </TableHead>
                <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wider py-4">
                  User
                </TableHead>
                <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wider py-4">
                  Account Type
                </TableHead>
                <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wider py-4">
                  Old Leverage
                </TableHead>
                <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wider py-4">
                  New Leverage
                </TableHead>
                <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wider py-4">
                  Currency
                </TableHead>
                <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wider py-4">
                  Balance
                </TableHead>
                <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wider py-4">
                  Equity
                </TableHead>
                <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wider py-4">
                  Time
                </TableHead>
                <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wider py-4">
                  Status
                </TableHead>
                <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wider py-4">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leverageData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={11} className="text-center py-12 text-muted-foreground">
                    No Data Available In Table
                  </TableCell>
                </TableRow>
              ) : (
                leverageData.map((item) => (
                  <TableRow key={item.id} className="border-border hover:bg-muted/20 transition-colors">
                    <TableCell className="text-foreground font-medium py-4">{item.accountNumber}</TableCell>
                    <TableCell className="text-muted-foreground py-4">{item.user}</TableCell>
                    <TableCell className="text-muted-foreground py-4">{item.accountType}</TableCell>
                    <TableCell className="text-muted-foreground py-4">{item.oldLeverage}</TableCell>
                    <TableCell className="text-muted-foreground py-4">{item.newLeverage}</TableCell>
                    <TableCell className="text-muted-foreground py-4">{item.currency}</TableCell>
                    <TableCell className="text-muted-foreground py-4">{item.balance}</TableCell>
                    <TableCell className="text-muted-foreground py-4">{item.equity}</TableCell>
                    <TableCell className="text-muted-foreground py-4">{item.time}</TableCell>
                    <TableCell className="text-muted-foreground py-4">{item.status}</TableCell>
                    <TableCell className="text-muted-foreground py-4">{item.actions}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>

          {/* Pagination Footer */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-border bg-muted/10">
            <p className="text-sm text-muted-foreground">
              Showing 0 to 0 of 0 entries
            </p>
            <Pagination>
              <PaginationContent className="gap-1">
                <PaginationItem>
                  <PaginationPrevious 
                    href="#" 
                    onClick={(e) => { e.preventDefault(); setCurrentPage(Math.max(1, currentPage - 1)); }}
                    className="h-8 w-8 p-0 rounded-md border border-border bg-card hover:bg-muted text-muted-foreground"
                  />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext 
                    href="#" 
                    onClick={(e) => { e.preventDefault(); setCurrentPage(currentPage + 1); }}
                    className="h-8 w-8 p-0 rounded-md border border-border bg-card hover:bg-muted text-muted-foreground"
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}