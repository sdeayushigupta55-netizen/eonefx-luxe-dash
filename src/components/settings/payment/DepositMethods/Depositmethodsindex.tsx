import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import AutomaticDeposit from "./AutomaticDeposit";
import ManualDeposit from "./ManualDeposit";
import NotificationTune from "./NotificationTune";
import MiscSettings from "./MiscSettings";
import { ArrowDown, ChevronDown, CircleChevronDown, Pencil, Plus } from "lucide-react";

const tabs = ["Automatic", "Manual", "Notification Tune", "Misc"];

export default function DepositMethods() {
  const [activeTab, setActiveTab] = useState("Automatic");
  const [openAddAutoModal, setOpenAddAutoModal] = useState(false);
  const [openAddManualModal, setOpenAddManualModal] = useState(false);

  const renderTabContent = () => {
    switch (activeTab) {
      case "Automatic":
        return <AutomaticDeposit  openAddIntent={openAddAutoModal}
      onAddIntentConsumed={() => setOpenAddAutoModal(false)}/>;
      case "Manual":
        return <ManualDeposit openAddIntent={openAddManualModal}
      onAddIntentConsumed={() => setOpenAddManualModal(false)}/>;
      case "Notification Tune":
        return <NotificationTune />;
      case "Misc":
        return <MiscSettings />;
      default:
        return null;
    }
  };

 

  return (
    <div className="space-y-6">
       <div className="flex justify-between items-center">
        {/* Dynamic Title */}
        <h1 className="text-xl font-semibold">
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
            className="gap-2"
          >
            <Plus size={16} />
            ADD NEW
          </Button>
        )}
      </div>
      {/* TABS */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center bg-muted/30 p-4 rounded-xl border">
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
<Button variant="ghost" className="ml-auto gap-2 px-4 py-2 border rounded-md">
  More <ChevronDown size={16} />
</Button>
      </div>

      {/* CONTENT */}
      {renderTabContent()}
    </div>
  );
}