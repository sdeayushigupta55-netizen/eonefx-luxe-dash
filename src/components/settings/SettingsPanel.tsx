
import { useState } from "react";
import { X, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SettingsCard } from "./SettingsCard";
import OrganizationSettings from "./organization/OrganizationSettings";
import UsermanagementSettings from "./usermanagement/UsermanagementSettings";
import { cn } from "@/lib/utils";
import PaymentSettings from "./payment/PaymentSetting";
import PlatformApiSettings from "./plateformapi/PlateformApiSettings"
import DataManagementSettings from "./datamanagement/DataManagementSettings"
import SystemSettings from "./system/SystemSettings";
import IntegrationSettings  from "./integrations/IntegrationsSettings"

import {
  Building2,
  Users,
  CreditCard,
  Globe,
  Palette,
  Server,
  MessageSquare,
  Database,
  Settings as SettingsIcon,
  Plug,
} from "lucide-react";
import WebsiteSettings from "./websitesetting/WebsiteSetting";
import CustomizationSettings from "./customization/CustomizationSettings";
import CommunicationsSettings from "./communications/CommunicationsSettings";


interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const settingsData = [
  {
    icon: Building2,
    title: "Organization",
    glowColor: "gold" as const,
    items: [
      { label: "Company" },
      { label: "Branches" },
      { label: "Country" },
      { label: "Doc & Links" },
      { label: "Social Logins", badge: "new" as const },
    ],
  },
  {
    icon: Users,
    title: "User Management",
    glowColor: "gold" as const,
    items: [
      { label: "Customer" },
      { label: "Roles & Permissions" },
      { label: "Lead Settings" },
      { label: "KYC & Compliance" },
      { label: "User Rankings" },
    ],
  },
  {
    icon: CreditCard,
    title: "Payment",
    glowColor: "gold" as const,
    items: [
      { label: "Deposit Methods" },
      { label: "Withdraw Methods" },
      { label: "Currency" },
      { label: "Transfers" },
      { label: "Bonuses", badge: "new" as const },
    ],
  },
  {
    icon: Globe,
    title: "Website Setting",
    glowColor: "gold" as const,
    items: [
      { label: "Theme" },
      { label: "Branding", badge: "updated" as const },
      { label: "Site Settings" },
      { label: "Banner" },
      { label: "GDPR Compliance", badge: "updated" as const },
      { label: "Maintenance" },
    ],
  },
  {
    icon: Palette,
    title: "Customization",
    glowColor: "gold" as const,
    items: [
      { label: "Custom Colors", badge: "new" as const },
      { label: "Custom Fonts", badge: "new" as const },
      { label: "Routes", badge: "coming-soon" as const },
      { label: "Dynamic Content", badge: "new" as const },
    ],
  },
  {
    icon: Server,
    title: "Platform",
    glowColor: "teal" as const,
    items: [
      { label: "Platform API" },
      { label: "DB Synchronization" },
      { label: "Copy Trading" },
      { label: "Platform Groups", badge: "new" as const },
      { label: "Risk Book" },
      { label: "Web Terminal", badge: "new" as const },
    ],
  },
  {
    icon: MessageSquare,
    title: "Communications",
    glowColor: "teal" as const,
    items: [
      { label: "Email" },
      { label: "Collab Tools" },
      { label: "Email Templates", badge: "updated" as const },
      { label: "SMS Templates" },
      { label: "Notification Templates", badge: "updated" as const },
      {label:"SMTP Monitoring", badge:"new" as const},
      { label: "Forex Daily Reporting" , badge: "new" as const}
    ],
  },
  {
    icon: Database,
    title: "Data Management",
    glowColor: "green" as const,
    items: [
      { label: "Import", badge: "coming-soon" as const },
      { label: "Export", badge: "coming-soon" as const },
      { label: "Data Encryption", badge: "new" as const },
    ],
  },
  {
    icon: SettingsIcon,
    title: "System",
    glowColor: "green" as const,
    items: [
      { label: "Clear Cache", badge: "new" as const },
      { label: "Application Details", badge: "new" as const },
      { label: "Dev Mode", badge: "new" as const },
      { label: "Changelog", badge: "new" as const },
      { label: "Report Issue", badge: "new" as const },
    ],
  },
  {
    icon: Plug,
    title: "Integrations",
    glowColor: "teal" as const,
    items: [
      { label: "Payment Gateways", badge: "updated" as const },
      { label: "Plugins", badge: "updated" as const },
      { label: "SMS Settings", badge: "updated" as const },
      { label: "Notification Settings", badge: "updated" as const },
      { label: "API Access", badge: "new" as const },
      { label: "Webhooks", badge: "new" as const },
    ],
  },
];

