import React from "react";
import { UserDashboardLayout } from "@/components/layout/UserDashboardLayout";
import { VerifyBanner } from "@/components/userdashboard/VerifyBanner";
import { ArrowDownToLine } from "lucide-react";
import { SelectField } from "@/components/form/SelectField";

const TransactionHistory = () => {
  return (
 
    <div className="p-6 bg-card rounded-xl border border-border space-y-6">

      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-foreground">Transaction History</h3>
        <div className="flex gap-2">
          <SelectField
            
            options={[{ label: "Select Days", value: "select-days" }]}
            placeholder="Select Days"
          />
          <SelectField
            
            options={[{ label: "All transaction types", value: "all-transaction-types" }]}
            placeholder="All transaction types"
          />
          <SelectField
            
            options={[{ label: "All statuses", value: "all-statuses" }]}
            placeholder="All statuses"
          />
          <SelectField
            
            options={[{ label: "All accounts", value: "all-accounts" }]}
            placeholder="All accounts"
          />
          <button className="border rounded-md px-3 py-2 text-sm bg-primary text-primary-foreground">Export</button>
        </div>
      </div>

       <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Description</th>
              <th className="text-left py-3 px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Transactions ID</th>
              <th className="text-left py-3 px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Account</th>
              <th className="text-left py-3 px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Amount</th>
              <th className="text-left py-3 px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Gateway</th>
              <th className="text-left py-3 px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Fee</th>
              <th className="text-left py-3 px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border/50 hover:bg-muted/30 transition-colors">
              {/* Description with icon and date */}
              <td className="py-4 px-2">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center rounded-full bg-muted h-10 w-10">
                    <ArrowDownToLine className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground text-sm">Deposit With Bank Transfer - AED By Admin</div>
                    <div className="text-xs text-muted-foreground">Nov 18, 2025 12:52</div>
                  </div>
                </div>
              </td>
              <td className="py-4 px-2 text-foreground text-sm">TRXHCSTRCLHRI</td>
              <td className="py-4 px-2 text-foreground text-sm">8651346183</td>
              <td className="py-4 px-2 font-semibold text-green text-sm">+5000 USD</td>
              <td className="py-4 px-2 text-foreground text-sm">BAEDF</td>
              <td className="py-4 px-2 text-foreground text-sm">0 USD</td>
              <td className="py-4 px-2">
                <span className="bg-yellow-200 text-yellow-800 text-xs font-medium px-3 py-1 rounded">Pending</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
 
  );
};

export default TransactionHistory;