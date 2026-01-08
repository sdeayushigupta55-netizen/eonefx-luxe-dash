import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Paperclip, Send, HelpCircle, ArrowLeft, Users, FileText, Link as LinkIcon } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { mockTickets, mockMessages, ticketTypes, ticketPriorities, ticketStatuses, mockAgents } from "./ticketsData";

export function TicketDetail() {
  const { ticketId } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const ticket = mockTickets.find((t) => t.id === ticketId) || mockTickets[0];
  const [status, setStatus] = useState(ticket.status);
  const [priority, setPriority] = useState(ticket.priority);
  const [ticketType, setTicketType] = useState(ticket.ticketType);
  const [agent, setAgent] = useState("");

  const handleSendMessage = () => {
    if (message.trim()) {
      console.log("Sending message:", message);
      setMessage("");
    }
  };

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

  return (
    <DashboardLayout>
      <div className="p-6">
        {/* Back Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate("/tickets")}
          className="mb-4 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Tickets
        </Button>

        <div className="flex gap-6">
          {/* Chat Area */}
          <div className="flex-1 bg-card rounded-xl border border-border overflow-hidden flex flex-col">
            {/* Ticket Header */}
            <div className="p-4 border-b border-border flex items-center gap-3">
              <Avatar className={`h-10 w-10 ${getAvatarColor(ticket.requesterName)}`}>
                <AvatarFallback className="text-white font-semibold">
                  {getInitials(ticket.requesterName)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold text-foreground">{ticket.requesterName}</h3>
                <p className="text-sm text-muted-foreground">{ticket.requesterEmail}</p>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 p-4 min-h-[400px] overflow-y-auto bg-muted/20">
              {mockMessages.map((msg) => (
                <div key={msg.id} className="flex items-start gap-3 mb-4">
                  <Avatar className={`h-8 w-8 ${getAvatarColor(msg.senderName)}`}>
                    <AvatarFallback className="text-white text-xs font-semibold">
                      {getInitials(msg.senderName)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">{msg.senderName}</p>
                    <div className="bg-card rounded-lg px-3 py-2 border border-border">
                      <p className="text-sm text-foreground">{msg.message}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-border flex items-center gap-3">
              <Button variant="ghost" size="icon" className="text-muted-foreground">
                <Paperclip className="h-5 w-5" />
              </Button>
              <Input
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                className="flex-1 bg-background border-border"
              />
              <Button
                size="icon"
                onClick={handleSendMessage}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Ticket Info Sidebar */}
          <div className="w-80 bg-card rounded-xl border border-border p-5 space-y-6 h-fit">
            {/* Ticket ID */}
            <div className="text-right">
              <span className="text-sm text-muted-foreground">Ticket ID:</span>
              <span className="ml-2 text-sm font-medium text-foreground">{ticket.id}</span>
            </div>

            {/* User Avatar & Info */}
            <div className="flex flex-col items-center text-center pb-4 border-b border-border">
              <Avatar className={`h-20 w-20 mb-3 ${getAvatarColor(ticket.requesterName)}`}>
                <AvatarFallback className="text-white text-2xl font-semibold">
                  {getInitials(ticket.requesterName)}
                </AvatarFallback>
              </Avatar>
              <h3 className="font-semibold text-foreground">{ticket.requesterName.toLowerCase()}</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Member since: {ticket.requestedOn.split(" ").slice(0, 3).join("-")}
              </p>
              <div className="flex items-center gap-2 mt-3">
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                  <Users className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                  <FileText className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                  <LinkIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Status */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground flex items-center gap-1">
                Status
                <HelpCircle className="h-3.5 w-3.5 text-muted-foreground" />
              </label>
              <Select value={status} onValueChange={(v) => setStatus(v as typeof status)}>
                <SelectTrigger className="bg-background border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {ticketStatuses.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s.toUpperCase()}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Priority */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground flex items-center gap-1">
                Priority
                <HelpCircle className="h-3.5 w-3.5 text-muted-foreground" />
              </label>
              <Select value={priority} onValueChange={(v) => setPriority(v as typeof priority)}>
                <SelectTrigger className="bg-background border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {ticketPriorities.map((p) => (
                    <SelectItem key={p} value={p}>
                      {p.toUpperCase()}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Ticket Type */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground flex items-center gap-1">
                Ticket Type
                <HelpCircle className="h-3.5 w-3.5 text-muted-foreground" />
              </label>
              <Select value={ticketType} onValueChange={(v) => setTicketType(v as typeof ticketType)}>
                <SelectTrigger className="bg-background border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {ticketTypes.map((t) => (
                    <SelectItem key={t} value={t}>
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Agent */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground flex items-center gap-1">
                Agent
                <HelpCircle className="h-3.5 w-3.5 text-muted-foreground" />
              </label>
              <Select value={agent} onValueChange={setAgent}>
                <SelectTrigger className="bg-background border-border">
                  <SelectValue placeholder="Select Agent" />
                </SelectTrigger>
                <SelectContent>
                  {mockAgents.map((a) => (
                    <SelectItem key={a.id} value={a.id}>
                      {a.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90">
                Resolved
              </Button>
              <Button variant="outline" className="flex-1">
                Update Ticket
              </Button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
