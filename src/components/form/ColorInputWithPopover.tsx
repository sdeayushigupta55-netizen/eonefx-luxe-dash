import React, { useRef, useState } from "react";
import { SketchPicker } from "react-color";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Info } from "lucide-react";
import { InputField } from "./InputField";

function useClickOutside(ref: React.RefObject<any>, handler: () => void) {
  React.useEffect(() => {
    function listener(event: MouseEvent) {
      if (!ref.current || ref.current.contains(event.target)) return;
      handler();
    }
    document.addEventListener("mousedown", listener);
    return () => document.removeEventListener("mousedown", listener);
  }, [ref, handler]);
}

export function ColorInputWithPopover({
  value,
  onChange,
  label,
  tooltip,
}: {
  value: string;
  onChange: (v: string) => void;
  label?: string;
  tooltip?: string;
}) {
  const [showPicker, setShowPicker] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);

  useClickOutside(pickerRef, () => setShowPicker(false));

  return (
    <div className="w-full">
      {label && (
        <label className="text-sm font-medium flex items-center gap-1 mb-1">
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
      )}
       <div className="relative w-full">
        <InputField
          type="text"
          value={value}
          onChange={e => onChange(e.target.value)}
          className="border rounded px-2 py-1 w-full pr-12"
          placeholder="#000000"
          maxLength={7}
         
        />
        <div
          className="absolute top-1/2 right-2 -translate-y-1/2  h-7 border rounded cursor-pointer"
          style={{ background: value, minWidth: 32 }}
          onClick={() => setShowPicker((v) => !v)}
        />
        {showPicker && (
          <div
            ref={pickerRef}
            className="absolute z-50"
            style={{ right: 0, top: "110%" }}
          >
            <SketchPicker
            className="shadow-lg text-black"
              color={value}
              onChange={(c: { hex: string; }) => onChange(c.hex)}
              disableAlpha
            />
            </div>
        )}
      </div>
    </div>
  );
}
