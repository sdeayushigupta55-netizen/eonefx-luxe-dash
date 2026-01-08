import { AlertTriangle, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { IBGroup } from "./ibGroupsData";

interface DeleteIBGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  group: IBGroup | null;
}

// Mock attached users data
const attachedUsers = [
  { name: "user brokeret", username: "user13526", email: "user@brokeret.com" },
  { name: "sufyan aslam", username: "sufyanaslam8725", email: "sufyanhashmi3021@gmail.com" },
  { name: "test new", username: "testnew3856", email: "richirj43743@gmail.com" },
];

export function DeleteIBGroupModal({ isOpen, onClose, onConfirm, group }: DeleteIBGroupModalProps) {
  if (!group) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[480px] bg-card border-border p-0">
        <div className="p-8 text-center">
          {/* Warning Icon */}
          <div className="flex justify-center mb-6">
            <div className="h-16 w-16 rounded-full bg-red-100 flex items-center justify-center">
              <AlertTriangle className="h-8 w-8 text-red-500" />
            </div>
          </div>

          {/* Title */}
          <h2 className="text-xl font-semibold text-foreground mb-2">
            Are You Sure?
          </h2>
          <p className="text-muted-foreground mb-6">
            You want to delete <span className="font-semibold text-foreground">{group.groupName}</span> IB Group?
          </p>

          {/* Attached Users */}
          <div className="text-left mb-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Attached Users:
            </h3>
            <div className="space-y-3">
              {attachedUsers.map((user, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <div className="text-sm text-foreground">
                    {user.name} ({user.username})
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {user.email}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Warning Message */}
          <p className="text-destructive text-sm mb-6">
            Please remove these users first before deleting the group.
          </p>

          {/* Action Buttons */}
          <div className="flex items-center justify-center gap-3">
            <Button
              onClick={onConfirm}
              className="bg-muted text-foreground hover:bg-muted/80 gap-2"
            >
              <Check className="h-4 w-4" />
              Confirm
            </Button>
            <Button
              variant="destructive"
              onClick={onClose}
              className="gap-2"
            >
              <X className="h-4 w-4" />
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
