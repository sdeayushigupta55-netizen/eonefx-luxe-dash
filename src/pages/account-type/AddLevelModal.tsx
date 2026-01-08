import { X, Check, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

interface AddLevelModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type: "swap-based" | "swap-free";
}

export function AddLevelModal({ open, onOpenChange, type }: AddLevelModalProps) {
  const handleSave = () => {
    // Handle save logic
    onOpenChange(false);
  };

  return (
    <TooltipProvider>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[500px] bg-card border-border p-0 gap-0">
          <DialogHeader className="p-6 pb-4 border-b border-border">
            <div className="flex items-center justify-between">
              <div>
                <DialogTitle className="text-lg font-semibold text-foreground">
                  Multi-Level Partner Program Settings
                </DialogTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  Change your Multi-Level Partner Program settings.
                </p>
              </div>
            </div>
          </DialogHeader>

          <div className="p-6 space-y-5">
            {/* Title and Level Order Row */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-1">
                  <Label className="text-sm font-medium text-foreground">Title</Label>
                  <Tooltip>
                    <TooltipTrigger>
                      <HelpCircle className="h-3.5 w-3.5 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Enter the level title</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <Input
                  placeholder="Title"
                  className="bg-background border-border"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-1">
                  <Label className="text-sm font-medium text-foreground">Level Order</Label>
                  <Tooltip>
                    <TooltipTrigger>
                      <HelpCircle className="h-3.5 w-3.5 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Set the order of this level</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <Input
                  type="number"
                  placeholder="2"
                  defaultValue="2"
                  className="bg-background border-border"
                />
              </div>
            </div>

            {/* Group Tag */}
            <div className="space-y-2">
              <div className="flex items-center gap-1">
                <Label className="text-sm font-medium text-foreground">Group Tag</Label>
                <Tooltip>
                  <TooltipTrigger>
                    <HelpCircle className="h-3.5 w-3.5 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Select or enter group tag</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <Select>
                <SelectTrigger className="bg-background border-border">
                  <SelectValue placeholder="demo\test\1" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="demo-test-1">demo\test\1</SelectItem>
                  <SelectItem value="real-promo-nb50s">real\Promo\nb50s</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Select Rebate Rules */}
            <div className="space-y-2">
              <div className="flex items-center gap-1">
                <Label className="text-sm font-medium text-foreground">Select Rebate Rules</Label>
                <Tooltip>
                  <TooltipTrigger>
                    <HelpCircle className="h-3.5 w-3.5 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Select applicable rebate rules</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <Select>
                <SelectTrigger className="bg-background border-border">
                  <SelectValue placeholder="Select an Option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rule1">Rebate Rule 1</SelectItem>
                  <SelectItem value="rule2">Rebate Rule 2</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Select IB Groups */}
            <div className="space-y-2">
              <div className="flex items-center gap-1">
                <Label className="text-sm font-medium text-foreground">Select IB Groups</Label>
                <Tooltip>
                  <TooltipTrigger>
                    <HelpCircle className="h-3.5 w-3.5 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Select IB groups for this level</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <Select>
                <SelectTrigger className="bg-background border-border">
                  <SelectValue placeholder="Select an Option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="group1">IB Group 1</SelectItem>
                  <SelectItem value="group2">IB Group 2</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Short Description */}
            <div className="space-y-2">
              <div className="flex items-center gap-1">
                <Label className="text-sm font-medium text-foreground">Short Description</Label>
                <Tooltip>
                  <TooltipTrigger>
                    <HelpCircle className="h-3.5 w-3.5 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Add a short description for this level</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <Textarea
                placeholder="Short Description"
                className="bg-background border-border min-h-[80px] resize-y"
              />
            </div>

            {/* Status */}
            <div className="space-y-2">
              <div className="flex items-center gap-1">
                <Label className="text-sm font-medium text-foreground">Status</Label>
                <Tooltip>
                  <TooltipTrigger>
                    <HelpCircle className="h-3.5 w-3.5 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Set the status of this level</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <Select defaultValue="enable">
                <SelectTrigger className="bg-background border-border">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="enable">Enable</SelectItem>
                  <SelectItem value="disable">Disable</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="flex items-center justify-end gap-3 p-6 pt-4 border-t border-border">
            <Button
              onClick={handleSave}
              className="bg-card hover:bg-muted border border-border text-foreground"
            >
              <Check className="h-4 w-4 mr-2" />
              Save
            </Button>
            <Button
              variant="destructive"
              onClick={() => onOpenChange(false)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              <X className="h-4 w-4 mr-2" />
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </TooltipProvider>
  );
}
