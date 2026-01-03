import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ColorInputWithPopover } from "@/components/form/ColorInputWithPopover";
import { Save } from "lucide-react";
import { useState } from "react";

export default function LightColors() {
  const [bodyColor, setBodyColor] = useState("#ced1d4");
  const [baseColor, setBaseColor] = useState("#f0eaea");
  const [headerColor, setHeaderColor] = useState("#ffffff");
  const [headerText, setHeaderText] = useState("#0f172a");
  const [sidebarColor, setSidebarColor] = useState("#ffffff");
  const [sidebarText, setSidebarText] = useState("#334155");
  const [activeMenu, setActiveMenu] = useState("#1e293b");
  const [activeMenuText, setActiveMenuText] = useState("#ffffff");
  const [baseButton, setBaseButton] = useState("#f3f4f6");
  const [baseButtonText, setBaseButtonText] = useState("#0f172a");
  const [primaryButton, setPrimaryButton] = useState("#0f172a");
  const [primaryButtonText, setPrimaryButtonText] = useState("#ffffff");

  const handleSave = () => {
    console.log("Saving colors:", {
      bodyColor,
      baseColor,
      headerColor,
      headerText,
      sidebarColor,
      sidebarText,
      activeMenu,
      activeMenuText,
      baseButton,
      baseButtonText,
      primaryButton,
      primaryButtonText,
    });
    // Add your save logic here
  };

  const handleDefaultColors = () => {
    setBodyColor("#ced1d4");
    setBaseColor("#f0eaea");
    setHeaderColor("#ffffff");
    setHeaderText("#0f172a");
    setSidebarColor("#ffffff");
    setSidebarText("#334155");
    setActiveMenu("#1e293b");
    setActiveMenuText("#ffffff");
    setBaseButton("#f3f4f6");
    setBaseButtonText("#0f172a");
    setPrimaryButton("#0f172a");
    setPrimaryButtonText("#ffffff");
  };

  return (
    <div className="space-y-6">
      <Card className="py-4">
        
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ColorInputWithPopover
              value={bodyColor}
              onChange={setBodyColor}
              label="Body Color"
              tooltip="Select the body background color for the light theme"
            />
            <ColorInputWithPopover
              value={baseColor}
              onChange={setBaseColor}
              label="Base Color"
              tooltip="Select the base color for the light theme"
            />
            <ColorInputWithPopover
              value={headerColor}
              onChange={setHeaderColor}
              label="Header Color"
              tooltip="Select the header background color for the light theme"
            />
            <ColorInputWithPopover
              value={headerText}
              onChange={setHeaderText}
              label="Header Text"
              tooltip="Select the header text color for the light theme"
            />
            <ColorInputWithPopover
              value={sidebarColor}
              onChange={setSidebarColor}
              label="Sidebar Color"
              tooltip="Select the sidebar background color for the light theme"
            />
            <ColorInputWithPopover
              value={sidebarText}
              onChange={setSidebarText}
              label="Sidebar Text"
              tooltip="Select the sidebar text color for the light theme"
            />
            <ColorInputWithPopover
              value={activeMenu}
              onChange={setActiveMenu}
              label="Active Menu"
              tooltip="Select the active menu background color for the light theme"
            />
            <ColorInputWithPopover
              value={activeMenuText}
              onChange={setActiveMenuText}
              label="Active Menu Text"
              tooltip="Select the active menu text color for the light theme"
            />
            <ColorInputWithPopover
              value={baseButton}
              onChange={setBaseButton}
              label="Base Button"
              tooltip="Select the base button background color"
            />
            <ColorInputWithPopover
              value={baseButtonText}
              onChange={setBaseButtonText}
              label="Base Button Text"
              tooltip="Select the base button text color"
            />
            <ColorInputWithPopover
              value={primaryButton}
              onChange={setPrimaryButton}
              label="Primary Button"
              tooltip="Select the primary button background color"
            />
            <ColorInputWithPopover
              value={primaryButtonText}
              onChange={setPrimaryButtonText}
              label="Primary Button Text"
              tooltip="Select the primary button text color"
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
