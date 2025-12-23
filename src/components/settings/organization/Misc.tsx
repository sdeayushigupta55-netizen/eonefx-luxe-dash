import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

/* ---------- TOOLTIP LABEL ---------- */
function LabelWithTooltip({
  label,
  tooltip,
}: {
  label: string;
  tooltip: string;
}) {
  return (
    <div className="flex items-center gap-2 mb-1">
      <span className="text-sm font-medium text-white">{label}</span>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Info size={14} className=" cursor-pointer" />
          </TooltipTrigger>
          <TooltipContent className="max-w-xs text-sm">
            {tooltip}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}

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
    <div className="text-white p-6 rounded-lg border border-gray-700 space-y-6">

      {/* DISCLAIMER */}
      <div>
        <LabelWithTooltip
          label="Disclaimer"
          tooltip="General disclaimer shown on client-facing interfaces"
        />

        <div className="border border-gray-700 rounded-md ">
          <ReactQuill
            theme="snow"
            value={disclaimer}
            onChange={setDisclaimer}
            modules={quillModules}
            formats={quillFormats}
            className="text-white"
          />
        </div>
      </div>

      {/* RISK WARNING */}
      <div>
        <LabelWithTooltip
          label="Risk Warning"
          tooltip="Important risk disclosure for users"
        />

        <Input
          value={riskWarning}
          onChange={(e) => setRiskWarning(e.target.value)}
          className="border-gray-700 text-gray-300"
        />
      </div>

      {/* FOOTER */}
      <div>
        <LabelWithTooltip
          label="Footer"
          tooltip="Text displayed at the bottom of public pages"
        />

        <Input
          value={footer}
          onChange={(e) => setFooter(e.target.value)}
          className="border-gray-700 text-gray-300"
        />
      </div>

      {/* SAVE */}
      <Button className="bg-primary">
        Save Changes
      </Button>
    </div>
  );
}
