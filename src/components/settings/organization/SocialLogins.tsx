import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Settings } from "lucide-react";

export default function SocialLogins() {
  const loginProviders = [
    {
      id: 1,
      name: "Google",
      logo: "https://cdn.brokeret.com/crm-assets/admin/social/google-login.webp",
      description:
        "Allow users to connect with their Google accounts, ensuring easy and efficient account access.",
      status: "Activated",
    },
    {
      id: 2,
      name: "Facebook",
      logo: "https://cdn.brokeret.com/crm-assets/admin/social/fb-login.webp",
      description:
        "Facilitate user login via Facebook, leveraging one of the most popular social platforms for enhanced accessibility.",
      status: "Activated",
    },
    {
      id: 3,
      name: "X - Twitter",
      logo: "https://cdn.brokeret.com/crm-assets/admin/social/x-login.webp",
      description:
        "Allow users to log in with their X accounts, providing a secure and modern authentication method.",
      status: "Deactivated",
    },
    {
      id: 4,
      name: "Instagram",
      logo: "https://cdn.brokeret.com/crm-assets/admin/social/instagram-login.webp",
      description:
        "Offer Instagram login for users who prefer connecting through their social media accounts.",
      status: "Activated",
    },
    {
      id: 5,
      name: "LinkedIn",
      logo: "https://cdn.brokeret.com/crm-assets/admin/social/linkedin-login.webp",
      description:
        "Integrate LinkedIn login to provide professional users a streamlined access option to your platform.",
      status: "Deactivated",
    },
    {
      id: 6,
      name: "Discord",
      logo: "https://cdn.brokeret.com/crm-assets/admin/social/discord-login.webp",
      description:
        "Enable your users to log in with their Discord accounts for seamless integration and a secure login experience.",
      status: "Deactivated",
    },
  ];

  const statusClasses = {
    Activated:
      "bg-[#0d2e1e] text-[#4ade80] border border-[#1a5e41]",
    Deactivated:
      "bg-[#2e0f0f] text-[#f87171] border border-[#7f1d1d]",
  };

  return (
    <div className=" text-white">
      <h2 className="text-xl font-semibold mb-5">Social Logins</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {loginProviders.map((provider) => (
          <Card
            key={provider.id}
            className="bg-primary border border-[#1a2b40] rounded-xl shadow-md hover:border-[#2e4a6b] transition-all"
          >
            <CardContent className="relative p-5">
              {/* Small settings button (top-right) */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-3 top-3 text-gray-400 hover:text-white"
              >
                <Settings size={16} className="text-white"/>
              </Button>

              {/* Logo */}
              <div className="mb-3">
                <img
                  src={provider.logo}
                  alt={provider.name}
                  className="h-8 object-contain"
                />
              </div>

              {/* Name + Status */}
              <div className="flex items-center justify-between mb-2">
                <p className="text-lg font-semibold">{provider.name}</p>

                <Badge
                  variant="outline"
                  className={`${statusClasses[provider.status]} rounded-md px-2 py-0.5`}
                >
                  {provider.status}
                </Badge>
              </div>

              {/* Description */}
              <p className="text-white text-sm leading-relaxed">
                {provider.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
