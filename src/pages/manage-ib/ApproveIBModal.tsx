import { UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
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
import { Label } from "@/components/ui/label";
import { IBMember } from "./ibData";

interface ApproveIBModalProps {
  open: boolean;
  onClose: () => void;
  member: IBMember | null;
}

export function ApproveIBModal({ open, onClose, member }: ApproveIBModalProps) {
  if (!member) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-background border-border">
        <DialogHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted border-2 border-border">
            <UserPlus className="h-8 w-8 text-foreground" />
          </div>
          <DialogTitle className="text-xl font-semibold text-foreground">
            Convert To IB Member {member.name}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label className="text-sm text-foreground flex items-center gap-1">
              IB Group
              <span className="text-muted-foreground cursor-help">ⓘ</span>
            </Label>
            <Select>
              <SelectTrigger className="bg-background border-border text-foreground">
                <SelectValue placeholder="Select IB Group" />
              </SelectTrigger>
              <SelectContent className="bg-background border-border">
                <SelectItem value="silver">Silver</SelectItem>
                <SelectItem value="gold">Gold</SelectItem>
                <SelectItem value="vip">VIP</SelectItem>
                <SelectItem value="test-ib-group-1">test-ib-group-1</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex items-center justify-center gap-3 pt-2">
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Approve IB Member
          </Button>
          <Button 
            variant="destructive" 
            onClick={onClose}
            className="flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
