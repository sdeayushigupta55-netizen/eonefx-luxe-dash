import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";
import { cn } from "@/lib/utils";

export interface InputFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;            // ✅ optional
  tooltip?: string;
  required?: boolean;
  error?: string;
}

export const InputField = React.forwardRef<
  HTMLInputElement,
  InputFieldProps
>(
  (
    {
      label,
      tooltip,
      required,
      error,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div className="space-y-1">
        {/* LABEL */}
        {label && (
          <Label className="flex items-center gap-2 text-sm">
            {label}
            {required && <span className="text-red-500">*</span>}

            {tooltip && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="w-4 h-4 cursor-pointer " />
                </TooltipTrigger>
                <TooltipContent side="right">
                  {tooltip}
                </TooltipContent>
              </Tooltip>
            )}
          </Label>
        )}

        {/* INPUT */}
        <Input
          ref={ref}
          className={cn(
            error && "border-red-500 focus-visible:ring-red-500",
            className
          )}
          {...props}
        />

        {/* ERROR */}
        {error && (
          <p className="text-xs text-red-500">{error}</p>
        )}
      </div>
    );
  }
);

InputField.displayName = "InputField";
