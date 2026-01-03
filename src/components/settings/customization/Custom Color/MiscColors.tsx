import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ColorInputWithPopover } from "@/components/form/ColorInputWithPopover";
import { Save } from "lucide-react";
import { useState } from "react";

export default function MiscColors() {
  const [primaryColor, setPrimaryColor] = useState("#0f172a");
  const [secondaryColor, setSecondaryColor] = useState("#f1f5f9");
  const [successColor, setSuccessColor] = useState("#0fb60b");
  const [warningColor, setWarningColor] = useState("#ffbb0d");
  const [dangerColor, setDangerColor] = useState("#dc0000");

  const handleSave = () => {
    console.log("Saving miscellaneous colors:", {
      primaryColor,
      secondaryColor,
      successColor,
      warningColor,
      dangerColor,
    });
    // Add your save logic here
  };

  const handleDefaultColors = () => {
    setPrimaryColor("#0f172a");
    setSecondaryColor("#f1f5f9");
    setSuccessColor("#0fb60b");
    setWarningColor("#ffbb0d");
    setDangerColor("#dc0000");
  };

  return (
    <div className="space-y-6">
      <Card className="py-4">
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ColorInputWithPopover
              value={primaryColor}
              onChange={setPrimaryColor}
              label="Primary Color"
              tooltip="Main primary color used throughout the application"
            />
            <ColorInputWithPopover
              value={secondaryColor}
              onChange={setSecondaryColor}
              label="Secondary Color"
              tooltip="Secondary color for supporting elements"
            />
            <ColorInputWithPopover
              value={successColor}
              onChange={setSuccessColor}
              label="Success Color"
              tooltip="Color for success messages and positive actions"
            />
            <ColorInputWithPopover
              value={warningColor}
              onChange={setWarningColor}
              label="Warning Color"
              tooltip="Color for warning messages and cautions"
            />
            <ColorInputWithPopover
              value={dangerColor}
              onChange={setDangerColor}
              label="Danger Color"
              tooltip="Color for error messages and destructive actions"
            />
          </div>

          <div className="flex gap-4 mt-6">
            <Button onClick={handleSave} className="gap-2">
              Save Changes
            </Button>
            <Button variant="outline" onClick={handleDefaultColors}>
              Default Colors
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
       