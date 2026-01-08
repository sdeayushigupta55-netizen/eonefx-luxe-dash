import { useState, useEffect } from "react";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IBMember } from "./ibData";

interface EditIBModalProps {
  open: boolean;
  onClose: () => void;
  member: IBMember | null;
  onSave: (member: IBMember) => void;
}

export function EditIBModal({ open, onClose, member, onSave }: EditIBModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    ibGroup: "",
    status: "" as IBMember["status"],
  });

  useEffect(() => {
    if (member) {
      setFormData({
        name: member.name,
        email: member.email,
        ibGroup: member.ibGroup,
        status: member.status,
      });
    }
  }, [member]);

  if (!member) return null;

  const handleSave = () => {
    onSave({
      ...member,
      ...formData,
    });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg bg-background border-border">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-foreground">
            Edit IB Details
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label className="text-sm text-foreground">Name</Label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="bg-background border-border text-foreground"
            />
          </div>
          
          <div className="space-y-2">
            <Label className="text-sm text-foreground">Email</Label>
            <Input
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="bg-background border-border text-foreground"
            />
          </div>
          
          <div className="space-y-2">
            <Label className="text-sm text-foreground">IB Group</Label>
            <Select
              value={formData.ibGroup}
              onValueChange={(value) => setFormData({ ...formData, ibGroup: value })}
            >
              <SelectTrigger className="bg-background border-border text-foreground">
                <SelectValue placeholder="Select IB Group" />
              </SelectTrigger>
              <SelectContent className="bg-background border-border">
                <SelectItem value="N/A">N/A</SelectItem>
                <SelectItem value="Silver">Silver</SelectItem>
                <SelectItem value="Gold">Gold</SelectItem>
                <SelectItem value="VIP">VIP</SelectItem>
                <SelectItem value="test-ib-group-1">test-ib-group-1</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label className="text-sm text-foreground">Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value) => setFormData({ ...formData, status: value as IBMember["status"] })}
            >
              <SelectTrigger className="bg-background border-border text-foreground">
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent className="bg-background border-border">
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Approved">Approved</SelectItem>
                <SelectItem value="Rejected">Rejected</SelectItem>
                <SelectItem value="Unprocessed">Unprocessed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave} className="bg-primary text-primary-foreground">
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
