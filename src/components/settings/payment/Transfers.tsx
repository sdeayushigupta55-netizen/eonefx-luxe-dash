import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

import { Play, Pause, Info } from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

/* -------------------- TABS -------------------- */

const tabs = [
  "Internal Transfers",
  "External Transfers",
  "Notification Tune",
  "Misc",
];
const notificationTunesData = [
  { name: "Bewitched", icon: "🎵", mode: "Play", status: "Disabled" },
  { name: "Crunchy", icon: "🎷", mode: "Stop", status: "Disabled" },
  { name: "Expert Notification", mode: "Play", icon: "🥁", status: "Active" },
  { name: "knock knock", icon: "🎼", mode: "Play", status: "Active" },
  { name: "Silencer", icon: "📼", mode: "Play", status: "Disabled" },
  { name: "Sticky", icon: "📻", mode: "Play", status: "Disabled" },
  { name: "Vopvoopvvoop", icon: "💿", mode: "Play", status: "Disabled" },
];

const statusClasses: Record<string, string> = {
  Active: "bg-[#0d2e1e] text-[#4ade80] border border-[#1a5e41]",
  Disabled: "bg-[#2e0f0f] text-[#f87171] border border-[#7f1d1d]",
};

/* -------------------- COMPONENT -------------------- */

