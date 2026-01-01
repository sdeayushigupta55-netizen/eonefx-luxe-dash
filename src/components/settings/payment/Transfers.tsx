import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

import { Play, Pause, Info } from "lucide-react";

import { InputField } from "@/components/form/InputField";
import { StatusToggle } from "@/components/form/Status";

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
  const [formStatus, setFormStatus] = useState<"Active" | "Disabled">("Active");

  const toggleStatus = (index: number) => {
    const updated = [...tunes];
    updated[index].status =
      updated[index].status === "Active" ? "Disabled" : "Active";
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
        <InputField
          label="Min Amount"
          defaultValue="5"
          tooltip="The minimum value a user can transfer internally"
          type="number"
        />
        <InputField
          label="Max Amount"
          defaultValue="100000"
          tooltip="The maximum value allowed for a single internal transfer"
          type="number"
        />


        <InputField
          label="Transfer Charge"
          defaultValue="1"
          type="number"
          tooltip="Fee applied on each transfer (in % or fixed amount)"
          suffix={
            <select name="chargeType" className="outline-none bg-transparent">
              <option value="percentage">%</option>
              <option value="fixed">$</option>
            </select>
          }
        />
        <InputField
          label="Internal Transactions Daily Limit"
          defaultValue="50"
          tooltip="Maximum number of internal transfers allowed per user per day"
          type="number"
        />
      </div>

      <div className="flex items-center gap-3 pt-2">

        <StatusToggle
          label="Enable Transfer"
          status={formStatus}
          onChange={setFormStatus}
          tooltip="Toggle to activate or deactivate internal transfer functionality"

        />
      </div>

      <Button className="mt-6">Save Changes</Button>
    </div>
  );

  /* -------------------- EXTERNAL -------------------- */
  const renderExternalTransfers = () => (
    <div className="rounded-xl border border-border bg-card p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField
          label="Min Amount"
          defaultValue="1"
          tooltip="The minimum value a user can transfer externally"
          type="number"
        />
        <InputField
          label="Max Amount"
          defaultValue="90000"
          tooltip="Maximum amount a user can send via external transfer"
          type="number"
        />


        <InputField
          label="Transfer Charge"
          defaultValue="1"
          type="number"
          tooltip="Fee applied on each transfer (in % or fixed amount)"
          suffix={
            <select name="chargeType" className="outline-none bg-transparent">
              <option value="percentage">%</option>
              <option value="fixed">$</option>
            </select>
          }
        />
        <InputField
          label="External Transactions Daily Limit"
          defaultValue="15"
          tooltip="Maximum number of external transfers allowed per user per day"
          type="number"
        />
      </div>

      <div className="flex flex-wrap gap-10 pt-2">
        <StatusToggle
          label="Enable Transfer"
          status={formStatus}
          onChange={setFormStatus}
          tooltip="Toggle to activate or deactivate external transfer functionality"
        />
        <StatusToggle
          label="Automatic Approve"
          tooltip="If enabled, transfer requests are approved automatically without manual review"
          status={formStatus}
          onChange={setFormStatus}
        />

        <StatusToggle
          label="Transfer Purpose"
          tooltip="When enabled, users must provide a reason for the transfer"
          status={formStatus}
          onChange={setFormStatus}
        />
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
        {/* Wallet Exchange Charge */}
        <InputField
          label="Wallet Exchange Charge"
          defaultValue="1"
          type="number"

          suffix={
            <select name="chargeType" className="outline-none bg-transparent">
              <option value="percentage">%</option>
              <option value="fixed">$</option>
            </select>
          }
        />

        {/* Wallet Exchange Daily Limit */}
        <InputField
          label="Wallet Exchange Daily Limit:"
          defaultValue="1"
          suffix="USD"
          type="number"

        />

        {/* Send Money Daily Limit */}
        <InputField
          label="Send Money Daily Limit:"
          defaultValue="100"
          type="number"
          suffix="USA"
        />

        {/* Withdraw Daily Limit */}
        <InputField
          label="Withdraw Daily Limit:"
          defaultValue="100000"
          type="number"
          suffix="USA"
        />

        {/* Investment Cancellation Daily Limit */}

        <InputField
          label="Investment Cancellation Daily Limit:"
          defaultValue="7"
          type="number"
          suffix="USA"
        />

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
      <div  className="flex flex-col gap-4 md:flex-row md:items-center bg-muted/30 p-4 rounded-xl border">
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

