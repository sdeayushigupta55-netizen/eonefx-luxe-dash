import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Switch } from "@/components/ui/switch";
import { InputField } from "@/components/form/InputField";
import RichTextEditor from "@/components/form/RichTextEditor";
import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { StatusToggle } from "@/components/form/Status";

export default function MaintenanceSettings() {
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [mainStatus, setmainStatus] = useState(false);
  const [secretKey, setSecretKey] = useState("secureAcces123");
  const [title, setTitle] = useState("Site Under Maintenance for Exciting New Updates!");
  const [maintenanceText, setMaintenanceText] = useState(
    "We apologize for the inconvenience! Our site is currently undergoing a major update to bring you an enhanced experience with new features and improvements. We'll be back online shortly. Thank you for your patience!"
  );

  const handleSave = () => {
    console.log({
      maintenanceMode,
      secretKey,
      title,
      maintenanceText,
    });
    alert("Settings saved successfully!");
  };

  return (
    <TooltipProvider>
      <div className="space-y-6 pb-8">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold">Site Maintenance</h1>
        </div>

        <Card >
          <CardContent className="p-6 space-y-6">
            {/* Warning Alert */}
            <Alert className="text-red-500">
              <AlertDescription>
                <span className="font-semibold">Warning:</span> Once you{" "}
                <span className="font-semibold">Enable the Maintenance Mode</span> then you need to remember the{" "}
                <span className="font-semibold">Secret Key</span> to turn back the website.
              </AlertDescription>
            </Alert>

            {/* Maintenance Mode Toggle */}
            <div className="flex items-center justify-between py-4">
              <div className="flex items-center gap-2">
              
<StatusToggle
                  label="Maintenance Mode"
                  tooltip="Toggle to enable or disable the GDPR notice on the site"
                  status={mainStatus ? "Active" : "Disabled"}
                  onChange={(s) => setmainStatus(s === "Active")}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Secret Key */}
              <div>
                <InputField
                  label="Secret Key"
                  type="text"
                  name="secret_key"
                  placeholder="Enter secret key"
                  value={secretKey}
                  onChange={(e) => setSecretKey(e.target.value)}
                  
                  tooltip="Secret key required to access the site during maintenance mode"
                />
              </div>

              {/* Title */}
              <div>
                <InputField
                  label="Title"
                  type="text"
                  name="title"
                  placeholder="Enter maintenance title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  
                  tooltip="Title displayed on the maintenance page"
                />
              </div>
            </div>

            {/* Maintenance Text */}
            <div>
              <RichTextEditor
                value={maintenanceText}
                onChange={setMaintenanceText}
                label="Maintenance Text"
                tooltip="Message displayed to users when site is under maintenance"
              />
            </div>

            {/* Save Button */}
            <div className="flex justify-start pt-4">
              <Button onClick={handleSave} className="px-8 bg-primary hover:bg-primary/90 text-primary-foreground">
                Save Changes
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </TooltipProvider>
  );
}