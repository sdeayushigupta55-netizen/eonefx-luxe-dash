import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { User, Lock, Shield, Check, Pencil } from "lucide-react";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const sidebarItems = [
  { id: "overview", label: "Overview", icon: User, path: "/profile" },
  { id: "change-password", label: "Change Password", icon: Lock, path: "/profile/change-password" },
  { id: "2fa-security", label: "2FA Security", icon: Shield, path: "/profile/2fa-security" },
];

export function Profile() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Sidebar - Profile Card */}
        <div className="lg:col-span-1">
          <Card className="bg-card border-border">
            <CardContent className="p-6">
              {/* Avatar */}
              <div className="flex flex-col items-center mb-6">
                <div className="relative">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                    <span className="text-4xl font-bold text-primary-foreground">JD</span>
                  </div>
                  <button className="absolute bottom-2 right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground hover:bg-primary/90 transition-colors">
                    <Pencil className="h-4 w-4" />
                  </button>
                </div>
                <h2 className="text-xl font-bold text-foreground mt-4">Super Admin</h2>
                <p className="text-sm text-muted-foreground">Employee ID:</p>
                <p className="text-sm text-muted-foreground">Member since:</p>
              </div>

              {/* Profile Info */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Department:</span>
                  <span className="text-sm text-foreground">-</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Designation:</span>
                  <span className="text-sm text-foreground">-</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Location:</span>
                  <span className="text-sm text-foreground">United States</span>
                </div>
              </div>

              {/* Navigation */}
              <div className="space-y-2">
                {sidebarItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => navigate(item.path)}
                    className={cn(
                      "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors",
                      currentPath === item.path
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Content - Form */}
        <div className="lg:col-span-2">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-foreground">Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm text-foreground">
                    First Name <span className="text-destructive">*</span>
                  </Label>
                  <Input defaultValue="Super" className="bg-background border-border" />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm text-foreground">
                    Last Name <span className="text-destructive">*</span>
                  </Label>
                  <Input defaultValue="Admin" className="bg-background border-border" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm text-foreground">
                    Nick Name <span className="text-destructive">*</span>
                  </Label>
                  <Input defaultValue="Super Admin" className="bg-background border-border" />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm text-foreground">
                    Email <span className="text-destructive">*</span>
                  </Label>
                  <Input defaultValue="admin@brokeret.com" className="bg-background border-border text-primary" />
                </div>
              </div>

              {/* Personal Details */}
              <div className="pt-4">
                <h3 className="text-lg font-semibold text-foreground mb-4">Personal Details</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm text-foreground">Date Of Birth</Label>
                    <Input type="date" defaultValue="2006-12-19" className="bg-background border-border" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm text-foreground">Gender</Label>
                    <Select defaultValue="male">
                      <SelectTrigger className="bg-background border-border">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="space-y-2">
                    <Label className="text-sm text-foreground">Work Phone Number</Label>
                    <Input placeholder="Enter work phone" className="bg-background border-border" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm text-foreground">Personal Phone Number</Label>
                    <Input placeholder="Enter personal phone" className="bg-background border-border" />
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  <Label className="text-sm text-foreground">Marital Status</Label>
                  <RadioGroup defaultValue="single" className="flex gap-6">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="single" id="single" />
                      <Label htmlFor="single" className="text-sm text-muted-foreground">Single</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="married" id="married" />
                      <Label htmlFor="married" className="text-sm text-muted-foreground">Married</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <Button className="bg-foreground text-background hover:bg-foreground/90">
                  <Check className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
