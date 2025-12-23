import { useState } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import SystemTags from "./SystemTags";
import CustomerGroups from "./CustomerGroups";
import IBGroups from "./IbGroups";
import UserPermission from "./UserPermission";
import UserMisc from "./UserMisc";

/* ✅ CUSTOMER TYPE */
interface Customer {
  name: string;
  email: string;
  group: string;
  status: "Active" | "Inactive";
}

export default function Customer() {
  const [activeTab, setActiveTab] = useState("risk-profile");

  /* ✅ INTERNAL TABS */
  const tabs = [
    { key: "risk-profile", label: "Risk Profile Tags" },
    { key: "system-tags", label: "System Tags" },
    { key: "customer-groups", label: "Customer Groups" },
    { key: "ib-groups", label: "IB Groups" },
    { key: "permission", label: "Permission" },
    { key: "misc", label: "Misc" },
  ];

  const [customers] = useState<Customer[]>([
    {
      name: "Rahul Sharma",
      email: "rahul@gmail.com",
      group: "Retail",
      status: "Active",
    },
    {
      name: "Ankit Verma",
      email: "ankit@gmail.com",
      group: "VIP",
      status: "Active",
    },
    {
      name: "Priya Singh",
      email: "priya@gmail.com",
      group: "Standard",
      status: "Inactive",
    },
  ]);

  /* ✅ TAB CONTENT (SAME PATTERN AS COMPANY) */
  const renderContent = () => {
    switch (activeTab) {
      case "system-tags":
        return <SystemTags />;

      case "customer-groups":
        return <CustomerGroups />;

      case "ib-groups":
        return <IBGroups />;

      case "permission":
        return <UserPermission />;

      case "misc":
        return <UserMisc />;

      case "risk-profile":
      default:
        return (
            
          <Card>
            <CardContent className="p-0">
                
              <table className="w-full text-left">
                <thead className="bg-muted/60 text-muted-foreground text-sm">
                  <tr>
                    <th className="px-6 py-4">NAME</th>
                    <th className="px-6 py-4">EMAIL</th>
                    <th className="px-6 py-4">GROUP</th>
                    <th className="px-6 py-4">STATUS</th>
                    <th className="px-6 py-4 text-right">ACTION</th>
                  </tr>
                </thead>

                <tbody>
                  {customers.map((customer, index) => (
                    <tr
                      key={index}
                      className="border-t border-border hover:bg-muted/30"
                    >
                      <td className="px-6 py-4 font-medium">
                        {customer.name}
                      </td>

                      <td className="px-6 py-4 text-muted-foreground">
                        {customer.email}
                      </td>

                      <td className="px-6 py-4">{customer.group}</td>

                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex rounded-full px-4 py-1 text-sm font-semibold
                            ${
                              customer.status === "Active"
                                ? "bg-green-500/20 text-green-500"
                                : "bg-red-600/20 text-red-500"
                            }`}
                        >
                          {customer.status}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex justify-end gap-2">
                          <Button size="icon" variant="outline">
                            <Pencil size={14} />
                          </Button>
                          <Button size="icon" variant="outline">
                            <Trash2 size={14} />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold capitalize">
          {tabs.find(t => t.key === activeTab)?.label}
        </h1>

        
      </div>

      {/* INTERNAL TABS */}
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

      {renderContent()}
    </div>
    
  );
}
