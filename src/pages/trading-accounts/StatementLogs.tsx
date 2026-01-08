import { useState } from "react";
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
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Badge } from "@/components/ui/badge";
import { Trash2 } from "lucide-react";

const statementLogsData = [
  { id: 1, accountLogin: "# 878859", userEmail: "richirj43743@gmail.com", statementDate: "2025-12-31", status: "Sent", pdfSize: "2.72 KB", sentAt: "2026-01-01 07:32:18" },
  { id: 2, accountLogin: "# 878828", userEmail: "naeemail2020@gmail.com", statementDate: "2025-12-31", status: "Sent", pdfSize: "2.72 KB", sentAt: "2026-01-01 07:32:17" },
  { id: 3, accountLogin: "# 878816", userEmail: "richirj43743@gmail.com", statementDate: "2025-12-31", status: "Sent", pdfSize: "2.73 KB", sentAt: "2026-01-01 07:32:16" },
  { id: 4, accountLogin: "# 878774", userEmail: "naeemail2020@gmail.com", statementDate: "2025-12-31", status: "Sent", pdfSize: "2.72 KB", sentAt: "2026-01-01 07:32:15" },
  { id: 5, accountLogin: "# 878769", userEmail: "kumarfx47@gmail.com", statementDate: "2025-12-31", status: "Sent", pdfSize: "2.73 KB", sentAt: "2026-01-01 07:32:13" },
  { id: 6, accountLogin: "# 878686", userEmail: "rachealjameel@gmail.com", statementDate: "2025-12-31", status: "Sent", pdfSize: "2.72 KB", sentAt: "2026-01-01 07:32:12" },
  { id: 7, accountLogin: "# 878647", userEmail: "user@brokeret.com", statementDate: "2025-12-31", status: "Sent", pdfSize: "2.72 KB", sentAt: "2026-01-01 07:32:11" },
  { id: 8, accountLogin: "# 878550", userEmail: "rachealjameel@gmail.com", statementDate: "2025-12-31", status: "Sent", pdfSize: "2.72 KB", sentAt: "2026-01-01 07:32:10" },
  { id: 9, accountLogin: "# 878482", userEmail: "user@brokeret.com", statementDate: "2025-12-31", status: "Sent", pdfSize: "2.73 KB", sentAt: "2026-01-01 07:32:08" },
  { id: 10, accountLogin: "# 874641", userEmail: "sufyanhashmi931@gmail.com", statementDate: "2025-12-31", status: "Sent", pdfSize: "2.98 KB", sentAt: "2026-01-01 07:32:07" },
];

export default function StatementLogs() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 11;
  const totalEntries = 101;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-medium text-muted-foreground">Forex Statement Logs</h1>
          <Button className="bg-red-500 hover:bg-red-600 text-white rounded-md">
            <Trash2 className="h-4 w-4 mr-2" />
            Clear Logs
          </Button>
        </div>

        {/* Table Card */}
        <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="border-border bg-muted/30 hover:bg-muted/30">
                <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wider py-4">
                  Account Login
                </TableHead>
                <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wider py-4">
                  User Email
                </TableHead>
                <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wider py-4">
                  Statement Date
                </TableHead>
                <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wider py-4">
                  Status
                </TableHead>
                <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wider py-4">
                  PDF Size
                </TableHead>
                <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wider py-4">
                  Sent At
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {statementLogsData.map((log) => (
                <TableRow 
                  key={log.id} 
                  className="border-border hover:bg-muted/20 transition-colors"
                >
                  <TableCell className="text-foreground font-medium py-4">{log.accountLogin}</TableCell>
                  <TableCell className="text-muted-foreground py-4">{log.userEmail}</TableCell>
                  <TableCell className="text-muted-foreground py-4">{log.statementDate}</TableCell>
                  <TableCell className="py-4">
                    <Badge className="bg-emerald-500 hover:bg-emerald-600 text-white font-medium px-3 py-1 rounded-md">
                      {log.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground py-4">{log.pdfSize}</TableCell>
                  <TableCell className="text-muted-foreground py-4">{log.sentAt}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Pagination Footer */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-border bg-muted/10">
            <p className="text-sm text-muted-foreground">
              Showing 1 to 10 of {totalEntries} entries
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
                {[1, 2, 3, 4, 5].map((page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      href="#"
                      onClick={(e) => { e.preventDefault(); setCurrentPage(page); }}
                      isActive={currentPage === page}
                      className={`h-8 w-8 rounded-md border ${
                        currentPage === page 
                          ? "bg-emerald-500 text-white border-emerald-500 hover:bg-emerald-600" 
                          : "border-border bg-card hover:bg-muted text-muted-foreground"
                      }`}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <span className="px-2 text-muted-foreground">...</span>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink
                    href="#"
                    onClick={(e) => { e.preventDefault(); setCurrentPage(totalPages); }}
                    isActive={currentPage === totalPages}
                    className={`h-8 w-8 rounded-md border ${
                      currentPage === totalPages 
                        ? "bg-emerald-500 text-white border-emerald-500 hover:bg-emerald-600" 
                        : "border-border bg-card hover:bg-muted text-muted-foreground"
                    }`}
                  >
                    {totalPages}
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext 
                    href="#" 
                    onClick={(e) => { e.preventDefault(); setCurrentPage(Math.min(totalPages, currentPage + 1)); }}
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
