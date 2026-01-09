import { useNavigate, useLocation } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Plus, ChevronDown, ChevronLeft, ChevronRight, Eye } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const withdrawTabs = [
  { id: "add", label: "Add Withdraw", path: "/withdraw/add" },
  { id: "pending", label: "Pending Withdraws", path: "/withdraw/pending" },
  { id: "history", label: "Withdraw History", path: "/withdraw/history" },
];

const pendingWithdraws = [
  { id: 1, date: "Sep 23, 2025 11:28", user: "Racheal R", email: "rachealjameel@gmail.com", detail: "Withdraw With Bank Transfer - PKR-PKR", transactionId: "TRXPKQFWTTPFJ", account: "3394695823", amount: "-10 USD", charge: "1 USD", gateway: "Bank Transfer - PKR", status: "Pending" },
  { id: 2, date: "Sep 15, 2025 02:26", user: "Sufyan Aslam", email: "sufyanhashmi931@gmail.com", detail: "Withdraw With Test-1", transactionId: "TRX3HYLDZ5MFG", account: "5267185332", amount: "-20 USD", charge: "1 USD", gateway: "Bank Transfer - PKR", status: "Pending" },
  { id: 3, date: "Sep 09, 2025 09:56", user: "Sufyan Aslam", email: "sufyanhashmi931@gmail.com", detail: "Withdraw With Bank Transfer - PKR-PKR", transactionId: "TRXNT7S9SEAOS", account: "5267185332", amount: "-20 USD", charge: "1 USD", gateway: "Bank Transfer - PKR", status: "Pending" },
];

export default function PendingWithdraws() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const getActiveTab = () => {
    if (location.pathname.includes('/add')) return "add";
    if (location.pathname.includes('/pending')) return "pending";
    if (location.pathname.includes('/history')) return "history";
    return "pending";
  };
  
  const activeTab = getActiveTab();
  const getTabTitle = (tabId: string) => withdrawTabs.find(t => t.id === tabId)?.label || "Pending Withdraws";

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold text-foreground">{getTabTitle(activeTab)}</h1>
          <Button variant="outline" className="border-border text-foreground hover:bg-muted">
            <Plus className="h-4 w-4 mr-2" />Add Withdraw
          </Button>
        </div>

        {/* Tabs */}
        <div className="bg-card rounded-xl border border-border p-4 mb-6">
          <div className="flex items-center gap-2 flex-wrap">
            {withdrawTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => navigate(tab.path)}
                className={cn(
              "px-4 py-2 border rounded-md transition-colors text-sm font-medium",
              activeTab === tab.id && "bg-primary text-primary-foreground"
            )}
              >
                {tab.label}
              </button>
            ))}
            <button className="px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground flex items-center gap-1 ml-auto">
              More <ChevronDown className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left py-4 px-4 text-xs font-semibold text-muted-foreground uppercase">Date</th>
                  <th className="text-left py-4 px-4 text-xs font-semibold text-muted-foreground uppercase">User</th>
                  <th className="text-left py-4 px-4 text-xs font-semibold text-muted-foreground uppercase">Detail</th>
                  <th className="text-left py-4 px-4 text-xs font-semibold text-muted-foreground uppercase">Transaction ID</th>
                  <th className="text-left py-4 px-4 text-xs font-semibold text-muted-foreground uppercase">Account</th>
                  <th className="text-left py-4 px-4 text-xs font-semibold text-muted-foreground uppercase">Amount</th>
                  <th className="text-left py-4 px-4 text-xs font-semibold text-muted-foreground uppercase">Charge</th>
                  <th className="text-left py-4 px-4 text-xs font-semibold text-muted-foreground uppercase">Gateway</th>
                  <th className="text-left py-4 px-4 text-xs font-semibold text-muted-foreground uppercase">Status</th>
                  <th className="text-left py-4 px-4 text-xs font-semibold text-muted-foreground uppercase">Action</th>
                </tr>
              </thead>
              <tbody>
                {pendingWithdraws.length === 0 ? (
                  <tr>
                    <td colSpan={10} className="py-16 text-center text-muted-foreground">No Data Available in Table</td>
                  </tr>
                ) : (
                  pendingWithdraws.map((withdraw) => (
                    <tr key={withdraw.id} className="border-b border-border/50 hover:bg-muted/30">
                      <td className="py-4 px-4 text-sm text-muted-foreground">{withdraw.date}</td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-9 w-9">
                            <AvatarFallback className="bg-primary/20 text-primary text-sm font-medium">
                              {withdraw.user.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium text-foreground">{withdraw.user}</p>
                            <p className="text-xs text-muted-foreground">{withdraw.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-sm text-muted-foreground">{withdraw.detail}</td>
                      <td className="py-4 px-4 text-sm text-foreground">{withdraw.transactionId}</td>
                      <td className="py-4 px-4 text-sm text-foreground">{withdraw.account}</td>
                      <td className="py-4 px-4 text-sm text-red-600 dark:text-red-400">{withdraw.amount}</td>
                      <td className="py-4 px-4 text-sm text-foreground">{withdraw.charge}</td>
                      <td className="py-4 px-4 text-sm text-muted-foreground">{withdraw.gateway}</td>
                      <td className="py-4 px-4">
                        <span className="px-2 py-1 rounded text-xs font-medium bg-yellow-500/20 text-yellow-600 dark:text-yellow-400">
                          {withdraw.status}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <button className="p-1 hover:bg-muted rounded">
                          <Eye className="h-4 w-4 text-muted-foreground" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-between px-4 py-4 border-t border-border">
            <p className="text-sm text-muted-foreground">Showing 1 to {pendingWithdraws.length} of {pendingWithdraws.length} entries</p>
            <div className="flex items-center gap-2">
              <button className="p-2 rounded-lg border border-border hover:bg-muted disabled:opacity-50" disabled>
                <ChevronLeft className="h-4 w-4 text-muted-foreground" />
              </button>
              <button className="h-8 w-8 rounded-lg bg-muted text-foreground text-sm font-medium">1</button>
              <button className="p-2 rounded-lg border border-border hover:bg-muted disabled:opacity-50" disabled>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}