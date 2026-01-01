import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import AutomaticWithdraw from "./AutomaticWithdraw";
import ManualWithdraw from "./ManualWithdraw";
import ScheduleWithdraw from "./ScheduleWithdraw";
import NotificationTune from "./NotificationWithdraw";
import MiscSettings from "./MiscWithdraw";
import { ChevronDown, Plus } from "lucide-react";

const tabs = ["Automatic", "Manual", "Schedule", "Notification Tune", "Misc"];

export default function WithdrawMethods() {
  const [activeTab, setActiveTab] = useState("Automatic");
  const [openAddAutoModal, setOpenAddAutoModal] = useState(false);
  const [openAddManualModal, setOpenAddManualModal] = useState(false);

  const renderTabContent = () => {
    switch (activeTab) {
      case "Automatic":
        return (
          <AutomaticWithdraw
            openAddIntent={openAddAutoModal}
            onAddIntentConsumed={() => setOpenAddAutoModal(false)}
          />
        );
      case "Manual":
        return (
          <ManualWithdraw
            openAddIntent={openAddManualModal}
            onAddIntentConsumed={() => setOpenAddManualModal(false)}
          />
        );
      case "Schedule":
        return <ScheduleWithdraw />;
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
        <h1 className="text-xl font-semibold">
          {activeTab === "Automatic" && "Automatic Withdraw Method"}
          {activeTab === "Manual" && "Manual Withdraw Method"}
          {activeTab === "Schedule" && "Schedule Withdraw Settings"}
          {activeTab === "Notification Tune" && "Notification Tune Settings"}
          {activeTab === "Misc" && "Misc Settings"}
        </h1>

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
        <Button variant="outline" className="ml-auto gap-2">
          more <ChevronDown size={16} />
        </Button>
      </div>

      {renderTabContent()}
    </div>
  );
}