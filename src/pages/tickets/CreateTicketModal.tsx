import { useState } from "react";
import { X, HelpCircle, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
import { mockClients, mockAgents, ticketTypes, ticketPriorities } from "./ticketsData";

interface CreateTicketModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateTicketModal({ open, onOpenChange }: CreateTicketModalProps) {
  const [formData, setFormData] = useState({
    client: "",
    title: "",
    type: "",
    priority: "",
    agent: "",
    description: "",
    image: null as File | null,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Creating ticket:", formData);
    onOpenChange(false);
    // Reset form
    setFormData({
      client: "",
      title: "",
      type: "",
      priority: "",
      agent: "",
      description: "",
      image: null,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, image: e.target.files[0] });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px] bg-card border-border max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-foreground">
            Create New Ticket
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 mt-4">
          {/* Ticket Client */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground flex items-center gap-1">
              Ticket Client
              <HelpCircle className="h-3.5 w-3.5 text-muted-foreground" />
            </label>
            <Select
              value={formData.client}
              onValueChange={(value) => setFormData({ ...formData, client: value })}
            >
              <SelectTrigger className="bg-background border-border">
                <SelectValue placeholder="Select Client" />
              </SelectTrigger>
              <SelectContent>
                {mockClients.map((client) => (
                  <SelectItem key={client.id} value={client.id}>
                    {client.name} - {client.email}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Ticket Title */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground flex items-center gap-1">
              Ticket Title
              <HelpCircle className="h-3.5 w-3.5 text-muted-foreground" />
            </label>
            <Input
              placeholder="Ticket Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="bg-background border-border"
            />
          </div>

          {/* Ticket Type */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground flex items-center gap-1">
              Ticket Type
              <HelpCircle className="h-3.5 w-3.5 text-muted-foreground" />
            </label>
            <Select
              value={formData.type}
              onValueChange={(value) => setFormData({ ...formData, type: value })}
            >
              <SelectTrigger className="bg-background border-border">
                <SelectValue placeholder="Select Type" />
              </SelectTrigger>
              <SelectContent>
                {ticketTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Ticket Priority */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground flex items-center gap-1">
              Ticket Priority
              <HelpCircle className="h-3.5 w-3.5 text-muted-foreground" />
            </label>
            <Select
              value={formData.priority}
              onValueChange={(value) => setFormData({ ...formData, priority: value })}
            >
              <SelectTrigger className="bg-background border-border">
                <SelectValue placeholder="Select Priority" />
              </SelectTrigger>
              <SelectContent>
                {ticketPriorities.map((priority) => (
                  <SelectItem key={priority} value={priority}>
                    {priority}
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
            <Select
              value={formData.agent}
              onValueChange={(value) => setFormData({ ...formData, agent: value })}
            >
              <SelectTrigger className="bg-background border-border">
                <SelectValue placeholder="Select Agent" />
              </SelectTrigger>
              <SelectContent>
                {mockAgents.map((agent) => (
                  <SelectItem key={agent.id} value={agent.id}>
                    {agent.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Attach Image */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground flex items-center gap-1">
              Attach Image
              <HelpCircle className="h-3.5 w-3.5 text-muted-foreground" />
            </label>
            <div className="flex items-center gap-2">
              <div className="flex-1 flex items-center px-3 py-2 bg-background border border-border rounded-md">
                <span className="text-sm text-muted-foreground truncate">
                  {formData.image ? formData.image.name : "Choose a file or drop it here..."}
                </span>
              </div>
              <label className="cursor-pointer">
                <Button type="button" variant="outline" size="sm" asChild>
                  <span>
                    <Upload className="h-4 w-4 mr-1" />
                    Browse
                  </span>
                </Button>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </label>
            </div>
          </div>

          {/* Ticket Descriptions */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground flex items-center gap-1">
              Ticket Descriptions
              <HelpCircle className="h-3.5 w-3.5 text-muted-foreground" />
            </label>
            <Textarea
              placeholder="Enter ticket description..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="bg-background border-border min-h-[100px] resize-y"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/90">
              Create Ticket
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
