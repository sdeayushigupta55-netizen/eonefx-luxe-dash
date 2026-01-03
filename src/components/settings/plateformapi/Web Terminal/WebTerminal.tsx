import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { InputField } from "@/components/form/InputField";
import { SelectField } from "@/components/form/SelectField";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Percent } from "lucide-react";

const tabs = ["Metatrader 5", "X9 Trader"] as const;

interface TerminalSettings {
  lightUrl: string;
  darkUrl: string;
  width: string;
  height: string;
  status: string;
}

export default function WebTerminal() {
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>("Metatrader 5");
  
  const [mt5Settings, setMt5Settings] = useState<TerminalSettings>({
    lightUrl: "https://web.mbfx.co/terminal?utm_campaign=BanexClientOffice&utm_source=www.banexcapital.com&mode=connect&lang=en&theme-mode=0&theme=blueRed",
    darkUrl: "https://web.mbfx.co/terminal?utm_campaign=BanexClientOffice&utm_source=www.banexcapital.com&mode=connect&lang=en&theme-mode=1&theme=blueRed",
    width: "100",
    height: "100",
    status: "enabled",
  });

  const [x9Settings, setX9Settings] = useState<TerminalSettings>({
    lightUrl: "",
    darkUrl: "",
    width: "",
    height: "",
    status: "enabled",
  });

  const statusOptions = [
    { label: "Enabled", value: "enabled" },
    { label: "Disabled", value: "disabled" },
  ];

  const handleSave = () => {
    console.log({
      mt5Settings,
      x9Settings,
    });
    // Add your save logic here
  };

  const renderMetatrader5 = () => (
    <Card>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Terminal URL (Light) */}
          <InputField
            label="Terminal URL (Light)"
            type="url"
            value={mt5Settings.lightUrl}
            onChange={(e) => setMt5Settings({ ...mt5Settings, lightUrl: e.target.value })}
            placeholder="Enter light mode terminal URL"
            tooltip="Provide the URL for the web terminal interface in light mode."
            
          />

          {/* Terminal URL (Dark) */}
          <InputField
            label="Terminal URL (Dark)"
            type="url"
            value={mt5Settings.darkUrl}
            onChange={(e) => setMt5Settings({ ...mt5Settings, darkUrl: e.target.value })}
            placeholder="Enter dark mode terminal URL"
            tooltip="Provide the URL for the web terminal interface in dark mode."
            
          />

          {/* Terminal Width */}
          <InputField
            label="Terminal Width"
            type="text"
            value={mt5Settings.width}
            onChange={(e) => setMt5Settings({ ...mt5Settings, width: e.target.value })}
            placeholder="100"
            tooltip="Specify the width of the web terminal as a percentage of its container."
            suffix={
              <span className="flex items-center justify-center text-muted-foreground">
                <Percent className="w-4 h-4" />
              </span>
            }
            
          />

          {/* Terminal Height */}
          <InputField
            label="Terminal Height"
            type="text"
            value={mt5Settings.height}
            onChange={(e) => setMt5Settings({ ...mt5Settings, height: e.target.value })}
            placeholder="100"
            tooltip="Specify the height of the web terminal as a percentage of its container."
            suffix={
              <span className="flex items-center justify-center text-muted-foreground">
                <Percent className="w-4 h-4" />
              </span>
            }
            
          />

          {/* Status - Full Width */}
          <div className="md:col-span-2">
            <SelectField
              label="Status"
              value={mt5Settings.status}
              onChange={(value) => setMt5Settings({ ...mt5Settings, status: value })}
              options={statusOptions}
              tooltip="Enable or disable the current web terminal configuration."
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

  const renderX9Trader = () => (
    <Card>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Terminal URL (Light) */}
          <InputField
            label="Terminal URL (Light)"
            type="url"
            value={x9Settings.lightUrl}
            onChange={(e) => setX9Settings({ ...x9Settings, lightUrl: e.target.value })}
            placeholder="Enter light mode terminal URL"
            tooltip="Provide the URL for the web terminal interface in light mode."
            
          />

          {/* Terminal URL (Dark) */}
          <InputField
            label="Terminal URL (Dark)"
            type="url"
            value={x9Settings.darkUrl}
            onChange={(e) => setX9Settings({ ...x9Settings, darkUrl: e.target.value })}
            placeholder="Enter dark mode terminal URL"
            tooltip="Provide the URL for the web terminal interface in dark mode."
            
          />

          {/* Terminal Width */}
          <InputField
            label="Terminal Width"
            type="text"
            value={x9Settings.width}
            onChange={(e) => setX9Settings({ ...x9Settings, width: e.target.value })}
            placeholder="100"
            tooltip="Specify the width of the web terminal as a percentage of its container."
            suffix={
              <span className="flex items-center justify-center text-muted-foreground">
                <Percent className="w-4 h-4" />
              </span>
            }
            
          />

          {/* Terminal Height */}
          <InputField
            label="Terminal Height"
            type="text"
            value={x9Settings.height}
            onChange={(e) => setX9Settings({ ...x9Settings, height: e.target.value })}
            placeholder="100"
            tooltip="Specify the height of the web terminal as a percentage of its container."
            suffix={
              <span className="flex items-center justify-center text-muted-foreground">
                <Percent className="w-4 h-4" />
              </span>
            }
            
          />

          {/* Status - Full Width */}
          <div className="md:col-span-2">
            <SelectField
              label="Status"
              value={x9Settings.status}
              onChange={(value) => setX9Settings({ ...x9Settings, status: value })}
              options={statusOptions}
              tooltip="Enable or disable the current web terminal configuration."
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
      case "Metatrader 5":
        return renderMetatrader5();
      case "X9 Trader":
        return renderX9Trader();
      default:
        return null;
    }
  };

  return (
    <TooltipProvider>
      <div className="space-y-6">
        {/* HEADER */}
        <div>
          <h1 className="text-xl font-semibold">
            {activeTab === "Metatrader 5" ? "MT5" : "X9"} Web Terminal Settings
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Seamlessly configure web terminal for user access.
          </p>
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
