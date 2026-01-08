import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Upload, Info } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function AddAccountType() {
  const navigate = useNavigate();
  const [universalGlobal, setUniversalGlobal] = useState(true);
  const [liveSwapFree, setLiveSwapFree] = useState(false);
  const [demoSwapFree, setDemoSwapFree] = useState(false);
  const [withdraw, setWithdraw] = useState(false);
  const [internalTransfer, setInternalTransfer] = useState(false);
  const [externalTransfer, setExternalTransfer] = useState(false);
  const [centAccount, setCentAccount] = useState(false);
  const [updateTradingPassword, setUpdateTradingPassword] = useState(false);
  const [updateInvestorPassword, setUpdateInvestorPassword] = useState(false);

  const InfoIcon = ({ tooltip }: { tooltip: string }) => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Info className="h-4 w-4 text-muted-foreground cursor-help" />
        </TooltipTrigger>
        <TooltipContent>
          <p className="max-w-xs">{tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-foreground">Add New Account Type</h1>
          <Button variant="outline" onClick={() => navigate("/account-type")} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        </div>

        {/* First Section - Upload & Basic Info */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Upload Avatar */}
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex flex-col items-center justify-center h-full min-h-[160px] border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary/50 transition-colors">
              <Upload className="h-10 w-10 text-muted-foreground mb-2" />
              <span className="text-sm text-muted-foreground">Upload Avatar</span>
            </div>
          </div>

          {/* Assign Branches */}
          <div className="bg-card border border-border rounded-xl p-6 space-y-4">
            <div className="flex items-center gap-2">
              <Label>Assign Branches</Label>
              <InfoIcon tooltip="Select branches for this account type" />
            </div>
            <Select>
              <SelectTrigger className="bg-muted/50 border-border">
                <SelectValue placeholder="Select an Option" />
              </SelectTrigger>
              <SelectContent className="bg-card border-border">
                <SelectItem value="all">All Branches</SelectItem>
                <SelectItem value="branch1">Branch 1</SelectItem>
                <SelectItem value="branch2">Branch 2</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-sm text-muted-foreground">Leave empty to make available for all branches.</p>
          </div>

          {/* Account Type Category */}
          <div className="bg-card border border-border rounded-xl p-6 space-y-4">
            <div>
              <Label className="text-muted-foreground text-sm">Account Type Category</Label>
              <p className="text-xs text-muted-foreground mt-1">Choose How This Account Type Should Be Categorized.</p>
            </div>
            <Select defaultValue="global">
              <SelectTrigger className="bg-muted/50 border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-card border-border">
                <SelectItem value="global">Global Account</SelectItem>
                <SelectItem value="local">Local Account</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex items-start gap-3 pt-2">
              <Switch checked={universalGlobal} onCheckedChange={setUniversalGlobal} />
              <div>
                <span className="text-sm font-medium text-primary">Set as Universal Global Account</span>
                <p className="text-xs text-muted-foreground mt-1">
                  This will override the country, tag and ib rebate rules restrictions and will be shown to all users.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Type Of Account Section */}
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold text-foreground">Type Of Account</h2>
            <p className="text-sm text-muted-foreground">Select all specifications and limits for account types you want clients to be able to open.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label>Active Trader Type</Label>
                <InfoIcon tooltip="Select the active trader type" />
              </div>
              <Input placeholder="mt5" className="bg-muted/50 border-border" defaultValue="mt5" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label>Title</Label>
                <InfoIcon tooltip="Account type title" />
              </div>
              <Input placeholder="Account Title" className="bg-muted/50 border-border" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label>Account Type Badge</Label>
                <InfoIcon tooltip="Badge to display for this account type" />
              </div>
              <Input placeholder="Account Type Badge" className="bg-muted/50 border-border" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label>Priority</Label>
                <InfoIcon tooltip="Display priority order" />
              </div>
              <Input placeholder="Priority e.g 1,2,3.." className="bg-muted/50 border-border" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label>Account Creation Limit</Label>
                <InfoIcon tooltip="Maximum accounts a user can create" />
              </div>
              <Input placeholder="Account Limit" className="bg-muted/50 border-border" />
            </div>
          </div>
        </div>

        {/* Key Features Section */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground">Key Features</h2>

          <div className="bg-card border border-border rounded-xl p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label>Account Type Spread</Label>
                  <InfoIcon tooltip="Spread for this account type" />
                </div>
                <Input placeholder="Account Type Spread" className="bg-muted/50 border-border" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label>Account Type Commission</Label>
                  <InfoIcon tooltip="Commission for this account type" />
                </div>
                <Input placeholder="Account Type Commission" className="bg-muted/50 border-border" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label>Leverage</Label>
                  <InfoIcon tooltip="Available leverage options" />
                </div>
                <Input placeholder="leverage e.g 10,20,50" className="bg-muted/50 border-border" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label>First Min Deposit</Label>
                  <InfoIcon tooltip="Minimum first deposit amount" />
                </div>
                <Input placeholder="Min deposit" className="bg-muted/50 border-border" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label>Min Amount In Wallet</Label>
                  <InfoIcon tooltip="Minimum wallet balance required" />
                </div>
                <Input placeholder="Min Amount" className="bg-muted/50 border-border" />
              </div>
            </div>
          </div>
        </div>

        {/* Live Account & Demo Account Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Live Account */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-foreground">Live Account</h2>
            <div className="bg-card border border-border rounded-xl p-6 space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label>Platform Group</Label>
                  <InfoIcon tooltip="Select platform group" />
                </div>
                <Select>
                  <SelectTrigger className="bg-muted/50 border-border">
                    <SelectValue placeholder="Group" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border">
                    <SelectItem value="group1">Group 1</SelectItem>
                    <SelectItem value="group2">Group 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-3">
                <Switch checked={liveSwapFree} onCheckedChange={setLiveSwapFree} />
                <span className="text-sm">Enable Separate Swap-Free (Islamic) Account Type</span>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label>Trading Server</Label>
                  <InfoIcon tooltip="Trading server address" />
                </div>
                <Input 
                  placeholder="MBFXGlobal-Server" 
                  className="bg-primary/10 border-primary/30 text-primary" 
                  defaultValue="MBFXGlobal-Server" 
                />
              </div>
            </div>
          </div>

          {/* Demo Account */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-foreground">Demo Account</h2>
            <div className="bg-card border border-border rounded-xl p-6 space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label>Platform Group</Label>
                  <InfoIcon tooltip="Select platform group" />
                </div>
                <Select>
                  <SelectTrigger className="bg-muted/50 border-border">
                    <SelectValue placeholder="Group" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border">
                    <SelectItem value="group1">Group 1</SelectItem>
                    <SelectItem value="group2">Group 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-3">
                <Switch checked={demoSwapFree} onCheckedChange={setDemoSwapFree} />
                <span className="text-sm">Enable Separate Swap-Free (Islamic) Account Type</span>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label>Trading Server</Label>
                  <InfoIcon tooltip="Trading server address" />
                </div>
                <Input 
                  placeholder="MBFXGlobal-Server" 
                  className="bg-primary/10 border-primary/30 text-primary" 
                  defaultValue="MBFXGlobal-Server" 
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label>Deposit Amount</Label>
                  <InfoIcon tooltip="Fixed deposit amount for demo" />
                </div>
                <Input placeholder="Enter fixed deposit amount" className="bg-muted/50 border-border" />
                <p className="text-xs text-muted-foreground">This amount will be automatically deposited when creating demo account.</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Label>Min Deposit Amount (Demo)</Label>
                    <InfoIcon tooltip="Minimum demo deposit" />
                  </div>
                  <Input placeholder="Enter min deposit amount (optional)" className="bg-muted/50 border-border" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Label>Max Deposit Amount (Demo)</Label>
                    <InfoIcon tooltip="Maximum demo deposit" />
                  </div>
                  <Input placeholder="Enter max deposit amount (optional)" className="bg-muted/50 border-border" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* More Details Section */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground">More Details</h2>
          <div className="bg-card border border-border rounded-xl p-6 space-y-4">
            <div className="flex items-center gap-2">
              <Label>Detail</Label>
              <InfoIcon tooltip="Additional details about this account type" />
            </div>
            <Textarea 
              placeholder="Enter account type details..." 
              className="bg-muted/50 border-border min-h-[150px]" 
            />

            {/* Toggle Options */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 pt-4">
              <div className="flex items-center gap-2">
                <Label className="text-sm">Withdraw</Label>
                <InfoIcon tooltip="Enable withdrawals" />
                <Switch checked={withdraw} onCheckedChange={setWithdraw} />
              </div>

              <div className="flex items-center gap-2">
                <Label className="text-sm">Internal Transfer</Label>
                <InfoIcon tooltip="Enable internal transfers" />
                <Switch checked={internalTransfer} onCheckedChange={setInternalTransfer} />
              </div>

              <div className="flex items-center gap-2">
                <Label className="text-sm">External Transfer</Label>
                <InfoIcon tooltip="Enable external transfers" />
                <Switch checked={externalTransfer} onCheckedChange={setExternalTransfer} />
              </div>

              <div className="flex items-center gap-2">
                <Label className="text-sm">Cent Account</Label>
                <InfoIcon tooltip="Mark as cent account" />
                <Switch checked={centAccount} onCheckedChange={setCentAccount} />
              </div>

              <div className="flex items-center gap-2">
                <Label className="text-sm">Update Trading Password</Label>
                <Switch checked={updateTradingPassword} onCheckedChange={setUpdateTradingPassword} />
              </div>

              <div className="flex items-center gap-2">
                <Label className="text-sm">Update Investor Password</Label>
                <Switch checked={updateInvestorPassword} onCheckedChange={setUpdateInvestorPassword} />
              </div>
            </div>

            {/* Status */}
            <div className="pt-4">
              <Select defaultValue="active">
                <SelectTrigger className="w-[200px] bg-muted/50 border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <Button className="gap-2">
          <span>✓</span>
          Add New
        </Button>
      </div>
    </DashboardLayout>
  );
}
