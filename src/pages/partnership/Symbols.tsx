import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { ChevronDown } from "lucide-react";
import { mockSymbols, Symbol } from "./partnershipData";
import { toast } from "sonner";

const ITEMS_PER_PAGE = 15;

const Symbols = () => {
  const navigate = useNavigate();
  const [symbols, setSymbols] = useState<Symbol[]>(mockSymbols);
  const [currentPage, setCurrentPage] = useState(1);
  const [activePlatform, setActivePlatform] = useState("Meta Trader 5");

  const totalPages = Math.ceil(symbols.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedSymbols = symbols.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleToggleSymbol = (symbolId: number) => {
    setSymbols(
      symbols.map((s) =>
        s.id === symbolId ? { ...s, enabled: !s.enabled } : s
      )
    );
    toast.success("Symbol status updated");
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 10;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show first 10 pages, then ...
      for (let i = 1; i <= 10; i++) {
        pages.push(i);
      }
      pages.push("...");
      pages.push(20);
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-foreground">All Symbols</h1>
          <Button
            onClick={() => navigate("/partnership/symbol-groups")}
            className="gap-2"
          >
            Symbol Groups
          </Button>
        </div>

        {/* Platform Filter */}
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <button
              onClick={() => setActivePlatform("Meta Trader 5")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activePlatform === "Meta Trader 5"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              Meta Trader 5
            </button>
          </div>
          <Button variant="outline" className="gap-2">
            More
            <ChevronDown className="h-4 w-4" />
          </Button>
        </div>

        {/* Table */}
        <div className="bg-card border border-border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="text-muted-foreground font-medium">
                  SYMBOL ID
                </TableHead>
                <TableHead className="text-muted-foreground font-medium">
                  SYMBOL
                </TableHead>
                <TableHead className="text-muted-foreground font-medium">
                  PATH
                </TableHead>
                <TableHead className="text-muted-foreground font-medium">
                  DESCRIPTION
                </TableHead>
                <TableHead className="text-muted-foreground font-medium">
                  CONTRACT SIZE
                </TableHead>
                <TableHead className="text-muted-foreground font-medium flex items-center gap-1">
                  ENABLE
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12l5 5L20 7" />
                  </svg>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedSymbols.map((symbol) => (
                <TableRow
                  key={symbol.id}
                  className="border-border hover:bg-muted/50"
                >
                  <TableCell className="text-foreground">{symbol.id}</TableCell>
                  <TableCell className="text-primary font-medium">
                    {symbol.symbol}
                  </TableCell>
                  <TableCell className="text-primary">{symbol.path}</TableCell>
                  <TableCell className="text-primary">
                    {symbol.description}
                  </TableCell>
                  <TableCell className="text-foreground">
                    {symbol.contractSize.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <Switch
                      checked={symbol.enabled}
                      onCheckedChange={() => handleToggleSymbol(symbol.id)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Pagination */}
          <div className="p-4 border-t border-border flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Showing {startIndex + 1} to{" "}
              {Math.min(startIndex + ITEMS_PER_PAGE, symbols.length)} of{" "}
              {symbols.length} symbols
            </div>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage > 1) setCurrentPage(currentPage - 1);
                    }}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
                {getPageNumbers().map((page, index) => (
                  <PaginationItem key={index}>
                    {page === "..." ? (
                      <span className="px-2 text-muted-foreground">...</span>
                    ) : (
                      <PaginationLink
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          setCurrentPage(page as number);
                        }}
                        isActive={currentPage === page}
                      >
                        {page}
                      </PaginationLink>
                    )}
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage < totalPages) setCurrentPage(currentPage + 1);
                    }}
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Symbols;
