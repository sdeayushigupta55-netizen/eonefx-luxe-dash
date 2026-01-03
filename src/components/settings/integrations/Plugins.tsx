import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Settings2, X } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface Plugin {
  name: string;
  logo: string;
  description: string;
  status: string;
}

const plugins = [
  { 
    name: "Tawk Chat", 
    logo: "https://cdn.brokeret.com/crm-assets/admin/plugins/tawk.webp",
    description: "Effortlessly engage with your customers through a free, real-time messaging platform.", 
    status: "deactivated" 
  },
  { 
    name: "Google reCaptcha", 
    logo: "https://cdn.brokeret.com/crm-assets/admin/plugins/recaptcha.webp",
    description: "Protect your website against spam bots and fraudulent activities without compromising user experience.", 
    status: "deactivated" 
  },
  { 
    name: "Google Analytics", 
    logo: "https://cdn.brokeret.com/crm-assets/admin/plugins/analytics.webp",
    description: "Track and analyze your website's performance to make data-driven decisions and improve user experience.", 
    status: "deactivated" 
  },
  { 
    name: "Facebook Messenger", 
    logo: "https://cdn.brokeret.com/crm-assets/admin/plugins/messanger.webp",
    description: "Seamlessly connect with your audience via Meta's powerful instant messaging platform.", 
    status: "deactivated" 
  },
  { 
    name: "Sumsub (Automated KYC)", 
    logo: "https://cdn.brokeret.com/crm-assets/admin/plugins/sumsub.webp",
    description: "Streamline KYC procedures with automated compliance solutions to detect and prevent fraud.", 
    status: "deactivated" 
  },
  { 
    name: "Risk Hub", 
    logo: "https://cdn.brokeret.com/crm-assets/admin/plugins/riskhub.webp",
    description: "Identify, assess, and mitigate risks efficiently with comprehensive tools for financial and operational security.", 
    status: "deactivated" 
  },
  { 
    name: "Custom Chat", 
    logo: "https://cdn.brokeret.com/crm-assets/admin/plugins/customchat.webp",
    description: "Build personalized conversations with your audience using a customizable chat solution.", 
    status: "deactivated" 
  },
  { 
    name: "Zoho SalesIQ", 
    logo: "https://cdn.brokeret.com/crm-assets/admin/plugins/salesiq.webp",
    description: "Enhance customer engagement and track visitor behavior with real-time chat and analytics tools.", 
    status: "activated" 
  },
  { 
    name: "Zoho PageSense", 
    logo: "https://cdn.brokeret.com/crm-assets/admin/plugins/pagesense.webp",
    description: "Visualize user behavior with heatmaps and analytics to optimize your website's performance.", 
    status: "deactivated" 
  },
  { 
    name: "Trustpilot", 
    logo: "https://cdn.brokeret.com/crm-assets/admin/plugins/trustpilot.webp",
    description: "Boost your business's reputation by gathering and showcasing authentic customer reviews across key touchpoints.", 
    status: "deactivated" 
  },
  { 
    name: "ShuftiPro", 
    logo: "https://cdn.brokeret.com/crm-assets/admin/plugins/shuftipro.webp",
    description: "Automate your KYC processes with advanced AI-driven identity verification solutions.", 
    status: "deactivated" 
  },
  { 
    name: "Cloudflare Turnstile", 
    logo: "https://cdn.brokeret.com/crm-assets/admin/plugins/turnstile.webp",
    description: "Safeguard your website against bots and automated abuse without compromising visitor experience.", 
    status: "activated" 
  },
  { 
    name: "Currency Exchange API", 
    logo: "https://cdn.brokeret.com/crm-assets/admin/plugins/currency.webp",
    description: "Provides currency exchange rate data for the system", 
    status: "activated" 
  },
  { 
    name: "Veriff (Automated KYC)", 
    logo: "https://cdn.brokeret.com/crm-assets/admin/plugins/veriff.webp",
    description: "Advanced identity verification with AI-powered document analysis and real-time fraud detection.", 
    status: "deactivated" 
  },
  { 
    name: "Feedvex Exchange API", 
    logo: "https://cdn.brokeret.com/crm-assets/admin/plugins/feedvex.webp",
    description: "Advanced forex and cryptocurrency exchange rates with real-time data from Feedvex", 
    status: "activated" 
  },
  { 
    name: "Calendly", 
    logo: "https://cdn.brokeret.com/crm-assets/admin/plugins/calendly.webp",
    description: "Virtual availability and booking app used to schedule meetings, appointments, and events for individuals and organizations.", 
    status: "deactivated" 
  },
];
const statusClasses: Record<string, string> = {
  Activated: "bg-[#0d2e1e] text-[#4ade80] border border-[#1a5e41]",
  Deactivated: "bg-[#2e0f0f] text-[#f87171] border border-[#7f1d1d]",
};
export default function Plugins() {
  const [openModal, setOpenModal] = useState(false);
  const [selectedPlugin, setSelectedPlugin] = useState<Plugin | null>(null);

  const openPluginModal = (plugin: Plugin) => {
    setSelectedPlugin(plugin);
    setOpenModal(true);
  };

  const closeModal = () => {
    setOpenModal(false);
    setSelectedPlugin(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-2">Third Party System Plugins</h2>
        <p className="text-muted-foreground">
          Manage third-party plugins and system integrations
        </p>
      </div>

      <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
        {plugins.map((plugin, index) => (
          <Card key={index} className="border hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between p-4 pb-2">
              <img 
                className="inline-block h-10" 
                src={plugin.logo} 
                alt={plugin.name}
                onError={(e) => {
                  e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Crect width='40' height='40' fill='%23ddd'/%3E%3Ctext x='50%25' y='50%25' font-size='20' text-anchor='middle' dy='.3em' fill='%23999'%3E🔌%3C/text%3E%3C/svg%3E";
                }}
              />
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8"
                onClick={() => openPluginModal(plugin)}
              >
                <Settings2 className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="p-4 pt-2">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-base font-medium">{plugin.name}</h4>
                 <Badge
                  variant="outline"
                  className={`text-xs capitalize ${
                    statusClasses[plugin.status === "activated" ? "Activated" : "Deactivated"]
                  }`}
                >
                  {plugin.status === "activated" ? "Activated" : "Deactivated"}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {plugin.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Modal - Responsive with shadow-card */}
      {openModal && selectedPlugin && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-2 sm:p-4">
          <Card className="w-full max-w-[95vw] sm:max-w-2xl bg-card shadow-card max-h-[95vh] sm:max-h-[90vh] overflow-hidden flex flex-col">
            <div className="flex justify-between items-center px-4 sm:px-6 py-3 sm:py-4 border-b border-border flex-shrink-0">
              <h2 className="text-lg sm:text-xl font-semibold truncate pr-4">
                Update {selectedPlugin.name}
              </h2>
              <Button size="icon" variant="ghost" onClick={closeModal} className="flex-shrink-0">
                <X size={20} />
              </Button>
            </div>

            <div className="p-4 sm:p-6 overflow-y-auto flex-1">
              <div className="space-y-4 md:space-y-6">
                {/* Google Recaptcha Key */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Google Recaptcha Key</Label>
                  <Input 
                    defaultValue="6LehSPUpAAAAHbt8j1WECWUm93qPsRmOuzzeC5H"
                  />
                </div>

                {/* Google Recaptcha Secret */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Google Recaptcha Secret</Label>
                  <Input 
                    type="password"
                    defaultValue="••••••••••••••••••••••••••••••••••••••••••••"
                  />
                </div>

                {/* Status */}
                <div className="flex items-center gap-3 py-2">
                  <Label className="text-sm font-medium">Status:</Label>
                  <Switch 
                    defaultChecked={selectedPlugin.status === "activated"}
                  />
                </div>
              </div>

              <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 mt-6 pt-4 border-t border-border">
                <Button variant="destructive" onClick={closeModal} className="w-full sm:w-auto">
                  Cancel
                </Button>
                <Button onClick={closeModal} className="w-full sm:w-auto">
                  Save Changes
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}