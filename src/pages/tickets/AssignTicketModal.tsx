import { useState } from "react";
import { Check, X, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

interface Agent {
  id: string;
  name: string;
  role: string;
  avatar?: string;
}

const availableAgents: Agent[] = [
  { id: "1", name: "irfan rehman", role: "Super-Admin" },
  { id: "2", name: "Admin User", role: "Admin" },
  { id: "3", name: "Support Team", role: "Support" },
  { id: "4", name: "Technical Support", role: "Support" },
];

interface AssignTicketModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  ticketId: string;
  onAssign: (ticketId: string, agentId: string) => void;
}

export function AssignTicketModal({
  open,
  onOpenChange,
  ticketId,
  onAssign,
}: AssignTicketModalProps) {
  const [selectedAgent, setSelectedAgent] = useState("");

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
      "bg-yellow-500",
      "bg-blue-500",
      "bg-green-500",
      "bg-purple-500",
      "bg-red-500",
      "bg-pink-500",
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  const handleAssign = () => {
    if (selectedAgent) {
      onAssign(ticketId, selectedAgent);
      onOpenChange(false);
      setSelectedAgent("");
    }
  };

  const handleClose = () => {
    onOpenChange(false);
    setSelectedAgent("");
  };

  const selectedAgentData = availableAgents.find((a) => a.id === selectedAgent);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[450px] bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-foreground">
            Assign Ticket To User
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Assign To */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground flex items-center gap-1">
              Assign To
              <HelpCircle className="h-3.5 w-3.5 text-muted-foreground" />
            </label>
            <Select value={selectedAgent} onValueChange={setSelectedAgent}>
              <SelectTrigger className="bg-background border-border h-12">
                {selectedAgentData ? (
                  <div className="flex items-center gap-2">
                    <Avatar className={`h-7 w-7 ${getAvatarColor(selectedAgentData.name)}`}>
                      <AvatarFallback className="text-white text-xs font-semibold">
                        {getInitials(selectedAgentData.name)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-foreground">{selectedAgentData.name}</span>
                    <Badge 
                      variant="secondary" 
                      className="bg-primary/20 text-primary border-primary/30 text-xs"
                    >
                      {selectedAgentData.role}
                    </Badge>
                  </div>
                ) : (
                  <SelectValue placeholder="Select Agent" />
                )}
              </SelectTrigger>
              <SelectContent>
                {availableAgents.map((agent) => (
                  <SelectItem key={agent.id} value={agent.id} className="py-2">
                    <div className="flex items-center gap-2">
                      <Avatar className={`h-7 w-7 ${getAvatarColor(agent.name)}`}>
                        <AvatarFallback className="text-white text-xs font-semibold">
                          {getInitials(agent.name)}
                        </AvatarFallback>
                      </Avatar>
                      <span>{agent.name}</span>
                      <Badge 
                        variant="secondary" 
                        className="bg-primary/20 text-primary border-primary/30 text-xs"
                      >
                        {agent.role}
                      </Badge>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-center gap-3 pt-4">
            <Button
              onClick={handleAssign}
              disabled={!selectedAgent}
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-6"
            >
              <Check className="h-4 w-4 mr-2" />
              Assign Ticket
            </Button>
            <Button
              variant="destructive"
              onClick={handleClose}
              className="px-6"
            >
              <X className="h-4 w-4 mr-2" />
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
