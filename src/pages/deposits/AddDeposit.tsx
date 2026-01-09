import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Plus, ChevronDown, Info, Eye } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

const depositTabs = [
  { id: "add", label: "Add Deposit", path: "/deposits/add" },
  { id: "pending", label: "Manual Pending Deposit", path: "/deposits/pending" },
  { id: "history", label: "Deposit History", path: "/deposits/history" },
];

const recentTransactions = [
  { date: "Dec 17, 2025 11:27", user: "Test New", email: "richirj43743@gmail.com", transactionId: "TRXNK7NJCGD5F", account: "878859", amount: "+10 USD", gateway: "Bank-PKR", avatar: "R", avatarColor: "bg-red-500" },
  { date: "Dec 09, 2025 09:45", user: "Sufyan Aslam", email: "sufyanhashmi931@gmail.com", transactionId: "TRXSUQSUYH444", account: "5267185332", amount: "+20 USD", gateway: "Bank-PKR", avatar: "S", avatarColor: "bg-amber-500" },
  { date: "Dec 09, 2025 09:42", user: "Sufyan Aslam", email: "sufyanhashmi931@gmail.com", transactionId: "TRXQAKQBJZZ6R", account: "5267185332", amount: "+100 USD", gateway: "Bank-PKR", avatar: "S", avatarColor: "bg-amber-500" },
  { date: "Dec 04, 2025 01:06", user: "Test New", email: "richirj43743@gmail.com", transactionId: "TRXISUZ4CINXJ", account: "878816", amount: "+10 USD", gateway: "Bank-PKR", avatar: "R", avatarColor: "bg-red-500" },
  { date: "Dec 04, 2025 12:56", user: "Test New", email: "richirj43743@gmail.com", transactionId: "TRXWYWRSZ76ND", account: "878816", amount: "+10 USD", gateway: "Bank-PKR", avatar: "R", avatarColor: "bg-red-500" },
  { date: "Nov 28, 2025 10:59", user: "Sufyan Aslam", email: "sufyanhashmi931@gmail.com", transactionId: "TRXOKFYUNKPDC", account: "5267185332", amount: "+201 USD", gateway: "Pkr-2", avatar: "S", avatarColor: "bg-amber-500" },
  { date: "Nov 20, 2025 11:38", user: "Naeem Ali", email: "naeemail2020@gmail.com", transactionId: "TRXQTM2AB8GQU", account: "9026405965", amount: "+100 USD", gateway: "Stripe-Usd", avatar: "N", avatarColor: "bg-amber-600" },
];

export default function AddDeposit() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const getActiveTab = () => {
    if (location.pathname.includes('/add')) return "add";
    if (location.pathname.includes('/pending')) return "pending";
    if (location.pathname.includes('/history')) return "history";
    return "add";
  };
  
  const activeTab = getActiveTab();

  return (
    <DashboardLayout>
      <div className="p-6">
        {/* Page Title */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-semibold text-foreground">Add Deposit</h1>
          <Button className="gap-2">
            <Plus className="h-4 w-4 " />Add Deposit
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

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Add Deposit Form */}
          <div className="bg-card rounded-xl border border-border p-6">
            <h2 className="text-lg font-semibold text-foreground mb-6">Add Deposit</h2>
            
            <div className="space-y-5">
              {/* User */}
              <div>
                <Label className="text-foreground flex items-center gap-1 mb-2">
                  User
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>Select a user</TooltipContent>
                  </Tooltip>
                </Label>
                <Select>
                  <SelectTrigger className="bg-background border-border text-foreground">
                    <SelectValue placeholder="Select User" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="user1">Test New</SelectItem>
                    <SelectItem value="user2">Sufyan Aslam</SelectItem>
                    <SelectItem value="user3">Naeem Ali</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Account / Wallet */}
              <div>
                <Label className="text-foreground flex items-center gap-1 mb-2">
                  Account / Wallet
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>Select account or wallet</TooltipContent>
                  </Tooltip>
                </Label>
                <Select>
                  <SelectTrigger className="bg-background border-border text-foreground">
                    <SelectValue placeholder="Select Account" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="acc1">878859</SelectItem>
                    <SelectItem value="acc2">5267185332</SelectItem>
                    <SelectItem value="acc3">9026405965</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Payment Method */}
              <div>
                <Label className="text-foreground flex items-center gap-1 mb-2">
                  Payment Method
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>Select payment method</TooltipContent>
                  </Tooltip>
                </Label>
                <Select defaultValue="bank-pkr">
                  <SelectTrigger className="bg-background border-border text-foreground">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bank-pkr">Bank Transfer - PKR</SelectItem>
                    <SelectItem value="stripe-usd">Stripe - USD</SelectItem>
                    <SelectItem value="paypal">PayPal</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Enter Amount */}
              <div>
                <Label className="text-foreground flex items-center gap-1 mb-2">
                  Enter Amount:
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>Enter deposit amount</TooltipContent>
                  </Tooltip>
                </Label>
                <div className="relative">
                  <Input 
                    type="number" 
                    className="bg-background border-border text-foreground pr-14"
                    placeholder=""
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">
                    USD
                  </span>
                </div>
              </div>

              {/* Comments */}
              <div>
                <Label className="text-foreground flex items-center gap-1 mb-2">
                  Comments
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>Add any comments</TooltipContent>
                  </Tooltip>
                </Label>
                <div className="border border-border rounded-lg bg-background">
                  {/* Rich text toolbar */}
                  <div className="flex items-center gap-1 p-2 border-b border-border flex-wrap">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground">
                      <span className="text-xs">✏️</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 font-bold text-muted-foreground hover:text-foreground">B</Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 underline text-muted-foreground hover:text-foreground">U</Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 line-through text-muted-foreground hover:text-foreground">S</Button>
                    <div className="w-px h-5 bg-border mx-1" />
                    <Select defaultValue="16">
                      <SelectTrigger className="h-8 w-14 text-xs bg-background border-border">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="12">12</SelectItem>
                        <SelectItem value="14">14</SelectItem>
                        <SelectItem value="16">16</SelectItem>
                        <SelectItem value="18">18</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-500 font-bold">A</Button>
                    <div className="w-px h-5 bg-border mx-1" />
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground">≡</Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground">≡</Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground">⊞</Button>
                  </div>
                  <textarea 
                    className="w-full p-3 min-h-[100px] resize-none focus:outline-none bg-transparent text-foreground"
                    placeholder=""
                  />
                </div>
              </div>
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
                    <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Transaction ID</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Account</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Amount</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Gateway</th>
                  </tr>
                </thead>
                <tbody>
                  {recentTransactions.map((tx, index) => (
                    <tr key={index} className="border-b border-border/50 hover:bg-muted/30">
                      <td className="py-3 px-4 text-sm text-muted-foreground whitespace-nowrap">{tx.date}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-7 w-7">
                            <AvatarFallback className={`text-white text-xs ${tx.avatarColor}`}>
                              {tx.avatar}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium text-foreground text-sm">{tx.user}</div>
                            <div className="text-xs text-muted-foreground">{tx.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm text-muted-foreground font-mono">{tx.transactionId}</td>
                      <td className="py-3 px-4 text-sm text-muted-foreground">{tx.account}</td>
                      <td className="py-3 px-4 text-sm text-emerald-500 font-medium">{tx.amount}</td>
                      <td className="py-3 px-4 text-sm text-muted-foreground">{tx.gateway}</td>
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