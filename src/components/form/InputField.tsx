import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";
import { cn } from "@/lib/utils";

/* ---------------- COMMON PROPS ---------------- */
interface BaseProps {
  label?: string;
  tooltip?: string;
  required?: boolean;
  error?: string;
  className?: string;
}

/* ---------------- INPUT PROPS ---------------- */
type InputProps = BaseProps &
  React.InputHTMLAttributes<HTMLInputElement> & {
    type?: Exclude<string, "textarea">;
  };

/* ---------------- TEXTAREA PROPS ---------------- */
type TextareaProps = BaseProps &
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
    type: "textarea";
  };

/* ---------------- UNION ---------------- */
export type InputFieldProps = InputProps | TextareaProps;

export const InputField = React.forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  InputFieldProps
>((props, ref) => {
  const {
    label,
    tooltip,
    required,
    error,
    className,
    type,
    ...rest
  } = props;

  const isTextarea = type === "textarea";

  return (
    <div className="space-y-1">
      {/* LABEL */}
      {label && (
        <Label className="flex items-center gap-2 ">
          {label}
          {required && <span className="text-red-500">*</span>}

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
        </Label>
      )}

      {/* FIELD */}
      {isTextarea ? (
        <Textarea
          ref={ref as React.Ref<HTMLTextAreaElement>}
          className={cn(
            error && "border-red-500 focus-visible:ring-red-500",
            className
          )}
          {...(rest as TextareaProps)}
        />
      ) : (
        <Input
          ref={ref as React.Ref<HTMLInputElement>}
          type={type}
          className={cn(
            error && "border-red-500 focus-visible:ring-red-500",
            className
          )}
          {...(rest as InputProps)}
        />
      )}

      {/* ERROR */}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
});

InputField.displayName = "InputField";
