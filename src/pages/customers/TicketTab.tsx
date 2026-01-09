import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";


export function TicketTab() {
  return (
    <Card className="bg-muted/30 border p-6">
      <h2 className="text-xl font-semibold text-foreground mb-2">Support Tickets</h2>
      <Card className="bg-muted/40 rounded-b-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>TICKET NAME</TableHead>
              <TableHead>
                
                  OPENING DATE
                  
              </TableHead>
              <TableHead>
                
                  STATUS
                  
              </TableHead>
              <TableHead>
                
                  ACTION
                  
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell colSpan={4} className="text-center text-muted-foreground py-12">
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
    </Card>
  );
}

export default TicketTab;