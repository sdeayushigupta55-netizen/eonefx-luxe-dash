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
  const [searchTerm, setSearchTerm] = useState("");

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
// Filter tabs by search term
  const filteredTabs = sidetabs.filter((tab) =>
    tab.label.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div className="flex flex-col md:flex-row h-full w-full">
      {/* LEFT SIDEBAR */}
      <div className="w-full md:w-64 flex-shrink-0 rounded-md border border-border p-4 bg-card mb-4 md:mb-0">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full mb-3 px-3 py-2 rounded-md border border-border bg-background text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary transition"
        />

         <div className="flex flex-col gap-2">
          {filteredTabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                activeTab === tab.key
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

     {/* RIGHT SIDE CONTENT */}
      <div className="flex-1 md:pl-6 w-full">
        <div className="border border-border rounded-md p-4 bg-card w-full overflow-auto">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
