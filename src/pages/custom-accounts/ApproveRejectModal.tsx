import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CustomAccountRequest } from "./customAccountsData";

interface ApproveRejectModalProps {
  isOpen: boolean;
  onClose: () => void;
  request: CustomAccountRequest | null;
  action: "approve" | "reject";
  onConfirm: () => void;
}

export function ApproveRejectModal({ 
  isOpen, 
  onClose, 
  request, 
  action, 
  onConfirm 
}: ApproveRejectModalProps) {
  if (!request) return null;

  const isApprove = action === "approve";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[400px] bg-card border-border">
        <DialogHeader>
          <DialogTitle className={`text-xl font-semibold ${isApprove ? "text-green-400" : "text-red-400"}`}>
            {isApprove ? "Approve Request" : "Reject Request"}
          </DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          <p className="text-muted-foreground">
            Are you sure you want to {isApprove ? "approve" : "reject"} the request from{" "}
            <span className="text-foreground font-medium">{request.userName}</span>?
          </p>
        </div>
        
        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            onClick={onConfirm}
            className={isApprove 
              ? "bg-green-600 hover:bg-green-700 text-white" 
              : "bg-red-600 hover:bg-red-700 text-white"
            }
          >
            {isApprove ? "Approve" : "Reject"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
