import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X } from "lucide-react";

export default function DirectReferralsTab() {
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState("");

  return (
    <div className="border rounded-lg p-4 bg-muted/50">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Direct Referrals Of Aieman Basit</h2>
        <div className="flex gap-2">
          <Button
            className="bg-primary text-primary-foreground flex items-center gap-2"
            onClick={() => setOpen(true)}
          >
            <span className="text-lg font-bold">+</span> Add Referral
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <span className="text-lg">🗂️</span> Export
          </Button>
        </div>
      </div>
      <Card className="bg-card border border-border/50 overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>USER</TableHead>
              <TableHead>PHONE</TableHead>
              <TableHead>ACCOUNTS</TableHead>
              <TableHead>TOTAL BALANCE</TableHead>
              <TableHead>KYC</TableHead>
              <TableHead>STATUS</TableHead>
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
          <span className="text-muted-foreground text-sm">Showing 1 to 1 of 1 entries</span>
          <div className="flex gap-2">
            <Button variant="outline" size="icon">
              <span>&lt;</span>
            </Button>
            <Button variant="outline" size="icon" className="bg-primary text-primary-foreground border-primary">
              1
            </Button>
            <Button variant="outline" size="icon">
              <span>&gt;</span>
            </Button>
          </div>
        </div>
      </Card>

      {/* Add Referral Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-card border-border max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-foreground">
              Add Referral Under Aieman Basit
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Select User <span className="text-destructive">*</span>
              </label>
              <Select value={selectedUser} onValueChange={setSelectedUser}>
                <SelectTrigger className="w-full bg-background border-border">
                  <SelectValue placeholder="Select User" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="user1">User 1</SelectItem>
                  <SelectItem value="user2">User 2</SelectItem>
                  <SelectItem value="user3">User 3</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end gap-2">
              <Button
                
                onClick={() => {
                  // handle add referral logic here
                  setOpen(false);
                }}
                disabled={!selectedUser}
              >
               Add Referral
              </Button>
              <Button
                variant="destructive"
                onClick={() => setOpen(false)}
              >
                <X className="h-4 w-4 mr-2" />
                Close
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}