import * as React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ChevronDown, Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

type Option = {
  label: string;
  value: string;
};

interface SelectFieldProps {
  label: string;
  options: Option[];
  placeholder?: string;
  tooltip?: string;

  /** SINGLE SELECT */
  value?: string;
  onChange?: (value: string) => void;

  /** MULTI SELECT */
  isMulti?: boolean;
  values?: string[];
  onValuesChange?: (values: string[]) => void;
}

export const SelectField = ({
  label,
  options,
  placeholder = "Select option",
  tooltip,

  value,
  onChange,

  isMulti = false,
  values = [],
  onValuesChange,
}: SelectFieldProps) => {
  /* ---------- MULTI (CHECKBOX) ---------- */
  if (isMulti) {
    const toggleValue = (val: string) => {
      if (!onValuesChange) return;

      onValuesChange(
        values.includes(val)
          ? values.filter((v) => v !== val)
          : [...values, val]
      );
    };

    return (
      <div className="space-y-1">
        <label className="text-sm flex items-center gap-2">
          {label}
          {tooltip && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="w-4 h-4 cursor-pointer" />
              </TooltipTrigger>
              <TooltipContent className="whitespace-pre-line break-words max-w-xs">
                {tooltip}
              </TooltipContent>
            </Tooltip>
          )}
        </label>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full justify-between">
              {values.length ? values.join(", ") : placeholder}
              <ChevronDown className="h-4 w-4 opacity-60" />
            </Button>
          </PopoverTrigger>

          <PopoverContent className="w-full space-y-3">
            {options.map((opt) => (
              <label
                key={opt.value}
                className="flex items-center gap-3 cursor-pointer"
              >
                {/* ✅ CHECKBOX */}
                <Checkbox 
                  
                  className="rounded-none"
                  checked={values.includes(opt.value)}
                  onCheckedChange={() => toggleValue(opt.value)}
                />
                <span className="text-sm">{opt.label}</span>
              </label>
            ))}
          </PopoverContent>
        </Popover>
      </div>
    );
  }

  /* ---------- SINGLE SELECT ---------- */
  return (
    <div className="space-y-1">
      <label className="text-sm flex items-center gap-2">
        {label}
       {tooltip && (
  <Tooltip>
    <TooltipTrigger asChild>
      <Info className="w-4 h-4 cursor-pointer" />
    </TooltipTrigger>
    <TooltipContent className="whitespace-pre-line break-words max-w-xs">
      {tooltip}
    </TooltipContent>
  </Tooltip>
)}
      </label>

      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
