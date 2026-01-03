import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Dashboard from "./Dashboard";
import { ChevronDown } from "lucide-react";
import Popup from "./Popup";
const tabs = ["Dashboard", "Popup"];

export default function BannerIndex() {
  const [activeTab, setActiveTab] = useState("Dashboard");

  const renderTabContent = () => {
    switch (activeTab) {
      case "Dashboard":
        return <Dashboard />;
      case "Popup":
        return <Popup />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        {/* Dynamic Title */}
        <h1 className="text-xl font-semibold">
          {activeTab === "Dashboard" && "Dashboard Banners"}
          {activeTab === "Popup" && "Popup Banners"}
        </h1>
      </div>

      {/* TABS */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center bg-muted/30 p-4 rounded-xl border">
        {tabs.map((tab) => (
          <button
            key={tab}
             
            onClick={() => setActiveTab(tab)}
            className={cn("px-4 py-2 border rounded-md",
              activeTab === tab && "bg-primary text-primary-foreground"
            )}
          >
            {tab}
          </button>
        ))}
      
      </div>

      {/* CONTENT */}
      {renderTabContent()}
    </div>
  );
}