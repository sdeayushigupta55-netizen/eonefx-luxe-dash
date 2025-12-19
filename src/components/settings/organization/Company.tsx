import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import Branches from "./Branches";
import Departments from "./Departments";
import Designations from "./Designations";
import Misc from "./Misc";
import Permission from "./Permission";

interface CompanyProps {
  defaultTab?: string;
}

export default function Company({ defaultTab = "company" }: CompanyProps) {
  const [activeTab, setActiveTab] = useState(defaultTab);

  // 🔹 Branch modal state (controlled here)
  const [openAddBranchModal, setOpenAddBranchModal] = useState(false);

  const [form, setForm] = useState({
    siteTitle: "Brokeret Demo",
    siteEmail: "info@yourbroker.com",
    newUserNotification: "admin@tdevs.co",
    newStaffNotification: "admin@tdevs.co",
    supportEmail: "support@yourbroker.com",
    companyWebsite: "https://brokeret.com",
    companyPhone: "+1-234-567-890",
    registeredAddress: "123 Broker Street, NY",
    registeredNumber: "9876543210",
    copyrightText: "© Your Broker 2025",
  });

  useEffect(() => {
    setActiveTab(defaultTab);
  }, [defaultTab]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    alert("Settings saved successfully!");
  };

  // INTERNAL TABS
  const tabs = [
    { key: "company", label: "Company" },
    { key: "branches", label: "Branches" },
    { key: "departments", label: "Departments" },
    { key: "designations", label: "Designations" },
    { key: "misc", label: "Misc" },
    { key: "permission", label: "Permission" },
  ];

  // ADD BUTTON CLICK
  const handleAddNew = () => {
    if (activeTab === "branches") {
      setOpenAddBranchModal(true);
    }
  };

  // TAB CONTENT
  const renderContent = () => {
    switch (activeTab) {
      case "company":
        return (
          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-4">
              <InputField label="Site Title" name="siteTitle" value={form.siteTitle} onChange={handleChange} />
              <InputField label="New User Notification" name="newUserNotification" value={form.newUserNotification} onChange={handleChange} />
              <InputField label="Support Email" name="supportEmail" value={form.supportEmail} onChange={handleChange} />
              <InputField label="Company Phone" name="companyPhone" value={form.companyPhone} onChange={handleChange} />
              <InputField label="Registered Number" name="registeredNumber" value={form.registeredNumber} onChange={handleChange} />
            </div>

            <div className="flex flex-col gap-4">
              <InputField label="Site Email" name="siteEmail" value={form.siteEmail} onChange={handleChange} />
              <InputField label="New Staff Notification" name="newStaffNotification" value={form.newStaffNotification} onChange={handleChange} />
              <InputField label="Company Website" name="companyWebsite" value={form.companyWebsite} onChange={handleChange} />
              <InputField label="Registered Address" name="registeredAddress" value={form.registeredAddress} onChange={handleChange} />
              <InputField label="Copyright Text" name="copyrightText" value={form.copyrightText} onChange={handleChange} />
            </div>

            <div className="mt-4 col-span-2">
              <Button onClick={handleSave} className="bg-primary hover:bg-blue-600">
                Save Changes
              </Button>
            </div>
          </div>
        );

      case "branches":
        return (
          <Branches />
        );

      case "departments":
        return <Departments />;

      case "designations":
        return <Designations />;

      case "misc":
        return <Misc />;

      case "permission":
        return <Permission />;

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold capitalize">{activeTab}</h1>

      
      </div>

      {/* INTERNAL TABS */}
      <div className="flex gap-3">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 rounded-md border transition ${
              activeTab === tab.key
                ? "bg-primary text-white border-primary"
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

// 🔹 REUSABLE INPUT FIELD
const InputField = ({ label, name, value, onChange }: any) => (
  <div>
    <label className="text-sm mb-1 block">{label}</label>
    <Input name={name} value={value} onChange={onChange} />
  </div>
);
