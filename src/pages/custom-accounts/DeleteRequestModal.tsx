import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CustomAccountRequest } from "./customAccountsData";

interface DeleteRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  request: CustomAccountRequest | null;
  onConfirm: () => void;
}

export function DeleteRequestModal({ 
  isOpen, 
  onClose, 
  request, 
  onConfirm 
}: DeleteRequestModalProps) {
  if (!request) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[400px] bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-red-400">
            Delete Request
          </DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          <p className="text-muted-foreground">
            Are you sure you want to delete the request from{" "}
            <span className="text-foreground font-medium">{request.userName}</span>?
            This action cannot be undone.
          </p>
        </div>
        
        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            onClick={onConfirm}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
