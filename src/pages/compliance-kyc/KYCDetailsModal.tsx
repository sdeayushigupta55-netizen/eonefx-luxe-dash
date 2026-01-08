import { X, Download, Eye, Check } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { KYCRecord } from "./complianceData";

interface KYCDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  record: KYCRecord | null;
  variant?: "single" | "double"; // single = 1 image + Approve, double = 2 images + Reject
}

export function KYCDetailsModal({ open, onOpenChange, record, variant = "double" }: KYCDetailsModalProps) {
  if (!record) return null;

  // Placeholder images for ID cards
  const passportImage = "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=300&h=200&fit=crop";
  const frontIdImage = "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=300&h=200&fit=crop";
  const backIdImage = "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=300&h=200&fit=crop";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">KYC Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {variant === "single" ? (
            /* Single Image Layout - for All KYC Logs / Pending */
            <div className="grid grid-cols-2 gap-6">
              {/* Passport Image */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Passport:</Label>
                <div className="border border-border rounded-lg p-3 bg-muted/30">
                  <img
                    src={passportImage}
                    alt="Passport"
                    className="w-full h-48 object-cover rounded"
                  />
                </div>
                <div className="flex items-center gap-3">
                  <button className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1">
                    <Download className="h-3 w-3" />
                    Download
                  </button>
                  <button className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1">
                    <Eye className="h-3 w-3" />
                    View
                  </button>
                </div>
              </div>

              {/* Action Message */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Action Message:</Label>
                <div className="border-b border-border pb-2" />
              </div>
            </div>
          ) : (
            /* Double Image Layout - for Rejected KYC */
            <>
              <div className="grid grid-cols-2 gap-6">
                {/* Front Side */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium">ID card front side:</Label>
                  <div className="border border-border rounded-lg p-3 bg-muted/30">
                    <img
                      src={frontIdImage}
                      alt="ID card front side"
                      className="w-full h-40 object-cover rounded"
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <button className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1">
                      <Download className="h-3 w-3" />
                      Download
                    </button>
                    <button className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      View
                    </button>
                  </div>
                </div>

                {/* Back Side */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium">ID card back side:</Label>
                  <div className="border border-border rounded-lg p-3 bg-muted/30">
                    <img
                      src={backIdImage}
                      alt="ID card back side"
                      className="w-full h-40 object-cover rounded"
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <button className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1">
                      <Download className="h-3 w-3" />
                      Download
                    </button>
                    <button className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      View
                    </button>
                  </div>
                </div>
              </div>

              {/* Action Message */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Action Message:</Label>
                <div className="border-b border-border pb-2" />
              </div>
            </>
          )}

          {/* Comments */}
          <div className="space-y-2">
            <Label className="text-sm font-medium flex items-center gap-1">
              Comments
              <span className="text-muted-foreground text-xs">(i)</span>
            </Label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a comment" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="incomplete">Incomplete documents</SelectItem>
                <SelectItem value="blurry">Blurry images</SelectItem>
                <SelectItem value="expired">Document expired</SelectItem>
                <SelectItem value="mismatch">Information mismatch</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              Selecting a title will prefill the description. You can edit it further.
            </p>
          </div>

          {/* Detail Message */}
          <div className="space-y-2">
            <Label className="text-sm font-medium flex items-center gap-1">
              Detail Message
              <span className="text-muted-foreground text-xs">(i)</span>
            </Label>
            <Textarea
              placeholder="Details Message"
              className="min-h-[100px] resize-y"
            />
          </div>

          {/* Action Button */}
          <div className="flex justify-end pt-4">
            {variant === "single" ? (
              <Button className="gap-2 bg-green-600 hover:bg-green-700 text-white">
                <Check className="h-4 w-4" />
                Approve
              </Button>
            ) : (
              <Button variant="destructive" className="gap-2">
                <X className="h-4 w-4" />
                Reject
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
