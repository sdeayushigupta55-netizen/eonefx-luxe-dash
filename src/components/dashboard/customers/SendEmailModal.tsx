import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send, X } from "lucide-react";
import { toast } from "sonner";

interface SendEmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  customerName: string;
  customerEmail: string;
}

export function SendEmailModal({ isOpen, onClose, customerName, customerEmail }: SendEmailModalProps) {
  const [subject, setSubject] = useState("");
  const [emailDetails, setEmailDetails] = useState("");

  const handleSendEmail = () => {
    if (!subject.trim()) {
      toast.error("Please enter a subject");
      return;
    }
    if (!emailDetails.trim()) {
      toast.error("Please enter email details");
      return;
    }
    toast.success(`Email sent to ${customerName}`);
    onClose();
    setSubject("");
    setEmailDetails("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-card border-border max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-foreground">Send Mail To {customerName}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label className="text-sm text-foreground">Subject:</Label>
            <Input
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="bg-background border-border"
              placeholder="Enter subject"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-sm text-foreground">Email Details</Label>
            <Textarea
              value={emailDetails}
              onChange={(e) => setEmailDetails(e.target.value)}
              className="bg-background border-border min-h-[120px]"
              placeholder="Enter email content..."
            />
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <Button onClick={handleSendEmail} className="bg-foreground text-background hover:bg-foreground/90">
              <Send className="h-4 w-4 mr-2" />
              Send Email
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
