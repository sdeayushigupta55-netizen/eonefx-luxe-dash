import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from "lucide-react";
import { useState } from "react";

const fonts = [
  { name: "Inter", category: "Modern & Clean", value: "'Inter', sans-serif" },
  { name: "Lato", category: "Modern & Clean", value: "'Lato', sans-serif" },
  { name: "Montserrat", category: "Modern & Clean", value: "'Montserrat', sans-serif" },
  { name: "Poppins", category: "Modern & Clean", value: "'Poppins', sans-serif" },
  { name: "Roboto", category: "Modern & Clean", value: "'Roboto', sans-serif" },
];

export default function CustomFont() {
  const [selectedFont, setSelectedFont] = useState("'Roboto', sans-serif");

  const handleSave = () => {
    console.log("Saving font:", selectedFont);
    // Add your save logic here
  };

  const previewText =
    "The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs. Jaded zombies quickly raved over mixed-up gym equipment. Sphinx theme jumps. lazy fowl quack.";

  return (
    <div className="space-y-6">
       <h1 className="text-xl font-semibold">Theme Fonts</h1>
      <Card className="py-6">
        <CardContent className="space-y-8">
          {/* Theme Fonts Title */}
          <div>
           

            {/* Preview Text */}
            <div
              className="text-3xl leading-relaxed mb-8 opacity-70"
              style={{ fontFamily: selectedFont }}
            >
              {previewText}
            </div>

            <div className="text-sm text-muted-foreground mb-6">
              Regular • Medium • Semibold • Bold
            </div>
          </div>

          {/* Font Family Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Label className="text-sm font-medium">Font Family</Label>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="w-4 h-4 cursor-pointer" />
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>Choose the primary font family for your application</p>
                </TooltipContent>
              </Tooltip>
            </div>

            <RadioGroup value={selectedFont} onValueChange={setSelectedFont}>
              {fonts.map((font) => (
                <div
                  key={font.value}
                  className="flex items-center space-x-3 rounded-lg border border-input p-4 hover:bg-white/50 cursor-pointer transition-colors"
                  onClick={() => setSelectedFont(font.value)}
                >
                  <RadioGroupItem value={font.value} id={font.value} />
                  <Label
                    htmlFor={font.value}
                    className="flex-1 cursor-pointer"
                  >
                    <div className="font-medium">{font.name}</div>
                    <div className="text-sm ">
                      {font.category}
                    </div>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Save Button */}
          <div>
            <Button onClick={handleSave}>Save Changes</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
