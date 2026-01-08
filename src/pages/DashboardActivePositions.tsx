import {
  Users,
  UserCheck,
  UsersRound,
  Wallet,
  ArrowDownToLine,
  UserPlus,
  Send,
  Gift,
  TrendingUp,
  Eye,
  Server,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { useState } from "react";

const statsRow1 = [
  { icon: Users, label: "Registered User", value: "28", variant: "gold" as const },
  { icon: UserCheck, label: "Active Users", value: "28", variant: "gold" as const },
  { icon: UsersRound, label: "Staff / Team", value: "6", variant: "gold" as const },
  { icon: Wallet, label: "Total Deposits", value: "$15,425.00", variant: "teal" as const },
];

const statsRow2 = [
  { icon: ArrowDownToLine, label: "Total Withdraw", value: "$1,121.00", variant: "green" as const },
  { icon: UserPlus, label: "Total Referral", value: "9", variant: "neutral" as const },
  { icon: Send, label: "Total Transfers", value: "$29.00", variant: "neutral" as const },
];

const statsRow3 = [
  { icon: Gift, label: "Total IB Bonus", value: "$0.00", variant: "neutral" as const },
  { icon: TrendingUp, label: "Live Accounts", value: "7", variant: "teal" as const },
  { icon: Eye, label: "Demo Accounts", value: "2", variant: "neutral" as const },
  { icon: Server, label: "Total Gateways", value: "9", variant: "neutral" as const },
  { icon: HelpCircle, label: "Total Ticket", value: "1", variant: "neutral" as const },
];

interface Position {
  login: string;
  symbol: string;
  action: "Buy" | "Sell";
  position: string;
  openPrice: string;
  currentPrice: string;
  sl: string;
  tp: string;
  volume: string;
  profit: string;
  profitRate: string;
  marginRate: string;
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
  { value: "all", label: "All Groups" },
  { value: "group1", label: "Group 1" },
  { value: "group2", label: "Group 2" },
  { value: "group3", label: "Group 3" },
];

export default function DashboardActivePositions() {
  const [selectedGroup, setSelectedGroup] = useState("all");
  const [positions] = useState<Position[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.max(1, Math.ceil(positions.length / itemsPerPage));
  const startItem = positions.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0;
  const endItem = Math.min(currentPage * itemsPerPage, positions.length);

  const handleFetchPositions = () => {
    console.log("Fetching positions for group:", selectedGroup);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Dashboard Header with Greeting and Highlight Panel */}
        <DashboardHeader />

        {/* Stats Row 1 */}
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
          {statsRow1.map((stat, index) => (
            <StatCard
              key={index}
              icon={stat.icon}
              label={stat.label}
              value={stat.value}
              variant={stat.variant}
            />
          ))}
        </div>

        {/* Stats Row 2 */}
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
          {statsRow2.map((stat, index) => (
            <StatCard
              key={index}
              icon={stat.icon}
              label={stat.label}
              value={stat.value}
              variant={stat.variant}
            />
          ))}
        </div>

        {/* Stats Row 3 */}
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-5">
          {statsRow3.map((stat, index) => (
            <StatCard
              key={index}
              icon={stat.icon}
              label={stat.label}
              value={stat.value}
              variant={stat.variant}
            />
          ))}
        </div>

        {/* Active Positions Section */}
        <Card className="border-border/50 bg-card shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-semibold text-foreground">
              Active Positions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Filter Section */}
            <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
              <Select value={selectedGroup} onValueChange={setSelectedGroup}>
                <SelectTrigger className="w-full sm:w-[200px] bg-background border-border">
                  <SelectValue placeholder="Select Group" />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border">
                  {groups.map((group) => (
                    <SelectItem key={group.value} value={group.value}>
                      {group.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                onClick={handleFetchPositions}
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                Fetch Positions
              </Button>
            </div>

            {/* Data Table */}
            <div className="rounded-lg border border-border overflow-hidden">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50 hover:bg-muted/50">
                      {columns.map((column) => (
                        <TableHead
                          key={column.key}
                          className="text-xs font-semibold text-muted-foreground whitespace-nowrap"
                        >
                          {column.label}
                        </TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {positions.length === 0 ? (
                      <TableRow>
                        <TableCell
                          colSpan={columns.length}
                          className="h-32 text-center text-muted-foreground"
                        >
                          No Data Available in Table
                        </TableCell>
                      </TableRow>
                    ) : (
                      positions.map((position, index) => (
                        <TableRow key={index} className="hover:bg-muted/30">
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
                          <TableCell>{position.openPrice}</TableCell>
                          <TableCell>{position.currentPrice}</TableCell>
                          <TableCell>{position.sl}</TableCell>
                          <TableCell>{position.tp}</TableCell>
                          <TableCell>{position.volume}</TableCell>
                          <TableCell
                            className={
                              parseFloat(position.profit) >= 0
                                ? "text-green-400"
                                : "text-red-400"
                            }
                          >
                            {position.profit}
                          </TableCell>
                          <TableCell>{position.profitRate}</TableCell>
                          <TableCell>{position.marginRate}</TableCell>
                          <TableCell>{position.reason}</TableCell>
                          <TableCell className="whitespace-nowrap">
                            {position.createdDate}
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>

            {/* Pagination */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
              <p className="text-sm text-muted-foreground">
                Showing {startItem} to {endItem} of {positions.length} entries
              </p>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="border-border"
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Previous
                </Button>
                <span className="text-sm text-muted-foreground px-3">
                  Page {currentPage} of {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="border-border"
                >
                  Next
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
