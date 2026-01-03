import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { TooltipProvider } from "@/components/ui/tooltip";

export default function AuthCover() {
  const [selectedCover, setSelectedCover] = useState<"default" | "custom">("custom");
  const [customCover, setCustomCover] = useState("https://cdn.brokeret.com/crm-assets/admin/pg/uniwire.png");
  const [showSiteLogo, setShowSiteLogo] = useState(true);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCustomCover(reader.result as string);
        setSelectedCover("custom");
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <TooltipProvider>
      <div className="space-y-6">
        {/* Cover Selection Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          {/* Default Cover Card */}
          <Card className={`shadow-card border-2 transition-all duration-200 ${
            selectedCover === "default" 
              ? "border-primary ring-2 ring-primary/20" 
              : "border-border hover:border-primary/50"
          }`}>
            <CardContent className="p-4 md:p-6 space-y-4">
              <h3 className="text-sm md:text-base font-semibold">Default login/signup cover</h3>
              
              {/* Preview Image */}
              <div className="w-full aspect-[16/9] border-2 border-border rounded-lg overflow-hidden bg-white flex items-center justify-center">
                <div className="w-full h-full bg-gradient-to-br from-gray-50 to-gray-100"></div>
              </div>

              {/* Radio Button */}
              <div className="flex items-center gap-3">
                <div
                  onClick={() => setSelectedCover("default")}
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center cursor-pointer transition-all ${
                    selectedCover === "default"
                      ? "border-primary bg-primary"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  {selectedCover === "default" && (
                    <div className="w-2.5 h-2.5 rounded-full bg-white"></div>
                  )}
                </div>
                <span className="text-sm font-medium cursor-pointer" onClick={() => setSelectedCover("default")}>
                  Select Default login/signup cover
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Custom Cover Card */}
          <Card className={`shadow-card border-2 transition-all duration-200 ${
            selectedCover === "custom" 
              ? "border-primary ring-2 ring-primary/20" 
              : "border-border hover:border-primary/50"
          }`}>
            <CardContent className="p-4 md:p-6 space-y-4">
              <h3 className="text-sm md:text-base font-semibold">Custom login/signup cover</h3>
              
              {/* Preview Image */}
              <div className="w-full aspect-[16/9] border-2 border-border rounded-lg overflow-hidden bg-red-600 flex items-center justify-center relative">
                {customCover ? (
                  <img src={customCover} alt="Custom cover" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-white text-sm">No image</span>
                )}
                {customCover && (
                  <div className="absolute top-2 right-2 bg-red-600 text-white text-[10px] px-2 py-1 rounded">
                    Demo Purpose Only
                  </div>
                )}
              </div>

              {/* File Upload */}
              <div className="space-y-2">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="custom-cover-upload"
                />
                <label htmlFor="custom-cover-upload">
                  <Button
                    variant="outline"
                    className="w-full"
                    type="button"
                    asChild
                  >
                    <span className="cursor-pointer">Choose file</span>
                  </Button>
                </label>
                <p className="text-xs text-text-muted">
                  Recommended Size: 935 × 920 pixels, Max size: 2MB
                </p>
              </div>

              {/* Radio Button */}
              <div className="flex items-center gap-3">
                <div
                  onClick={() => setSelectedCover("custom")}
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center cursor-pointer transition-all ${
                    selectedCover === "custom"
                      ? "border-primary bg-primary"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  {selectedCover === "custom" && (
                    <div className="w-2.5 h-2.5 rounded-full bg-white"></div>
                  )}
                </div>
                <span className="text-sm font-medium cursor-pointer" onClick={() => setSelectedCover("custom")}>
                  Select Custom login/signup cover
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Show Site Logo Toggle */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 md:p-6 bg-card border border-border rounded-lg shadow-card">
          <div className="space-y-1">
            <h3 className="text-sm md:text-base font-semibold">Show Site Logo On Login/Signup Cover</h3>
            <p className="text-xs md:text-sm text-text-muted">
              If enabled, the site logo will appear in the middle of the login/signup cover. If disabled, no logo will be shown.
            </p>
          </div>
          <Switch
            checked={showSiteLogo}
            onCheckedChange={setShowSiteLogo}
            className="flex-shrink-0"
          />
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button className="w-full sm:w-auto px-8">
            Save Changes
          </Button>
        </div>
      </div>
    </TooltipProvider>
  );
}