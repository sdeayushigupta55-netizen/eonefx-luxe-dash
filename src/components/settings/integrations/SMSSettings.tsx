import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Settings2, X } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface SMSProvider {
  name: string;
  logo: string;
  description: string;
  status: string;
}

const smsProviders = [
  {
    name: "Nexmo",
    logo: "https://cdn.brokeret.com/crm-assets/admin/plugins/nexmo.webp",
    description: "Easily integrate SMS capabilities to send and receive messages globally with high reliability.",
    status: "deactivated"
  },
  {
    name: "Twilio",
    logo: "https://cdn.brokeret.com/crm-assets/admin/plugins/twilio.webp",
    description: "Enhance customer engagement with scalable SMS solutions designed for agility and performance.",
    status: "activated"
  },
  {
    name: "Voiso",
    logo: "https://cdn.brokeret.com/crm-assets/admin/plugins/voiso.webp",
    description: "Streamline customer interactions with a robust omnichannel communication platform for seamless engagement.",
    status: "deactivated"
  },
  {
    name: "Vonage",
    logo: "https://cdn.brokeret.com/crm-assets/admin/plugins/vonage.webp",
    description: "Simplify global SMS delivery with reliable, scalable, and developer-friendly communication APIs.",
    status: "deactivated"
  },
  {
    name: "infobip",
    logo: "https://cdn.brokeret.com/crm-assets/admin/plugins/infobip.webp",
    description: "Enhance customer engagement with secure and fast SMS solutions, tailored for global reach.",
    status: "deactivated"
  },
];

const statusClasses: Record<string, string> = {
  Activated: "bg-[#0d2e1e] text-[#4ade80] border border-[#1a5e41]",
  Deactivated: "bg-[#2e0f0f] text-[#f87171] border border-[#7f1d1d]",
};

export default function SmsSettings() {
  const [openModal, setOpenModal] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<SMSProvider | null>(null);

  const openProviderModal = (provider: SMSProvider) => {
    setSelectedProvider(provider);
    setOpenModal(true);
  };

  const closeModal = () => {
    setOpenModal(false);
    setSelectedProvider(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">All Plugins Adds The Ability To Send SMS</h2>
        <p className="text-muted-foreground">
          Manage SMS provider integrations for customer communication
        </p>
      </div>

      <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
        {smsProviders.map((provider, index) => (
          <Card key={index} className="border hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between p-4 pb-2">
              <img 
                className="inline-block h-10" 
                src={provider.logo} 
                alt={provider.name}
                onError={(e) => {
                  e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Crect width='40' height='40' fill='%23ddd'/%3E%3Ctext x='50%25' y='50%25' font-size='20' text-anchor='middle' dy='.3em' fill='%23999'%3E📱%3C/text%3E%3C/svg%3E";
                }}
              />
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8"
                onClick={() => openProviderModal(provider)}
              >
                <Settings2 className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="p-4 pt-2">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-base font-medium">{provider.name}</h4>
              <Badge
                  variant="outline"
                  className={`text-xs capitalize ${
                    statusClasses[provider.status === "activated" ? "Activated" : "Deactivated"]
                  }`}
                >
                  {provider.status === "activated" ? "Activated" : "Deactivated"}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {provider.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Modal - Responsive with shadow-card */}
      {openModal && selectedProvider && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-2 sm:p-4">
          <Card className="w-full max-w-[95vw] sm:max-w-2xl bg-card shadow-card max-h-[95vh] sm:max-h-[90vh] overflow-hidden flex flex-col">
            <div className="flex justify-between items-center px-4 sm:px-6 py-3 sm:py-4 border-b border-border flex-shrink-0">
              <h2 className="text-lg sm:text-xl font-semibold truncate pr-4">
                Update {selectedProvider.name}
              </h2>
              <Button size="icon" variant="ghost" onClick={closeModal} className="flex-shrink-0">
                <X size={20} />
              </Button>
            </div>

            <div className="p-4 sm:p-6 overflow-y-auto flex-1">
              <div className="space-y-4 md:space-y-6">
                 <div className="space-y-2">
                  <Label className="text-sm font-medium">From</Label>
                  <Input 
                    defaultValue="878787877"
                  />
                </div>
                {/* API Key */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">API Key</Label>
                  <Input 
                    defaultValue="your_api_key_here"
                  />
                </div>

                {/* API Secret */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">API Secret</Label>
                  <Input 
                    type="password"
                    defaultValue="••••••••••••••••••••••••••••••••••••••••••••"
                  />
                </div>

              

                {/* Status */}
                <div className="flex items-center gap-3 py-2">
                  <Label className="text-sm font-medium">Status:</Label>
                  <Switch 
                    defaultChecked={selectedProvider.status === "activated"}
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