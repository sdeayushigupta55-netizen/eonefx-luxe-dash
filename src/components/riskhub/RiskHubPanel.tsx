import { useState } from "react";
import { X, Filter, ChevronLeft, ChevronRight, ChevronDown, BarChart2, PieChart, Clock } from "lucide-react";
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
import { cn } from "@/lib/utils";

interface RiskHubPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

type ViewType = "active-positions" | "net-by-accounts" | "net-by-groups" | "older-positions";

interface MenuItem {
  id: ViewType | string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  subItems?: { id: ViewType; label: string }[];
}

const menuItems: MenuItem[] = [
  { id: "active-positions", label: "Active Positions", icon: BarChart2 },
  { 
    id: "net-positions", 
    label: "Net Positions", 
    icon: PieChart,
    subItems: [
      { id: "net-by-accounts", label: "By Accounts" },
      { id: "net-by-groups", label: "By Groups" },
    ]
  },
  { id: "older-positions", label: "Older Positions - Days", icon: Clock },
];

// Column configurations for each view
const activePositionsColumns = [
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
  { key: "created", label: "CREATED" },
];

const netPositionsColumns = [
  { key: "symbol", label: "SYMBOL" },
  { key: "buyVolume", label: "BUY VOLUME" },
  { key: "sellVolume", label: "SELL VOLUME" },
  { key: "netVolume", label: "NET VOLUME" },
  { key: "profit", label: "PROFIT" },
];

const olderPositionsColumns = [
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
  { key: "created", label: "CREATED" },
  { key: "swap", label: "SWAP" },
];

const groups = [
  { value: "all", label: "All Groups" },
  { value: "group1", label: "Group 1" },
  { value: "group2", label: "Group 2" },
  { value: "group3", label: "Group 3" },
];

const logins = [
  { value: "all", label: "Select login" },
  { value: "login1", label: "Login 1001" },
  { value: "login2", label: "Login 1002" },
  { value: "login3", label: "Login 1003" },
];

const days = [
  { value: "all", label: "Select days" },
  { value: "1", label: "1 Day" },
  { value: "3", label: "3 Days" },
  { value: "7", label: "7 Days" },
  { value: "14", label: "14 Days" },
  { value: "30", label: "30 Days" },
];

const viewTitles: Record<ViewType, string> = {
  "active-positions": "Active Positions",
  "net-by-accounts": "Net Positions - Accounts",
  "net-by-groups": "Net Positions - Groups",
  "older-positions": "Older Positions - Days",
};