export function SettingsPanel({ isOpen, onClose }: SettingsPanelProps) {
  const [activePage, setActivePage] = useState<string | null>(null);

  const renderActivePage = () => {
    if (!activePage) return null;

    const normalizedPage = activePage.toLowerCase().replace(/ & | /g, "");
    console.log("Active Page:", activePage, "Normalized:", normalizedPage); // Debug line

    switch (normalizedPage) {
      case "company":
        return <OrganizationSettings defaultTab="company" />;
      case "branches":
        return <OrganizationSettings defaultTab="branches" />;
      case "country":
        return <OrganizationSettings defaultTab="country" />;
      case "doclinks":
        return <OrganizationSettings defaultTab="doclinks" />;
      case "sociallogins":
        return <OrganizationSettings defaultTab="sociallogins" />;

      /* USER MANAGEMENT */
      case "customer":
        return <UsermanagementSettings defaultTab="customer" />;
      case "rolespermissions":
        return <UsermanagementSettings defaultTab="rolespermissions" />;
      case "leadsettings":
        return <UsermanagementSettings defaultTab="leadsettings" />;
      case "kyccompliance":
        return <UsermanagementSettings defaultTab="kyccompliance" />;
      case "userrankings":
        return <UsermanagementSettings defaultTab="userrankings" />;

      // Payment 
      case "depositmethods":
        return <PaymentSettings defaultTab="depositmethods" />;
      case "withdrawmethods":
        return <PaymentSettings defaultTab="withdrawmethods" />;
      case "currency":
        return <PaymentSettings defaultTab="currency" />;
      case "transfers":
        return <PaymentSettings defaultTab="transfers" />;
      case "bonuses":
        return <PaymentSettings defaultTab="bonuses" />;

      //Website
      case "theme":
        return <WebsiteSettings defaultTab="theme" />;
      case "branding":
        return <WebsiteSettings defaultTab="branding" />;
      case "sitesettings":
        return <WebsiteSettings defaultTab="sitesettings" />;
      case "banner":
        return <WebsiteSettings defaultTab="banner" />;
      case "gdprcompliance":
        return <WebsiteSettings defaultTab="gdprcompliance" />;
      case "maintenance":
        return <WebsiteSettings defaultTab="maintenance" />;

      // Customization
      case "customcolors":
        return <CustomizationSettings defaultTab="customcolors" />;
      case "customfonts":
        return <CustomizationSettings defaultTab="customfonts" />;
      case "routes":
        return <CustomizationSettings defaultTab="routes" />;
      case "dynamiccontent":
        return <CustomizationSettings defaultTab="dynamiccontent" />;

      // Platform
      case "platformapi":
        return <PlatformApiSettings defaultTab="platformapi" />;
      case "dbsynchronization":
        return <PlatformApiSettings defaultTab="dbsynchronization" />;
      case "copytrading":
        return <PlatformApiSettings defaultTab="copytrading" />;
      case "platformgroups":
        return <PlatformApiSettings defaultTab="platformgroups" />;
      case "riskbook":
        return <PlatformApiSettings defaultTab="riskbook" />;
      case "webterminal":
        return <PlatformApiSettings defaultTab="webterminal" />;

      // Communications
      case "email":
        return <CommunicationsSettings defaultTab="email" />;
      case "collabtools":
        return <CommunicationsSettings defaultTab="collabtools" />;
      case "emailtemplates":
        return <CommunicationsSettings defaultTab="emailtemplates" />;
      case "smstemplates":
        return <CommunicationsSettings defaultTab="smstemplates" />;
      case "notificationtemplates":
        return <CommunicationsSettings defaultTab="notificationtemplates" />;
      case "smtpmonitoring":
        return <CommunicationsSettings defaultTab="smtpmonitoring" />;
      case "forexdailyreporting":
        return <CommunicationsSettings defaultTab="forexdailyreporting" />;

      // Data Management
      case "import":
        return <DataManagementSettings defaultTab="import" />;
      case "export":
        return <DataManagementSettings defaultTab="export" />;
      case "dataencryption":
        return <DataManagementSettings defaultTab="dataencryption" />;

      // System
      case "clearcache":
        return <SystemSettings defaultTab="clearcache" />;
      case "applicationdetails":
        return <SystemSettings defaultTab="applicationdetails" />;
      case "devmode":
        return <SystemSettings defaultTab="devmode" />;
      case "changelog":
        return <SystemSettings defaultTab="changelog" />;
      case "reportissue":
        return <SystemSettings defaultTab="reportissue" />;

      // Integrations
      case "paymentgateways":
        return <IntegrationSettings defaultTab="paymentgateways" />;
      case "plugins":
        return <IntegrationSettings defaultTab="plugins" />;
      case "smssettings":
        return <IntegrationSettings defaultTab="smssettings" />;
      case "notificationsettings":
        return <IntegrationSettings defaultTab="notificationsettings" />;
      case "apiaccess":
        return <IntegrationSettings defaultTab="apiaccess" />;
      case "webhooks":
        return <IntegrationSettings defaultTab="webhooks" />;


      default:
        console.log("No match found for:", normalizedPage); // Debug line
        return (
          <div className="text-center py-8">
            <p className="text-muted-foreground">Page not found: {activePage}</p>
          </div>
        );
    }
  };
  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className={cn(
          "fixed inset-y-0 right-0 z-50 w-full max-w-[76rem] bg-background border-l border-border shadow-2xl transition-transform duration-300 ease-out",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border px-6 py-4">
            {/* <h2 className="text-xl font-semibold text-foreground">
              {activePage || "Settings"}
            </h2> */}

            {activePage && (
              <Button
                variant="ghost"
                onClick={() => setActivePage(null)}
                className="mr-auto ml-4"
              >
                ← Back
              </Button>
            )}

            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-9 w-9 rounded-lg text-muted-foreground hover:text-foreground"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Search */}
          {!activePage && (
            <div className="border-b border-border px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="relative w-80">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search settings..."
                    className="search-input w-full pl-10"
                  />
                </div>
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg px-5">
                  Documentation
                </Button>
              </div>
            </div>
          )}

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {!activePage ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
                {settingsData.map((section, index) => (
                  <SettingsCard
                    key={index}
                    icon={section.icon}
                    title={section.title}
                    items={section.items}
                    glowColor={section.glowColor}
                    onItemClick={(label) => setActivePage(label)}
                  />
                ))}
              </div>
            ) : (
              renderActivePage()
            )}
          </div>
        </div>
      </div>
    </>
  );
}
