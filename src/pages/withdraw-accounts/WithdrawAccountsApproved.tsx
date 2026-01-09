import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ChevronDown, ChevronLeft, ChevronRight, ExternalLink, Building2, Plus } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const withdrawAccountsTabs = [
  { id: "pending", label: "Pending Accounts", path: "/withdraw-accounts/pending" },
  { id: "approved", label: "Approved Accounts", path: "/withdraw-accounts/approved" },
  { id: "rejected", label: "Rejected Accounts", path: "/withdraw-accounts/rejected" },
];

interface WithdrawAccount {
  id: string;
  date: string;
  user: { name: string; email: string; avatar: string };
  method: { name: string; currency: string };
  status: "Pending" | "Approved" | "Rejected";
  bankName?: string;
  accountNumber?: string;
}

const approvedAccounts: WithdrawAccount[] = [
  {
    id: "1",
    date: "2025-12-17 11:47:17",
    user: { name: "Test New", email: "richirj43743@gmail.com", avatar: "R" },
    method: { name: "Bank Transfer - PKR-PKR", currency: "PKR" },
    status: "Approved",
    bankName: "meezan",
    accountNumber: "MEZ-12332423",
  },
  {
    id: "2",
    date: "2025-12-17 11:46:55",
    user: { name: "Test New", email: "richirj43743@gmail.com", avatar: "R" },
    method: { name: "Bank Transfer - PKR-PKR", currency: "PKR" },
    status: "Approved",
    bankName: "meezan",
    accountNumber: "MEZ-12332423",
  },
  {
    id: "3",
    date: "2025-09-23 23:21:52",
    user: { name: "Racheal R", email: "rachealjameel@gmail.com", avatar: "R" },
    method: { name: "Bank Transfer - PKR-PKR", currency: "PKR" },
    status: "Approved",
    bankName: "test",
    accountNumber: "MEZ-12332423",
  },
  {
    id: "4",
    date: "2025-09-15 23:14:22",
    user: { name: "Sufyan Aslam", email: "sufyanhashmi931@gmail.com", avatar: "S" },
    method: { name: "Test-2", currency: "PKR" },
    status: "Approved",
    bankName: "test",
    accountNumber: "MEZ-12332423",
  },
  {
    id: "5",
    date: "2025-09-09 10:06:00",
    user: { name: "Sufyan Aslam", email: "sufyanhashmi931@gmail.com", avatar: "S" },
    method: { name: "Test-1", currency: "PKR" },
    status: "Approved",
    bankName: "test",
    accountNumber: "MEZ-12332423",
  },
  {
    id: "6",
    date: "2025-07-05 11:47:49",
    user: { name: "Mikhail Prescott", email: "prescottmikhail@gmail.com", avatar: "M" },
    method: { name: "Bank Transfer - PKR-PKR", currency: "PKR" },
    status: "Approved",
    bankName: "meezan",
    accountNumber: "MEZ-12332423",
  },
  {
    id: "7",
    date: "2025-05-14 12:58:53",
    user: { name: "User Brokeret", email: "user@brokeret.com", avatar: "U" },
    method: { name: "Bank Transfer - PKR-PKR", currency: "PKR" },
    status: "Approved",
    bankName: "meezan",
    accountNumber: "MEZ-12332423",
  },
];

