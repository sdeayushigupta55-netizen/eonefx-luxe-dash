import { useState } from "react";
import { Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Label } from "@/components/ui/label";

export default function UserPermission() {
  const [settings, setSettings] = useState({
    editName: true,
    editPhone: true,
    editUsername: true,
    editEmail: true,
    editCountry: true,
    editDob: true,
    accountCreation: true,
    emailVerification: true,
    kycVerification: true,
    faVerification: true,
    userDeposit: true,
    userWithdraw: true,
    ticketsFeature: true,
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
            label="Edit Name"
            tooltip="Allow customers to edit their name"
            checked={settings.editName}
            onChange={() => toggle("editName")}
          />


          <PermissionItem
            label="Edit Username"
            tooltip="Allow changing the username"
            checked={settings.editUsername}
            onChange={() => toggle("editUsername")}
          />



          <PermissionItem
            label="Edit Country"
            tooltip="Enable country field editing"
            checked={settings.editCountry}
            onChange={() => toggle("editCountry")}
          />



          <PermissionItem
            label="Account Creation"
            tooltip="Permit creation of new accounts"
            checked={settings.accountCreation}
            onChange={() => toggle("accountCreation")}
          />



          <PermissionItem
            label="KYC Verification"
            tooltip="Require KYC verification"
            checked={settings.kycVerification}
            onChange={() => toggle("kycVerification")}
          />


          <PermissionItem
            label="Deposit"
            tooltip="Allow customer to deposit funds"
            checked={settings.userDeposit}
            onChange={() => toggle("userDeposit")}
          />



          <PermissionItem
            label="Tickets Feature"
            tooltip="Enable support ticket functionality"
            checked={settings.ticketsFeature}
            onChange={() => toggle("ticketsFeature")}
          />

        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-4">

          <PermissionItem
            label="Edit Phone"
            tooltip="Allow customers to edit their phone number"
            checked={settings.editPhone}
            onChange={() => toggle("editPhone")}
          />
          <PermissionItem
            label="Edit Email"
            tooltip="Allow email address changes"
            checked={settings.editEmail}
            onChange={() => toggle("editEmail")}
          />

          <PermissionItem
            label="Edit Date Of Birth"
            tooltip="Allow updating birth date info"
            checked={settings.editDob}
            onChange={() => toggle("editDob")}
          />
          <PermissionItem
            label="Email Verification"
            tooltip="Require email verification"
            checked={settings.emailVerification}
            onChange={() => toggle("emailVerification")}
          />
          <PermissionItem
            label="2FA Verification"
            tooltip="Enable two-factor authentication"
            checked={settings.faVerification}
            onChange={() => toggle("faVerification")}
          />
          <PermissionItem
            label="Withdraw"
            tooltip="Allow customer to withdraw funds"
            checked={settings.userWithdraw}
            onChange={() => toggle("userWithdraw")}
          />
        </div>
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

function PermissionItem({ label, checked, onChange, tooltip }) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-border bg-muted/30 px-4 py-3">
      <div className="flex items-center gap-2 text-sm">
         {label && (
        <Label className="flex items-center gap-2 ">
          {label}
          

          {tooltip && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="w-4 h-4 cursor-pointer" />
              </TooltipTrigger>
              <TooltipContent className="max-w-xs break-all whitespace-normal">
                {tooltip}
              </TooltipContent>
            </Tooltip>
          )}
        </Label>
      )}
      </div> <Switch checked={checked} onCheckedChange={onChange} />
    </div>);
}