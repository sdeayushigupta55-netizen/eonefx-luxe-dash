
import { useState } from "react";
import { X, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SettingsCard } from "./SettingsCard";
import OrganizationSettings from "./organization/OrganizationSettings";
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
import { cn } from "@/lib/utils";

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
  switch (activePage.toLowerCase().replace(/ & | /g, "")) {
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
    default:
      return null;
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
          "fixed inset-y-0 right-0 z-50 w-full max-w-6xl bg-background border-l border-border shadow-2xl transition-transform duration-300 ease-out",
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
