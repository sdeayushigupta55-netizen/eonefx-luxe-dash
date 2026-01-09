import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Info } from "lucide-react";

export default function KYCTab() {
  return (
    <Card className="bg-muted/50 p-8 rounded-lg">
      <h2 className="text-xl font-semibold mb-1">Manage Client KYC</h2>
      <p className="text-muted-foreground mb-8">
        Ensure this client’s KYC status is up to date by adjusting their verification level based on the documentation received.
      </p>
      <form className="max-w-xl space-y-8">
        <div>
          <Label className="flex items-center gap-1 text-foreground text-sm">
            KYC Level <Info className="h-4 w-4" />
          </Label>
          <Select defaultValue="level2">
            <SelectTrigger className="bg-background border-border h-12">
              <SelectValue placeholder="Select KYC Level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="level1">Level 1</SelectItem>
              <SelectItem value="level2">Level 2</SelectItem>
              <SelectItem value="level3">Level 3</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="flex items-center gap-1 text-foreground text-sm">
            Verification Type <Info className="h-4 w-4" />
          </Label>
          <Select>
            <SelectTrigger className="bg-background border-border h-12">
              <SelectValue placeholder="Select Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="passport">Passport</SelectItem>
              <SelectItem value="idcard">ID Card</SelectItem>
              <SelectItem value="driverlicense">Driver License</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <Label className="flex items-center gap-1 text-base">
            Auto Approve <Info className="h-4 w-4" />
          </Label>
          <Switch />
        </div>
        <div className="pt-4">
          <Button className="bg-primary text-primary-foreground">
            &#10003; Save Changes
          </Button>
        </div>
      </form>
    </Card>
  );
}