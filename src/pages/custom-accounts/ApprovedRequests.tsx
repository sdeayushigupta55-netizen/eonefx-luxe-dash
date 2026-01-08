import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { CustomAccountsTabs } from "./CustomAccountsTabs";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Eye, Pencil, X, CheckCircle, Calendar, CalendarDays, Users } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { mockApprovedRequests, CustomAccountRequest } from "./customAccountsData";
import { ViewRequestModal } from "./ViewRequestModal";
import { DeleteRequestModal } from "./DeleteRequestModal";

export function ApprovedRequests() {
  const [requests, setRequests] = useState<CustomAccountRequest[]>(mockApprovedRequests);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<CustomAccountRequest | null>(null);

  const stats = [
    { label: "Total Approved", value: requests.length, icon: CheckCircle, color: "text-green-400" },
    { label: "This Month", value: 0, icon: Calendar, color: "text-cyan-400" },
    { label: "This Year", value: 0, icon: CalendarDays, color: "text-primary" },
    { label: "Total Users", value: 24, icon: Users, color: "text-purple-400" },
  ];

  const handleView = (request: CustomAccountRequest) => {
    setSelectedRequest(request);
    setViewModalOpen(true);
  };

  const handleDelete = (request: CustomAccountRequest) => {
    setSelectedRequest(request);
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (selectedRequest) {
      setRequests(requests.filter(r => r.id !== selectedRequest.id));
    }
    setDeleteModalOpen(false);
    setSelectedRequest(null);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold text-primary">Approved Custom Payment Account Requests</h1>
        
        <CustomAccountsTabs />
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-card border-border/50 p-4">
              <div className="flex items-center gap-3">
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-semibold text-foreground">{stat.value}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
        
        {/* Table */}
        <Card className="bg-card border-border/50">
          <Table>
            <TableHeader>
              <TableRow className="border-border/50 hover:bg-transparent">
                <TableHead className="text-muted-foreground">USER INFO</TableHead>
                <TableHead className="text-muted-foreground">BANK DETAILS</TableHead>
                <TableHead className="text-muted-foreground">APPROVED AT</TableHead>
                <TableHead className="text-muted-foreground">APPROVED BY</TableHead>
                <TableHead className="text-muted-foreground">STATUS</TableHead>
                <TableHead className="text-muted-foreground">ACTION</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requests.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                    No Data Available In Table
                  </TableCell>
                </TableRow>
              ) : (
                requests.map((request) => (
                  <TableRow key={request.id} className="border-border/50 hover:bg-accent/5">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-sm font-medium">
                          {request.userName.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{request.userName}</p>
                          <p className="text-sm text-muted-foreground">{request.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="text-foreground">{request.bankName}</p>
                      <p className="text-sm text-muted-foreground">Account: {request.accountNumber}</p>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{request.approvedAt}</TableCell>
                    <TableCell>
                      <p className="text-foreground">{request.approvedBy}</p>
                      <p className="text-sm text-muted-foreground">{request.approvedByRole}</p>
                    </TableCell>
                    <TableCell>
                      <span className="px-2 py-1 rounded text-xs font-medium bg-green-500/20 text-green-400">
                        Approved
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button
                              onClick={() => handleView(request)}
                              className="p-1.5 rounded hover:bg-blue-500/20 text-muted-foreground hover:text-blue-400 transition-colors"
                            >
                              <Eye className="h-4 w-4" />
                            </button>
                          </TooltipTrigger>
                          <TooltipContent>View</TooltipContent>
                        </Tooltip>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button
                              onClick={() => handleView(request)}
                              className="p-1.5 rounded hover:bg-orange-500/20 text-muted-foreground hover:text-orange-400 transition-colors"
                            >
                              <Pencil className="h-4 w-4" />
                            </button>
                          </TooltipTrigger>
                          <TooltipContent>Edit</TooltipContent>
                        </Tooltip>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button
                              onClick={() => handleDelete(request)}
                              className="p-1.5 rounded hover:bg-red-500/20 text-muted-foreground hover:text-red-400 transition-colors"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </TooltipTrigger>
                          <TooltipContent>Delete</TooltipContent>
                        </Tooltip>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </Card>
      </div>

      <ViewRequestModal
        isOpen={viewModalOpen}
        onClose={() => setViewModalOpen(false)}
        request={selectedRequest}
      />
      <DeleteRequestModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        request={selectedRequest}
        onConfirm={confirmDelete}
      />
    </DashboardLayout>
  );
}
