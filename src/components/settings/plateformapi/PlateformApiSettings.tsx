import { useState, useEffect } from "react";

import PlatformAPIIndex from "./Platform API/platformapiindex";
import DBSynchronization from "./DB Synchronization/DBSynchronization";
import PlatformGroups from "./Platform Groups/PlatformGroups";
import RiskBook from "./Risk Book/RiskBook";
import CopyTrading from "./Copy Trading/CopyTrading";
import WebTerminal from "./Web Terminal/WebTerminal";

interface PlateformApiSettingsProps {
  defaultTab?: string;
}

export default function PlateformApiSettings({
  defaultTab = "platformapi",
}: PlateformApiSettingsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setActiveTab(defaultTab);
  }, [defaultTab]);

  /* ✅ PLATFORM API SIDEBAR */
  const sidetabs = [
    { key: "platformapi", label: "Platform API" },
    { key: "dbsynchronization", label: "DB Synchronization" },
    { key: "platformgroups", label: "Platform Groups" },
    { key: "riskbook", label: "Risk Book" },
    { key: "copytrading", label: "Copy Trading" },
    { key: "webterminal", label: "Web Terminal" },
  ];

  // Filter tabs by search term
  const filteredTabs = sidetabs.filter((tab) =>
    tab.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  /* ✅ CONTENT RENDER */
  const renderContent = () => {
    switch (activeTab) {
      case "platformapi":
        return <PlatformAPIIndex />;

      case "dbsynchronization":
        return <DBSynchronization />;

      case "platformgroups":
        return <PlatformGroups />;

      case "riskbook":
        return <RiskBook />;

      case "copytrading":
        return <CopyTrading />;

      case "webterminal":
        return <WebTerminal />;

      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 h-full w-full">
      {/* LEFT SIDEBAR - Stack on mobile, side-by-side on desktop */}
      <div className="w-full lg:w-64 flex-shrink-0 rounded-md border border-border p-4 bg-card shadow-card">
        <input
          type="text"
          placeholder="Search..."
          className="w-full mb-3 px-3 py-2 rounded-md border border-border bg-background text-sm
           placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="space-y-1">
          {filteredTabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`w-full text-left px-3 py-2 rounded-md transition-all duration-200 ${
                activeTab === tab.key
                  ? "bg-primary text-primary-foreground "
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* RIGHT CONTENT - Full width on mobile, flex-1 on desktop */}
      <div className="flex-1 min-w-0">
        <div className="border border-border rounded-md p-4 sm:p-6 bg-card shadow-card">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
