import { Plus, Pencil, Trash2, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { rolesData } from "./sidebarPagesData";

export function RolesPermissionsContent() {
  return (
    <div className="flex-1 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-foreground">Roles & Permissions</h1>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2">
          <Plus className="h-4 w-4" />
          Add New Role
        </Button>
      </div>

      {/* Table */}
      <div className="rounded-lg border border-border bg-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="text-muted-foreground font-medium w-16">#</TableHead>
              <TableHead className="text-muted-foreground font-medium">NAME</TableHead>
              <TableHead className="text-muted-foreground font-medium">ACTION</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rolesData.map((role) => (
              <TableRow key={role.id} className="border-border">
                <TableCell className="text-foreground">{role.id}</TableCell>
                <TableCell className="font-medium text-foreground">{role.name}</TableCell>
                <TableCell>
                  {!role.editable ? (
                    <Badge className="bg-red-500/20 text-red-400 gap-1.5">
                      <AlertTriangle className="h-3.5 w-3.5" />
                      Not Editable
                    </Badge>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Button className="bg-amber-500 hover:bg-amber-600 text-white gap-1.5 h-8 text-xs">
                        <Pencil className="h-3.5 w-3.5" />
                        Edit Permission
                      </Button>
                      <Button className="bg-slate-700 hover:bg-slate-800 text-white gap-1.5 h-8 text-xs">
                        <Trash2 className="h-3.5 w-3.5" />
                        Delete Role
                      </Button>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="px-4 py-3 border-t border-border">
          <span className="text-sm text-muted-foreground">Showing 1 to 7 of 7 results</span>
        </div>
      </div>
    </div>
  );
}
