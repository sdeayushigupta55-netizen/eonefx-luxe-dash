import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { toast } from "sonner";

interface ResetPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  customerEmail: string;
}

function generatePassword(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let password = "";
  for (let i = 0; i < 12; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
}

export function ResetPasswordModal({ isOpen, onClose, customerEmail }: ResetPasswordModalProps) {
  const [generatedPassword, setGeneratedPassword] = useState("");

  useEffect(() => {
    if (isOpen) {
      setGeneratedPassword(generatePassword());
    }
  }, [isOpen]);

  const handleUpdatePassword = () => {
    toast.success(`Password updated for ${customerEmail}`);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-card border-border max-w-md">
        <DialogHeader>
          <DialogTitle className="text-foreground">Reset Password For</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label className="text-sm text-foreground">Email</Label>
            <Input
              value={customerEmail}
              readOnly
              className="bg-background border-border text-muted-foreground"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-sm text-foreground">Generated Password</Label>
            <Input
              value={generatedPassword}
              onChange={(e) => setGeneratedPassword(e.target.value)}
              className="bg-background border-border font-mono"
            />
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <Button onClick={handleUpdatePassword} className="bg-foreground text-background hover:bg-foreground/90">
              <Check className="h-4 w-4 mr-2" />
              Update Password
            </Button>
            <Button variant="destructive" onClick={onClose}>
              <X className="h-4 w-4 mr-2" />
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
