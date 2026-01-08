import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CustomAccountRequest } from "./customAccountsData";

interface ViewRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  request: CustomAccountRequest | null;
}

export function ViewRequestModal({ isOpen, onClose, request }: ViewRequestModalProps) {
  if (!request) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-primary">
            View Request Details
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 mt-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-muted-foreground">User Name</label>
              <p className="text-foreground font-medium">{request.userName}</p>
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Email</label>
              <p className="text-foreground font-medium">{request.email}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-muted-foreground">Request Details</label>
              <p className="text-foreground font-medium">{request.requestDetails}</p>
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Fields Submitted</label>
              <p className="text-foreground font-medium">{request.fieldsSubmitted}</p>
            </div>
          </div>
          
          {request.bankName && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-muted-foreground">Bank Name</label>
                <p className="text-foreground font-medium">{request.bankName}</p>
              </div>
              <div>
                <label className="text-sm text-muted-foreground">Account Number</label>
                <p className="text-foreground font-medium">{request.accountNumber}</p>
              </div>
            </div>
          )}
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-muted-foreground">Submitted At</label>
              <p className="text-foreground font-medium">{request.submittedAt}</p>
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Status</label>
              <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                request.status === "Pending" 
                  ? "bg-orange-500/20 text-orange-400"
                  : request.status === "Approved"
                  ? "bg-green-500/20 text-green-400"
                  : "bg-red-500/20 text-red-400"
              }`}>
                {request.status}
              </span>
            </div>
          </div>
          
          {request.approvedBy && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-muted-foreground">Approved By</label>
                <p className="text-foreground font-medium">{request.approvedBy}</p>
              </div>
              <div>
                <label className="text-sm text-muted-foreground">Approved At</label>
                <p className="text-foreground font-medium">{request.approvedAt}</p>
              </div>
            </div>
          )}
          
          {request.rejectedAt && (
            <div>
              <label className="text-sm text-muted-foreground">Rejected At</label>
              <p className="text-foreground font-medium">{request.rejectedAt}</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
