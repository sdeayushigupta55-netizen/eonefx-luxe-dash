import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Info } from "lucide-react";

export default function AddDeal() {
  const navigate = useNavigate();

  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-2xl font-semibold text-foreground mb-6">Create New Deal</h1>

        <div className="bg-card rounded-lg border border-border p-6 space-y-6">
          {/* Deal Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="flex items-center gap-1">
                Lead Contact <Info className="h-4 w-4 text-muted-foreground" />
                <span className="text-red-500">*</span>
              </Label>
              <Select>
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder="Select an Option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="noman-test">Noman Test</SelectItem>
                  <SelectItem value="noman-deal">Noman Deal</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-1">
                Deal Name <Info className="h-4 w-4 text-muted-foreground" />
                <span className="text-red-500">*</span>
              </Label>
              <Input placeholder="e.g. Acme Corporation" className="bg-background" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="flex items-center gap-1">
                Pipeline <Info className="h-4 w-4 text-muted-foreground" />
                <span className="text-red-500">*</span>
              </Label>
              <Select>
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder="Select an Option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sales">Sales Pipeline</SelectItem>
                  <SelectItem value="marketing">Marketing Pipeline</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-1">
                Deal Stages <Info className="h-4 w-4 text-muted-foreground" />
                <span className="text-red-500">*</span>
              </Label>
              <Select>
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder="Select an Option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="generated">Generated</SelectItem>
                  <SelectItem value="ongoing">On Going</SelectItem>
                  <SelectItem value="win">Win</SelectItem>
                  <SelectItem value="lost">Lost</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="flex items-center gap-1">
                Deal Value <Info className="h-4 w-4 text-muted-foreground" />
                <span className="text-red-500">*</span>
              </Label>
              <div className="flex">
                <Input placeholder="0" className="bg-background rounded-r-none" defaultValue="0" />
                <div className="flex items-center px-3 bg-muted border border-l-0 border-border rounded-r-md text-sm text-muted-foreground">
                  USD
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-1">
                Close Date <Info className="h-4 w-4 text-muted-foreground" />
                <span className="text-red-500">*</span>
              </Label>
              <Input type="date" className="bg-muted/50" defaultValue="2025-12-18" />
            </div>
          </div>

          {/* Lead Contact Detail */}
          <div className="pt-4 border-t border-border">
            <h2 className="text-lg font-semibold text-foreground mb-4">Lead Contact Detail</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Lead Contact:</span>
                <span className="text-foreground">-</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Company Phone:</span>
                <span className="text-foreground">-</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Email:</span>
                <span className="text-foreground">-</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Website:</span>
                <span className="text-foreground">-</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Mobile:</span>
                <span className="text-foreground">-</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Address:</span>
                <span className="text-foreground">-</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Company Name:</span>
                <span className="text-foreground">-</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={() => navigate("/leads/deals")}>
              Cancel
            </Button>
            <Button>Save Deal</Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
