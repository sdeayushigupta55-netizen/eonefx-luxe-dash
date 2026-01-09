import { useNavigate, useLocation } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Plus, ChevronDown, Eye } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

const withdrawTabs = [
  { id: "add", label: "Add Withdraw", path: "/withdraw/add" },
  { id: "pending", label: "Pending Withdraws", path: "/withdraw/pending" },
  { id: "history", label: "Withdraw History", path: "/withdraw/history" },
];

const recentTransactions = [
  { id: 1, date: "Dec 17, 2025 11:49", user: "Racheal R", email: "rachealjameel@gmail.com", transactionId: "TRXORBMIOOMKI", account: "3394695823", amount: "-10 USD", charge: "1 USD", gateway: "Bank Transfer - PKR", status: "Cancelled" },
  { id: 2, date: "Sep 23, 2025 11:28", user: "Racheal R", email: "rachealjameel@gmail.com", transactionId: "TRXPKQFWTTPFJ", account: "3394695823", amount: "-10 USD", charge: "1 USD", gateway: "Bank Transfer - PKR", status: "Pending" },
  { id: 3, date: "Sep 15, 2025 02:26", user: "Sufyan Aslam", email: "sufyanhashmi931@gmail.com", transactionId: "TRX3HYLDZ5MFG", account: "5267185332", amount: "-20 USD", charge: "1 USD", gateway: "Bank Transfer - PKR", status: "Pending" },
  { id: 4, date: "Sep 09, 2025 09:56", user: "Sufyan Aslam", email: "sufyanhashmi931@gmail.com", transactionId: "TRXNT7S9SEAOS", account: "5267185332", amount: "-20 USD", charge: "1 USD", gateway: "Bank Transfer - PKR", status: "Pending" },
  { id: 5, date: "Sep 04, 2025 06:42", user: "Sufyan Aslam", email: "sufyanhashmi931@gmail.com", transactionId: "TRXLOXPVOVMAY", account: "5267185332", amount: "-20 USD", charge: "1 USD", gateway: "Bank Transfer - PKR", status: "Cancelled" },
  { id: 6, date: "Aug 29, 2025 11:23", user: "Sufyan Aslam", email: "sufyanhashmi931@gmail.com", transactionId: "TRX9S22KTCGQ2", account: "874641", amount: "-20 USD", charge: "1 USD", gateway: "Bank Transfer - PKR", status: "Success" },
  { id: 7, date: "Aug 29, 2025 11:11", user: "Sufyan Aslam", email: "sufyanhashmi931@gmail.com", transactionId: "TRXRX2ODCJTKF", account: "874641", amount: "-11 USD", charge: "1 USD", gateway: "Bank Transfer - PKR", status: "Success" },
  { id: 8, date: "Aug 29, 2025 11:07", user: "Sufyan Aslam", email: "sufyanhashmi931@gmail.com", transactionId: "TRX4DEJNY7BTJ", account: "874641", amount: "-20 USD", charge: "1 USD", gateway: "Bank Transfer - PKR", status: "Cancelled" },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "Success": return "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400";
    case "Pending": return "bg-yellow-500/20 text-yellow-600 dark:text-yellow-400";
    case "Cancelled": return "bg-red-500/20 text-red-600 dark:text-red-400";
    default: return "bg-muted text-muted-foreground";
  }
};

export default function AddWithdraw() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const getActiveTab = () => {
    if (location.pathname.includes('/add')) return "add";
    if (location.pathname.includes('/pending')) return "pending";
    if (location.pathname.includes('/history')) return "history";
    return "add";
  };
  
  const activeTab = getActiveTab();
  const getTabTitle = (tabId: string) => withdrawTabs.find(t => t.id === tabId)?.label || "Add Withdraw";

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold text-foreground">{getTabTitle(activeTab)}</h1>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />Add Withdraw
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

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Add Withdraw Form */}
          <div className="bg-card rounded-xl border border-border p-6">
            <h2 className="text-lg font-semibold text-foreground mb-6">Add Withdraw</h2>
            
            <div className="space-y-4">
              <div>
                <Label className="text-muted-foreground text-sm mb-2 block">User</Label>
                <Select>
                  <SelectTrigger className="bg-muted border-border text-foreground">
                    <SelectValue placeholder="Select User" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="user1">Racheal R</SelectItem>
                    <SelectItem value="user2">Sufyan Aslam</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-muted-foreground text-sm mb-2 block">Account / Wallet</Label>
                <Select>
                  <SelectTrigger className="bg-muted border-border text-foreground">
                    <SelectValue placeholder="Select Account" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="account1">Account 1</SelectItem>
                    <SelectItem value="account2">Account 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-muted-foreground text-sm mb-2 block">Withdraw Account</Label>
                <Select>
                  <SelectTrigger className="bg-muted border-border text-foreground">
                    <SelectValue placeholder="Select Account" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="withdraw1">Bank Account 1</SelectItem>
                    <SelectItem value="withdraw2">Bank Account 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-muted-foreground text-sm mb-2 block">Amount</Label>
                <div className="relative">
                  <Input 
                    placeholder="Enter Amount" 
                    className="bg-muted border-border text-foreground pr-16"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">USD</span>
                </div>
              </div>

              <div>
                <Label className="text-muted-foreground text-sm mb-2 block">Comments</Label>
                <Textarea 
                  placeholder="Enter comments..." 
                  className="bg-muted border-border text-foreground min-h-[100px]"
                />
              </div>

              <div className="flex items-center gap-3">
                <Switch />
                <Label className="text-muted-foreground text-sm">Auto Approve</Label>
              </div>

              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground mt-4">
                Proceed To Payment
              </Button>
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <div className="p-4 border-b border-border">
              <h2 className="text-lg font-semibold text-foreground">Recent Transactions</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/50">
                    <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Date</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">User</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Amount</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Status</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {recentTransactions.map((tx) => (
                    <tr key={tx.id} className="border-b border-border/50 hover:bg-muted/30">
                      <td className="py-3 px-4 text-sm text-muted-foreground">{tx.date}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-7 w-7">
                            <AvatarFallback className="bg-primary/20 text-primary text-xs font-medium">
                              {tx.user.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm text-foreground">{tx.user}</p>
                            <p className="text-xs text-muted-foreground">{tx.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm text-red-600 dark:text-red-400">{tx.amount}</td>
                      <td className="py-3 px-4">
                        <span className={cn("px-2 py-1 rounded text-xs font-medium", getStatusColor(tx.status))}>
                          {tx.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
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
      </div>
    </DashboardLayout>
  );
}