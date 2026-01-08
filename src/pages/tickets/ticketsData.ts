export interface Ticket {
  id: string;
  subject: string;
  requesterName: string;
  requesterEmail: string;
  requesterAvatar?: string;
  requestedOn: string;
  assignee: string;
  priority: "Low" | "Medium" | "High" | "Urgent";
  status: "Open" | "Closed" | "Archive";
  ticketType: "Bug" | "Feature" | "Support" | "General";
}

export interface TicketMessage {
  id: string;
  senderName: string;
  senderAvatar?: string;
  message: string;
  timestamp: string;
}

export const mockTickets: Ticket[] = [
  {
    id: "SUPT711138",
    subject: "Test",
    requesterName: "Test New",
    requesterEmail: "richirj43743@gmail.com",
    requestedOn: "Dec 17 2025 11:36",
    assignee: "Not Assigned",
    priority: "Low",
    status: "Closed",
    ticketType: "Bug",
  },
  {
    id: "SUPT223085",
    subject: "MT5 Password",
    requesterName: "User Brokeret",
    requesterEmail: "user@brokeret.com",
    requestedOn: "Aug 12 2025 07:58",
    assignee: "Not Assigned",
    priority: "High",
    status: "Open",
    ticketType: "Support",
  },
  {
    id: "SUPT334567",
    subject: "Withdrawal Issue",
    requesterName: "John Smith",
    requesterEmail: "john.smith@email.com",
    requestedOn: "Dec 15 2025 14:22",
    assignee: "Admin User",
    priority: "Medium",
    status: "Open",
    ticketType: "Support",
  },
  {
    id: "SUPT445678",
    subject: "Account Verification",
    requesterName: "Sarah Wilson",
    requesterEmail: "sarah.w@email.com",
    requestedOn: "Dec 10 2025 09:15",
    assignee: "Support Team",
    priority: "Low",
    status: "Closed",
    ticketType: "General",
  },
];

export const mockMessages: TicketMessage[] = [
  {
    id: "1",
    senderName: "test new",
    message: "nlnkni",
    timestamp: "2025-11-12 15:05:00",
  },
];

export const ticketTypes = ["Bug", "Feature", "Support", "General"];
export const ticketPriorities = ["Low", "Medium", "High", "Urgent"];
export const ticketStatuses = ["Open", "Closed", "Archive"];

export const mockClients = [
  { id: "1", name: "Test New", email: "richirj43743@gmail.com" },
  { id: "2", name: "User Brokeret", email: "user@brokeret.com" },
  { id: "3", name: "John Smith", email: "john.smith@email.com" },
  { id: "4", name: "Sarah Wilson", email: "sarah.w@email.com" },
];

export const mockAgents = [
  { id: "1", name: "Admin User" },
  { id: "2", name: "Support Team" },
  { id: "3", name: "Technical Support" },
];
