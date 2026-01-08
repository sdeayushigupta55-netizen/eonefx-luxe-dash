import { Plus, Pencil } from "lucide-react";
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
import { userRankings } from "./sidebarPagesData";

export function UserRankingsContent() {
  return (
    <div className="flex-1 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-foreground">User Rankings</h1>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2">
          <Plus className="h-4 w-4" />
          Add New
        </Button>
      </div>

      {/* Table */}
      <div className="rounded-lg border border-border bg-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="text-muted-foreground font-medium">RANKING</TableHead>
              <TableHead className="text-muted-foreground font-medium">RANKING ICON</TableHead>
              <TableHead className="text-muted-foreground font-medium">RANKING NAME</TableHead>
              <TableHead className="text-muted-foreground font-medium">MINIMUM EARNING</TableHead>
              <TableHead className="text-muted-foreground font-medium">BONUS</TableHead>
              <TableHead className="text-muted-foreground font-medium">DESCRIPTION</TableHead>
              <TableHead className="text-muted-foreground font-medium">STATUS</TableHead>
              <TableHead className="text-muted-foreground font-medium">ACTION</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {userRankings.map((ranking) => (
              <TableRow key={ranking.id} className="border-border">
                <TableCell className="font-medium text-foreground">{ranking.ranking}</TableCell>
                <TableCell className="text-2xl">{ranking.icon}</TableCell>
                <TableCell className="text-foreground">{ranking.name}</TableCell>
                <TableCell className="text-foreground">{ranking.minEarning}</TableCell>
                <TableCell className="text-foreground">{ranking.bonus}</TableCell>
                <TableCell className="text-foreground max-w-[200px] truncate">{ranking.description}</TableCell>
                <TableCell>
                  <Badge className="bg-emerald-500/20 text-emerald-400 text-xs">
                    {ranking.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                    <Pencil className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="px-4 py-3 border-t border-border">
          <span className="text-sm text-muted-foreground">Showing 1 to 4 of 4 results</span>
        </div>
      </div>
    </div>
  );
}