export function RiskHubPanel({ isOpen, onClose }: RiskHubPanelProps) {
  const [activeView, setActiveView] = useState<ViewType>("active-positions");
  const [expandedMenus, setExpandedMenus] = useState<string[]>(["net-positions"]);
  const [selectedGroup, setSelectedGroup] = useState("all");
  const [selectedLogin, setSelectedLogin] = useState("all");
  const [selectedDays, setSelectedDays] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Empty data arrays for each view
  const positions: never[] = [];
  const netPositions: never[] = [];
  const olderPositions: never[] = [];

  const getDataLength = () => {
    switch (activeView) {
      case "net-by-accounts":
      case "net-by-groups":
        return netPositions.length;
      case "older-positions":
        return olderPositions.length;
      default:
        return positions.length;
    }
  };

  const dataLength = getDataLength();
  const totalPages = Math.max(1, Math.ceil(dataLength / itemsPerPage));
  const startItem = dataLength > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0;
  const endItem = Math.min(currentPage * itemsPerPage, dataLength);

  const handleFetchPositions = () => {
    console.log("Fetching positions for view:", activeView);
  };

  const toggleSubmenu = (menuId: string) => {
    setExpandedMenus(prev => 
      prev.includes(menuId) ? prev.filter(id => id !== menuId) : [...prev, menuId]
    );
  };

  const isMenuActive = (item: MenuItem): boolean => {
    if (item.id === activeView) return true;
    if (item.subItems) {
      return item.subItems.some(sub => sub.id === activeView);
    }
    return false;
  };

  const getColumns = () => {
    switch (activeView) {
      case "net-by-accounts":
      case "net-by-groups":
        return netPositionsColumns;
      case "older-positions":
        return olderPositionsColumns;
      default:
        return activePositionsColumns;
    }
  };

  const renderFilterBar = () => {
    switch (activeView) {
      case "net-by-accounts":
        return (
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">Select Login:</span>
            <Select value={selectedLogin} onValueChange={setSelectedLogin}>
              <SelectTrigger className="w-[200px] bg-card border-border/50 focus:border-primary/60 focus:ring-1 focus:ring-primary/30">
                <SelectValue placeholder="Select login" />
              </SelectTrigger>
              <SelectContent className="bg-popover border-border z-[60]">
                {logins.map((login) => (
                  <SelectItem key={login.value} value={login.value}>
                    {login.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        );
      case "net-by-groups":
        return (
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">Select Group:</span>
            <Select value={selectedGroup} onValueChange={setSelectedGroup}>
              <SelectTrigger className="w-[200px] bg-card border-border/50 focus:border-primary/60 focus:ring-1 focus:ring-primary/30">
                <SelectValue placeholder="Select a group" />
              </SelectTrigger>
              <SelectContent className="bg-popover border-border z-[60]">
                {groups.map((group) => (
                  <SelectItem key={group.value} value={group.value}>
                    {group.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        );
      case "older-positions":
        return (
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">Select Days:</span>
            <Select value={selectedDays} onValueChange={setSelectedDays}>
              <SelectTrigger className="w-[200px] bg-card border-border/50 focus:border-primary/60 focus:ring-1 focus:ring-primary/30">
                <SelectValue placeholder="Select days" />
              </SelectTrigger>
              <SelectContent className="bg-popover border-border z-[60]">
                {days.map((day) => (
                  <SelectItem key={day.value} value={day.value}>
                    {day.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        );
      default:
        return (
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">Select Group:</span>
            <Select value={selectedGroup} onValueChange={setSelectedGroup}>
              <SelectTrigger className="w-[200px] bg-card border-border/50 focus:border-primary/60 focus:ring-1 focus:ring-primary/30">
                <SelectValue placeholder="Select a group" />
              </SelectTrigger>
              <SelectContent className="bg-popover border-border z-[60]">
                {groups.map((group) => (
                  <SelectItem key={group.value} value={group.value}>
                    {group.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        );
    }
  };

  const columns = getColumns();

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className={cn(
          "fixed inset-y-0 right-0 z-50 w-full max-w-7xl bg-background border-l border-border shadow-2xl transition-transform duration-300 ease-out flex",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Internal Sidebar */}
        <div className="w-64 flex-shrink-0 border-r border-border bg-sidebar-background flex flex-col">
          {/* Sidebar Header */}
          <div className="flex items-center gap-3 px-5 py-4 border-b border-sidebar-border">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
              <BarChart2 className="h-4 w-4 text-primary" />
            </div>
            <span className="text-lg font-semibold text-foreground">Risk Hub</span>
          </div>

          {/* Sidebar Navigation */}
          <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
            {menuItems.map((item) => {
              const hasSubItems = item.subItems && item.subItems.length > 0;
              const isExpanded = expandedMenus.includes(item.id);
              const isActive = isMenuActive(item);

              return (
                <div key={item.id}>
                  <button
                    onClick={() => {
                      if (hasSubItems) {
                        toggleSubmenu(item.id);
                      } else {
                        setActiveView(item.id as ViewType);
                        setCurrentPage(1);
                      }
                    }}
                    className={cn(
                      "sidebar-link w-full group",
                      isActive && "active"
                    )}
                  >
                    <item.icon
                      className={cn(
                        "h-5 w-5 text-primary sidebar-icon transition-all duration-200 flex-shrink-0",
                        isActive && "icon-glow"
                      )}
                    />
                    <span className="font-medium truncate flex-1 text-left">{item.label}</span>
                    {hasSubItems && (
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 text-muted-foreground transition-transform duration-200 flex-shrink-0",
                          isExpanded && "rotate-180"
                        )}
                      />
                    )}
                  </button>

                  {/* Sub Items */}
                  {hasSubItems && (
                    <div
                      className={cn(
                        "overflow-hidden transition-all duration-300 ease-in-out",
                        isExpanded ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                      )}
                    >
                      <div className="ml-6 pl-4 border-l border-sidebar-border/50 mt-1 space-y-0.5">
                        {item.subItems!.map((sub) => (
                          <button
                            key={sub.id}
                            onClick={() => {
                              setActiveView(sub.id);
                              setCurrentPage(1);
                            }}
                            className={cn(
                              "block w-full text-left py-2 px-3 text-sm rounded-lg transition-all duration-150",
                              "text-sidebar-foreground hover:text-foreground hover:bg-sidebar-accent",
                              activeView === sub.id && "text-primary bg-primary/10 font-medium"
                            )}
                          >
                            {sub.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border px-6 py-4">
            <h2 className="text-xl font-semibold text-foreground">{viewTitles[activeView]}</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-9 w-9 rounded-lg text-muted-foreground hover:text-foreground"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Filter Bar */}
          <div className="border-b border-border px-6 py-4">
            <div className="flex items-center justify-between flex-wrap gap-4">
              {renderFilterBar()}

              <Button
                onClick={handleFetchPositions}
                className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg px-5"
              >
                <Filter className="h-4 w-4 mr-2" />
                Fetch Positions
              </Button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="rounded-xl border border-border/50 bg-card shadow-card overflow-hidden">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-border/50 bg-muted/20 hover:bg-muted/20">
                      {columns.map((column) => (
                        <TableHead
                          key={column.key}
                          className="text-xs font-semibold text-muted-foreground uppercase tracking-wider py-4 px-4 whitespace-nowrap"
                        >
                          {column.label}
                        </TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow className="hover:bg-transparent">
                      <TableCell
                        colSpan={columns.length}
                        className="text-center py-16 text-primary"
                      >
                        No Data Available In Table
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>

              {/* Pagination Footer */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-6 py-4 border-t border-border/50 bg-muted/5">
                <p className="text-sm text-muted-foreground">
                  Showing <span className="text-primary">{startItem}</span> to{" "}
                  <span className="text-primary">{endItem}</span> of{" "}
                  <span className="text-primary">{dataLength}</span> entries
                </p>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className="text-muted-foreground hover:text-foreground hover:bg-muted/20 disabled:opacity-40"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    className="text-muted-foreground hover:text-foreground hover:bg-muted/20 disabled:opacity-40"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