export default function TransferSettings() {
  const [activeTab, setActiveTab] = useState("Internal Transfers");
    const [tunes, setTunes] = useState(notificationTunesData);

     const toggleStatus = (index: number) => {
    const updated = [...tunes];
    updated[index].status = updated[index].status === "Active" ? "Disabled" : "Active";
    setTunes(updated);
  };
  const togglePlay = (index: number) => {
    const updated = [...tunes];
    updated[index].mode = updated[index].mode === "Play" ? "Stop" : "Play";
    setTunes(updated);
  };

  /* -------------------- INTERNAL -------------------- */
  const renderInternalTransfers = () => (
    <div className="rounded-xl border border-border bg-card p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField label="Min Amount" defaultValue="5" />
        <InputField label="Max Amount" defaultValue="100000" />

        <InputWithSuffix label="Transfer Charge" defaultValue="1" />
        <InputField
          label="Internal Transactions Daily Limit"
          defaultValue="50"
        />
      </div>

      <div className="flex items-center gap-3 pt-2">
        <Switch />
        <LabelWithInfo label="Enable Transfer" />
      </div>

      <Button className="mt-6">Save Changes</Button>
    </div>
  );

  /* -------------------- EXTERNAL -------------------- */
  const renderExternalTransfers = () => (
    <div className="rounded-xl border border-border bg-card p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField label="Min Amount" defaultValue="1" />
        <InputField label="Max Amount" defaultValue="90000" />

        <InputWithSuffix label="Transfer Charge" defaultValue="5" />
        <InputField
          label="External Transactions Daily Limit"
          defaultValue="15"
        />
      </div>

      <div className="flex flex-wrap gap-10 pt-2">
        <Toggle label="Enable Transfer" />
        <Toggle label="Automatic Approve" />
        <Toggle label="Transfer Purpose" />
      </div>

      <Button className="mt-6">Save Changes</Button>
    </div>
  );

  /* -------------------- NOTIFICATION -------------------- */
  const renderNotificationTune = () => (
    <div className="space-y-4">
      {tunes.map((tune, index) => (
        <div
          key={index}
          className="flex justify-between items-center border border-border rounded-md p-4 bg-card"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">{tune.icon}</span>
            <span className="font-medium">{tune.name}</span>
          </div>

          <div className="flex gap-2">
            <Button
              size="sm"
              variant="normal"
              className="flex items-center gap-2"
              onClick={() => togglePlay(index)}
            >
              {tune.mode === "Play" ? (
                <>
                  <Play size={16} /> Play
                </>
              ) : (
                <>
                  <Pause size={16} /> Stop
                </>
              )}
            </Button>
            <Button
              size="sm"
              variant="normal"
              className={`flex items-center gap-2 ${statusClasses[tune.status]}`}
              onClick={() => toggleStatus(index)}
            >
              {tune.status === "Active" ? "✔ Active" : "✖ Disabled"}
            </Button>
          </div>
        </div>
      ))}
    </div>
  );

  /* -------------------- MISC -------------------- */
  const renderMisc = () => (
  <div className="rounded-xl border border-border bg-card p-6 space-y-8">

    {/* GRID */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

      {/* Pending Withdraw Limit */}
      <div>
        <LabelWithInfo label="Pending Withdraw Limit" />
        <Input type="number" defaultValue={3} />
      </div>

      {/* Min IB Wallet Withdraw Limit */}
      <div>
        <LabelWithInfo label="Min IB Wallet Withdraw Limit" />
        <Input type="number" defaultValue={10} />
      </div>

      {/* Withdraw OTP Expires */}
      <div>
        <LabelWithInfo label="Withdraw OTP Expires (In Minutes)" />
        <Input type="number" defaultValue={5} />
      </div>

      {/* Withdraw OTP Toggle */}
      <div className="flex items-center justify-between mt-6">
        <LabelWithInfo label="Withdraw OTP" />
        <Switch />
      </div>

      {/* User Withdraw Account Creation OTP */}
      <div className="flex items-center justify-between">
        <LabelWithInfo label="User Withdraw Account Creation OTP" />
        <Switch />
      </div>

      {/* Withdraw Account Manual Approval */}
      <div className="flex items-center justify-between">
        <LabelWithInfo label="Withdraw Account Manual Approval" />
        <Switch />
      </div>

    </div>

    {/* SAVE BUTTON */}
    <div>
      <Button className="px-8">Save Changes</Button>
    </div>

  </div>
);


  /* -------------------- TAB CONTENT -------------------- */
  const renderTabContent = () => {
    switch (activeTab) {
      case "Internal Transfers":
        return renderInternalTransfers();
      case "External Transfers":
        return renderExternalTransfers();
      case "Notification Tune":
        return renderNotificationTune();
      case "Misc":
        return renderMisc();
      default:
        return null;
    }
  };

  /* -------------------- JSX -------------------- */

  return (
    <div className="space-y-6">
     
       {/* Dynamic Title */}
        <h1 className="text-xl font-semibold">
          {activeTab === "Internal Transfers" && "Transfer's Settings"}
          {activeTab === "External Transfers" && "Transfer's Settings"}
          
          {activeTab === "Notification Tune" && "Notification Tune Settings"}
          {activeTab === "Misc" && "Misc Settings"}
        </h1>
      

      {/* TABS */}
      <div className="flex gap-3">
        {tabs.map((tab) => (
          <Button
            key={tab}
            variant="ghost"
            onClick={() => setActiveTab(tab)}
            className={cn(
              "px-4 py-2 border rounded-md",
              activeTab === tab && "bg-primary text-primary-foreground"
            )}
          >
            {tab}
          </Button>
        ))}
      </div>

      {/* CONTENT */}
      {renderTabContent()}
    </div>
  );
}

/* -------------------- REUSABLE UI -------------------- */

function InputField({
  label,
  defaultValue,
}: {
  label: string;
  defaultValue?: string;
}) {
  return (
    <div className="space-y-2">
      <LabelWithInfo label={label} />
      <Input defaultValue={defaultValue} />
    </div>
  );
}

function InputWithSuffix({
  label,
  defaultValue,
}: {
  label: string;
  defaultValue?: string;
}) {
  return (
    <div className="space-y-2">
      <LabelWithInfo label={label} />
      <div className="relative">
        <Input defaultValue={defaultValue} className="pr-10" />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
          %
        </span>
      </div>
    </div>
  );
}

function Toggle({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3">
      <Switch />
      <LabelWithInfo label={label} />
    </div>
  );
}

function LabelWithInfo({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-1 text-sm font-medium">
      {label}
      <Tooltip>
        <TooltipTrigger>
          <Info size={14} className="text-muted-foreground cursor-pointer" />
        </TooltipTrigger>
        <TooltipContent>{label}</TooltipContent>
      </Tooltip>
    </div>
  );
}
