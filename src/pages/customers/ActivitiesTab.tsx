import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export function ActivitiesTab() {
  return (
    <Card className="border rounded-lg p-4 bg-muted/50">
      <h2 className="text-xl font-semibold text-foreground mb-2">Activities</h2>
      <Card className="bg-card border border-border/50 overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ACTIVITY</TableHead>
              <TableHead>
                
                  DESCRIPTION
                
              </TableHead>
              <TableHead>
                
                  TIME
                 
                
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
    </Card>
  );
}

export default ActivitiesTab;