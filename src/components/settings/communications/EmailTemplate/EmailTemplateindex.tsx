import { useState } from "react";
import { cn } from "@/lib/utils";
import User from "./User.tsx";
import TemplateSettings from "./TemplateSettings.tsx";
import Admin from "./Admin.tsx";
import { Button } from "@/components/ui/button";

const tabs = ["Admin", "User", "Template Settings"];

interface EmailTemplateIndexProps {
  onNavigateToEmail?: () => void;
}

export default function CustomizationIndex({ onNavigateToEmail }: EmailTemplateIndexProps) {
  const [activeTab, setActiveTab] = useState("Admin");

  const renderTabContent = () => {
    switch (activeTab) {
      case "Admin":
        return <Admin />;
      case "User":
        return <User />;
      case "Template Settings":
        return <TemplateSettings />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">
          {activeTab === "Admin" && "Email Templates"}
          {activeTab === "User" && "Email Templates"}
          {activeTab === "Template Settings" && "Template Settings"}
        </h1>
        <Button variant="outline" onClick={onNavigateToEmail}>
          Email Config
        </Button>
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