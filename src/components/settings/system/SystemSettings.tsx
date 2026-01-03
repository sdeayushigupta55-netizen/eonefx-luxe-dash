import { useState, useEffect } from "react";
import ClearCache from "./ClearCache"
import ApplicationDetails from "./ApplicationDetails";
import DevMode from "./DevMode";
// import Changelog from "./Changelog";
import ReportIssue from "./ReportIssue";

interface SystemSettingsProps {
  defaultTab?: string;
}

export default function SystemSettings({
  defaultTab = "clearcache",
}: SystemSettingsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setActiveTab(defaultTab);
  }, [defaultTab]);

  /* ✅ SYSTEM SIDEBAR */
  const sidetabs = [
    { key: "clearcache", label: "Clear Cache" },
    { key: "applicationdetails", label: "Application Details" },
    { key: "devmode", label: "Dev Mode" },
    { key: "changelog", label: "Changelog" },
    { key: "reportissue", label: "Report Issue" },
  ];

  // Filter tabs by search term
  const filteredTabs = sidetabs.filter((tab) =>
    tab.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  /* ✅ CONTENT RENDER */
  const renderContent = () => {
    switch (activeTab) {
      case "clearcache":
        return <ClearCache />;

      case "applicationdetails":
        return <ApplicationDetails />;

      case "devmode":
        return <DevMode />;

    //   case "changelog":
    //     return <Changelog />;

      case "reportissue":
        return <ReportIssue />;

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