import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Plus, Download, ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";

const mockLeads = [
  {
    id: "1",
    contactName: "Noman Test",
    email: "admin@noman.com",
    leadOwner: { name: "Super Admin", email: "admin@brokeret.com" },
    createdAt: "May 31, 2025 08:51",
  },
  {
    id: "2",
    contactName: "Noman Deal",
    email: "noman.chodhary+231@gmail.com",
    leadOwner: { name: "Super Admin", email: "admin@brokeret.com" },
    createdAt: "Jun 05, 2025 11:38",
  },
];

export default function LeadContact() {
  const navigate = useNavigate();

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold text-foreground">Leads</h1>
          <div className="flex items-center gap-3">
            <Button onClick={() => navigate("/leads/add")} className="gap-2">
              <Plus className="h-4 w-4" />
              Add New Lead
            </Button>
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Import
            </Button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-card rounded-lg border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="text-muted-foreground font-medium text-xs">CONTACT NAME</TableHead>
                <TableHead className="text-muted-foreground font-medium text-xs">EMAIL</TableHead>
                <TableHead className="text-muted-foreground font-medium text-xs">LEAD OWNER</TableHead>
                <TableHead className="text-muted-foreground font-medium text-xs">CREATED AT</TableHead>
                <TableHead className="text-muted-foreground font-medium text-xs"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockLeads.map((lead) => (
                <TableRow key={lead.id} className="border-border">
                  <TableCell className="text-foreground font-medium">{lead.contactName}</TableCell>
                  <TableCell className="text-muted-foreground">{lead.email}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-amber-500 text-white text-xs">
                          {lead.leadOwner.name.split(" ").map((n) => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-foreground font-medium text-sm">{lead.leadOwner.name}</p>
                        <p className="text-muted-foreground text-xs">{lead.leadOwner.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{lead.createdAt}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm" className="gap-1 h-8">
                      Actions <ChevronDown className="h-3 w-3" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Pagination */}
          <div className="flex items-center justify-between px-4 py-3 border-t border-border">
            <p className="text-sm text-muted-foreground">
              Showing 1 to {mockLeads.length} of {mockLeads.length} entries
            </p>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" className="h-8 w-8">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button size="sm" className="h-8 w-8 bg-primary text-primary-foreground">
                1
              </Button>
              <Button variant="outline" size="icon" className="h-8 w-8">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
