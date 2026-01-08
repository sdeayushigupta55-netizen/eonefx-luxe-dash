import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Ticket, ChevronRight, Plus, ChevronDown, MessageSquare, Eye, User } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { mockTickets } from "./ticketsData";
import { CreateTicketModal } from "./CreateTicketModal";
import { AssignTicketModal } from "./AssignTicketModal";

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
}

function StatCard({ title, value, icon }: StatCardProps) {
  return (
    <div className="bg-card rounded-xl border border-border p-5 flex items-center justify-between hover:border-primary/30 transition-colors cursor-pointer group">
      <div className="flex items-center gap-4">
        <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
          {icon}
        </div>
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold text-foreground">{value}</p>
        </div>
      </div>
      <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
    </div>
  );
}

export function AllTickets() {
  const navigate = useNavigate();
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [assignModalOpen, setAssignModalOpen] = useState(false);
  const [selectedTicketId, setSelectedTicketId] = useState<string>("");
  const [tickets, setTickets] = useState(mockTickets);

  const totalTickets = tickets.length;
  const closedTickets = tickets.filter((t) => t.status === "Closed").length;
  const openTickets = tickets.filter((t) => t.status === "Open").length;
  const resolvedTickets = closedTickets;

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getAvatarColor = (name: string) => {
    const colors = [
      "bg-purple-500",
      "bg-blue-500",
      "bg-green-500",
      "bg-yellow-500",
      "bg-red-500",
      "bg-pink-500",
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Open":
        return "text-red-500";
      case "Closed":
        return "text-green-500";
      case "Archive":
        return "text-yellow-500";
      default:
        return "text-muted-foreground";
    }
  };

  const getStatusDot = (status: string) => {
    switch (status) {
      case "Open":
        return "bg-red-500";
      case "Closed":
        return "bg-green-500";
      case "Archive":
        return "bg-yellow-500";
      default:
        return "bg-muted-foreground";
    }
  };

  const handleStatusChange = (ticketId: string, newStatus: string) => {
    setTickets((prev) =>
      prev.map((t) =>
        t.id === ticketId ? { ...t, status: newStatus as "Open" | "Closed" | "Archive" } : t
      )
    );
  };

  const handleOpenAssignModal = (ticketId: string) => {
    setSelectedTicketId(ticketId);
    setAssignModalOpen(true);
  };

  const handleAssignTicket = (ticketId: string, agentId: string) => {
    // Find agent name by id
    const agentNames: Record<string, string> = {
      "1": "irfan rehman",
      "2": "Admin User",
      "3": "Support Team",
      "4": "Technical Support",
    };
    setTickets((prev) =>
      prev.map((t) =>
        t.id === ticketId ? { ...t, assignee: agentNames[agentId] || "Assigned" } : t
      )
    );
  };

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Tickets"
            value={totalTickets}
            icon={<Ticket className="h-6 w-6 text-primary" />}
          />
          <StatCard
            title="Closed Tickets"
            value={closedTickets}
            icon={<Ticket className="h-6 w-6 text-primary" />}
          />
          <StatCard
            title="Open Tickets"
            value={openTickets}
            icon={<Ticket className="h-6 w-6 text-primary" />}
          />
          <StatCard
            title="Resolved Tickets"
            value={resolvedTickets}
            icon={<Ticket className="h-6 w-6 text-primary" />}
          />
        </div>

        {/* Tickets Section */}
        <div className="bg-card rounded-xl border border-border">
          {/* Header */}
          <div className="p-5 flex items-center justify-between border-b border-border">
            <h2 className="text-lg font-semibold text-foreground">Tickets</h2>
            <Button
              onClick={() => setCreateModalOpen(true)}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Ticket
            </Button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead className="text-muted-foreground font-semibold">TICKET #</TableHead>
                  <TableHead className="text-muted-foreground font-semibold">TICKET SUBJECT</TableHead>
                  <TableHead className="text-muted-foreground font-semibold">REQUESTER NAME</TableHead>
                  <TableHead className="text-muted-foreground font-semibold">REQUESTED ON</TableHead>
                  <TableHead className="text-muted-foreground font-semibold">ASSIGNEE</TableHead>
                  <TableHead className="text-muted-foreground font-semibold">PRIORITY</TableHead>
                  <TableHead className="text-muted-foreground font-semibold">STATUS</TableHead>
                  <TableHead className="text-muted-foreground font-semibold">ACTION</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tickets.map((ticket) => (
                  <TableRow key={ticket.id} className="border-border hover:bg-muted/30">
                    <TableCell className="text-muted-foreground">{ticket.id}</TableCell>
                    <TableCell className="text-foreground font-medium">{ticket.subject}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className={`h-8 w-8 ${getAvatarColor(ticket.requesterName)}`}>
                          <AvatarFallback className="text-white text-xs font-semibold">
                            {getInitials(ticket.requesterName)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium text-foreground">{ticket.requesterName}</p>
                          <p className="text-xs text-muted-foreground">{ticket.requesterEmail}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{ticket.requestedOn}</TableCell>
                    <TableCell className="text-muted-foreground">{ticket.assignee}</TableCell>
                    <TableCell className="text-foreground">{ticket.priority}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-auto py-1 px-2 flex items-center gap-1.5 hover:bg-muted/50"
                          >
                            <span className={`h-2 w-2 rounded-full ${getStatusDot(ticket.status)}`} />
                            <span className={getStatusColor(ticket.status)}>{ticket.status}</span>
                            <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" className="min-w-[120px]">
                          <DropdownMenuItem
                            onClick={() => handleStatusChange(ticket.id, "Closed")}
                            className="flex items-center gap-2"
                          >
                            <span className="h-2 w-2 rounded-full bg-green-500" />
                            Close
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleStatusChange(ticket.id, "Open")}
                            className="flex items-center gap-2"
                          >
                            <span className="h-2 w-2 rounded-full bg-red-500" />
                            Open
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleStatusChange(ticket.id, "Archive")}
                            className="flex items-center gap-2"
                          >
                            <span className="h-2 w-2 rounded-full bg-yellow-500" />
                            Archive
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-foreground"
                          onClick={() => navigate(`/tickets/${ticket.id}`)}
                        >
                          <MessageSquare className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-primary/20"
                          onClick={() => handleOpenAssignModal(ticket.id)}
                        >
                          <User className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="p-4 border-t border-border flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing 1 to {tickets.length} of {tickets.length} entries
            </p>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>
                    1
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </div>

      {/* Create Ticket Modal */}
      <CreateTicketModal open={createModalOpen} onOpenChange={setCreateModalOpen} />

      {/* Assign Ticket Modal */}
      <AssignTicketModal
        open={assignModalOpen}
        onOpenChange={setAssignModalOpen}
        ticketId={selectedTicketId}
        onAssign={handleAssignTicket}
      />
    </DashboardLayout>
  );
}
