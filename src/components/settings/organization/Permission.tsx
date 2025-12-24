import { useState } from "react";
import { Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { InputField } from "@/components/form/InputField";
import { Switch } from "@/components/ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";


export default function Permission() {
  const [settings, setSettings] = useState({
    newTradingAccounts: true,
    deleteArchivedAccounts: false,
    automaticDeposits: true,
    userRanking: false,
    autoExchangeRates: true,
    inactivityTradeDisable: false,
    automaticWithdrawals: true,
    disableTradingNoBalance: false,
    forexGroupRange: false,
    duplicatePhoneRestriction: true,
    forexAccountLimit: 10,
  });

  const toggle = (key: keyof typeof settings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="bg-card rounded-xl border border-border shadow-card p-6">
      <TooltipProvider>
        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* LEFT COLUMN */}
          <div className="space-y-4">
            <PermissionItem
              label="New Trading Accounts"
              tooltip="Allow creation of new trading accounts for users."
              checked={settings.newTradingAccounts}
              onChange={() => toggle("newTradingAccounts")}
            />

            <PermissionItem
              label="Delete Archived Accounts"
              tooltip="Enable deletion of archived or inactive user accounts."
              checked={settings.deleteArchivedAccounts}
              onChange={() => toggle("deleteArchivedAccounts")}
            />

            <PermissionItem
              label="Automatic Deposits"
              tooltip="Enable auto-processing of deposits without manual approval."
              checked={settings.automaticDeposits}
              onChange={() => toggle("automaticDeposits")}
            />

            <PermissionItem
              label="User Ranking (Show/Hide)"
              tooltip="Show or hide user performance rankings on the platform."
              checked={settings.userRanking}
              onChange={() => toggle("userRanking")}
            />

            <PermissionItem
              label="Auto Exchange Rates Update"
              tooltip="Enable automatic exchange rate updates from external APIs."
              checked={settings.autoExchangeRates}
              onChange={() => toggle("autoExchangeRates")}
            />
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-4">
            <PermissionItem
              label="90 Days In-Activity Trade Disable"
              tooltip="Disable trading automatically after 90 days of no activity."
              checked={settings.inactivityTradeDisable}
              onChange={() => toggle("inactivityTradeDisable")}
            />

            <PermissionItem
              label="Automatic Withdrawals"
              tooltip="Enable automatic withdrawal handling without manual checks."
              checked={settings.automaticWithdrawals}
              onChange={() => toggle("automaticWithdrawals")}
            />

            <PermissionItem
              label="Disable Trading (No Balance)"
              tooltip="Block trading actions when the account balance is zero."
              checked={settings.disableTradingNoBalance}
              onChange={() => toggle("disableTradingNoBalance")}
            />

            <PermissionItem
              label="Forex Group Range"
              tooltip="Enable control over which trading groups are allowed."
              checked={settings.forexGroupRange}
              onChange={() => toggle("forexGroupRange")}
            />

            <PermissionItem
              label="Duplicate Phone Number Restriction"
              tooltip="Restrict one phone number to only one user account."
              checked={settings.duplicatePhoneRestriction}
              onChange={() => toggle("duplicatePhoneRestriction")}
            />
          </div>
        </div>

        {/* INPUT */}
       <div className="mt-6">
  <div className="flex items-center gap-2 mb-2">
    <label className="text-sm">Forex Account Limit</label>

    <Tooltip>
      <TooltipTrigger asChild>
        <Info className="w-4 h-4 cursor-pointer text-muted-foreground" />
      </TooltipTrigger>
      <TooltipContent>
        Set the maximum number of trading accounts per user.
      </TooltipContent>
    </Tooltip>
  </div>

  <InputField
    type="number"
    value={settings.forexAccountLimit}
    onChange={(e: any) =>
      setSettings({
        ...settings,
        forexAccountLimit: Number(e.target.value),
      })
    }
    className="max-w-sm"
  />
</div>


        {/* SAVE */}
        <div className="mt-8">
          <Button className="bg-primary text-primary-foreground hover:opacity-90">
            Save Changes
          </Button>
        </div>
      </TooltipProvider>
    </div>
  );
}

/* ---------- Reusable Item ---------- */

function PermissionItem({
  label,
  tooltip,
  checked,
  onChange,
}: {
  label: string;
  tooltip: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-border bg-muted/30 px-4 py-3">
      <div className="flex items-center gap-2 text-sm">
        <span>{label}</span>

        <Tooltip>
          <TooltipTrigger>
            <Info className="w-4 h-4 cursor-pointer" />
          </TooltipTrigger>
          <TooltipContent>{tooltip}</TooltipContent>
        </Tooltip>
      </div>

      <Switch checked={checked} onCheckedChange={onChange} />
    </div>
  );
}
