import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { InputField } from "@/components/form/InputField";
import { StatusToggle } from "@/components/form/Status";

export default function UserMisc() {
  const [graceEnabled, setGraceEnabled] = useState(true);
  const [graceDays, setGraceDays] = useState(30);

  const handleSave = () => {
    console.log({
      graceEnabled,
      graceDays,
    });
    alert("User misc settings saved");
  };

  return (
    <Card className="bg-card border-border">
      <CardContent className="p-6 space-y-6">
        {/* TOP ROW */}
        <div className="grid grid-cols-2 gap-6 items-center">
          {/* LEFT: GRACE PERIOD TOGGLE */}
          <div>
            <StatusToggle
              label="Grace Period"
              status={graceEnabled ? "Active" : "Disabled"}
              onChange={(s) => setGraceEnabled(s === "Active")}
              tooltip="Enable temporary holding for unverified users"
            />
          </div>

          {/* RIGHT: DAYS INPUT */}
          <div className="space-y-2">
            <InputField
              label="User Removal Grace Period (Days)"
              type="number"
              value={graceDays}
              onChange={(e) => setGraceDays(Number((e.target as HTMLInputElement).value))}
              disabled={!graceEnabled}
              className="max-w-md"
              tooltip="Days before unverified users are removed"
            />
          </div>
        </div>

        {/* NOTE BOX */}
        <div className="rounded-xl bg-muted/40 border border-border p-5">
          <h3 className="font-semibold mb-3">Note:</h3>
          <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
            <li>
              When enabled, new unverified users will be placed in grace period
            </li>
            <li>
              Users automatically exit grace period upon email verification or
              activity
            </li>
            <li>
              Removal grace period defines how many days grace period users
              remain before deletion
            </li>
          </ul>
        </div>

        {/* SAVE BUTTON */}
        <div className="pt-4">
          <Button className="px-8" onClick={handleSave}>Save Changes</Button>
        </div>
      </CardContent>
    </Card>
  );
}