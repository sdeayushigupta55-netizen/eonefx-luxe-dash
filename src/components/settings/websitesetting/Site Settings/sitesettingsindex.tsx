import { useState } from "react";
import { cn } from "@/lib/utils";
import SiteSettings from "./SiteSettings";
import RegistrationSettings from "./RagistrationSettings";
import CompanyRegistration from "./CompanyRegistration";

import Comment from "./Comments";

const tabs = ["Site Settings", "Registration Settings", "Company Registration", "Comments"];

export default function SiteSettingsIndex() {
  const [activeTab, setActiveTab] = useState("Site Settings");

  const renderTabContent = () => {
    switch (activeTab) {
      case "Site Settings":
        return <SiteSettings />;
      case "Registration Settings":
        return <RegistrationSettings />;
      case "Company Registration":
        return <CompanyRegistration />;
      case "Comments":
        return <Comment />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
         
      {/* Dynamic Title */}
      
  <h1 className="text-lg sm:text-xl font-semibold">
          {activeTab === "Site Settings" && "Site Settings"}
          {activeTab === "Registration Settings" && "Registration Settings"}
          {activeTab === "Company Registration" && "Company Registration"}
          {activeTab === "Comments" && "Comments"}
        </h1>
      {/* TABS - Responsive with flex-wrap */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-3 bg-muted/30 p-3 sm:p-4 rounded-xl border border-border">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "px-3 sm:px-4 py-2 border rounded-md whitespace-nowrap transition-all duration-200",
              activeTab === tab
                ? "bg-primary text-primary-foreground hover:bg-primary/90"
                : "hover:bg-muted"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* CONTENT */}
      <div className="min-w-0">
        {renderTabContent()}
      </div>
    </div>
  );
}