import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export default function ScheduleWithdraw() {
  const [schedule, setSchedule] = useState<Record<string, boolean>>(
    Object.fromEntries(days.map((d) => [d, false]))
  );

  const toggleDay = (day: string) => {
    setSchedule((prev) => ({ ...prev, [day]: !prev[day] }));
  };

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-border p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {days.map((day) => (
            <div
              key={day}
              className="flex items-center justify-between rounded-lg border border-border px-5 py-4"
            >
              <span className="text-sm font-medium">{day}</span>
              <Switch checked={schedule[day]} onCheckedChange={() => toggleDay(day)} />
            </div>
          ))}
        </div>

        <div className="mt-6">
          <Button className="px-6">Save Changes</Button>
        </div>
      </div>
    </div>
  );
}