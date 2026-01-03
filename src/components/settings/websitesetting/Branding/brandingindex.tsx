import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import GlobalSettings from "./GlobalSettings";

import ProviderLogo from "./ProviderLogo";
import AdminAuthLogo from "./AdminAuthLogo";
import AuthCover from "./AuthCover";

const tabs = ["Global Settings", "Auth Covers", "Provider Logo", "Admin Auth Logo"];

export default function BrandingIndex() {
  const [activeTab, setActiveTab] = useState("Global Settings");

  const renderTabContent = () => {
    switch (activeTab) {
      case "Global Settings":
        return <GlobalSettings />;
      case "Auth Covers":
        return <AuthCover />;
      case "Provider Logo":
        return <ProviderLogo />;
      case "Admin Auth Logo":
        return <AdminAuthLogo />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Dynamic Title */}
      <h1 className="text-lg sm:text-xl font-semibold">
          <h1 className="text-lg sm:text-xl font-semibold">
          {activeTab === "Global Settings" && "Global Settings"}
          {activeTab === "Auth Covers" && "Auth Cover Settings"}
          {activeTab === "Provider Logo" && "Provider Logo Settings"}
          {activeTab === "Admin Auth Logo" && "Admin Auth Logo Settings"}
        </h1>
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