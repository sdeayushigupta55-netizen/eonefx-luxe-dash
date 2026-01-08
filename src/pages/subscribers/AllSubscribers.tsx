import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Mail, ChevronLeft, ChevronRight } from "lucide-react";

// Mock data for subscribers
const mockSubscribers = [
  { id: 1, subscriptionDate: "Dec 15, 2025 10:30", email: "john.doe@example.com" },
  { id: 2, subscriptionDate: "Dec 14, 2025 14:22", email: "jane.smith@example.com" },
  { id: 3, subscriptionDate: "Dec 12, 2025 09:15", email: "mike.wilson@example.com" },
  { id: 4, subscriptionDate: "Dec 10, 2025 16:45", email: "sarah.connor@example.com" },
  { id: 5, subscriptionDate: "Dec 08, 2025 11:00", email: "alex.johnson@example.com" },
];

export function AllSubscribers() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalItems = mockSubscribers.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handleEmailToAll = () => {
    navigate("/subscribers/send-email");
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-primary">All Subscribers</h1>
          <Button 
            onClick={handleEmailToAll}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Mail className="h-4 w-4 mr-2" />
            Email To All
          </Button>
        </div>

        {/* Table */}
        <Card className="bg-card border-border/50 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-border/50 hover:bg-transparent">
                <TableHead className="text-muted-foreground">SUBSCRIPTION DATE</TableHead>
                <TableHead className="text-muted-foreground">EMAIL</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockSubscribers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={2} className="text-center py-12 text-muted-foreground">
                    No Data Available In Table
                  </TableCell>
                </TableRow>
              ) : (
                mockSubscribers.map((subscriber) => (
                  <TableRow key={subscriber.id} className="border-border/50 hover:bg-accent/5">
                    <TableCell className="text-muted-foreground">{subscriber.subscriptionDate}</TableCell>
                    <TableCell className="text-foreground">{subscriber.email}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
          
          {/* Pagination */}
          <div className="flex items-center justify-between px-4 py-3 border-t border-border/50">
            <p className="text-sm text-muted-foreground">
              Showing {totalItems === 0 ? 0 : 1} to {Math.min(itemsPerPage, totalItems)} of {totalItems} entries
            </p>
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="border-border"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages || totalPages === 0}
                className="border-border"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
