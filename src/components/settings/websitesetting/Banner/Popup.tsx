import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { InputField } from "@/components/form/InputField";
import { SelectField } from "@/components/form/SelectField";
import { Check, Info } from "lucide-react";
import { TooltipProvider, Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export default function Popup() {
  const [isActive, setIsActive] = useState(true);
  const [buttonText, setButtonText] = useState("Welcome to AceMax");
  const [buttonLink, setButtonLink] = useState("https://acemaxglobal.laravel.cloud/");
  const [buttonAlignment, setButtonAlignment] = useState("Right");
  const [imagePreview, setImagePreview] = useState<string>("https://demo.brokeret.com/assets/global/images/TPcP6KathDAPry8CAyhY.jpg");

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    console.log({
      isActive,
      buttonText,
      buttonLink,
      buttonAlignment,
      image: imagePreview,
    });
    alert("Changes saved successfully!");
  };

  return (
    <TooltipProvider>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-6">
          <Card className="border-border bg-card h-full">
            <CardContent className="p-6 space-y-6">
              {/* Header with Toggle */}
              <div className="flex items-center justify-between pb-4 border-b border-border">
                <h2 className="text-lg font-semibold">Dashboard Popup</h2>
                <Switch checked={isActive} onCheckedChange={setIsActive} />
              </div>

              {/* Description */}
              <p className="text-sm text-muted-foreground">
                Engage your users effectively with a dashboard popup for updates, announcements, or promotions. Upload an
                image, customize the button text, and add a call-to-action link for further details. Ensure the image meets
                the recommended resolution for a clean and professional appearance.
              </p>

              {/* Image Upload Section */}
              <div className="space-y-3">
                <label className="text-sm font-medium">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="inline-flex items-center gap-1 cursor-pointer">
                        Image
                        <Info className="w-4 h-4 " />
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Tip: Use high-quality visuals to attract more attention!</p>
                    </TooltipContent>
                  </Tooltip>
                </label>
                
                <div className="wrap-custom-file">
                  <input
                    type="file"
                    name="popup_image"
                    id="popup-image"
                    accept=".gif, .jpg, .png"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <label
                    htmlFor="popup-image"
                    className="relative flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors overflow-hidden"
                    style={{
                      backgroundImage: imagePreview ? `url('${imagePreview}')` : 'none',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  >
                    {!imagePreview && (
                      <div className="flex flex-col items-center justify-center space-y-2">
                        <img
                          className="upload-icon w-12 h-12"
                          src="https://demo.brokeret.com/assets/global/materials/upload.svg"
                          alt="Upload"
                        />
                        <span className="text-sm text-muted-foreground">Upload Image</span>
                      </div>
                    )}
                  </label>
                </div>
                <span className="text-xs font-medium text-muted-foreground">
                  Recommended size: 700x700 px for best fit.
                </span>
              </div>

              {/* Button Text */}
              <InputField
                label="Button Text"
                type="text"
                name="popup_btn_text"
                placeholder="e.g., Read More, Learn More, Explore"
                value={buttonText}
                onChange={(e) => setButtonText(e.target.value)}
                tooltip="Text shown on the popup button (e.g., Learn More, Get Started)"
              />

              {/* Button Link */}
              <InputField
                label="Button Link"
                type="text"
                name="popup_btn_link"
                placeholder="e.g., https://example.com"
                value={buttonLink}
                onChange={(e) => setButtonLink(e.target.value)}
                tooltip="URL the button redirects to"
              />

              {/* Button Alignment */}
              <SelectField
                label="Button Alignment"
               
                value={buttonAlignment}
                onChange={(value) => setButtonAlignment(value)}
                options={[
                  { label: "Left", value: "Left" },
                  { label: "Center", value: "Center" },
                  { label: "Right", value: "Right" },
                ]}
                tooltip="Alignment of the button (left, center, right)"
              />

              {/* Save Button */}
              <div className="pt-4">
                <Button
                  onClick={handleSave}
                  className="w-full border-0 flex items-center justify-center gap-2"
                >
                  <Check size={16} />
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </TooltipProvider>
  );
}