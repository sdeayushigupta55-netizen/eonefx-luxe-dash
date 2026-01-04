import { useState } from "react";
import { cn } from "@/lib/utils";
import User from "./User";
import Admin from "./Admin";
import { Button } from "@/components/ui/button";

const tabs = ["Admin", "User"];

interface NotificationTemplateIndexProps {
  onNavigateToNotification?: () => void;
}

export default function NotificationTemplateIndex({ onNavigateToNotification }: NotificationTemplateIndexProps) {
  const [activeTab, setActiveTab] = useState("Admin");

  const renderTabContent = () => {
    switch (activeTab) {
      case "Admin":
        return <Admin />;
      case "User":
        return <User />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Push Notification Template</h1>
         <Button 
          variant="outline" 
          onClick={() => {onNavigateToNotification && onNavigateToNotification()
          }}
        >
        
          Push Notification Config
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
