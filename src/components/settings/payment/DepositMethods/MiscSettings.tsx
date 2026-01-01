import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { InputField } from "@/components/form/InputField";

export default function MiscSettings() {
  return (
    <div className="space-y-6">
     
      <Card>
        <CardContent className="p-6 space-y-3">
            
          <InputField
            label="Pending Deposit Limit"
            type="number"
            defaultValue="3"
            tooltip="Max pending deposits allowed per user"
          />
          <Button className="px-6">Save Changes</Button>
        </CardContent>
      </Card>
    </div>
  );
}