import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { InputField } from "@/components/form/InputField";

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

  const [openAddBranchModal, setOpenAddBranchModal] = useState(false);
  const [openAddDepartmentModal, setOpenAddDepartmentModal] = useState(false);
  const [openAddDesignationModal, setOpenAddDesignationModal] = useState(false);

  const [form, setForm] = useState({
    siteTitle: "Brokeret Demo",
    siteEmail: "info@yourbroker.com",
    newUserNotification: "admin@tdevs.co",
    newStaffNotification: "admin@tdevs.co",
    supportEmail: "support@yourbroker.com",
    companyWebsite: "https://brokeret.com",
    companyPhone: "+1-234-567-890",
    registeredAddress: "123 Broker Street, New York, NY",
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

  const tabs = [
    { key: "company", label: "Company" },
    { key: "branches", label: "Branches" },
    { key: "departments", label: "Departments" },
    { key: "designations", label: "Designations" },
    { key: "misc", label: "Misc" },
    { key: "permission", label: "Permission" },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "company":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* LEFT */}
            <div className="flex flex-col gap-4">
              <InputField label="Site Title" name="siteTitle" value={form.siteTitle} onChange={handleChange} tooltip="Displayed name of your site or portal" />
              <InputField label="New User Notification" name="newUserNotification" value={form.newUserNotification} onChange={handleChange} tooltip="Comma-separated email addresses to notify on new user registration." />
              <InputField label="Support Email" name="supportEmail" value={form.supportEmail} onChange={handleChange} tooltip="Customer support email" type="email" />
              <InputField label="Company Phone" name="companyPhone" value={form.companyPhone} onChange={handleChange} tooltip="Official contact number" />
              <InputField label="Registered Number" name="registeredNumber" value={form.registeredNumber} onChange={handleChange} tooltip="Company legal registration number" />
            </div>

            {/* RIGHT */}
            <div className="flex flex-col gap-4">
              <InputField label="Site Email" name="siteEmail" value={form.siteEmail} onChange={handleChange} tooltip="Emails used for system notifications" />
              <InputField label="New Staff Notification" name="newStaffNotification" value={form.newStaffNotification} onChange={handleChange} tooltip="Emails notified on staff registration" />
              <InputField label="Company Website" name="companyWebsite" value={form.companyWebsite} onChange={handleChange} tooltip="Public website URL" type="url" />
              <InputField label="Registered Address" name="registeredAddress" value={form.registeredAddress} onChange={handleChange} tooltip="Official registered address" />
              <InputField label="Copyright Text" name="copyrightText" value={form.copyrightText} onChange={handleChange} tooltip="Footer copyright text" />
            </div>

            <div className="col-span-1 md:col-span-2">
              <Button onClick={handleSave} className="bg-primary w-full md:w-auto">
                Save Changes
              </Button>
            </div>
          </div>
        );

      case "branches":
        return <Branches openAddModal={openAddBranchModal} setOpenAddModal={setOpenAddBranchModal} />;

      case "departments":
        return <Departments openAddModal={openAddDepartmentModal} setOpenAddModal={setOpenAddDepartmentModal} />;

      case "designations":
        return <Designations openAddModal={openAddDesignationModal} setOpenAddModal={setOpenAddDesignationModal} />;

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
      {/* Header */}
      <div className="flex flex-wrap gap-3 items-center justify-between">
        <h1 className="text-xl font-semibold capitalize">{activeTab}</h1>

        {["branches", "departments", "designations"].includes(activeTab) && (
          <Button
            className="bg-primary"
            onClick={() => {
              if (activeTab === "branches") setOpenAddBranchModal(true);
              if (activeTab === "departments") setOpenAddDepartmentModal(true);
              if (activeTab === "designations") setOpenAddDesignationModal(true);
            }}
          >
            + Add New
          </Button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center bg-muted/30 p-4 rounded-xl border">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 rounded-md border transition whitespace-nowrap ${
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


