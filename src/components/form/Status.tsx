import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

type Status = "Active" | "Inactive";

interface StatusToggleProps {
  label?: string;
  status: Status;
  onChange: (status: Status) => void;
  tooltip?: string;
}


export function StatusToggle({
  label = "Status",
  status,
  onChange,
  tooltip,
}: StatusToggleProps) {
  const isActive = status === "Active";

  return (
    <div className="flex items-center gap-3">
      <span className="font-medium">{label}</span>

      {tooltip && (
        <Tooltip>
          <TooltipTrigger asChild>
            <Info className="w-4 h-4 cursor-pointer " />
          </TooltipTrigger>
          <TooltipContent>{tooltip}</TooltipContent>
        </Tooltip>
      )}

      {/* TOGGLE */}
      <button
        type="button"
        onClick={() => onChange(isActive ? "Inactive" : "Active")}
        className={cn(
          "w-11 h-6 rounded-full relative transition",
          isActive ? "bg-primary" : "bg-gray-400"
        )}
      >
        <span
          className={cn(
            "absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition",
            isActive && "translate-x-5"
          )}
        />
      </button>

    </div>
  );
}
