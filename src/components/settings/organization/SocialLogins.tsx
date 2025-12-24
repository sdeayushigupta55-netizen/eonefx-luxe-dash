import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Settings2, X } from "lucide-react"; // Using Settings2 icon

import { InputField } from "@/components/form/InputField";
import { StatusToggle } from "@/components/form/Status";

export default function SocialLogins() {
  const [loginProviders, setLoginProviders] = useState([
  {
    id: 1,
    name: "Google",
    logo: "https://cdn.brokeret.com/crm-assets/admin/social/google-login.webp",
    description:
      "Allow users to connect with their Google accounts, ensuring easy and efficient account access.",
    status: "Activated",
    clientId: "",
    clientSecret: "",
  },
  {
    id: 2,
    name: "Facebook",
    logo: "https://cdn.brokeret.com/crm-assets/admin/social/fb-login.webp",
    description:
      "Facilitate user login via Facebook, leveraging one of the most popular social platforms for enhanced accessibility.",
    status: "Activated",
    clientId: "",
    clientSecret: "",
  },
  {
    id: 3,
    name: "X - Twitter",
    logo: "https://cdn.brokeret.com/crm-assets/admin/social/x-login.webp",
    description:
      "Allow users to log in with their X accounts, providing a secure and modern authentication method.",
    status: "Deactivated",
    clientId: "",
    clientSecret: "",
  },
  {
    id: 4,
    name: "Instagram",
    logo: "https://cdn.brokeret.com/crm-assets/admin/social/instagram-login.webp",
    description:
      "Offer Instagram login for users who prefer connecting through their social media accounts.",
    status: "Activated",
    clientId: "",
    clientSecret: "",
  },
  {
    id: 5,
    name: "LinkedIn",
    logo: "https://cdn.brokeret.com/crm-assets/admin/social/linkedin-login.webp",
    description:
      "Integrate LinkedIn login to provide professional users a streamlined access option to your platform.",
    status: "Deactivated",
    clientId: "",
    clientSecret: "",
  },
  {
    id: 6,
    name: "Discord",
    logo: "https://cdn.brokeret.com/crm-assets/admin/social/discord-login.webp",
    description:
      "Enable your users to log in with their Discord accounts for seamless integration and a secure login experience.",
    status: "Deactivated",
    clientId: "",
    clientSecret: "",
  },
]);


  const [activeProvider, setActiveProvider] = useState<any>(null);

  const statusClasses: Record<string, string> = {
    Activated: "bg-[#0d2e1e] text-[#4ade80] border border-[#1a5e41]",
    Deactivated: "bg-[#2e0f0f] text-[#f87171] border border-[#7f1d1d]",
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!activeProvider) return;
    const { name, value } = e.target;
    setActiveProvider({ ...activeProvider, [name]: value });
  };

  const handleSave = () => {
    if (!activeProvider) return;
    setLoginProviders((prev) =>
      prev.map((p) => (p.id === activeProvider.id ? activeProvider : p))
    );
    setActiveProvider(null);
  };

  return (
    <div className="text-white">
      <h2 className="text-xl font-semibold mb-5">Social Logins</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {loginProviders.map((provider) => (
          <Card
            key={provider.id}
            className="bg-primary border border-[#1a2b40] rounded-xl shadow-md hover:border-[#2e4a6b] transition-all"
          >
            <CardContent className="relative p-5">
              {/* Settings Button */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-3 top-3 hover:text-white"
                onClick={() => setActiveProvider(provider)}
              >
                <Settings2 size={16} />
              </Button>

              <div className="mb-3">
                <img src={provider.logo} alt={provider.name} className="h-8 object-contain" />
              </div>

              <div className="flex items-center justify-between mb-2">
                <p className="text-lg font-semibold">{provider.name}</p>
                <Badge
                  variant="outline"
                  className={`${statusClasses[provider.status]} rounded-md px-2 py-0.5`}
                >
                  {provider.status}
                </Badge>
              </div>

              <p className="text-white text-sm leading-relaxed">{provider.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

     {/* Modal */}
{activeProvider && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
    <div className="w-full max-w-md rounded-xl bg-card border border-border p-6">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">
          Configure {activeProvider.name} Login
        </h2>
        <Button
          size="icon"
          variant="ghost"
          onClick={() => setActiveProvider(null)}
        >
          <X size={18} />
        </Button>
      </div>

      {/* Body */}
      <div className="space-y-4">
        
        <InputField
          label="Client ID"
          placeholder="Enter client ID"
          value={activeProvider.clientId}
          onChange={(e) =>
            setActiveProvider({
              ...activeProvider,
              clientId: e.target.value,
            })
          }
          tooltip="Client ID provided by the authentication provider"
          
        />

        <InputField
          label="Client Secret"
          placeholder="Enter client secret"
          type="password"
          value={activeProvider.clientSecret}
          onChange={(e) =>
            setActiveProvider({
              ...activeProvider,
              clientSecret: e.target.value,
            })
          }
          tooltip="Keep this secret safe and confidential"
          
        />

        <StatusToggle
          label="Status"
          status={activeProvider.status}
          tooltip="Enable or disable this login provider"
          onChange={(s) =>
            setActiveProvider({
              ...activeProvider,
              status: s,
            })
          }
        />
      </div>

      {/* Footer */}
      <div className="flex justify-end gap-3 mt-6">
        <Button
          variant="destructive" 
          onClick={() => setActiveProvider(null)}
        >
          Close
        </Button>
        <Button onClick={handleSave}>
          Save
        </Button>
      </div>
    </div>
  </div>
)}

    </div>
  );
}
