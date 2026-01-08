import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CustomAccountForm } from "./customAccountsData";

interface DeleteFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  form: CustomAccountForm | null;
  onConfirm: () => void;
}

export function DeleteFormModal({ 
  isOpen, 
  onClose, 
  form, 
  onConfirm 
}: DeleteFormModalProps) {
  if (!form) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[400px] bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-red-400">
            Delete Form
          </DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          <p className="text-muted-foreground">
            Are you sure you want to delete{" "}
            <span className="text-foreground font-medium">{form.formName}</span>?
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
