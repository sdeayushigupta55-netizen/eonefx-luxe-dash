import { useState } from "react";
import { Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

export default function UserPermission() {
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

  const toggle = (key) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="bg-card rounded-xl border border-border shadow-card p-6">
      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* LEFT COLUMN */}
        <div className="space-y-4">
          <PermissionItem
            label="New Trading Accounts"
            checked={settings.newTradingAccounts}
            onChange={() => toggle("newTradingAccounts")}
          />

          <PermissionItem
            label="Delete Archived Accounts"
            checked={settings.deleteArchivedAccounts}
            onChange={() => toggle("deleteArchivedAccounts")}
          />

          <PermissionItem
            label="Automatic Deposits"
            checked={settings.automaticDeposits}
            onChange={() => toggle("automaticDeposits")}
          />

          <PermissionItem
            label="User Ranking (Show/Hide)"
            checked={settings.userRanking}
            onChange={() => toggle("userRanking")}
          />

          <PermissionItem
            label="Auto Exchange Rates Update"
            checked={settings.autoExchangeRates}
            onChange={() => toggle("autoExchangeRates")}
          />
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-4">
          <PermissionItem
            label="90 Days In-Activity Trade Disable"
            checked={settings.inactivityTradeDisable}
            onChange={() => toggle("inactivityTradeDisable")}
          />

          <PermissionItem
            label="Automatic Withdrawals"
            checked={settings.automaticWithdrawals}
            onChange={() => toggle("automaticWithdrawals")}
          />

          <PermissionItem
            label="Disable Trading (No Balance)"
            checked={settings.disableTradingNoBalance}
            onChange={() => toggle("disableTradingNoBalance")}
          />

          <PermissionItem
            label="Forex Group Range"
            checked={settings.forexGroupRange}
            onChange={() => toggle("forexGroupRange")}
          />

          <PermissionItem
            label="Duplicate Phone Number Restriction"
            checked={settings.duplicatePhoneRestriction}
            onChange={() => toggle("duplicatePhoneRestriction")}
          />
        </div>
      </div>

      {/* INPUT */}
      <div className="mt-6">
        <label className="text-sm mb-2 block text-muted-foreground">
          Forex Account Limit
        </label>
        <Input
          type="number"
          value={settings.forexAccountLimit}
          onChange={(e) =>
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
    </div>
  );
}

/* ---------- Reusable Item ---------- */

function PermissionItem({ label, checked, onChange }) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-border bg-muted/30 px-4 py-3">
      <div className="flex items-center gap-2 text-sm">
        <span>{label}</span>
        <Info className="w-4 h-4 text-muted-foreground" />
      </div>
      <Switch checked={checked} onCheckedChange={onChange} />
    </div>
  );
}
