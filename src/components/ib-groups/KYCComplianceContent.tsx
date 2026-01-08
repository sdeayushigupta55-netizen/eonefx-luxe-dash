import { useState } from "react";
import { Pencil, Search, Settings2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { kycLevels } from "./sidebarPagesData";

const kycTabs = [
  { id: "kyc-compliance", label: "KYC & Compliance" },
  { id: "permissions", label: "Permissions" },
];

export function KYCComplianceContent() {
  const [activeTab, setActiveTab] = useState("kyc-compliance");

  return (
    <div className="flex-1 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-foreground">KYC & Compliance</h1>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 mb-6">
        {kycTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-colors",
              activeTab === tab.id
                ? "bg-primary text-primary-foreground"
                : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "kyc-compliance" && (
        <>
          {/* Info Banner */}
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 mb-6 flex items-start gap-3">
            <CheckCircle2 className="h-5 w-5 text-blue-400 mt-0.5" />
            <div>
              <h3 className="font-medium text-foreground">Verification Management</h3>
              <p className="text-sm text-muted-foreground">
                Configure and manage verification levels, requirements, and compliance settings for user onboarding.
              </p>
            </div>
          </div>

          {/* Verification Center */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Panel - Verification Center Illustration */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold text-foreground text-center mb-2">
                Verification Center
              </h3>
              <p className="text-sm text-muted-foreground text-center mb-6">
                Secure identity verification
              </p>
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="w-24 h-24 bg-muted/30 rounded-lg flex items-center justify-center">
                    <Search className="h-12 w-12 text-primary" />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <Search className="h-4 w-4 text-primary-foreground" />
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center gap-4 text-xs">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span className="text-muted-foreground">Secure</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-blue-400" />
                  <span className="text-muted-foreground">Fast</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-muted-foreground" />
                  <span className="text-muted-foreground">Compliant</span>
                </div>
              </div>
            </div>

            {/* Right Panel - Levels */}
            <div className="lg:col-span-2 space-y-4">
              {kycLevels.map((level) => (
                <div
                  key={level.id}
                  className="bg-card border border-border rounded-lg p-4"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-muted/50 flex items-center justify-center text-lg font-semibold text-foreground">
                        {level.id}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold text-foreground">{level.name}</h4>
                          <div className="flex items-center gap-1">
                            <div className={cn(
                              "w-2 h-2 rounded-full",
                              level.status === "Active" ? "bg-emerald-400" : "bg-red-400"
                            )} />
                            <span className={cn(
                              "text-xs",
                              level.status === "Active" ? "text-emerald-400" : "text-red-400"
                            )}>
                              {level.status}
                            </span>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{level.description}</p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                          <Settings2 className="h-4 w-4" />
                          <span>Requirements</span>
                        </div>
                        {level.id === 2 && (
                          <RadioGroup defaultValue={level.mode} className="flex gap-4">
                            <div className="flex items-center gap-2">
                              <RadioGroupItem value="manual" id={`manual-${level.id}`} />
                              <Label htmlFor={`manual-${level.id}`} className="text-sm">Manual</Label>
                            </div>
                            <div className="flex items-center gap-2">
                              <RadioGroupItem value="automatic" id={`auto-${level.id}`} />
                              <Label htmlFor={`auto-${level.id}`} className="text-sm">Automatic</Label>
                            </div>
                          </RadioGroup>
                        )}
                        {level.id === 3 && (
                          <div className="flex items-center gap-2">
                            <Checkbox id={`docs-${level.id}`} defaultChecked />
                            <Label htmlFor={`docs-${level.id}`} className="text-sm">Proof of Documents</Label>
                          </div>
                        )}
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {activeTab === "permissions" && (
        <div className="text-center py-12 text-muted-foreground">
          KYC Permissions settings coming soon
        </div>
      )}
    </div>
  );
}
