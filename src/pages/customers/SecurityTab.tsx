import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function SecurityTab() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    // Add password change logic here
  };

  return (
    <Card className="bg-muted/30 border p-6">
      <h2 className="text-xl font-semibold text-foreground mb-6">Change Password</h2>
      <form onSubmit={handleChangePassword}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-base font-xs text-foreground mb-2">
              New Password 
            </label>
            <Input
              type="password"
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              className="w-full"
              required
            />
          </div>
          <div>
            <label className="block text-base font-xs text-foreground mb-2">
              Confirm Password
            </label>
            <Input
              type="password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              className="w-full"
              required
            />
          </div>
        </div>
        <div className="flex justify-end">
          <Button type="submit" className="bg-foreground text-background px-10 py-2 font-semibold">
            Change Password
          </Button>
        </div>
      </form>
    </Card>
  );
}

export default SecurityTab;