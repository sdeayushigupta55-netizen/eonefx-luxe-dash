import { useState } from "react";
import { Button } from "@/components/ui/button";
import { InputField } from "@/components/form/InputField";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

/* ---------- RICH TEXT TOOLBAR ---------- */
const quillModules = {
  toolbar: [
    [{ font: [] }],
    ["bold", "underline", "italic"],
    [{ size: ["small", false, "large", "huge"] }],
    [{ color: [] }, { background: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ align: [] }],
    ["link", "image", "code-block"],
    ["clean"],
  ],
};

const quillFormats = [
  "font",
  "bold",
  "underline",
  "italic",
  "size",
  "color",
  "background",
  "list",
  "bullet",
  "align",
  "link",
  "image",
  "code-block",
];

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
      <div>
        <label className="text-sm font-medium mb-2 block">
          Disclaimer
        </label>

        <div className="border border-border rounded-md overflow-hidden">
          <ReactQuill
            theme="snow"
            value={disclaimer}
            onChange={setDisclaimer}
            modules={quillModules}
            formats={quillFormats}
          />
        </div>
      </div>

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
