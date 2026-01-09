import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default function TransactionsTab() {
  return (
    <div className="border rounded-lg p-4 bg-muted/50 ">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Transactions</h2>
        <div className="flex gap-2">
          <Button className="bg-primary text-primary-foreground flex items-center gap-2">
            <span className="text-lg">🕒</span> Payment Stats
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <span className="text-lg">⬇️</span> Export
          </Button>
        </div>
      </div>
      <Card className="bg-card border border-border/50 overflow-x-auto">
        <Table>
          <TableHeader className="whitespace-nowrap">
            <TableRow>
              <TableHead>DATE</TableHead>
              <TableHead>DETAIL</TableHead>
              <TableHead>TRANSACTION ID</TableHead>
              <TableHead>TYPE</TableHead>
              <TableHead>ACCOUNT</TableHead>
              <TableHead>AMOUNT</TableHead>
              <TableHead>GATEWAY</TableHead>
              <TableHead>STATUS</TableHead>
              <TableHead>ACTION BY</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="whitespace-nowrap">
              <TableCell>Nov 18, 2025 12:52</TableCell>
              <TableCell>Deposit With Bank Transfer - AED By Admin</TableCell>
              <TableCell>TRXHCSTRCLHRI</TableCell>
              <TableCell>
                <Badge className="bg-primary text-primary-foreground px-3 py-1 rounded">Manual Deposit</Badge>
              </TableCell>
              <TableCell>8651346183</TableCell>
              <TableCell className="text-green-500 font-semibold">+5000 USD</TableCell>
              <TableCell>BAEDF</TableCell>
              <TableCell>
                <Badge className="bg-yellow-200 text-yellow-800 px-3 py-1 rounded">Pending</Badge>
              </TableCell>
              <TableCell></TableCell>
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