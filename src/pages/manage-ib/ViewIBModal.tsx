import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { IBMember } from "./ibData";

interface ViewIBModalProps {
  open: boolean;
  onClose: () => void;
  member: IBMember | null;
}

export function ViewIBModal({ open, onClose, member }: ViewIBModalProps) {
  if (!member) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg bg-background border-border">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle className="text-xl font-semibold text-foreground">
            View Data
          </DialogTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <h3 className="text-lg font-medium text-foreground">
            IB Data for {member.name}
          </h3>
          
          <div className="space-y-3">
            <div className="flex">
              <span className="text-muted-foreground font-medium min-w-32">Name:</span>
              <span className="text-foreground">{member.name}</span>
            </div>
            <div className="flex">
              <span className="text-muted-foreground font-medium min-w-32">Email:</span>
              <span className="text-foreground">{member.email}</span>
            </div>
            <div className="flex">
              <span className="text-muted-foreground font-medium min-w-32">IB Group:</span>
              <span className="text-foreground">{member.ibGroup}</span>
            </div>
            <div className="flex">
              <span className="text-muted-foreground font-medium min-w-32">Status:</span>
              <span className="text-foreground">{member.status}</span>
            </div>
            <div className="flex">
              <span className="text-muted-foreground font-medium min-w-32">Nationality:</span>
              <span className="text-foreground">UAE</span>
            </div>
            <div className="flex">
              <span className="text-muted-foreground font-medium min-w-32">Became a Broker:</span>
              <span className="text-foreground">yes</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
