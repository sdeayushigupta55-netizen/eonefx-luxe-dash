import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { InputField } from "@/components/form/InputField";
import { StatusToggle } from "@/components/form/Status";
import { TooltipProvider } from "@/components/ui/tooltip";

const tabs = ["Brokeree"] as const;

export default function CopyTrading() {
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>("Brokeree");
  
  const [followerAccess, setFollowerAccess] = useState(
    "https://copytrader.mbfx.co/portal/registration/subscription"
  );
  const [providerAccess, setProviderAccess] = useState(
    "https://copytrader.mbfx.co/portal/registration/provider"
  );
  const [ratingIframe, setRatingIframe] = useState(
    "https://brokeree.mbfx.co/widgets/ratings"
  );
  const [ratingJs, setRatingJs] = useState(
    "https://copytrader.mbfx.co/portal/registration/provider"
  );
  const [status, setStatus] = useState<"Active" | "Disabled">("Active");

  const handleSave = () => {
    console.log({
      followerAccess,
      providerAccess,
      ratingIframe,
      ratingJs,
      status,
    });
    // Add your save logic here
  };

  const renderBrokeree = () => (
    <Card>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Copy Trading Follower Access */}
          <InputField
            label="Copy Trading Follower Access(iframe)"
            type="url"
            value={followerAccess}
            onChange={(e) => setFollowerAccess(e.target.value)}
            placeholder="Label"
            tooltip="URL (Iframe) for followers to sign up or access copy trading as subscribers"
          />

          {/* Copy Trading Provider Access */}
          <InputField
            label="Copy Trading Provider Access(iframe)"
            type="url"
            value={providerAccess}
            onChange={(e) => setProviderAccess(e.target.value)}
            placeholder="Label"
            tooltip="URL (Iframe) for traders who want to register and provide strategies."
          />

          {/* Copy Trading Rating (Iframe) */}
          <InputField
            label="Copy Trading Rating(iframe)"
            type="url"
            value={ratingIframe}
            onChange={(e) => setRatingIframe(e.target.value)}
            placeholder="Label"
            tooltip="Embedded Iframe showing trader performance ratings on the platform"
          />

          {/* Copy Trading Rating (Js) */}
          <InputField
            label="Copy Trading Rating(Js)"
            type="url"
            value={ratingJs}
            onChange={(e) => setRatingJs(e.target.value)}
            placeholder="Label"
            tooltip="JavaScript-based rating widget link, ideal for external websites or dynamic UI"
          />

          {/* Status Toggle - Full Width */}
          <div className="md:col-span-2">
            <StatusToggle
              label="Status"
              status={status}
              onChange={setStatus}
              tooltip="Toggle to enable or disable the copy trading feature"
            />
          </div>
        </div>

        {/* Save Button */}
        <div className="mt-6">
          <Button onClick={handleSave}>Save Changes</Button>
        </div>
      </CardContent>
    </Card>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case "Brokeree":
        return renderBrokeree();
      default:
        return null;
    }
  };

  return (
    <TooltipProvider>
      <div className="space-y-6">
        {/* HEADER */}
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold">Brokeree Setting</h1>
        </div>

        {/* TABS */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center bg-muted/30 p-4 rounded-xl border">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "px-4 py-2 border rounded-md",
                activeTab === tab && "bg-primary text-primary-foreground"
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* CONTENT */}
        {renderTabContent()}
      </div>
    </TooltipProvider>
  );
}
