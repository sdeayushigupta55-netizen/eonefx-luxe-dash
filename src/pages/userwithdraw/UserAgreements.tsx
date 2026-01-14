import React from "react";
import { Shield, FileText, User, Clipboard, Flag, Headphones, Layers, Info } from "lucide-react";

const agreements = [
  { icon: Shield, title: "AML Policy", type: "PDF" },
  { icon: FileText, title: "Cookies Policy", type: "PDF" },
  { icon: User, title: "Privacy Policy", type: "PDF" },
  { icon: Clipboard, title: "Client Fund Safety", type: "PDF" },
  { icon: FileText, title: "Client Agreement", type: "PDF" },
  { icon: Headphones, title: "Complaints Handling Policy", type: "PDF" },
  { icon: Layers, title: "IB Partner Agreement", type: "PDF" },
  { icon: FileText, title: "Order Execution Policy", type: "PDF" },
  { icon: Info, title: "Risk Disclosure", type: "PDF" },
  { icon: Flag, title: "US Clients Policy", type: "PDF" },
];

const UserAgreements = () => {
  return (
    <div className="p-6 border border-border rounded-xl bg-background min-h-screen">
      <h2 className="text-xl font-semibold mb-4">Legal Agreements</h2>
      <p className="text-sm text-muted-foreground mb-6">
        Stay informed and compliant; review all legal agreements linked to your profile.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {agreements.map((agreement, index) => (
          <div
            key={index}
            className="flex items-center justify-between bg-card p-4 rounded-lg border border-border shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center gap-4">
              <agreement.icon className="text-muted-foreground h-6 w-6" />
              <div>
                <h3 className="text-sm font-semibold">{agreement.title}</h3>
                <p className="text-xs text-muted-foreground">{agreement.type}</p>
              </div>
            </div>
            <div className="text-muted-foreground">&gt;</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserAgreements;
