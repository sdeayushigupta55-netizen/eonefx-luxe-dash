import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import TemplateSettings from "./TemplateSettings";
import { ChevronDown, Plus } from "lucide-react";

const tabs = ["Template Settings"];

export default function ThemeIndex() {
  const [activeTab, setActiveTab] = useState("Template Settings");

  const renderTabContent = () => {
    switch (activeTab) {
      case "Template Settings":
        return <TemplateSettings />;
     
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        {/* Dynamic Title */}
       
        <h1 className="text-xl font-semibold">
          {activeTab === "Template Settings" && "Template Settings"}
         
        </h1>
      </div>

      {/* TABS */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center bg-muted/30 p-4 rounded-xl border">
        {tabs.map((tab) => (
          <button
            key={tab}
            
            onClick={() => setActiveTab(tab)}
            className={cn(
              "px-4 py-2 border rounded-md",
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