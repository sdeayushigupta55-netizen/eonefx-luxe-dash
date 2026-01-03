import { useState, useEffect } from "react";
import CustomColor  from "./Custom Color/CustomizationIndex.tsx";
import CustomFont from "./Custom Font/CustomFont.tsx"
// import Routes from "./Routes/Routes.tsx";
import DynamicContent from "./Dynamic Content/dynamiccontentindex.tsx"; 

interface CustomizationSettingsProps {
  defaultTab?: string;
}

export default function CustomizationSettings({
  defaultTab = "customcolors",
}: CustomizationSettingsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setActiveTab(defaultTab);
  }, [defaultTab]);

  const sidetabs = [
    { key: "customcolors", label: "Custom Colors" },
    { key: "customfonts", label: "Custom Fonts" },
    { key: "routes", label: "Routes" },
    { key: "dynamiccontent", label: "Dynamic Content" },
  ];

  // Filter tabs by search term
  const filteredTabs = sidetabs.filter((tab) =>
    tab.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderContent = () => {
    switch (activeTab) {
      case "customcolors":
        return <CustomColor />;
        
        case "customfonts":
          return <CustomFont />;
      
    //   case "routes":
    //     return <Routes />;
      
      case "dynamiccontent":
        return <DynamicContent />;
      
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 h-full w-full">
      {/* LEFT SIDEBAR */}
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
              className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                activeTab === tab.key
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* RIGHT CONTENT */}
      <div className="flex-1 rounded-md border border-border p-6 bg-card shadow-card overflow-y-auto">
        {renderContent()}
      </div>
    </div>
  );
}
