import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function IBBonusTab() {
  return (
    <div className="border rounded-lg p-4 bg-muted/50">
      <h2 className="text-xl font-semibold mb-4">IB Bonus</h2>
      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-4">
        <Input placeholder="Login" className="w-40" />
        <Input placeholder="Deal" className="w-40" />
        <Input placeholder="Symbol" className="w-40" />
        <Select>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Select Days" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7">Last 7 Days</SelectItem>
            <SelectItem value="30">Last 30 Days</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" className="text-muted-foreground bg-muted cursor-not-allowed" disabled>
          Created At Range
        </Button>
        <Button variant="outline">Filter</Button>
        <Button variant="outline">Export</Button>
      </div>
      {/* Stats */}
      <div className="flex flex-wrap gap-4 mb-4">
        <Card className="p-6 flex-1 min-w-[100px] ">
          <div className="text-muted-foreground mb-1 text-xs">Total IB Received</div>
          <div className="text-2xl font-bold">$0.00</div>
          <div className="text-muted-foreground text-xs">Lifetime Total</div>
        </Card>
        <Card className="p-6 flex-1 min-w-[100px]">
          <div className="text-green mb-1 text-xs">Current IB Wallet</div>
          <div className="text-2xl font-bold">$0.00</div>
          <div className="text-green text-xs">Available Balance</div>
        </Card>
        <Card className="p-6 flex-1 min-w-[100px]">
          <div className="text-muted-foreground mb-1 text-xs">Filtered Results</div>
          <div className="text-2xl font-bold">$0.00</div>
          <div className="text-muted-foreground text-xs">0 showing</div>
          <div className="mt-2">
           
          </div>
        </Card>
        <Card className="p-6 flex-1 min-w-[100px]">
 <span className="text-blue-600 cursor-pointer text-xs">Filter Range</span>
            <div className="text-muted-foreground text-xs">Dec 29, 2025 - Jan 09, 2026</div>
            <div className="text-blue-600 text-xs cursor-pointer">Filter date range</div>
        </Card>
      </div>
      {/* Table */}
      <Card className="bg-card border border-border/50 overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>DATE</TableHead>
              <TableHead>DETAIL</TableHead>
              <TableHead>TRANSACTION ID</TableHead>
              <TableHead>TYPE</TableHead>
              <TableHead>ACCOUNT</TableHead>
              <TableHead>AMOUNT</TableHead>
              <TableHead>GATEWAY</TableHead>
              <TableHead>STATUS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell colSpan={8} className="text-center text-muted-foreground py-12">
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
    </div>
  );
}