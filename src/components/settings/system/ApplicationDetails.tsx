import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Gauge,
  Cpu,
  Building2,
  FileText,
  Shield,
  BarChart3,
} from "lucide-react";

interface Section {
  id: string;
  title: string;
  icon: React.ReactNode;
  fields: { label: string; value: string | React.ReactNode }[];
}

export default function ApplicationDetails() {
  const sections: Section[] = [
    {
      id: "system",
      title: "System Performance",
      icon: <Gauge className="w-5 h-5" />,
      fields: [
        { label: "System Uptime", value: "99.9%" },
        { label: "Average Response Time", value: "120ms" },
        { label: "Resource Utilization", value: <Badge>Optimal</Badge> },
      ],
    },
    {
      id: "technology",
      title: "Technology Platform",
      icon: <Cpu className="w-5 h-5" />,
      fields: [
        { label: "Infrastructure", value: <Badge variant="outline">AWS Enterprise</Badge> },
        { label: "Data Center Region", value: "US-West" },
        { label: "Architecture", value: <Badge variant="outline">Microservices</Badge> },
        { label: "API Gateway", value: <Badge variant="outline">Kong Enterprise</Badge> },
      ],
    },
    {
      id: "company",
      title: "Company Information",
      icon: <Building2 className="w-5 h-5" />,
      fields: [
        { label: "Organization Type", value: <Badge>Enterprise</Badge> },
        { label: "Industry Sector", value: <Badge variant="outline">Financial Services</Badge> },
        { label: "Customer Tier", value: <Badge variant="outline">Premium Broker</Badge> },
        { label: "Support SLA", value: <Badge variant="outline">24/7 Priority</Badge> },
      ],
    },
    {
      id: "license",
      title: "License Information",
      icon: <FileText className="w-5 h-5" />,
      fields: [
        { label: "Subscription Tier", value: <Badge variant="outline">Enterprise Plus</Badge> },
        { label: "Licensed Users", value: "Unlimited" },
        { label: "Next Renewal", value: <Badge variant="outline">Dec 31, 2026</Badge> },
        { label: "User Capacity", value: <Badge>Unlimited Concurrent</Badge> },
      ],
    },
    {
      id: "compliance",
      title: "Compliance & Security",
      icon: <Shield className="w-5 h-5" />,
      fields: [
        { label: "Security Status", value: <Badge>Protected</Badge> },
        { label: "Compliance Level", value: <Badge>SOC 2 Compliant</Badge> },
        { label: "Data Sovereignty", value: <Badge variant="outline">US Compliant</Badge> },
      ],
    },
    {
      id: "analytics",
      title: "Usage Analytics",
      icon: <BarChart3 className="w-5 h-5" />,
      fields: [
        { label: "Active Users", value: <Badge>2.5K</Badge> },
        { label: "API Requests", value: <Badge variant="outline">1.2M per month</Badge> },
        { label: "Storage Usage", value: <Badge>78%</Badge> },
      ],
    },
  ];

  return (
    <div className="space-y-4">
       {/* Header */}
      <div className="border rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">Brokered Demo</h2>
            <p className="text-sm text-muted-foreground">Enterprise CRM Platform</p>
             <Badge variant="outline" className="mt-2">Version 3.0</Badge>
            <Badge variant="outline" className="mt-2">Enterprise License</Badge>
          </div>
        </div>
      </div>

      {/* Application Details Title */}
      <div className="border-b pb-2 flex items-center justify-between">
        <h3 className="text-xl font-semibold">Application Details</h3>
        <Badge>Enterprise Edition</Badge>
      </div>

      {/* Sections - Always Visible */}
      <div className="space-y-2">
        {sections.map((section) => (
          <div
            key={section.id}
            className="border border-border rounded-lg overflow-hidden bg-card"
          >
            {/* Section Header */}
            <div className="w-full flex items-center justify-between p-4 bg-muted/30">
              <div className="flex items-center gap-3">
                {section.icon}
                <span className="font-medium">{section.title}</span>
              </div>
             
            </div>

            {/* Section Content */}
            <div className="px-4 pb-4 space-y-3 pt-4">
              {section.fields.map((field, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-2 hover:bg-muted/30 px-3 rounded transition-colors"
                >
                  <span className="text-sm text-muted-foreground">
                    {field.label}
                  </span>
                  <div className="text-sm font-medium">
                    {typeof field.value === "string" ? (
                      field.value
                    ) : (
                      field.value
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}