import React, { useRef, useState } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Info } from "lucide-react";

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
  const [localValue, setLocalValue] = useState(value);

  // Sync local value when prop changes
  React.useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setLocalValue(newValue);
    // Only call onChange if it's a valid hex color
    if (/^#[0-9A-Fa-f]{6}$/.test(newValue) || /^#[0-9A-Fa-f]{3}$/.test(newValue)) {
      onChange(newValue);
    }
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setLocalValue(newValue);
    onChange(newValue);
  };

  return (
    <div className="w-full">
      {label && (
        <label className="text-sm font-medium mb-2 block">
          <span className="inline-flex items-center gap-1">
            {label}
            {tooltip && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="w-4 h-4 cursor-pointer " />
                </TooltipTrigger>
                <TooltipContent side="right" className="max-w-xs">
                  <p className="text-sm">{tooltip}</p>
                </TooltipContent>
              </Tooltip>
            )}
          </span>
        </label>
      )}
      <div className="relative">
        <input
          type="text"
          value={localValue}
          onChange={handleTextChange}
          className="w-full px-3 py-2 border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          placeholder="#000000"
          maxLength={7}
        />
        <span className="absolute right-0 top-1/2 px-3 -translate-y-1/2 h-full flex items-center justify-center">
          <input
            type="color"
            value={localValue}
            onChange={handleColorChange}
            className="w-8 h-8 cursor-pointer rounded border border-input"
          />
        </span>
      </div>
    </div>
  );
}
