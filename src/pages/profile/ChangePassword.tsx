import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { User, Lock, Shield, Check, Pencil } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const sidebarItems = [
  { id: "overview", label: "Overview", icon: User, path: "/profile" },
  { id: "change-password", label: "Change Password", icon: Lock, path: "/profile/change-password" },
  { id: "2fa-security", label: "2FA Security", icon: Shield, path: "/profile/2fa-security" },
];

export function ChangePassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-foreground mb-6">Change Password</h1>
      
      <Card className="bg-card border-border max-w-3xl">
        <CardContent className="p-6 space-y-6">
          <div className="space-y-2">
            <Label className="text-sm text-foreground">Old Password</Label>
            <Input type="password" placeholder="Enter old password" className="bg-background border-border" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm text-foreground">New Password</Label>
              <Input type="password" placeholder="Enter new password" className="bg-background border-border" />
            </div>
            <div className="space-y-2">
              <Label className="text-sm text-foreground">Confirm Password</Label>
              <Input type="password" placeholder="Confirm new password" className="bg-background border-border" />
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <Button className="bg-foreground text-background hover:bg-foreground/90">
              <Check className="h-4 w-4 mr-2" />
              Change Password
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
