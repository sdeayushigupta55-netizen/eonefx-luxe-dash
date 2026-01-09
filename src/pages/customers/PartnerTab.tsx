import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Info } from "lucide-react";

export default function PartnerTab() {
  const [open, setOpen] = useState(false);

  return (
    <Card className="bg-muted/50 p-6 rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">IB Account</h2>
        <Button
          className="bg-primary text-primary-foreground flex items-center gap-2"
          onClick={() => setOpen(true)}
        >
          <span className="text-lg font-bold">+</span> Approve IB Member
        </Button>
      </div>
      <div className="border border-border/50 rounded-lg overflow-x-auto bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>IB GROUP</TableHead>
              <TableHead>REBATE RULES</TableHead>
              <TableHead>ACCOUNT TYPES</TableHead>
              <TableHead>STATUS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>N/A</TableCell>
              <TableCell>N/A</TableCell>
              <TableCell>N/A</TableCell>
              <TableCell>
                <Badge className="bg-red-100 text-red-500 px-4 py-1">Pending</Badge>
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
      </div>

      {/* Approve IB Member Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md">
          <div className="flex flex-col items-center gap-4">
            <div className="rounded-full bg-red-100 p-4 mb-2">
              <Info className="h-10 w-10 text-red-500" />
            </div>
            <h2 className="text-xl font-semibold text-center mb-2">
              Convert To IB Member Aieman Basit
            </h2>
            <div className="w-full space-y-4">
              <Label className="flex items-center gap-1 text-foreground text-sm">
                IB Group <Info className="h-4 w-4" />
              </Label>
              <Select>
                <SelectTrigger className="bg-background border-border h-10">
                  <SelectValue placeholder="Select IB Group" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="group1">Group 1</SelectItem>
                  <SelectItem value="group2">Group 2</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-center gap-4 w-full mt-6">
              <Button className="bg-primary text-primary-foreground flex-1">
                &#10003; Approve IB Member
              </Button>
              <Button
                variant="destructive"
                onClick={() => setOpen(false)}
                className="flex-1"
              >
                &#10005; Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
}