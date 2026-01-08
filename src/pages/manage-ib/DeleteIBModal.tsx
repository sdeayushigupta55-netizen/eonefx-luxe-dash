import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { IBMember } from "./ibData";

interface DeleteIBModalProps {
  open: boolean;
  onClose: () => void;
  member: IBMember | null;
  onConfirm: (id: string) => void;
}

export function DeleteIBModal({ open, onClose, member, onConfirm }: DeleteIBModalProps) {
  if (!member) return null;

  const handleDelete = () => {
    onConfirm(member.id);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-background border-border">
        <DialogHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-500/20 border-2 border-red-500/30">
            <AlertTriangle className="h-8 w-8 text-red-400" />
          </div>
          <DialogTitle className="text-xl font-semibold text-foreground">
            Delete IB
          </DialogTitle>
          <DialogDescription className="text-muted-foreground pt-2">
            Are you sure you want to delete this IB record?
            <br />
            <span className="font-medium text-foreground">{member.name}</span> will be permanently removed.
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center justify-center gap-3 pt-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            variant="destructive" 
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-700"
          >
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
