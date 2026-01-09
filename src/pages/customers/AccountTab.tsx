import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Info } from "lucide-react";

export default function AccountTab() {
  const [open, setOpen] = useState(false);
  const [mapOpen, setMapOpen] = useState(false);

  return (
    <div className="border rounded-lg p-4 bg-muted/50 ">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Account</h2>
        <div className="flex gap-2">
          <Button className="bg-primary text-primary-foreground" onClick={() => setOpen(true)}>
            Add New Account
          </Button>
          <Button className="bg-primary text-primary-foreground" onClick={() => setMapOpen(true)}>
            Account Mapping
          </Button>
        </div>
      </div>
      <Card className="bg-card border border-border/50 overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>SCHEMA</TableHead>
              <TableHead>LOGIN</TableHead>
              <TableHead>GROUP</TableHead>
              <TableHead>BALANCE</TableHead>
              <TableHead>EQUITY</TableHead>
              <TableHead>CREDIT</TableHead>
              <TableHead>ACTION</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell colSpan={7} className="text-center text-muted-foreground py-12">
                No Data Available In Table
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <div className="flex items-center justify-between px-4 py-2 border-t border-border/50 bg-muted/50 rounded-b-lg">
          <span className="text-muted-foreground text-sm">Showing 0 to 0 of 0 entries</span>
          <div className="flex gap-2">
            <Button variant="outline" size="icon">
              <span>&lt;</span>
            </Button>
            <Button variant="outline" size="icon">
              <span>&gt;</span>
            </Button>
          </div>
        </div>
      </Card>

      {/* Add New Account Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Account</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="flex items-center gap-1 text-foreground text-sm">
                Select Account Type <Info className="h-4 w-4" />
              </Label>
              <Select>
                <SelectTrigger className="bg-background border-border h-9">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="type1">Type 1</SelectItem>
                  <SelectItem value="type2">Type 2</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <Switch />
              <span className="text-sm">Request Swap-Free Option (Islamic Account) <Info className="inline h-4 w-4" /></span>
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-1 text-foreground text-sm">
                Select Leverage <Info className="h-4 w-4" />
              </Label>
              <Select>
                <SelectTrigger className="bg-background border-border h-9">
                  <SelectValue placeholder="Select Leverage" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1:100">1:100</SelectItem>
                  <SelectItem value="1:200">1:200</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-1 text-foreground text-sm">
                Account Nickname <Info className="h-4 w-4" />
              </Label>
              <Input placeholder="Enter Nickname" />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-1 text-foreground text-sm">
                Main Password <Info className="h-4 w-4" />
              </Label>
              <Input placeholder="Enter Main Password" type="password" />
              <div className="text-xs text-red-500 mt-1 space-y-0.5">
                <div>Use from 8 to 20 characters</div>
                <div>Use both uppercase and lowercase letters</div>
                <div>At least one number</div>
                <div>At least one special character (!@#$%^&*(),-.?":{}|&lt;&gt;)</div>
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <Button className="bg-primary text-primary-foreground flex-1">
                &#10003; Create Account
              </Button>
              <Button variant="destructive" onClick={() => setOpen(false)} className="flex-1">
                &#10005; Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Map Account Modal */}
      <Dialog open={mapOpen} onOpenChange={setMapOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Map Account</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="flex items-center gap-1 text-foreground text-sm">
                Account Number <Info className="h-4 w-4" />
              </Label>
              <Input placeholder="Enter Account Number" />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-1 text-foreground text-sm">
                Select Account Schema <Info className="h-4 w-4" />
              </Label>
              <Select>
                <SelectTrigger className="bg-background border-border h-9">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="schema1">Schema 1</SelectItem>
                  <SelectItem value="schema2">Schema 2</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-1 text-foreground text-sm">
                Select Account Type <Info className="h-4 w-4" />
              </Label>
              <Select>
                <SelectTrigger className="bg-background border-border h-9">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="type1">Type 1</SelectItem>
                  <SelectItem value="type2">Type 2</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <Switch />
              <span className="text-sm">Request Swap-Free Option (Islamic Account) <Info className="inline h-4 w-4" /></span>
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-1 text-foreground text-sm">
                Select Leverage <Info className="h-4 w-4" />
              </Label>
              <Select>
                <SelectTrigger className="bg-background border-border h-9">
                  <SelectValue placeholder="Select Leverage" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1:100">1:100</SelectItem>
                  <SelectItem value="1:200">1:200</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-1 text-foreground text-sm">
                Account Nickname <Info className="h-4 w-4" />
              </Label>
              <Input placeholder="Enter Nickname" />
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <Button className="bg-primary text-primary-foreground flex-1">
                &#10003; Map Account
              </Button>
              <Button variant="destructive" onClick={() => setMapOpen(false)} className="flex-1">
                &#10005; Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}