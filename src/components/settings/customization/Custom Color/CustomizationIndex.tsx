import { useState } from "react";
import { cn } from "@/lib/utils";
import LightColors from "./LightColors.tsx";
import DarkColors from "./DarkColors.tsx";
import MiscColors from "./MiscColors.tsx";

const tabs = ["Light Colors", "Dark Colors", "Misc Colors"];

export default function CustomizationIndex() {
  const [activeTab, setActiveTab] = useState("Light Colors");

  const renderTabContent = () => {
    switch (activeTab) {
      case "Light Colors":
        return <LightColors />;
      case "Dark Colors":
        return <DarkColors />;
      case "Misc Colors":
        return <MiscColors />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">
          {activeTab === "Light Colors" && "Theme Colors"}
          {activeTab === "Dark Colors" && "Theme Colors"}
          {activeTab === "Misc Colors" && "Theme Colors"}
        </h1>
      </div>

      {/* TABS */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center bg-muted/30 p-4 rounded-xl border">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "px-4 py-2 border rounded-md transition-colors",
              activeTab === tab && "bg-primary text-primary-foreground"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div>{renderTabContent()}</div>
    </div>
  );
}