const WithdrawAccountsApproved = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedAccount, setSelectedAccount] = useState<WithdrawAccount | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getActiveTab = () => {
    if (location.pathname.includes("approved")) return "approved";
    if (location.pathname.includes("rejected")) return "rejected";
    return "pending";
  };

  const activeTab = getActiveTab();

  const getPageTitle = () => {
    switch (activeTab) {
      case "approved": return "Approved Withdraw Accounts";
      case "rejected": return "Rejected Withdraw Accounts";
      default: return "Pending Withdraw Accounts";
    }
  };

  const handleViewAction = (account: WithdrawAccount) => {
    setSelectedAccount(account);
    setIsModalOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved": return "bg-green-500/20 text-green-400 border border-green-500/30";
      case "Pending": return "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30";
      case "Rejected": return "bg-red-500/20 text-red-400 border border-red-500/30";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6">
        {/* Header Row with Title and Add Button */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold text-foreground">{getPageTitle()}</h1>
          <Button className="bg-card hover:bg-muted text-foreground border border-border">
            <Plus className="h-4 w-4 mr-2" />Add Withdraw Account
          </Button>
        </div>

        {/* Tabs Card */}
        <div className="bg-card rounded-xl border border-border p-4 mb-6">
          <div className="flex items-center gap-2 flex-wrap">
            {withdrawAccountsTabs.map((tab) => (
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

        {/* Table Card */}
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="text-muted-foreground font-medium">DATE</TableHead>
                <TableHead className="text-muted-foreground font-medium">USER</TableHead>
                <TableHead className="text-muted-foreground font-medium">METHOD</TableHead>
                <TableHead className="text-muted-foreground font-medium">STATUS</TableHead>
                <TableHead className="text-muted-foreground font-medium">ACTION</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {approvedAccounts.length === 0 ? (
                <TableRow className="border-border">
                  <TableCell colSpan={5} className="text-center py-12 text-muted-foreground">
                    No Data Available In Table
                  </TableCell>
                </TableRow>
              ) : (
                approvedAccounts.map((account) => (
                  <TableRow key={account.id} className="border-border hover:bg-muted/30">
                    <TableCell className="text-foreground">{account.date}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-yellow-500/20 flex items-center justify-center text-yellow-500 font-medium">
                          {account.user.avatar}
                        </div>
                        <div>
                          <div className="text-foreground font-medium">{account.user.name}</div>
                          <div className="text-muted-foreground text-sm">{account.user.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <div className="text-foreground">{account.method.name}</div>
                          <div className="text-muted-foreground text-sm">{account.method.currency}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className={cn("px-2 py-1 rounded text-xs font-medium", getStatusColor(account.status))}>
                        {account.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <button
                        onClick={() => handleViewAction(account)}
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>

          {/* Pagination */}
          <div className="flex items-center justify-between px-4 py-3 border-t border-border">
            <span className="text-sm text-muted-foreground">
              Showing 1 to {approvedAccounts.length} of {approvedAccounts.length} entries
            </span>
            <div className="flex items-center gap-2">
              <button className="p-1 rounded hover:bg-muted text-muted-foreground">
                <ChevronLeft className="h-4 w-4" />
              </button>
              <span className="px-3 py-1 bg-primary text-primary-foreground rounded text-sm">1</span>
              <button className="p-1 rounded hover:bg-muted text-muted-foreground">
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Action Modal */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="bg-card border-border max-w-md">
            <DialogHeader>
              <DialogTitle className="text-foreground">Withdraw Account Action</DialogTitle>
            </DialogHeader>
            {selectedAccount && (
              <div className="space-y-4">
                <div className="space-y-3 border-b border-border pb-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">User:</span>
                    <span className="text-foreground">{selectedAccount.user.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Email:</span>
                    <span className="text-foreground">{selectedAccount.user.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Created At:</span>
                    <span className="text-foreground">{selectedAccount.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Method Name:</span>
                    <span className="text-foreground">{selectedAccount.method.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Currency:</span>
                    <span className="text-foreground">{selectedAccount.method.currency}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Current Status:</span>
                    <span className={cn("px-2 py-1 rounded text-xs font-medium", getStatusColor(selectedAccount.status))}>
                      {selectedAccount.status}
                    </span>
                  </div>
                </div>
                <div className="space-y-3 border-b border-border pb-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Bank Name:</span>
                    <span className="text-foreground">{selectedAccount.bankName || "N/A"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Account Number:</span>
                    <span className="text-foreground">{selectedAccount.accountNumber || "N/A"}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-foreground">Comments</label>
                  <Select>
                    <SelectTrigger className="bg-background border-border text-foreground">
                      <SelectValue placeholder="Select a comment" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="approved">Account approved</SelectItem>
                      <SelectItem value="rejected">Account rejected</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    Choosing a title will prefill the description. You can edit it before submit.
                  </p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-foreground">
                    Description: <span className="text-muted-foreground">(Optional)</span>
                  </label>
                  <Textarea
                    placeholder="Enter any comments or notes about this action..."
                    className="bg-background border-border text-foreground min-h-[80px]"
                  />
                </div>
                <div className="flex gap-3 pt-2">
                  <Button className="flex-1 bg-green-600 hover:bg-green-700 text-white">
                    ✓ Approved
                  </Button>
                  <Button className="flex-1 bg-red-600 hover:bg-red-700 text-white">
                    ✕ Reject
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default WithdrawAccountsApproved;