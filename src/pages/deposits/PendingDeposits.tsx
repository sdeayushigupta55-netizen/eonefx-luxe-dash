import { useNavigate, useLocation } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Eye, Plus, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const depositTabs = [
  { id: "add", label: "Add Deposit", path: "/deposits/add" },
  { id: "pending", label: "Manual Pending Deposit", path: "/deposits/pending" },
  { id: "history", label: "Deposit History", path: "/deposits/history" },
];

const pendingDeposits = [
  { id: 1, date: "Dec 04, 2025 01:06", user: "Test New", email: "richirj43743@gmail.com", detail: "Deposit With Bank Transfer - PKR", transactionId: "TRXISUZ4CINXJ", account: "878816", amount: "+10 USD", charge: "0 USD", gateway: "Bank-PKR", actionBy: "", status: "Pending", avatar: "R", avatarColor: "bg-red-500" },
  { id: 2, date: "Nov 18, 2025 12:52", user: "Aieman Basit", email: "aimanbasit0416@gmail.com", detail: "Deposit With Bank Transfer - AED By Admin", transactionId: "TRXHCSTRCLHRI", account: "8651346183", amount: "+5000 USD", charge: "0 USD", gateway: "BAEDF", actionBy: "", status: "Pending", avatar: "A", avatarColor: "bg-amber-600" },
  { id: 3, date: "Oct 22, 2025 01:37", user: "User Brokeret", email: "user@brokeret.com", detail: "Deposit With Bank Transfer - PKR", transactionId: "TRX5NPXCGEEVB", account: "3667856591", amount: "+20 USD", charge: "0 USD", gateway: "Bank-PKR", actionBy: "", status: "Pending", avatar: "U", avatarColor: "bg-amber-500" },
  { id: 4, date: "Oct 09, 2025 05:50", user: "Racheal R", email: "rachealjameel@gmail.com", detail: "Deposit With Bank Transfer - PKR", transactionId: "TRXPSZHYZVM1P", account: "3394695823", amount: "+10 USD", charge: "0 USD", gateway: "Bank-PKR", actionBy: "", status: "Pending", avatar: "R", avatarColor: "bg-amber-500" },
  { id: 5, date: "Sep 21, 2025 11:25", user: "User Brokeret", email: "user@brokeret.com", detail: "Deposit With Bank Transfer - PKR", transactionId: "TRX1GJ3ZQKX3L", account: "3667856591", amount: "+50 USD", charge: "0 USD", gateway: "Bank-PKR", actionBy: "", status: "Pending", avatar: "U", avatarColor: "bg-amber-500" },
];

export default function PendingDeposits() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const getActiveTab = () => {
    if (location.pathname.includes('/add')) return "add";
    if (location.pathname.includes('/pending')) return "pending";
    if (location.pathname.includes('/history')) return "history";
    return "pending";
  };
  
  const activeTab = getActiveTab();

  return (
    <DashboardLayout>
      <div className="p-6">
        {/* Page Title */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-semibold text-foreground">Pending Manual Deposit</h1>
          <Button variant="outline" className="bg-card hover:bg-muted text-foreground border border-border">
            <Plus className="h-4 w-4 mr-2" />Add Deposit
          </Button>
        </div>

        {/* Tabs - Customers style */}
        <div className="bg-card rounded-xl border border-border p-4 mb-6">
          <div className="flex items-center gap-2 flex-wrap">
            {depositTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => navigate(tab.path)}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-all",
                  activeTab === tab.id
                    ? "bg-muted text-foreground border border-border"
                    : "text-muted-foreground hover:bg-muted/50 hover:text-foreground border border-transparent"
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
                  <th className="text-left py-4 px-4 text-xs font-semibold text-muted-foreground uppercase">Action By</th>
                  <th className="text-left py-4 px-4 text-xs font-semibold text-muted-foreground uppercase">Status</th>
                  <th className="text-left py-4 px-4 text-xs font-semibold text-muted-foreground uppercase">Action</th>
                </tr>
              </thead>
              <tbody>
                {pendingDeposits.map((deposit) => (
                  <tr key={deposit.id} className="border-b border-border/50 hover:bg-muted/30">
                    <td className="py-4 px-4 text-sm text-muted-foreground whitespace-nowrap">{deposit.date}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarFallback className={`text-white text-sm font-medium ${deposit.avatarColor}`}>
                            {deposit.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium text-foreground">{deposit.user}</p>
                          <p className="text-xs text-muted-foreground">{deposit.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-sm text-muted-foreground max-w-[150px]">{deposit.detail}</td>
                    <td className="py-4 px-4 text-sm text-foreground font-mono">{deposit.transactionId}</td>
                    <td className="py-4 px-4 text-sm text-foreground">{deposit.account}</td>
                    <td className="py-4 px-4 text-sm text-emerald-500 font-medium">{deposit.amount}</td>
                    <td className="py-4 px-4 text-sm text-foreground">{deposit.charge}</td>
                    <td className="py-4 px-4 text-sm text-muted-foreground">{deposit.gateway}</td>
                    <td className="py-4 px-4 text-sm text-muted-foreground">{deposit.actionBy || "-"}</td>
                    <td className="py-4 px-4">
                      <span className="px-2 py-1 rounded text-xs font-medium bg-yellow-500/20 text-yellow-600 dark:text-yellow-400">
                        {deposit.status}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <button className="p-1 hover:bg-muted rounded">
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}