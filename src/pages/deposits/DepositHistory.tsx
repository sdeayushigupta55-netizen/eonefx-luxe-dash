import { useNavigate, useLocation } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Eye, Plus, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const depositTabs = [
  { id: "add", label: "Add Deposit", path: "/deposits/add" },
  { id: "pending", label: "Manual Pending Deposit", path: "/deposits/pending" },
  { id: "history", label: "Deposit History", path: "/deposits/history" },
];

const depositHistory = [
  { id: 1, date: "Dec 17, 2025 11:27", user: "Test New", email: "richirj43743@gmail.com", detail: "Deposit With Bank Transfer - PKR", transactionId: "TRXNK7NJCGD5F", account: "878859", amount: "+10 USD", charge: "0 USD", gateway: "Bank-PKR", actionBy: "Super Admin", status: "Cancelled", avatar: "R", avatarColor: "bg-red-500" },
  { id: 2, date: "Dec 09, 2025 09:45", user: "Sufyan Aslam", email: "sufyanhashmi931@gmail.com", detail: "Deposit With Bank Transfer - PKR", transactionId: "TRXSUQSUYH444", account: "5267185332", amount: "+20 USD", charge: "0 USD", gateway: "Bank-PKR", actionBy: "Super Admin", status: "Cancelled", avatar: "S", avatarColor: "bg-amber-500" },
  { id: 3, date: "Dec 09, 2025 09:42", user: "Sufyan Aslam", email: "sufyanhashmi931@gmail.com", detail: "Deposit With Bank Transfer - PKR", transactionId: "TRXQAKQBJZZ6R", account: "5267185332", amount: "+100 USD", charge: "0 USD", gateway: "Bank-PKR", actionBy: "Super Admin", status: "Success", avatar: "S", avatarColor: "bg-amber-500" },
  { id: 4, date: "Dec 04, 2025 01:06", user: "Test New", email: "richirj43743@gmail.com", detail: "Deposit With Bank Transfer - PKR", transactionId: "TRXISUZ4CINXJ", account: "878816", amount: "+10 USD", charge: "0 USD", gateway: "Bank-PKR", actionBy: "", status: "Pending", avatar: "R", avatarColor: "bg-red-500" },
  { id: 5, date: "Dec 04, 2025 12:56", user: "Test New", email: "richirj43743@gmail.com", detail: "Deposit With Bank Transfer - PKR By Admin", transactionId: "TRXWYWRSZ76ND", account: "878816", amount: "+10 USD", charge: "0 USD", gateway: "Bank-PKR", actionBy: "Super Admin", status: "Success", avatar: "R", avatarColor: "bg-red-500" },
  { id: 6, date: "Nov 28, 2025 10:59", user: "Sufyan Aslam", email: "sufyanhashmi931@gmail.com", detail: "Deposit With Bank Transfer - PKR-2", transactionId: "TRXOKFYUNKPDC", account: "5267185332", amount: "+201 USD", charge: "0 USD", gateway: "Pkr-2", actionBy: "Super Admin", status: "Success", avatar: "S", avatarColor: "bg-amber-500" },
  { id: 7, date: "Nov 20, 2025 11:38", user: "Naeem Ali", email: "naeemail2020@gmail.com", detail: "Deposit With Stripe - USD", transactionId: "TRXQTM2AB8GQU", account: "9026405965", amount: "+100 USD", charge: "1 USD", gateway: "Stripe-Usd", actionBy: "", status: "Expired", avatar: "N", avatarColor: "bg-amber-600" },
  { id: 8, date: "Nov 20, 2025 11:31", user: "Naeem Ali", email: "naeemail2020@gmail.com", detail: "Deposit With USDT", transactionId: "Ca6ea8a0-A328-4251-94ec-Ded534f48a3f", account: "9026405965", amount: "+100 USD", charge: "0 USD", gateway: "Match2pay-Usx", actionBy: "", status: "Cancelled", avatar: "N", avatarColor: "bg-amber-600" },
  { id: 9, date: "Nov 20, 2025 11:29", user: "Naeem Ali", email: "naeemail2020@gmail.com", detail: "Deposit With Nowpayments", transactionId: "TRXHBOZPZKPMG", account: "9026405965", amount: "+100 USD", charge: "0 USD", gateway: "Nowpayments-Usdt", actionBy: "", status: "Expired", avatar: "N", avatarColor: "bg-amber-600" },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "Success": return "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400";
    case "Pending": return "bg-yellow-500/20 text-yellow-600 dark:text-yellow-400";
    case "Cancelled": return "bg-red-500/20 text-red-600 dark:text-red-400";
    case "Expired": return "bg-red-500/20 text-red-600 dark:text-red-400";
    default: return "bg-muted text-muted-foreground";
  }
};

export default function DepositHistory() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const getActiveTab = () => {
    if (location.pathname.includes('/add')) return "add";
    if (location.pathname.includes('/pending')) return "pending";
    if (location.pathname.includes('/history')) return "history";
    return "history";
  };
  
  const activeTab = getActiveTab();

  return (
    <DashboardLayout>
      <div className="p-6">
        {/* Page Title */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-semibold text-foreground">Deposit History</h1>
          <Button>
            <Plus className="h-4 w-4" />Add Deposit
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
                  <th className="text-left py-4 px-4 text-xs font-semibold text-muted-foreground uppercase">Gateway</th>
                  <th className="text-left py-4 px-4 text-xs font-semibold text-muted-foreground uppercase">Charge</th>
                  <th className="text-left py-4 px-4 text-xs font-semibold text-muted-foreground uppercase">Action By</th>
                  <th className="text-left py-4 px-4 text-xs font-semibold text-muted-foreground uppercase">Status</th>
                  <th className="text-left py-4 px-4 text-xs font-semibold text-muted-foreground uppercase">Action</th>
                </tr>
              </thead>
              <tbody>
                {depositHistory.map((deposit) => (
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
                    <td className="py-4 px-4 text-sm text-muted-foreground max-w-[180px]">{deposit.detail}</td>
                    <td className="py-4 px-4 text-sm text-foreground font-mono">{deposit.transactionId}</td>
                    <td className="py-4 px-4 text-sm text-foreground">{deposit.account}</td>
                    <td className="py-4 px-4 text-sm text-emerald-500 font-medium">{deposit.amount}</td>
                    <td className="py-4 px-4 text-sm text-muted-foreground">{deposit.gateway}</td>
                    <td className="py-4 px-4 text-sm text-foreground">{deposit.charge}</td>
                    <td className="py-4 px-4 text-sm text-muted-foreground">{deposit.actionBy || "-"}</td>
                    <td className="py-4 px-4">
                      <span className={cn("px-2 py-1 rounded text-xs font-medium", getStatusColor(deposit.status))}>
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
          
          {/* Pagination */}
          <div className="flex items-center justify-between px-4 py-4 border-t border-border">
            <p className="text-sm text-muted-foreground">Showing 1 to {depositHistory.length} of {depositHistory.length} entries</p>
            <div className="flex items-center gap-2">
              <button className="p-2 rounded-lg border border-border hover:bg-muted disabled:opacity-50" disabled>
                <ChevronLeft className="h-4 w-4 text-muted-foreground" />
              </button>
              <button className="h-8 w-8 rounded-lg bg-primary text-primary-foreground text-sm font-medium">1</button>
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