import { useNavigate } from "react-router-dom";
import { Eye, Pencil, Trash2, Plus } from "lucide-react";
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
import { AccountType, mockAccountTypes } from "./accountTypeData";

export function AccountTypeTable() {
  const navigate = useNavigate();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-foreground">All Account Type</h1>
        <Button 
          className="bg-primary text-primary-foreground"
          onClick={() => navigate("/account-type/add")}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add New
        </Button>
      </div>

      <div className="bg-card rounded-lg border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="text-xs font-medium text-muted-foreground uppercase">Icon</TableHead>
              <TableHead className="text-xs font-medium text-muted-foreground uppercase">Trader Type</TableHead>
              <TableHead className="text-xs font-medium text-muted-foreground uppercase">Priority</TableHead>
              <TableHead className="text-xs font-medium text-muted-foreground uppercase">Title</TableHead>
              <TableHead className="text-xs font-medium text-muted-foreground uppercase">Leverage</TableHead>
              <TableHead className="text-xs font-medium text-muted-foreground uppercase">Branches</TableHead>
              <TableHead className="text-xs font-medium text-muted-foreground uppercase">Account Category</TableHead>
              <TableHead className="text-xs font-medium text-muted-foreground uppercase">Badge</TableHead>
              <TableHead className="text-xs font-medium text-muted-foreground uppercase">Status</TableHead>
              <TableHead className="text-xs font-medium text-muted-foreground uppercase">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockAccountTypes.map((account) => (
              <TableRow key={account.id} className="hover:bg-muted/30">
                <TableCell></TableCell>
                <TableCell className="text-sm text-foreground">{account.traderType}</TableCell>
                <TableCell className="text-sm text-foreground">{account.priority}</TableCell>
                <TableCell className="text-sm text-foreground">{account.title}</TableCell>
                <TableCell className="text-sm text-foreground">{account.leverage}</TableCell>
                <TableCell>
                  {account.branches !== "N/A" ? (
                    <Badge variant="outline" className="bg-muted text-muted-foreground">
                      {account.branches}
                    </Badge>
                  ) : (
                    <span className="text-sm text-muted-foreground">N/A</span>
                  )}
                </TableCell>
                <TableCell className="text-sm">
                  {account.accountCategory && (
                    <span className="text-foreground">{account.accountCategory}</span>
                  )}
                  {account.countriesTags && (
                    <div className="text-xs text-muted-foreground">
                      <div>Countries: {account.countriesTags.countries}</div>
                      <div>Tags: {account.countriesTags.tags}</div>
                    </div>
                  )}
                  {account.ibRebateRules && (
                    <div className="text-xs text-muted-foreground">
                      IB Rebate Rules: {account.ibRebateRules}
                    </div>
                  )}
                </TableCell>
                <TableCell>
                  <Badge className={`${account.badgeColor} text-white border-0`}>
                    {account.badge}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge className="bg-emerald-500 text-white border-0">
                    {account.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
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
            ))}
          </TableBody>
        </Table>
        <div className="px-4 py-3 border-t border-border text-sm text-muted-foreground">
          Showing 1 to {mockAccountTypes.length} of {mockAccountTypes.length} results
        </div>
      </div>
    </div>
  );
}
