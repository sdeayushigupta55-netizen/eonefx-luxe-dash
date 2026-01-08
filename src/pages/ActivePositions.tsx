import { useState } from "react";
import { Filter, ChevronLeft, ChevronRight, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { DashboardLayout } from "@/components/layout/DashboardLayout";

interface Position {
  login: string;
  symbol: string;
  action: "Buy" | "Sell";
  position: string;
  openPrice: number;
  currentPrice: number;
  sl: number;
  tp: number;
  volume: number;
  profit: number;
  profitRate: number;
  marginRate: number;
  reason: string;
  createdDate: string;
}

const columns = [
  { key: "login", label: "LOGIN" },
  { key: "symbol", label: "SYMBOL" },
  { key: "action", label: "ACTION" },
  { key: "position", label: "POSITION" },
  { key: "openPrice", label: "OPEN PRICE" },
  { key: "currentPrice", label: "CURRENT PRICE" },
  { key: "sl", label: "SL" },
  { key: "tp", label: "TP" },
  { key: "volume", label: "VOLUME" },
  { key: "profit", label: "PROFIT" },
  { key: "profitRate", label: "PROFIT RATE" },
  { key: "marginRate", label: "MARGIN RATE" },
  { key: "reason", label: "REASON" },
  { key: "createdDate", label: "CREATED" },
];

const groups = [
  { value: "all", label: "Select a group" },
  { value: "group-a", label: "Group A" },
  { value: "group-b", label: "Group B" },
  { value: "group-c", label: "Group C" },
];

export default function ActivePositions() {
  const [selectedGroup, setSelectedGroup] = useState<string>("all");
  const [positions] = useState<Position[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalItems = positions.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const startItem = totalItems > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const handleFetchPositions = () => {
    // API call would go here
    console.log("Fetching positions for group:", selectedGroup);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Active Positions</h1>
        </div>

        {/* Main Card */}
      <Card className="border-border/50 bg-card shadow-lg">
        <CardHeader className="border-b border-border/30 pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            {/* Group Filter */}
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground font-medium">Select Group:</span>
              <Select value={selectedGroup} onValueChange={setSelectedGroup}>
                <SelectTrigger className="w-[200px] bg-background border-border">
                  <SelectValue placeholder="Select a group" />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border">
                  {groups.map((group) => (
                    <SelectItem key={group.value} value={group.value}>
                      {group.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Fetch Button */}
            <Button
              onClick={handleFetchPositions}
              variant="outline"
              className="gap-2 border-primary/50 text-primary hover:bg-primary/10"
            >
              <Filter className="h-4 w-4" />
              Fetch Positions
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          {/* Table */}
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-border/30 hover:bg-transparent">
                  {columns.map((column) => (
                    <TableHead
                      key={column.key}
                      className="text-xs font-semibold text-muted-foreground uppercase tracking-wider whitespace-nowrap"
                    >
                      <div className="flex items-center gap-1 cursor-pointer hover:text-foreground transition-colors">
                        {column.label}
                        <ArrowUpDown className="h-3 w-3" />
                      </div>
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {positions.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-48 text-center text-muted-foreground"
                    >
                      No Data Available In Table
                    </TableCell>
                  </TableRow>
                ) : (
                  positions.map((position, index) => (
                    <TableRow key={index} className="border-border/20 hover:bg-muted/30">
                      <TableCell className="font-medium">{position.login}</TableCell>
                      <TableCell>{position.symbol}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium ${
                            position.action === "Buy"
                              ? "bg-green-500/20 text-green-400"
                              : "bg-red-500/20 text-red-400"
                          }`}
                        >
                          {position.action}
                        </span>
                      </TableCell>
                      <TableCell>{position.position}</TableCell>
                      <TableCell>{position.openPrice.toFixed(5)}</TableCell>
                      <TableCell>{position.currentPrice.toFixed(5)}</TableCell>
                      <TableCell>{position.sl.toFixed(5)}</TableCell>
                      <TableCell>{position.tp.toFixed(5)}</TableCell>
                      <TableCell>{position.volume.toFixed(2)}</TableCell>
                      <TableCell
                        className={position.profit >= 0 ? "text-green-400" : "text-red-400"}
                      >
                        {position.profit >= 0 ? "+" : ""}
                        {position.profit.toFixed(2)}
                      </TableCell>
                      <TableCell>{position.profitRate.toFixed(2)}%</TableCell>
                      <TableCell>{position.marginRate.toFixed(2)}%</TableCell>
                      <TableCell>{position.reason}</TableCell>
                      <TableCell className="whitespace-nowrap">{position.createdDate}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-border/30">
            <div className="text-sm text-muted-foreground">
              Showing {startItem} to {endItem} of {totalItems} entries
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
    </DashboardLayout>
  );
}
