import { useState } from "react";
import { Button } from "@/components/ui/button";
import { InputField } from "@/components/form/InputField";
import RichTextEditor from "@/components/form/RichTextEditor";

export default function Misc() {
  const [disclaimer, setDisclaimer] = useState(
    "This CRM demo is provided for informational purposes only."
  );
  const [riskWarning, setRiskWarning] = useState(
    "Trading in forex and other financial instruments carries a high level of risk."
  );
  const [footer, setFooter] = useState("© 2024 - 2025 Your Broker");

  return (
    <div className="p-6 rounded-lg border border-border space-y-6">

      {/* DISCLAIMER (Rich Text) */}
      <RichTextEditor
        label="Disclaimer"
        value={disclaimer}
        onChange={setDisclaimer}
        tooltip="Displayed in public pages"
      />

      {/* RISK WARNING */}
      <InputField
        label="Risk Warning"
        tooltip="Important risk disclosure for users"
        value={riskWarning}
        onChange={(e) => setRiskWarning(e.target.value)}
      />

      {/* FOOTER */}
      <InputField
        label="Footer"
        tooltip="Text displayed at the bottom of public pages"
        value={footer}
        onChange={(e) => setFooter(e.target.value)}
      />

      {/* SAVE */}
      <Button className="bg-primary">
        Save Changes
      </Button>
    </div>
  );
}
