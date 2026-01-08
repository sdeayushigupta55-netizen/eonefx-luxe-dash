import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { CustomAccountsTabs } from "./CustomAccountsTabs";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Eye, Check, X, Clock, Calendar, CalendarDays } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { mockPendingRequests, CustomAccountRequest } from "./customAccountsData";
import { ViewRequestModal } from "./ViewRequestModal";
import { ApproveRejectModal } from "./ApproveRejectModal";
import { DeleteRequestModal } from "./DeleteRequestModal";

export function PendingRequests() {
  const [requests, setRequests] = useState<CustomAccountRequest[]>(mockPendingRequests);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [approveModalOpen, setApproveModalOpen] = useState(false);
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<CustomAccountRequest | null>(null);

  const stats = [
    { label: "Pending Requests", value: requests.length, icon: Clock, color: "text-orange-400" },
    { label: "Today", value: 0, icon: Calendar, color: "text-cyan-400" },
    { label: "This Month", value: 0, icon: CalendarDays, color: "text-primary" },
  ];

  const handleView = (request: CustomAccountRequest) => {
    setSelectedRequest(request);
    setViewModalOpen(true);
  };

  const handleApprove = (request: CustomAccountRequest) => {
    setSelectedRequest(request);
    setApproveModalOpen(true);
  };

  const handleReject = (request: CustomAccountRequest) => {
    setSelectedRequest(request);
    setRejectModalOpen(true);
  };

  const confirmApprove = () => {
    if (selectedRequest) {
      setRequests(requests.filter(r => r.id !== selectedRequest.id));
    }
    setApproveModalOpen(false);
    setSelectedRequest(null);
  };

  const confirmReject = () => {
    if (selectedRequest) {
      setRequests(requests.filter(r => r.id !== selectedRequest.id));
    }
    setRejectModalOpen(false);
    setSelectedRequest(null);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold text-primary">Pending Custom Payment Account Requests</h1>
        
        <CustomAccountsTabs />
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                <TableHead className="text-muted-foreground">REQUEST DETAILS</TableHead>
                <TableHead className="text-muted-foreground">SUBMITTED AT</TableHead>
                <TableHead className="text-muted-foreground">STATUS</TableHead>
                <TableHead className="text-muted-foreground">ACTION</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requests.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
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
                      <p className="text-foreground">{request.requestDetails}</p>
                      <p className="text-sm text-muted-foreground">{request.fieldsSubmitted} Fields Submitted</p>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{request.submittedAt}</TableCell>
                    <TableCell>
                      <span className="px-2 py-1 rounded text-xs font-medium bg-orange-500/20 text-orange-400">
                        Pending
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
                              onClick={() => handleApprove(request)}
                              className="p-1.5 rounded hover:bg-green-500/20 text-muted-foreground hover:text-green-400 transition-colors"
                            >
                              <Check className="h-4 w-4" />
                            </button>
                          </TooltipTrigger>
                          <TooltipContent>Approve</TooltipContent>
                        </Tooltip>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button
                              onClick={() => handleReject(request)}
                              className="p-1.5 rounded hover:bg-red-500/20 text-muted-foreground hover:text-red-400 transition-colors"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </TooltipTrigger>
                          <TooltipContent>Reject</TooltipContent>
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
      <ApproveRejectModal
        isOpen={approveModalOpen}
        onClose={() => setApproveModalOpen(false)}
        request={selectedRequest}
        action="approve"
        onConfirm={confirmApprove}
      />
      <ApproveRejectModal
        isOpen={rejectModalOpen}
        onClose={() => setRejectModalOpen(false)}
        request={selectedRequest}
        action="reject"
        onConfirm={confirmReject}
      />
    </DashboardLayout>
  );
}
