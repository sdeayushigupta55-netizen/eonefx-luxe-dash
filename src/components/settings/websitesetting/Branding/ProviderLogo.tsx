import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Upload, Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export default function ProviderLogo() {
  const [isEnabled, setIsEnabled] = useState(true);
  const [logoPreview, setLogoPreview] = useState("https://cdn.brokeret.com/crm-assets/admin/pg/stripe.webp");

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <TooltipProvider>
      <div className="space-y-4 sm:space-y-6">
        {/* Main Card */}
        <Card className="shadow-card border border-border bg-card max-w-md">
          <CardContent className="p-4 sm:p-6 space-y-4 sm:space-y-6">
            {/* Header with Toggle */}
            <div className="flex items-center justify-between">
              <h2 className="text-base sm:text-lg font-semibold">Provider Logo</h2>
              <Switch 
                checked={isEnabled} 
                onCheckedChange={setIsEnabled}
              />
            </div>

            {/* Logo Label with Info Icon */}
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Logo</span>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info size={16} className="cursor-pointer" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Recommended format: PNG, JPG. Max size: 2MB</p>
                </TooltipContent>
              </Tooltip>
            </div>

            {/* Logo Preview */}
            <div className="w-full aspect-[2/1] border-2 border-dashed border-border rounded-lg flex items-center justify-center bg-muted/20 overflow-hidden p-4">
              {logoPreview ? (
                <img
                  src={logoPreview}
                  alt="Provider Logo"
                  className="max-h-full max-w-full object-contain"
                />
              ) : (
                <div className="flex flex-col items-center gap-2 text-muted-foreground">
                  <Upload size={24} />
                  <span className="text-sm">No logo uploaded</span>
                </div>
              )}
            </div>

            {/* Upload Button */}
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
              id="provider-logo-upload"
            />
            <label htmlFor="provider-logo-upload" className="block">
              <Button
                variant="default"
                className="w-full"
                type="button"
                asChild
              >
                <span className="cursor-pointer flex items-center justify-center gap-2">
                  Upload Logo
                </span>
              </Button>
            </label>

            {/* Helper Text */}
            <p className="text-xs sm:text-sm text-muted-foreground">
              Current logo will be replaced with new upload
            </p>

            {/* Save Button */}
            <Button 
              variant="default" 
              className="w-full"
            >
              <svg 
                className="mr-2 h-4 w-4" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M5 13l4 4L19 7" 
                />
              </svg>
              Save Changes
            </Button>

            {/* Note Box */}
            <div className="bg-muted/50 border border-border rounded-lg p-3 sm:p-4">
              <p className="text-xs sm:text-sm text-foreground">
                <span className="font-semibold">Note:</span> When enabled, the logo will be visible in the admin login page footer. When disabled, no logo will be displayed.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </TooltipProvider>
  );
}