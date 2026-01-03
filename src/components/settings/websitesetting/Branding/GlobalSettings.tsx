import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { InputField } from "@/components/form/InputField";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Upload } from "lucide-react";

export default function GlobalSettings() {
  const [siteTitle, setSiteTitle] = useState("Brokeret Demo");
  
  // Logo states
  const [desktopLogoDark, setDesktopLogoDark] = useState("https://cdn.brokeret.com/crm-assets/admin/pg/stripe.webp");
  const [desktopLogoLight, setDesktopLogoLight] = useState("https://cdn.brokeret.com/crm-assets/admin/pg/stripe.webp");
  const [mobileLogoDark, setMobileLogoDark] = useState("https://cdn.brokeret.com/crm-assets/admin/pg/stripe.webp");
  const [mobileLogoLight, setMobileLogoLight] = useState("https://cdn.brokeret.com/crm-assets/admin/pg/stripe.webp");
  const [siteFavicon, setSiteFavicon] = useState("https://cdn.brokeret.com/crm-assets/admin/pg/stripe.webp");
  const [loginCover, setLoginCover] = useState("https://cdn.brokeret.com/crm-assets/admin/pg/uniwire.png");
  const [linkThumbnail, setLinkThumbnail] = useState("");
  const [defaultTransactionImage, setDefaultTransactionImage] = useState("");

  const handleFileUpload = (setter: (val: string) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setter(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const logoCards = [
    {
      label: "Desktop Logo (Dark)",
      size: "160 × 40",
      preview: desktopLogoDark,
      setter: setDesktopLogoDark,
      id: "desktop-dark"
    },
    {
      label: "Desktop Logo (Light)",
      size: "160 × 40",
      preview: desktopLogoLight,
      setter: setDesktopLogoLight,
      id: "desktop-light"
    },
    {
      label: "Mobile / Admin Logo (Dark)",
      size: "32 × 32",
      preview: mobileLogoDark,
      setter: setMobileLogoDark,
      id: "mobile-dark"
    },
    {
      label: "Mobile / Admin Logo (Light)",
      size: "32 × 32",
      preview: mobileLogoLight,
      setter: setMobileLogoLight,
      id: "mobile-light"
    },
    {
      label: "Site Favicon",
      size: "32 × 32",
      preview: siteFavicon,
      setter: setSiteFavicon,
      id: "favicon"
    },
    {
      label: "Login/Signup Cover",
      size: "935 × 920",
      preview: loginCover,
      setter: setLoginCover,
      id: "login-cover"
    },
    {
      label: "Link Thumbnail Image",
      size: "1200 × 627",
      preview: linkThumbnail,
      setter: setLinkThumbnail,
      id: "link-thumbnail"
    },
    {
      label: "Default Transaction Image",
      size: "160 × 40",
      preview: defaultTransactionImage,
      setter: setDefaultTransactionImage,
      id: "transaction-image"
    }
  ];

  return (
    <TooltipProvider>
      <div className="space-y-4">
        {/* Site Title - Compact */}
        <div className="w-full max-w-full lg:max-w-2xl">
          <InputField
            label="Site Title"
            name="siteTitle"
            value={siteTitle}
            onChange={(e) => setSiteTitle(e.target.value)}
            placeholder="Enter site title"
            tooltip="The title of your website that appears in browser tabs and search results"
          />
        </div>

        {/* Logo Upload Grid - Compact spacing */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {logoCards.map((card) => (
            <Card key={card.id} className="shadow-card hover-lift border border-border bg-card transition-all duration-200">
              <CardContent className="p-3 sm:p-4 space-y-2 sm:space-y-3">
                {/* Card Header - Compact */}
                <div>
                  <h3 className="text-xs font-medium mb-0.5 truncate">{card.label}</h3>
                  <p className="text-[10px] sm:text-xs text-text-muted">
                    {card.size}
                  </p>
                </div>

                {/* Image Preview - Smaller height */}
                <div className="w-full h-20 sm:h-24 border-2 border-dashed border-border rounded-lg flex items-center justify-center bg-muted/20 overflow-hidden">
                  {card.preview ? (
                    <img
                      src={card.preview}
                      alt={card.label}
                      className="max-h-16 sm:max-h-20 max-w-full object-contain p-1"
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-1 text-text-muted">
                      <Upload size={16} />
                      <span className="text-[10px]">No image</span>
                    </div>
                  )}
                </div>

                {/* Upload Button - Compact */}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload(card.setter)}
                  className="hidden"
                  id={card.id}
                />
                <label htmlFor={card.id} className="block">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full text-xs h-8"
                    type="button"
                    asChild
                  >
                    <span className="cursor-pointer">Choose file</span>
                  </Button>
                </label>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Save Button - Compact */}
        <div className="flex justify-end pt-2">
          <Button className="w-full sm:w-auto px-6">
            Save Changes
          </Button>
        </div>
      </div>
    </TooltipProvider>
  );
}