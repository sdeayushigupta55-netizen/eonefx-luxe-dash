import { useState } from "react";
import { X, Check, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface AddIBGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: {
    name: string;
    details: string;
    rebateRules: string[];
    status: boolean;
    globalAccount: boolean;
  }) => void;
}

const availableRebateRules = [
  "Standard-Rebate",
  "Promo-Rebate",
  "STD-Kr",
  "VIP-Rebate",
];

export function AddIBGroupModal({ isOpen, onClose, onSave }: AddIBGroupModalProps) {
  const [name, setName] = useState("");
  const [details, setDetails] = useState("");
  const [selectedRebateRules, setSelectedRebateRules] = useState<string[]>([]);
  const [status, setStatus] = useState(false);
  const [globalAccount, setGlobalAccount] = useState(false);

  const handleSave = () => {
    onSave({
      name,
      details,
      rebateRules: selectedRebateRules,
      status,
      globalAccount,
    });
    handleClose();
  };

  const handleClose = () => {
    setName("");
    setDetails("");
    setSelectedRebateRules([]);
    setStatus(false);
    setGlobalAccount(false);
    onClose();
  };

  const handleRebateRuleSelect = (value: string) => {
    if (!selectedRebateRules.includes(value)) {
      setSelectedRebateRules([...selectedRebateRules, value]);
    }
  };

  const removeRebateRule = (rule: string) => {
    setSelectedRebateRules(selectedRebateRules.filter((r) => r !== rule));
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[550px] bg-card border-border p-0">
        <DialogHeader className="p-6 pb-4">
          <DialogTitle className="text-xl font-semibold text-foreground">
            Add New IB Group
          </DialogTitle>
        </DialogHeader>

        <div className="px-6 pb-6 space-y-5">
          {/* Name Field */}
          <div className="space-y-2">
            <div className="flex items-center gap-1.5">
              <Label className="text-sm font-medium text-foreground">Name</Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <HelpCircle className="h-3.5 w-3.5 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Enter the IB Group name</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Input
              placeholder="IB Group Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-background border-border"
            />
          </div>

          {/* Details Field */}
          <div className="space-y-2">
            <div className="flex items-center gap-1.5">
              <Label className="text-sm font-medium text-foreground">
                Details (Optional)
              </Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <HelpCircle className="h-3.5 w-3.5 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Add optional details about this group</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Textarea
              placeholder="Enter details..."
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              className="bg-background border-border min-h-[120px] resize-y"
            />
          </div>

          {/* Attach Rebate Rules */}
          <div className="space-y-2">
            <div className="flex items-center gap-1.5">
              <Label className="text-sm font-medium text-foreground">
                Attach Rebate Rule(S) (Optional)
              </Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <HelpCircle className="h-3.5 w-3.5 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Select rebate rules to attach</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="space-y-2">
              {selectedRebateRules.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {selectedRebateRules.map((rule) => (
                    <span
                      key={rule}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-foreground text-background rounded text-sm"
                    >
                      {rule}
                      <button
                        onClick={() => removeRebateRule(rule)}
                        className="hover:text-destructive"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
              <Select onValueChange={handleRebateRuleSelect}>
                <SelectTrigger className="bg-background border-border">
                  <SelectValue placeholder="Select an Option" />
                </SelectTrigger>
                <SelectContent>
                  {availableRebateRules
                    .filter((rule) => !selectedRebateRules.includes(rule))
                    .map((rule) => (
                      <SelectItem key={rule} value={rule}>
                        {rule}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Status and Global Account toggles */}
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <Label className="text-sm font-medium text-foreground">Status</Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <HelpCircle className="h-3.5 w-3.5 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Enable or disable this group</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <Switch checked={status} onCheckedChange={setStatus} />
            </div>
            <div className="flex items-center gap-2">
              <Label className="text-sm font-medium text-foreground">
                Global Account:
              </Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <HelpCircle className="h-3.5 w-3.5 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Enable for global account access</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <Switch checked={globalAccount} onCheckedChange={setGlobalAccount} />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4">
            <Button
              onClick={handleSave}
              className="bg-foreground text-background hover:bg-foreground/90 gap-2"
            >
              <Check className="h-4 w-4" />
              Save Changes
            </Button>
            <Button
              variant="destructive"
              onClick={handleClose}
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
