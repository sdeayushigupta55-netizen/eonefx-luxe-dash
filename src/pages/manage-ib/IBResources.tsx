import { Plus, Pencil, Trash2 } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IBTabs } from "./IBTabs";
import { mockIBResources } from "./ibData";

export function IBResources() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">All Advertisements</h1>
          <Button className="bg-primary text-primary-foreground">
            <Plus className="h-4 w-4 mr-2" />
            Add New
          </Button>
        </div>
        
        <IBTabs />
        
        <div className="bg-card rounded-lg border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50 hover:bg-muted/50">
                <TableHead className="text-xs font-medium text-muted-foreground uppercase">
                  Icon
                </TableHead>
                <TableHead className="text-xs font-medium text-muted-foreground uppercase">
                  Language
                </TableHead>
                <TableHead className="text-xs font-medium text-muted-foreground uppercase">
                  Type
                </TableHead>
                <TableHead className="text-xs font-medium text-muted-foreground uppercase">
                  Status
                </TableHead>
                <TableHead className="text-xs font-medium text-muted-foreground uppercase">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockIBResources.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-32 text-center text-muted-foreground">
                    No resources found
                  </TableCell>
                </TableRow>
              ) : (
                mockIBResources.map((resource) => (
                  <TableRow key={resource.id} className="hover:bg-muted/30">
                    <TableCell className="text-sm text-foreground">{resource.icon}</TableCell>
                    <TableCell className="text-sm text-foreground">{resource.language}</TableCell>
                    <TableCell className="text-sm text-foreground">{resource.type}</TableCell>
                    <TableCell className="text-sm text-foreground">{resource.status}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
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
            Showing to of {mockIBResources.length} results
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
