import { useState, useEffect } from "react";
import Customer from "./Customer";
import RoleAndPermission from "./RoleAndPermission";
import KYCandCompliance from "./KYCandCompliance";
import LeadSettings from "./LeadSetting";
// import UserRankings from "./UserRankings";

interface UserManagementSettingsProps {
  defaultTab?: string;
}

export default function UserManagementSettings({
  defaultTab = "customer",
}: UserManagementSettingsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab);

  useEffect(() => {
    setActiveTab(defaultTab);
  }, [defaultTab]);

  /* ✅ USER MANAGEMENT SIDEBAR */
  const sidetabs = [
    { key: "customer", label: "Customer" },
  { key: "rolespermissions", label: "Roles & Permissions" },
  { key: "leadsettings", label: "Lead Settings" },
  { key: "kyccompliance", label: "KYC & Compliance" },
  { key: "userrankings", label: "User Rankings" },
  ];

  /* ✅ CONTENT RENDER */
 
  const renderContent = () => {
  switch (activeTab) {
    case "customer":
      return <Customer />;
      case "rolespermissions":
      return <RoleAndPermission />;
    case "kyccompliance":
      return <KYCandCompliance />;
    case "leadsettings":
      return <LeadSettings />;
    // case "userrankings":
    //   return <UserRankings />;

    default:
      return null;
  }
};

  return (
    <div className="flex h-full w-full">
      {/* LEFT SIDEBAR */}
      <div className="w-64 border-r border-border p-4 bg-card">
        <input
          type="text"
          placeholder="Search..."
          className="w-full mb-3 px-3 py-2 rounded-md border border-border bg-background
                     placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        />

        {sidetabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`w-full text-left px-3 py-2 rounded-md mb-2 transition ${
              activeTab === tab.key
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* RIGHT CONTENT */}
      <div className="flex-1 pl-6">
        <div className="border border-border rounded-md p-4 bg-card">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
