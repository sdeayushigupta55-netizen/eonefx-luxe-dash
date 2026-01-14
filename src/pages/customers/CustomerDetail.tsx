import { useState } from "react";
import { useParams, useNavigate, Routes, Route, Navigate, NavLink } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Plus, RefreshCw, Mail, Settings, User, Monitor, Users, DollarSign, Check, X, Info, UserPlus, Wallet, CreditCard, UserMinus, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import { mockCustomers } from "@/components/dashboard/customers/customersData";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { OverviewTab } from "./OverviewTab"
import AccountsTab from "./AccountTab"
import KYCTab from "./KYCTab";
import PartnerTab from "./PartnerTab";
import TransactionsTab from "./TransactionsTab";
import IBBonusTab from "./IBBonusTab";
import DirectReferralsTab from "./DirectReferralsTab "
import NetworkTab from "./NetworkTab";
import TicketTab from "./TicketTab";
import AddNoteTab from "./AddNoteTab";
import SecurityTab from "./SecurityTab";
import ActivitiesTab from "./ActivitiesTab";
const tabs = [
  "Overview", "Accounts", "KYC", "Partner", "Transactions", "IB Bonus",
  "Direct Referrals", "Network", "Ticket", "Add Note", "Security", "Activities"
];

export function CustomerDetail() {
  const { customerId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Overview");
  const [isTagModalOpen, setIsTagModalOpen] = useState(false);
  const [isMailModalOpen, setIsMailModalOpen] = useState(false);
  const [mailSubject, setMailSubject] = useState("");
  const [mailBody, setMailBody] = useState("");
  const [isBalanceModalOpen, setIsBalanceModalOpen] = useState(false);
  const [isBonusModalOpen, setIsBonusModalOpen] = useState(false);
  const [balanceType, setBalanceType] = useState<"add" | "subtract">("add");
  const [selectedAccount, setSelectedAccount] = useState("");


  const [amount, setAmount] = useState("");
  const [comment, setComment] = useState("");
 const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [adminKey, setAdminKey] = useState("");

  // Find customer from mock data
  const customer = mockCustomers.all.find(c => c.id === Number(customerId)) || {
    id: 1,
    name: "Aieman Basit",
    email: "aimanbasit0416@gmail.com",
    balance: 0,
    equity: 0,
    credit: 0,
    country: "Pakistan",
    branch: "N/A",
    staff: "N/A",
    kyc: "Unverified",
    joined: "Nov 13, 2025 01:37",
    status: "Active"
  };

  const [firstName, lastName] = customer.name.split(" ");

 

  return (
    <DashboardLayout>
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="outline"
            onClick={() => setIsTagModalOpen(true)}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Tag
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => navigate(-1)}>Go Back</Button>
            <Button variant="ghost" size="icon">
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Sidebar - Profile Card */}
          <div className="lg:col-span-1">
            <Card className="bg-card border-border overflow-hidden">
              {/* Red Header */}
              <div className="h-32 bg-gradient-to-r from-red-500 to-red-600 relative">
                <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
                  <Avatar className="h-24 w-24 border-4 border-card">
                    <AvatarFallback className="bg-primary/20 text-primary text-2xl font-bold">
                      {customer.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                </div>
              </div>

              <CardContent className="pt-16 pb-6">
                {/* Name & Country */}
                <div className="text-center mb-6">
                  <h2 className="text-xl font-bold text-foreground">{customer.name}</h2>
                  <p className="text-sm text-muted-foreground">{customer.country}</p>
                  <p className="text-xs text-muted-foreground mt-2">Member since: {customer.joined}</p>
                </div>

                {/* Quick Actions */}
                <div className="flex justify-center gap-2 mb-6">
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsMailModalOpen(true)}>
                    <Mail className="h-4 w-4" />
                  </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => navigate('/user/userdashboard', { state: { customerName: customer.name } })}>
                      <UserPlus className="h-4 w-4" />
                    </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsBalanceModalOpen(true)}>
                    <Wallet className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsBonusModalOpen(true)}>
                    <CreditCard className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8"  onClick={() => setIsDeleteModalOpen(true)}>
                    <UserMinus className="h-4 w-4" />
                  </Button>
                </div>
                {/* Send Mail Modal */}
                <Dialog open={isMailModalOpen} onOpenChange={setIsMailModalOpen}>
                  <DialogContent className="bg-card border-border max-w-lg">
                    <DialogHeader>
                      <DialogTitle className="text-foreground text-xl">
                        Send Mail To {customer.name}
                      </DialogTitle>
                    </DialogHeader>
                    <form
                      onSubmit={e => {
                        e.preventDefault();
                        // handle send mail logic here
                        setIsMailModalOpen(false);
                        setMailSubject("");
                        setMailBody("");
                      }}
                      className="space-y-6"
                    >
                      <div>
                        <label className="block text-base font-medium text-foreground mb-1">
                          Subject <span><Info className="inline h-4 w-4" /></span>
                        </label>
                        <Input
                          value={mailSubject}
                          onChange={e => setMailSubject(e.target.value)}
                          className="w-full"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-base font-medium text-foreground mb-1">
                          Email Details <span><Info className="inline h-4 w-4" /></span>
                        </label>
                        <Textarea
                          value={mailBody}
                          onChange={e => setMailBody(e.target.value)}
                          className="w-full min-h-[120px]"
                          required
                        />
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button
                          type="submit"

                        >
                          Send Email
                        </Button>
                        <Button
                          variant="destructive"
                          type="button"
                          onClick={() => setIsMailModalOpen(false)}
                        >
                          <X className="h-4 w-4 mr-2" />
                          Close
                        </Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
                {/* Balance Add/Subtract balance Modal */}
                <Dialog open={isBalanceModalOpen} onOpenChange={setIsBalanceModalOpen}>
                  <DialogContent className="bg-card border-border max-w-lg">
                    <DialogHeader>
                      <DialogTitle className="text-foreground text-xl">
                        Balance Add Or Subtract
                      </DialogTitle>
                      <div className="text-muted-foreground text-base mt-1">
                        Add or subtract balance from the user
                      </div>
                    </DialogHeader>
                    <div className="flex mb-6">
                      <Button
                        className={`flex-1 rounded-none rounded-l-lg ${balanceType === "add"
                          ? "bg-green text-white hover:bg-green hover:text-white"
                          : "bg-muted/20 text-foreground hover:bg-muted/20 hover:text-foreground"
                          }`}
                        onClick={() => setBalanceType("add")}
                      >
                        Add
                      </Button>
                      <Button
                        className={`flex-1 rounded-none rounded-r-lg ${balanceType === "subtract"
                          ? "bg-red-500 text-foreground hover:bg-red-500 hover:text-foreground"
                          : "bg-muted/20 text-foreground hover:bg-muted/20 hover:text-foreground"
                          }`}
                        onClick={() => setBalanceType("subtract")}
                      >
                        Subtract
                      </Button>
                    </div>
                    <form
                      onSubmit={e => {
                        e.preventDefault();
                        // handle balance logic here
                        setIsBalanceModalOpen(false);
                        setSelectedAccount("");
                        setAmount("");
                        setComment("");
                        setBalanceType("add");
                      }}
                      className="space-y-6"
                    >
                      <div>
                        <label className="block text-base font-medium text-foreground mb-1">
                          Select Account <span><Info className="inline h-4 w-4" /></span>
                        </label>
                        <Select value={selectedAccount} onValueChange={setSelectedAccount}>
                          <SelectTrigger className="w-full bg-background border-border">
                            <SelectValue placeholder="Select Account" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="account1">Account 1</SelectItem>
                            <SelectItem value="account2">Account 2</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="block text-base font-medium text-foreground mb-1">
                          Amount <span><Info className="inline h-4 w-4" /></span>
                        </label>
                        <div className="relative">
                          <Input
                            value={amount}
                            onChange={e => setAmount(e.target.value)}
                            className="w-full pr-14" // add right padding for the USD
                            required
                          />
                          <span className="absolute inset-y-0 right-3 flex items-center text-muted-foreground font-medium pointer-events-none">
                            USD
                          </span>
                        </div>
                      </div>
                      <div>
                        <label className="block text-base font-medium text-foreground mb-1">
                          Comment Message <span><Info className="inline h-4 w-4" /></span>
                        </label>
                        <Textarea
                          value={comment}
                          onChange={e => setComment(e.target.value)}
                          className="w-full min-h-[80px]"
                          placeholder="Comment Message"
                        />
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button type="submit">
                          ✓ Apply Now
                        </Button>
                        <Button
                          variant="destructive"
                          type="button"
                          onClick={() => setIsBalanceModalOpen(false)}
                        >
                          <X className="h-4 w-4 mr-2" />
                          Cancel
                        </Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
                {/* Balance Add/Subtract Modal bonus */}
                <Dialog open={isBonusModalOpen} onOpenChange={setIsBonusModalOpen}>
                  <DialogContent className="bg-card border-border max-w-lg">
                    <DialogHeader>
                      <DialogTitle className="text-foreground text-xl">
                        Balance Add Or Subtract
                      </DialogTitle>
                      <div className="text-muted-foreground text-base mt-1">
                        Add or subtract bonus from the user
                      </div>
                    </DialogHeader>
                    <div className="flex mb-6">
                      <Button
                        className={`flex-1 rounded-none rounded-l-lg ${balanceType === "add"
                          ? "bg-green text-white hover:bg-green hover:text-white"
                          : "bg-muted/20 text-foreground hover:bg-muted/20 hover:text-foreground"
                          }`}
                        onClick={() => setBalanceType("add")}
                      >
                        Add
                      </Button>
                      <Button
                        className={`flex-1 rounded-none rounded-r-lg ${balanceType === "subtract"
                          ? "bg-red-500 text-foreground hover:bg-red-500 hover:text-foreground"
                          : "bg-muted/20 text-foreground hover:bg-muted/20 hover:text-foreground"
                          }`}
                        onClick={() => setBalanceType("subtract")}
                      >
                        Subtract
                      </Button>
                    </div>
                    <form
                      onSubmit={e => {
                        e.preventDefault();
                        // handle balance logic here
                        setIsBalanceModalOpen(false);
                        setSelectedAccount("");
                        setAmount("");
                        setComment("");
                        setBalanceType("add");
                      }}
                      className="space-y-6"
                    >
                      <div>
                        <label className="block text-base font-medium text-foreground mb-1">
                          Select Account <span><Info className="inline h-4 w-4" /></span>
                        </label>
                        <Select value={selectedAccount} onValueChange={setSelectedAccount}>
                          <SelectTrigger className="w-full bg-background border-border">
                            <SelectValue placeholder="Select Account" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="account1">Account 1</SelectItem>
                            <SelectItem value="account2">Account 2</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="block text-base font-medium text-foreground mb-1">
                          Amount <span><Info className="inline h-4 w-4" /></span>
                        </label>
                        <div className="relative">
                          <Input
                            value={amount}
                            onChange={e => setAmount(e.target.value)}
                            className="w-full pr-14" // add right padding for the USD
                            required
                          />
                          <span className="absolute inset-y-0 right-3 flex items-center text-muted-foreground font-medium pointer-events-none">
                            USD
                          </span>
                        </div>
                      </div>
                      <div>
                        <label className="block text-base font-medium text-foreground mb-1">
                          Comment Message <span><Info className="inline h-4 w-4" /></span>
                        </label>
                        <Textarea
                          value={comment}
                          onChange={e => setComment(e.target.value)}
                          className="w-full min-h-[80px]"
                          placeholder="Comment Message"
                        />
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button type="submit">
                          ✓ Apply Now
                        </Button>
                        <Button
                          variant="destructive"
                          type="button"
                          onClick={() => setIsBalanceModalOpen(false)}
                        >
                          <X className="h-4 w-4 mr-2" />
                          Cancel
                        </Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
                 {/* Delete User Modal */}
        <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
          <DialogContent className="bg-card border-border max-w-md">
            <div className="flex flex-col items-center gap-2">
              <span className="rounded-full bg-red-100 p-4 mb-2">
                <AlertTriangle className="h-10 w-10 text-red-500" />
              </span>
              <DialogHeader>
                <DialogTitle className="text-2xl text-center text-foreground font-bold">
                  Are You Sure?
                </DialogTitle>
              </DialogHeader>
              <div className="text-center text-lg text-muted-foreground mb-2">
                Are you sure you want to delete this user?
              </div>
              <Input
                value={adminKey}
                onChange={e => setAdminKey(e.target.value)}
                placeholder="Enter Super-Admin Key"
                className="w-full text-center"
                required
              />
              <div className="text-xs text-muted-foreground mb-2"> This key is required for security purposes.
              </div>
              <div className="flex justify-center gap-2 w-full mt-2">
                <Button
                  
                  onClick={() => {
                    // handle delete logic here
                    setIsDeleteModalOpen(false);
                    setAdminKey("");
                  }}
                  disabled={!adminKey}
                >
                  ✓ Delete
                </Button>
                <Button
                  variant="destructive"
                 
                  onClick={() => setIsDeleteModalOpen(false)}
                >
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
                {/* Status Info */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Status:</span>
                    <Badge className="bg-green-500/20 text-green-500">{customer.status}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">KYC:</span>
                    <Badge className={cn(
                      customer.kyc === "Verified" ? "bg-green-500/20 text-green-500" : "bg-orange-500/20 text-orange-400"
                    )}>{customer.kyc}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">KYC Level:</span>
                    <span className="text-sm text-foreground">Level 1</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Branch:</span>
                    <span className="text-sm text-foreground">{customer.branch}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">IB Member:</span>
                    <span className="text-sm text-foreground">Pending</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Customer Group:</span>
                    <span className="text-sm text-foreground">N/A</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Risk Profile:</span>
                    <span className="text-sm text-primary">Under Investigation</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Staff:</span>
                    <span className="text-sm text-foreground">{customer.staff}</span>
                  </div>
                </div>

                {/* Balance */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground">Current Balance</p>
                    <p className="text-lg font-bold text-foreground">${customer.balance}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground">Current Equity</p>
                    <p className="text-lg font-bold text-foreground">${customer.equity}</p>
                  </div>
                </div>

                {/* Toggles */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-foreground">Account Status</span>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-foreground">Partner Status</span>
                    <Switch />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-foreground">Email Verification</span>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-foreground">2FA Verification</span>
                    <Switch />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-foreground">Fund Deposit</span>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-foreground">Fund Withdraw</span>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-foreground">Fund Transfer</span>
                    <Switch defaultChecked />
                  </div>
                </div>

                {/* Account Limit */}
                <div className="mt-6">
                  <Label className="text-sm text-foreground">Account Limit (Max)</Label>
                  <Input defaultValue="10" className="mt-2 bg-background border-border" />
                </div>

                <Button className="w-full mt-6 bg-foreground text-background hover:bg-foreground/90">
                  Save Changes
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Right Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-4">
              <Card className="bg-card border-border p-4 text-center">
                <p className="text-xs text-muted-foreground">Current Forex Balance</p>
                <p className="text-xl font-bold text-foreground">$0</p>
              </Card>
              <Card className="bg-card border-border p-4 text-center">
                <p className="text-xs text-muted-foreground">Net Deposits</p>
                <p className="text-xl font-bold text-foreground">$0</p>
              </Card>
              <Card className="bg-card border-border p-4 text-center">
                <p className="text-xs text-muted-foreground">Net Withdraw</p>
                <p className="text-xl font-bold text-foreground">$0</p>
              </Card>
            </div>

            {/* Margin Cards */}
            <div className="grid grid-cols-3 gap-4">
              <Card className="bg-card border-border p-4 flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <DollarSign className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Current Used Margin</p>
                  <p className="text-lg font-bold text-foreground">$0</p>
                </div>
              </Card>
              <Card className="bg-card border-border p-4 flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <DollarSign className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Current Free Margin</p>
                  <p className="text-lg font-bold text-foreground">$0</p>
                </div>
              </Card>
              <Card className="bg-card border-border p-4 flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <DollarSign className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Wallet Balance</p>
                  <p className="text-lg font-bold text-foreground">$0</p>
                </div>
              </Card>
            </div>

            {/* Tabs */}
            <div className="flex flex-wrap gap-2 flex-col gap-4 md:flex-row md:items-center bg-muted/30 p-4 rounded-xl border">
              {tabs.map((tab) => (
                <NavLink
                  key={tab}
                  to={tab === "Overview" ? "." : tab.toLowerCase().replace(/ /g, "-")}
                  end={tab === "Overview"}
                  className={({ isActive }) =>
                    cn(
                      "px-4 py-2 rounded-lg text-sm font-medium",
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "bg-card border border-border text-foreground hover:bg-muted"
                    )
                  }
                >
                  {tab}
                </NavLink>
              ))}
            </div>
            <Routes>
              <Route index element={<OverviewTab customer={customer} firstName={firstName} lastName={lastName} />} />
              <Route path="overview" element={<OverviewTab customer={customer} firstName={firstName} lastName={lastName} />} />
              {/* Add other tab routes here */}


              <Route path="accounts" element={<AccountsTab />} />
              <Route path="kyc" element={<KYCTab />} />
              <Route path="partner" element={<PartnerTab />} />
              <Route path="transactions" element={<TransactionsTab />} />
              <Route path="ib-bonus" element={<IBBonusTab />} />
              <Route path="direct-referrals" element={<DirectReferralsTab />} />
              <Route path="network" element={<NetworkTab />} />
              <Route path="ticket" element={<TicketTab />} />
              <Route path="add-note" element={<AddNoteTab />} />
              <Route path="security" element={<SecurityTab />} />
              <Route path="activities" element={<ActivitiesTab />} />

            </Routes>

          </div>
        </div>

        {/* Add Tag Modal */}
        <Dialog open={isTagModalOpen} onOpenChange={setIsTagModalOpen}>
          <DialogContent className="bg-card border-border">
            <DialogHeader>
              <DialogTitle className="text-foreground">Tag Add</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-sm text-foreground">Risk Profile Tags</Label>
                <Select>
                  <SelectTrigger className="bg-background border-border">
                    <SelectValue placeholder="Tags" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="investigation">Under Investigation</SelectItem>
                    <SelectItem value="verified">Verified</SelectItem>
                    <SelectItem value="suspicious">Suspicious</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end gap-2">
                <Button onClick={() => setIsTagModalOpen(false)} className="bg-foreground text-background hover:bg-foreground/90">
                  <Check className="h-4 w-4 mr-2" />
                  Add Tag
                </Button>
                <Button variant="destructive" onClick={() => setIsTagModalOpen(false)}>
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}
