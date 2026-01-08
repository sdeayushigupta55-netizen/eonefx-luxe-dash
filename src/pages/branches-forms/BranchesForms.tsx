import { useLocation, useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Filter, Download, Eye, ChevronLeft, ChevronRight, X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const formTabs = [
  { id: "pending", label: "Pending", path: "/branches-forms/pending" },
  { id: "approved", label: "Approved", path: "/branches-forms/approved" },
  { id: "rejected", label: "Rejected", path: "/branches-forms/rejected" },
];

const mockData: Record<string, Array<{
  id: string;
  date: string;
  userName: string;
  userEmail: string;
  userAvatar?: string;
  branch: string;
  status: "Pending" | "Approved" | "Rejected";
}>> = {
  pending: [],
  approved: [],
  rejected: [],
};

function getStatusTitle(tabId: string) {
  switch (tabId) {
    case "pending":
      return "Pending Branch Form Submissions";
    case "approved":
      return "Approved Branch Form Submissions";
    case "rejected":
      return "Rejected Branch Form Submissions";
    default:
      return "Branch Form Submissions";
  }
}

export default function BranchesForms() {
  const navigate = useNavigate();
  const location = useLocation();

  const getActiveTab = () => {
    const path = location.pathname;
    if (path.includes("/approved")) return "approved";
    if (path.includes("/rejected")) return "rejected";
    return "pending";
  };

  const activeTab = getActiveTab();
  const submissions = mockData[activeTab] || [];

  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-2xl font-semibold text-foreground mb-6">{getStatusTitle(activeTab)}</h1>

        {/* Filter Section */}
        <div className="bg-card rounded-lg border border-border p-4 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 items-end">
            <div className="flex-1">
              <Input
                placeholder="Search by Name, Username or Email"
                className="bg-background border-border"
              />
            </div>
            <div className="flex-1">
              <Input
                placeholder="Search by Branch Name"
                className="bg-background border-border"
              />
            </div>
            <div className="flex-1">
              <div className="relative">
                <Input
                  placeholder="Select Date Range"
                  className="bg-background border-border pr-10"
                />
                <X className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground cursor-pointer" />
              </div>
              <p className="text-xs text-muted-foreground mt-1">Select start and end dates for range</p>
            </div>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              Apply Filter
            </Button>
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-6 mb-6">
          {formTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => navigate(tab.path)}
              className={`flex items-center gap-2 text-sm transition-colors ${
                activeTab === tab.id
                  ? "text-primary font-medium"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <span
                className={`h-2 w-2 rounded-full ${
                  activeTab === tab.id ? "bg-primary" : "bg-muted-foreground/30"
                }`}
              />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="bg-card rounded-lg border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="text-muted-foreground font-medium">DATE</TableHead>
                <TableHead className="text-muted-foreground font-medium">USER</TableHead>
                <TableHead className="text-muted-foreground font-medium">BRANCH</TableHead>
                <TableHead className="text-muted-foreground font-medium">STATUS</TableHead>
                <TableHead className="text-muted-foreground font-medium">ACTION</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {submissions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                    No Data Available In Table
                  </TableCell>
                </TableRow>
              ) : (
                submissions.map((submission) => (
                  <TableRow key={submission.id} className="border-border">
                    <TableCell className="text-foreground">{submission.date}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={submission.userAvatar} />
                          <AvatarFallback className="bg-amber-500 text-white text-xs">
                            {submission.userName.split(" ").map((n) => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-foreground font-medium">{submission.userName}</p>
                          <p className="text-muted-foreground text-sm">{submission.userEmail}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-foreground">{submission.branch}</TableCell>
                    <TableCell>
                      <Badge
                        className={
                          submission.status === "Approved"
                            ? "bg-green-500 hover:bg-green-600 text-white"
                            : submission.status === "Rejected"
                            ? "bg-red-500 hover:bg-red-600 text-white"
                            : "bg-yellow-500 hover:bg-yellow-600 text-white"
                        }
                      >
                        {submission.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>

          {/* Pagination */}
          <div className="flex items-center justify-between px-4 py-3 border-t border-border">
            <p className="text-sm text-muted-foreground">
              Showing {submissions.length > 0 ? 1 : 0} to {submissions.length} of {submissions.length} entries
            </p>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" className="h-8 w-8" disabled={submissions.length === 0}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              {submissions.length > 0 && (
                <Button size="sm" className="h-8 w-8 bg-primary text-primary-foreground">
                  1
                </Button>
              )}
              <Button variant="outline" size="icon" className="h-8 w-8" disabled={submissions.length === 0}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
