import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from "lucide-react";
type RichTextEditorProps = {
  label: string;
  value: string;
  onChange: (val: string) => void;
  tooltip?: string;
};

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

export default function RichTextEditor({
  label,
  value,
  onChange,
  tooltip,
}: RichTextEditorProps) {
  return (
    <div>
     <label className="flex items-center gap-2 ">
          {label}
          

          {tooltip && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="w-4 h-4 cursor-pointer" />
              </TooltipTrigger>
              <TooltipContent side="right" className="max-w-xs break-all whitespace-normal">
                {tooltip}
              </TooltipContent>
            </Tooltip>
          )}
        </label>
      <div className="border border-border rounded-md overflow-hidden">
        <ReactQuill
          theme="snow"
          value={value}
          onChange={onChange}
          modules={quillModules}
          formats={quillFormats}
        />
      </div>
    </div>
  );
}
