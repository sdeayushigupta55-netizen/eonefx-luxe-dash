import { ChevronLeft, ChevronRight } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { CustomerActionsDropdown } from "./CustomerActionsDropdown";

export interface Customer {
  id: number;
  name: string;
  email: string;
  balance: number;
  equity: number;
  credit: number;
  country: string;
  branch: string;
  staff: string;
  kyc: string;
  joined: string;
  status: string;
}

interface CustomersTableProps {
  customers: Customer[];
}

export function CustomersTable({ customers }: CustomersTableProps) {
  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th className="text-left py-4 px-4 text-xs font-semibold text-muted-foreground uppercase">User</th>
              <th className="text-left py-4 px-4 text-xs font-semibold text-muted-foreground uppercase">Balance</th>
              <th className="text-left py-4 px-4 text-xs font-semibold text-muted-foreground uppercase">Equity</th>
              <th className="text-left py-4 px-4 text-xs font-semibold text-muted-foreground uppercase">Credit</th>
              <th className="text-left py-4 px-4 text-xs font-semibold text-muted-foreground uppercase">Country</th>
              <th className="text-left py-4 px-4 text-xs font-semibold text-muted-foreground uppercase">Branch</th>
              <th className="text-left py-4 px-4 text-xs font-semibold text-muted-foreground uppercase">Staff</th>
              <th className="text-left py-4 px-4 text-xs font-semibold text-muted-foreground uppercase">KYC</th>
              <th className="text-left py-4 px-4 text-xs font-semibold text-muted-foreground uppercase">Joined</th>
              <th className="text-left py-4 px-4 text-xs font-semibold text-muted-foreground uppercase">Status</th>
              <th className="text-left py-4 px-4 text-xs font-semibold text-muted-foreground uppercase">Action</th>
            </tr>
          </thead>
          <tbody>
            {customers.length === 0 ? (
              <tr>
                <td colSpan={11} className="py-16 text-center text-muted-foreground">No Data Available in Table</td>
              </tr>
            ) : (
              customers.map((customer) => (
                <tr key={customer.id} className="border-b border-border/50 hover:bg-muted/20">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarFallback className="bg-primary/20 text-primary text-sm font-medium">
                          {customer.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium text-foreground">{customer.name}</p>
                        <p className="text-xs text-muted-foreground">{customer.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-sm text-foreground">{customer.balance}</td>
                  <td className="py-4 px-4 text-sm text-foreground">{customer.equity}</td>
                  <td className="py-4 px-4 text-sm text-foreground">{customer.credit}</td>
                  <td className="py-4 px-4 text-sm text-foreground">{customer.country}</td>
                  <td className="py-4 px-4 text-sm text-muted-foreground">{customer.branch}</td>
                  <td className="py-4 px-4 text-sm text-muted-foreground">{customer.staff}</td>
                  <td className="py-4 px-4">
                    <span className={cn(
                      "px-2 py-1 rounded text-xs font-medium",
                      customer.kyc === "Verified" ? "bg-green-500/20 text-green-500" : "bg-orange-500/20 text-orange-400"
                    )}>
                      {customer.kyc}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-sm text-muted-foreground">{customer.joined}</td>
                  <td className="py-4 px-4">
                    <span className="px-2 py-1 rounded text-xs font-medium bg-green-500/20 text-green-500">{customer.status}</span>
                  </td>
                  <td className="py-4 px-4">
                    <CustomerActionsDropdown customer={customer} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between px-4 py-4 border-t border-border">
        <p className="text-sm text-muted-foreground">Showing {customers.length > 0 ? 1 : 0} to {customers.length} of {customers.length} entries</p>
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-lg border border-border hover:bg-muted disabled:opacity-50" disabled><ChevronLeft className="h-4 w-4 text-muted-foreground" /></button>
          {customers.length > 0 && <button className="h-8 w-8 rounded-lg bg-muted text-foreground text-sm font-medium">1</button>}
          <button className="p-2 rounded-lg border border-border hover:bg-muted disabled:opacity-50" disabled><ChevronRight className="h-4 w-4 text-muted-foreground" /></button>
        </div>
      </div>
    </div>
  );
}
