import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { InputField } from "@/components/form/InputField";
import { SelectField } from "@/components/form/SelectField";
import { StatusToggle } from "@/components/form/Status";
import { Info } from "lucide-react";

export default function SiteSettings() {
  const [whiteLabel, setWhiteLabel] = useState<"Active" | "Disabled">("Active");
  const [adminTwoFactor, setAdminTwoFactor] = useState<"Active" | "Disabled">("Active");
  const [depositMode, setDepositMode] = useState("default");
  const [withdrawDeduction, setWithdrawDeduction] = useState("on-request");
  const [copyTrading, setCopyTrading] = useState("show");
  const [traderType, setTraderType] = useState("mt5");
  const [leverageApproval, setLeverageApproval] = useState("auto");
  const [liveAccountApproval, setLiveAccountApproval] = useState("disabled");
  const [demoAccountApproval, setDemoAccountApproval] = useState("disabled");
  const [siteAdminPrefix, setSiteAdminPrefix] = useState("backoffice");
  const [siteTimezone, setSiteTimezone] = useState("Etc/GMT+0");
  const [sessionExpiry, setSessionExpiry] = useState("60");
  const [ibDistributionTime, setIbDistributionTime] = useState("10");
  

  return (
    <TooltipProvider>
      <div className="space-y-6">
        {/* Site Settings Section */}
        <div>
          <h2 className="text-base sm:text-lg font-semibold mb-4">Site Settings</h2>
          
          <Card className="shadow-card border border-border bg-card">
            <CardContent className="p-4 sm:p-6 space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Site Admin Prefix */}
                <InputField
                  label="Site Admin Prefix"
                  tooltip="Custom URL path to access the admin panel (e.g., yourdomain.com/backoffice)"
                  value={siteAdminPrefix}
                  onChange={(e) => setSiteAdminPrefix(e.target.value)}
                  placeholder="backoffice"
                />

                {/* Site Timezone */}
                <SelectField
                  label="Site Timezone"
                  tooltip="Sets the default timezone for all system timestamps and activities"
                  value={siteTimezone}
                  onChange={setSiteTimezone}
                  options={[
                    { label: "Etc/GMT+0", value: "Etc/GMT+0" },
                    { label: "Etc/GMT+1", value: "Etc/GMT+1" },
                    { label: "Etc/GMT+2", value: "Etc/GMT+2" },
                    { label: "Etc/GMT-5", value: "Etc/GMT-5" },
                  ]}
                  placeholder="Select timezone"
                />

                {/* Session Expiry */}
                <SelectField
                  label="Session Expiry"
                  tooltip="Defines how long a user remains logged in without activity"
                  value={sessionExpiry}
                  onChange={setSessionExpiry}
                  options={[
                    { label: "1 Hour", value: "60" },
                    { label: "6 Hours", value: "360" },
                    { label: "12 Hours", value: "720" },
                    { label: "24 Hours", value: "1440" },
                    { label: "1 Week", value: "10080" },
                  ]}
                  placeholder="Select session expiry"
                />

                {/* White Label */}
                <StatusToggle
                  label="White Label"
                  tooltip="Toggle to hide branding and white-label the platform interface"
                  status={whiteLabel}
                  onChange={setWhiteLabel}
                />

                {/* Admin Email Two-Factor Authentication */}
                <div className="lg:col-span-2">
                  <StatusToggle
                    label="Admin Email Two-Factor Authentication"
                    tooltip="Enable two-factor authentication for admin login using email verification codes"
                    status={adminTwoFactor}
                    onChange={setAdminTwoFactor}
                  />
                </div>
              </div>

              {/* Save Button */}
              <Button variant="default" className="w-auto">
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Features Settings Section */}
        <div>
          <h2 className="text-base sm:text-lg font-semibold mb-4">Features Settings</h2>
          
          <Card className="shadow-card border border-border bg-card">
            <CardContent className="p-4 sm:p-6 space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Deposit Account Mode */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Label className="text-sm font-medium">
                      Deposit Account Mode
                    </Label>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info size={16} className="cursor-pointer" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Choose between default deposit accounts managed by admin or user request-based deposit accounts</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <RadioGroup value={depositMode} onValueChange={setDepositMode}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="default" id="deposit-default" />
                      <Label htmlFor="deposit-default" className="text-sm font-normal cursor-pointer">
                        Default Deposit Accounts
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="request" id="deposit-request" />
                      <Label htmlFor="deposit-request" className="text-sm font-normal cursor-pointer">
                        Request Deposit Account
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Withdraw Deduction */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Label className="text-sm font-medium">
                      Withdraw Deduction
                    </Label>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info size={16} className="cursor-pointer" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Choose if withdrawals are deducted immediately (On Request) or after approval (On Approval)</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <RadioGroup value={withdrawDeduction} onValueChange={setWithdrawDeduction}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="on-request" id="withdraw-request" />
                      <Label htmlFor="withdraw-request" className="text-sm font-normal cursor-pointer">
                        On Request
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="on-approval" id="withdraw-approval" />
                      <Label htmlFor="withdraw-approval" className="text-sm font-normal cursor-pointer">
                        On Approval
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Copy Trading */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Label className="text-sm font-medium">
                      Copy Trading
                    </Label>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info size={16} className="cursor-pointer" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Enable or disable the Copy Trading feature for users</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <RadioGroup value={copyTrading} onValueChange={setCopyTrading}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="show" id="copy-show" />
                      <Label htmlFor="copy-show" className="text-sm font-normal cursor-pointer">
                        Show
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="hide" id="copy-hide" />
                      <Label htmlFor="copy-hide" className="text-sm font-normal cursor-pointer">
                        Hide
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Label className="text-sm font-medium">
                  Trader Type
                </Label>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info size={16} className="cursor-pointer" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Specify which trading platform types are supported (e.g., MT5, X9, C_Trader, or All)</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <RadioGroup value={traderType} onValueChange={setTraderType}>
                <div className="flex flex-wrap gap-3">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="mt5" id="trader-mt5" />
                    <Label htmlFor="trader-mt5" className="text-sm font-normal cursor-pointer">
                      MT5
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="x9" id="trader-x9" />
                    <Label htmlFor="trader-x9" className="text-sm font-normal cursor-pointer">
                      X9
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="ctrader" id="trader-ctrader" />
                    <Label htmlFor="trader-ctrader" className="text-sm font-normal cursor-pointer">
                      C.Trader
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="all" id="trader-all" />
                    <Label htmlFor="trader-all" className="text-sm font-normal cursor-pointer">
                      All
                    </Label>
                  </div>
                </div>
              </RadioGroup>
            </div>

                {/* Leverage Approval */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Label className="text-sm font-medium">
                      Leverage Approval
                    </Label>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info size={16} className="cursor-pointer" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Set leverage changes to be handled automatically or require admin approval</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <RadioGroup value={leverageApproval} onValueChange={setLeverageApproval}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="auto" id="leverage-auto" />
                      <Label htmlFor="leverage-auto" className="text-sm font-normal cursor-pointer">
                        Auto
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="by-admin" id="leverage-admin" />
                      <Label htmlFor="leverage-admin" className="text-sm font-normal cursor-pointer">
                        By Admin
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* IB Distribution Time */}
                <InputField
                  label="IB Distribution Time (in minutes)"
                  type="number"
                  value={ibDistributionTime}
                  onChange={(e) => setIbDistributionTime(e.target.value)}
                  placeholder="Enter minutes"
                />

                {/* Live Account Admin Approval */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Label className="text-sm font-medium">
                      Live Account Admin Approval
                    </Label>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info size={16} className="cursor-pointer" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Enable this to require manual admin approval for live account creation.</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <RadioGroup value={liveAccountApproval} onValueChange={setLiveAccountApproval}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="enable" id="live-enable" />
                      <Label htmlFor="live-enable" className="text-sm font-normal cursor-pointer">
                        Enable
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="disabled" id="live-disabled" />
                      <Label htmlFor="live-disabled" className="text-sm font-normal cursor-pointer">
                        Disabled
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Demo Account Admin Approval */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Label className="text-sm font-medium">
                      Demo Account Admin Approval
                    </Label>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info size={16} className="cursor-pointer" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Enable this to require manual admin approval for demo account creation.</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <RadioGroup value={demoAccountApproval} onValueChange={setDemoAccountApproval}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="enable" id="demo-enable" />
                      <Label htmlFor="demo-enable" className="text-sm font-normal cursor-pointer">
                        Enable
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="disabled" id="demo-disabled" />
                      <Label htmlFor="demo-disabled" className="text-sm font-normal cursor-pointer">
                        Disabled
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </TooltipProvider>
  );
}
