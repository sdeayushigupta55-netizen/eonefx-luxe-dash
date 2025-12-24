import * as React from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from "lucide-react";

interface SelectFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  tooltip?: string;
  options: { label: string; value: string }[];
}

export const SelectField: React.FC<SelectFieldProps> = ({
  label,
  value,
  onChange,
  placeholder,
  tooltip,
  options,
}) => {
  return (
    <div className="space-y-1">
      <label className="text-sm block mb-1 flex items-center gap-2">
        {label}
        {tooltip && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Info className="w-4 h-4 cursor-pointer" />
            </TooltipTrigger>
            <TooltipContent side="right" className="max-w-xs break-words">
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
