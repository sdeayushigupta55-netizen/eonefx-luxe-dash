import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { InputField } from "@/components/form/InputField";
import RichTextEditor from "@/components/form/RichTextEditor";
import { StatusToggle } from "@/components/form/Status";

export default function TemplateSettings() {
    const [showSiteLogo, setShowSiteLogo] = useState<"Active" | "Disabled">("Active");
    const [disclaimer, setDisclaimer] = useState(
        "Please note that this email is part of a demonstration from Brokeret's CRM platform. The contents are purely illustrative and should not be construed as financial advice or actual client communication."
    );
    const [riskWarning, setRiskWarning] = useState(
        "This email contains information on forex trading which carries high risk. This is a demo email and should not be considered actual financial advice. Always consult a professional before making trading decisions."
    );
    const [footer, setFooter] = useState("© 2024 - 2025 Your Broker");

    const handleSaveChanges = () => {
        // Save logic here
        console.log("Saving template settings:", {
            showSiteLogo,
            disclaimer,
            riskWarning,
            footer,
        });
    };

    return (
        <div className="space-y-6">
            <Card>
                <CardContent className="p-6 space-y-6">
                    {/* Show/Hide Site Logo Toggle */}
                    <StatusToggle
                        label="Show/Hide Site Logo In Emails Headers"
                        tooltip="Enable to show or disable to hide the site logo in emails header"
                        status={showSiteLogo}
                        onChange={setShowSiteLogo}
                    />

                    {/* Current Site Logo Preview */}
                    <div>
                        <label className="text-sm font-medium mb-2 flex items-center gap-1">
                            Current Site Logo
                            <span className="text-xs text-muted-foreground ml-1">(Preview of the current site logo used in emails)</span>
                        </label>
                        <div
                            className="border rounded-md bg-white"
                            style={{
                                backgroundImage: "url('https://demo.brokeret.com/assets/global/images/9Ye38RHAQd4712JVthUC.png')",
                                backgroundSize: "contain",
                                backgroundPosition: "center",
                                backgroundRepeat: "no-repeat",
                                height: "150px",
                            }}
                        />
                    </div>

                    {/* Disclaimer */}
                    <RichTextEditor
                        label="Disclaimer"
                        tooltip="Add a general disclaimer message that will appear at the end of each email"
                        value={disclaimer}
                        onChange={setDisclaimer}
                    />

                    {/* Risk Warning */}
                    <InputField
                        label="Risk Warning"
                        tooltip="Include a cautionary statement to alert users of potential financial risks"
                        value={riskWarning}
                        onChange={(e) => setRiskWarning(e.target.value)}
                        placeholder="Risk warning message"
                    />

                    {/* Footer */}
                    <InputField
                        label="Footer"
                        tooltip="Set the default email closing text"
                        value={footer}
                        onChange={(e) => setFooter(e.target.value)}
                        placeholder="Email footer text"
                    />

                    {/* Save Button */}
                    <div className="flex justify-end pt-4">
                        <Button onClick={handleSaveChanges}>
                            Save Changes
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
