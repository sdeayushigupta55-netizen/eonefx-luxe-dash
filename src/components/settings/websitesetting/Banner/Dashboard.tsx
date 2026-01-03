import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Check } from "lucide-react";

interface Banner {
  id: string;
  title: string;
  description: string;
  bannerTitle: string;
  bannerSubtitle: string;
  buttonText: string;
  buttonLink: string;
  isActive: boolean;
}

export default function Dashboard() {
  const [banners, setBanners] = useState<Banner[]>([
    {
      id: "1",
      title: "Start Your Free Trail Today.",
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      bannerTitle: "Start your free trail today.",
      bannerSubtitle: "Ready to dive in?",
      buttonText: "",
      buttonLink: "",
      isActive: true,
    },
    {
      id: "2",
      title: "Make Your First Deposit.",
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      bannerTitle: "Make your first deposit.",
      bannerSubtitle: "Ready to get started?",
      buttonText: "",
      buttonLink: "",
      isActive: true,
    },
    {
      id: "3",
      title: "Create Support Ticket.",
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      bannerTitle: "Create Support Ticket.",
      bannerSubtitle: "Need help along the way?",
      buttonText: "",
      buttonLink: "",
      isActive: true,
    },
  ]);

  const handleToggle = (id: string) => {
    setBanners(banners.map((banner) => (banner.id === id ? { ...banner, isActive: !banner.isActive } : banner)));
  };

  const handleInputChange = (id: string, field: keyof Banner, value: string) => {
    setBanners(banners.map((banner) => (banner.id === id ? { ...banner, [field]: value } : banner)));
  };

  const handleSave = (id: string) => {
    const banner = banners.find((b) => b.id === id);
    console.log("Saving banner:", banner);
    alert("Changes saved successfully!");
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {banners.map((banner) => (
        <Card key={banner.id} className="border-border bg-card/50">
          <CardContent className="p-6 space-y-4">
            {/* Header with Toggle */}
            <div className="flex items-center justify-between pb-4 border-b border-border">
              <h3 className="text-base font-semibold">{banner.title}</h3>
              <Switch checked={banner.isActive} onCheckedChange={() => handleToggle(banner.id)} />
            </div>

            {/* Description */}
            <p className="text-sm text-muted-foreground">{banner.description}</p>

            {/* Banner Title */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Banner Title</label>
              <input
                type="text"
                value={banner.bannerTitle}
                onChange={(e) => handleInputChange(banner.id, "bannerTitle", e.target.value)}
                className="w-full px-3 py-2 rounded-md border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Banner Subtitle */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Banner Subtitle</label>
              <input
                type="text"
                value={banner.bannerSubtitle}
                onChange={(e) => handleInputChange(banner.id, "bannerSubtitle", e.target.value)}
                className="w-full px-3 py-2 rounded-md border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Button Text */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Button Text</label>
              <input
                type="text"
                value={banner.buttonText}
                onChange={(e) => handleInputChange(banner.id, "buttonText", e.target.value)}
                className="w-full px-3 py-2 rounded-md border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder=""
              />
            </div>

            {/* Button Link */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Button Link</label>
              <input
                type="text"
                value={banner.buttonLink}
                onChange={(e) => handleInputChange(banner.id, "buttonLink", e.target.value)}
                className="w-full px-3 py-2 rounded-md border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder=""
              />
            </div>

            {/* Save Button */}
            <Button
              onClick={() => handleSave(banner.id)}
              
              className="w-full tborder-0 flex items-center justify-center gap-2"
            >
              <Check size={16} />
              Save Changes
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}