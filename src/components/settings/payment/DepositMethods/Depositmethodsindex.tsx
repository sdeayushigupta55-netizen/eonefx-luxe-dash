import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import AutomaticDeposit from "./AutomaticDeposit";
import ManualDeposit from "./ManualDeposit";
import NotificationTune from "./NotificationTune";
import MiscSettings from "./MiscSettings";
import { ChevronDown, Plus } from "lucide-react";

const tabs = ["Automatic", "Manual", "Notification Tune", "Misc"];

export default function DepositMethods() {
  const [activeTab, setActiveTab] = useState("Automatic");
  const [openAddAutoModal, setOpenAddAutoModal] = useState(false);
  const [openAddManualModal, setOpenAddManualModal] = useState(false);

  const renderTabContent = () => {
    switch (activeTab) {
      case "Automatic":
        return <AutomaticDeposit openAddIntent={openAddAutoModal} onAddIntentConsumed={() => setOpenAddAutoModal(false)} />;
      case "Manual":
        return <ManualDeposit openAddIntent={openAddManualModal} onAddIntentConsumed={() => setOpenAddManualModal(false)} />;
      case "Notification Tune":
        return <NotificationTune />;
      case "Misc":
        return <MiscSettings />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header with Title and Add Button */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
        {/* Dynamic Title */}
        <h1 className="text-lg sm:text-xl font-semibold">
          {activeTab === "Automatic" && "Auto Deposit Method"}
          {activeTab === "Manual" && "Manual Deposit Method"}
          {activeTab === "Notification Tune" && "Notification Tune Settings"}
          {activeTab === "Misc" && "Misc Settings"}
        </h1>

        {/* ADD NEW button only for Automatic & Manual */}
        {(activeTab === "Automatic" || activeTab === "Manual") && (
          <Button
            onClick={() =>
              activeTab === "Manual"
                ? setOpenAddManualModal(true)
                : setOpenAddAutoModal(true)
            }
            className="gap-2 w-full sm:w-auto flex-shrink-0"
          >
            <Plus size={16} />
            ADD NEW
          </Button>
        )}
      </div>

      {/* TABS - Responsive with flex-wrap */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-3 bg-muted/30 p-3 sm:p-4 rounded-xl border border-border">
        {tabs.map((tab) => (
          <button
            key={tab}
           
            onClick={() => setActiveTab(tab)}
            className={cn(
              "px-4 sm:px-4 py-2 border rounded-md whitespace-nowrap transition-all duration-200",
              activeTab === tab 
                ? "bg-primary text-primary-foreground" 
                : "bg-muted border-border hover:bg-muted/70"
            )}
          >
            {tab}
          </button>
        ))}
        <Button 
          variant="ghost" 
          className="ml-auto gap-2 px-3 sm:px-4 py-2 border rounded-md text-xs sm:text-sm whitespace-nowrap flex-shrink-0"
        >
          More <ChevronDown size={16} />
        </Button>
      </div>

      {/* CONTENT */}
      <div className="min-w-0">
        {renderTabContent()}
      </div>
    </div>
  );
}