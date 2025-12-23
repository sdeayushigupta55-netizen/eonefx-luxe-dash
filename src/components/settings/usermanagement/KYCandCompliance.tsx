import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Key, Pencil } from "lucide-react";

export default function KycAndCompliance() {
  const [activeTab, setActiveTab] = useState("kyc");

  const tabs =[
    {key:"kyc",label:"KYC & Compliance"},
    {key:"permisssions",label:"Permissions"}
    
  ]

  return (
    <div className="space-y-6">
      {/* PAGE TITLE */}
      <h1 className="text-xl font-semibold">KYC & Compliance</h1>
<div className="flex gap-1 flex-wrap">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 rounded-md border transition
              ${
                activeTab === tab.key
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted border-border hover:bg-muted/70"
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>


      {activeTab === "kyc" ? <KycTab /> : <PermissionsTab />}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                                   KYC TAB                                  */
/* -------------------------------------------------------------------------- */

const KycTab = () => {
  return (
    <div className="space-y-6">
     <Card className="border p-2">

        <h2 >Verification Management</h2>
      <h4 className="font-semibold">
Configure and manage verification levels, requirements, and compliance settings for user onboarding.</h4>
</Card>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
       
      {/* LEFT CARD */}
      <Card className="p-6 flex flex-col items-center justify-center text-center">
        <div className="h-24 w-24 rounded-lg bg-muted flex items-center justify-center mb-4">
          🪪
        </div>
        <h3 className="font-semibold">Verification Center</h3>
        <p className="text-sm text-muted-foreground">
          Secure identity verification
        </p>

        <div className="flex gap-4 mt-6 text-xs text-muted-foreground">
          <span className="text-green">● Secure</span>
          <span className="text-blue-500">● Fast</span>
          <span>Compliant</span>
        </div>
      </Card>

      {/* RIGHT SECTION */}
      <div className="lg:col-span-2 space-y-4">
        <KycLevel
          level={1}
          title="Email and Phone verification required"
          status="active"
        />

        <KycLevel
          level={2}
          title="ID verification method"
          status="active"
          manualOption
        />

        <KycLevel
          level={3}
          title="Additional verification requirements"
          status="disabled"
          checkboxLabel="Proof of Documents"
        />
      </div>
    </div>
    </div>
  );
};

type KycLevelProps = {
  level: number;
  title: string;
  status: "active" | "disabled";
  manualOption?: boolean;
  checkboxLabel?: string;
};

const KycLevel = ({
  level,
  title,
  status,
  manualOption,
  checkboxLabel,
}: KycLevelProps) => {
  return (
    <Card className="p-5 space-y-3">
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-semibold">Level {level}</span>
            {status === "active" ? (
              <Badge variant="secondary" className="text-green-500">
                Active
              </Badge>
            ) : (
              <Badge variant="destructive">Disabled</Badge>
            )}
          </div>
          <p className="text-sm text-muted-foreground mt-1">{title}</p>
        </div>

        <Button size="icon" variant="ghost">
          <Pencil size={16} />
        </Button>
      </div>

      <Separator />

      <div className="text-sm font-medium">Requirements</div>

      {manualOption && (
        <div className="flex gap-4">
          <label className="flex items-center gap-2 border border-border rounded-md px-4 py-2 w-full">
            <input type="radio" defaultChecked />
            Manual
          </label>
          <label className="flex items-center gap-2 border border-border rounded-md px-4 py-2 w-full">
            <input type="radio" />
            Automatic
          </label>
        </div>
      )}

      {checkboxLabel && (
        <label className="flex items-center gap-2 border border-border rounded-md px-4 py-2 w-fit">
          <input type="checkbox" defaultChecked />
          {checkboxLabel}
        </label>
      )}
    </Card>
  );
};

/* -------------------------------------------------------------------------- */
/*                              PERMISSIONS TAB                               */
/* -------------------------------------------------------------------------- */

const PermissionsTab = () => {
  const permissions = [
    "Deposit Amount",
    "Withdraw Amount",
    "Internal Transfer Amount",
    "External Transfer Amount",
    "Account Creation",
    "Master IB Request",
  ];

  return (
    <Card className="p-6 space-y-6">
        <Card className="border p-2">

        
      <h4 className="font-semibold">Note: If a permission is enabled, the associated action will be allowed without checking whether the user has completed their KYC. If a permission is disabled, the system will first verify that KYC is completed before allowing the action.These settings will only apply on the user's side.</h4>
</Card>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {permissions.map((item) => (
          <div
            key={item}
            className="flex justify-between items-center border border-border rounded-md px-4 py-3"
          >
            <span className="text-sm">{item}</span>
            <Switch />
          </div>
        ))}
      </div>

      <Button className="w-fit">Save Changes</Button>
    </Card>
  );
};
