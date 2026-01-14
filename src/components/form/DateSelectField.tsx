import React from "react";
import { Calendar } from "lucide-react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";

interface DateSelectFieldProps {
  label?: string;
  placeholder?: string;
  selectedDate?: Date;
  onDateChange?: (date: Date) => void;
}

const DateSelectField: React.FC<DateSelectFieldProps> = ({
  label,
  placeholder = "Select Date",
  selectedDate,
  onDateChange,
}) => {
  return (
    <div className="space-y-1">
      {label && <label className="text-sm font-medium text-foreground">{label}</label>}

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-between",
              !selectedDate && "text-muted-foreground"
            )}
          >
            {selectedDate ? format(selectedDate, "PPP") : placeholder}
            <Calendar className="h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <DayPicker
            mode="single"
            selected={selectedDate}
            onSelect={onDateChange}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DateSelectField;