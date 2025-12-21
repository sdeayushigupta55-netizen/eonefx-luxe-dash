import { useState, useEffect } from "react";
import Company from "./Company";
import Country from "./Country";
import DocLinks from "./DocLinks";
import SocialLogins from "./SocialLogins";

interface OrganizationSettingsProps {
  defaultTab?: string;
}

export default function OrganizationSettings({
  defaultTab = "company",
}: OrganizationSettingsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab);

  useEffect(() => {
    setActiveTab(defaultTab);
  }, [defaultTab]);

  // LEFT SIDEBAR TABS INCLUDING BRANCHES
  const sidetabs = [
    { key: "company", label: "Company" },
    { key: "branches", label: "Branches" }, // 
    { key: "country", label: "Country" },
    { key: "sociallogins", label: "Social Logins" },
    { key: "doclinks", label: "Doc & Links" },
  ];

  // RIGHT PANEL CONTENT
  const renderContent = () => {
    switch (activeTab) {
      case "company":
        return <Company defaultTab="company" />;

      case "branches":
        return <Company defaultTab="branches" />;

      case "country":
        return <Country />;

      case "sociallogins":
        return <SocialLogins />;

      case "doclinks":
        return <DocLinks />;

      default:
        return null;
    }
  };

  return (
    <div className="flex h-full w-full">
      {/* LEFT SIDEBAR */}
      <div className="rounded-md border w-64 border-r border-border p-4 bg-card">
         <input
      type="text"
      placeholder="Search..."
      className="w-full mb-2 px-3 py-2 rounded-md border border-border bg-background text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
    />

        {sidetabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`w-full text-left px-3 py-2 rounded-md mb-2 ${
              activeTab === tab.key
                ? "bg-primary text-white"
                : "text-muted-foreground hover:bg-muted"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* RIGHT SIDE CONTENT */}
      <div className="flex-1 pl-6">
        <div className="border border-border rounded-md p-4 bg-card">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
