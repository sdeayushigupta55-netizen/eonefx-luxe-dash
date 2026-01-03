import { useState, useEffect } from "react";
import PaymentGateways from "./PaymentGateways";
import Plugins from "./Plugins";
import SmsSettings from "./SMSSettings";
import NotificationSettings from "./NotificationSettings";
import ApiAccess from "./APIAccess";
import Webhooks from "./Webhooks";

interface IntegrationsSettingsProps {
  defaultTab?: string;
}

export default function IntegrationsSettings({
  defaultTab = "paymentgateways",
}: IntegrationsSettingsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setActiveTab(defaultTab);
  }, [defaultTab]);

  /* ✅ INTEGRATIONS SIDEBAR */
  const sidetabs = [
    { key: "paymentgateways", label: "Payment Gateways" },
    { key: "plugins", label: "Plugins" },
    { key: "smssettings", label: "SMS Settings" },
    { key: "notificationsettings", label: "Notification Settings" },
    { key: "apiaccess", label: "API Access" },
    { key: "webhooks", label: "Webhooks" },
  ];

  // Filter tabs by search term
  const filteredTabs = sidetabs.filter((tab) =>
    tab.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  /* ✅ CONTENT RENDER */
  const renderContent = () => {
    switch (activeTab) {
      case "paymentgateways":
        return <PaymentGateways />;

      case "plugins":
        return <Plugins />;

      case "smssettings":
        return <SmsSettings />;

      case "notificationsettings":
        return <NotificationSettings />;

      case "apiaccess":
        return <ApiAccess />;

      case "webhooks":
        return <Webhooks />;

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