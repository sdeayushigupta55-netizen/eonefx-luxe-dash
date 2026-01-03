import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ColorInputWithPopover } from "@/components/form/ColorInputWithPopover";
import { Save } from "lucide-react";
import { useState } from "react";

export default function DarkColors() {
  const [bodyColor, setBodyColor] = useState("#0f172a");
  const [baseColor, setBaseColor] = useState("#1e293b");
  const [headerColor, setHeaderColor] = useState("#1e293b");
  const [headerText, setHeaderText] = useState("#f1f5f9");
  const [sidebarColor, setSidebarColor] = useState("#020617");
  const [sidebarText, setSidebarText] = useState("#94a3b8");
  const [activeMenu, setActiveMenu] = useState("#334155");
  const [activeMenuText, setActiveMenuText] = useState("#ffffff");
  const [baseButton, setBaseButton] = useState("#334155");
  const [baseButtonText, setBaseButtonText] = useState("#f1f5f9");
  const [primaryButton, setPrimaryButton] = useState("#60a5fa");
  const [primaryButtonText, setPrimaryButtonText] = useState("#ffffff");

  const handleSave = () => {
    console.log("Saving dark mode colors:", {
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
    setBodyColor("#0f172a");
    setBaseColor("#1e293b");
    setHeaderColor("#1e293b");
    setHeaderText("#f1f5f9");
    setSidebarColor("#020617");
    setSidebarText("#94a3b8");
    setActiveMenu("#334155");
    setActiveMenuText("#ffffff");
    setBaseButton("#334155");
    setBaseButtonText("#f1f5f9");
    setPrimaryButton("#60a5fa");
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
              tooltip="Select the body background color for the dark theme"
            />
            <ColorInputWithPopover
              value={baseColor}
              onChange={setBaseColor}
              label="Base Color"
              tooltip="Select the base color for the dark theme"
            />
            <ColorInputWithPopover
              value={headerColor}
              onChange={setHeaderColor}
              label="Header Color"
              tooltip="Select the header background color for the dark theme"
            />
            <ColorInputWithPopover
              value={headerText}
              onChange={setHeaderText}
              label="Header Text"
              tooltip="Select the header text color for the dark theme"
            />
            <ColorInputWithPopover
              value={sidebarColor}
              onChange={setSidebarColor}
              label="Sidebar Color"
              tooltip="Select the sidebar background color for the dark theme"
            />
            <ColorInputWithPopover
              value={sidebarText}
              onChange={setSidebarText}
              label="Sidebar Text"
              tooltip="Select the sidebar text color for the dark theme"
            />
            <ColorInputWithPopover
              value={activeMenu}
              onChange={setActiveMenu}
              label="Active Menu"
              tooltip="Select the active menu background color for the dark theme"
            />
            <ColorInputWithPopover
              value={activeMenuText}
              onChange={setActiveMenuText}
              label="Active Menu Text"
              tooltip="Select the active menu text color for the dark theme"
            />
            <ColorInputWithPopover
              value={baseButton}
              onChange={setBaseButton}
              label="Base Button"
              tooltip="Select the base button background color for dark mode"
            />
            <ColorInputWithPopover
              value={baseButtonText}
              onChange={setBaseButtonText}
              label="Base Button Text"
              tooltip="Select the base button text color for dark mode"
            />
            <ColorInputWithPopover
              value={primaryButton}
              onChange={setPrimaryButton}
              label="Primary Button"
              tooltip="Select the primary button background color for dark mode"
            />
            <ColorInputWithPopover
              value={primaryButtonText}
              onChange={setPrimaryButtonText}
              label="Primary Button Text"
              tooltip="Select the primary button text color for dark mode"
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
