import { useNavigate } from "react-router-dom";
import { Eye, Pencil, Trash2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { mockIBAccountTypes } from "./accountTypeData";

export function IBAccountTypeTable() {
  const navigate = useNavigate();

  const handleViewClick = (id: string) => {
    navigate(`/account-type/ib-account-type/view/${id}`);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-foreground">All IB Account Type</h1>
        <Button className="bg-primary text-primary-foreground">
          <Plus className="h-4 w-4 mr-2" />
          Add New
        </Button>
      </div>

      <div className="bg-card rounded-lg border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="text-xs font-medium text-muted-foreground uppercase">Title</TableHead>
              <TableHead className="text-xs font-medium text-muted-foreground uppercase">Group</TableHead>
              <TableHead className="text-xs font-medium text-muted-foreground uppercase">Badge</TableHead>
              <TableHead className="text-xs font-medium text-muted-foreground uppercase">Status</TableHead>
              <TableHead className="text-xs font-medium text-muted-foreground uppercase">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockIBAccountTypes.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-32 text-center text-muted-foreground">
                  No IB account types found
                </TableCell>
              </TableRow>
            ) : (
              mockIBAccountTypes.map((account) => (
                <TableRow key={account.id} className="hover:bg-muted/30">
                  <TableCell className="text-sm text-foreground">{account.title}</TableCell>
                  <TableCell className="text-sm text-foreground">{account.group}</TableCell>
                  <TableCell className="text-sm text-foreground">{account.badge}</TableCell>
                  <TableCell className="text-sm text-foreground">{account.status}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-muted-foreground hover:text-foreground"
                        onClick={() => handleViewClick(account.id)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
        <div className="px-4 py-3 border-t border-border text-sm text-muted-foreground">
          Showing to of {mockIBAccountTypes.length} results
        </div>
      </div>
    </div>
  );
}
