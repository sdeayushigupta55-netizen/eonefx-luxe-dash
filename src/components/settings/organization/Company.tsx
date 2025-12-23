import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";

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

  // Modals
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
          <div className="grid grid-cols-2 gap-6">
            {/* LEFT COLUMN */}
            <div className="flex flex-col gap-4">
              <InputField
                label="Site Title"
                name="siteTitle"
                value={form.siteTitle}
                onChange={handleChange}
                tooltip="Displayed name of your site or portal"
              />

              <InputField
                label="New User Notification"
                name="newUserNotification"
                value={form.newUserNotification}
                onChange={handleChange}
                tooltip="Comma-separated email addresses to notify on new user registration. e.g. abc@gmail.com, xyz@gmail.com"
              />

              <InputField
                label="Support Email"
                name="supportEmail"
                value={form.supportEmail}
                onChange={handleChange}
                tooltip="Email address for customer support inquiries"
                type="email"
              />

              <InputField
                label="Company Phone"
                name="companyPhone"
                value={form.companyPhone}
                onChange={handleChange}
                tooltip="Official contact number for the company"
              />

              <InputField
                label="Registered Number"
                name="registeredNumber"
                value={form.registeredNumber}
                onChange={handleChange}
                tooltip="Company's legal registration number"
              />
            </div>

            {/* RIGHT COLUMN */}
            <div className="flex flex-col gap-4">
              <InputField
                label="Site Email"
                name="siteEmail"
                value={form.siteEmail}
                onChange={handleChange}
                tooltip="Comma-separated email addresses used for system notifications. e.g. admin@example.com, support@example.com"
              />

              <InputField
                label="New Staff Notification"
                name="newStaffNotification"
                value={form.newStaffNotification}
                onChange={handleChange}
                tooltip="Comma-separated email addresses to notify on new staff registration. e.g. abc@gmail.com, xyz@gmail.com"
              />

              <InputField
                label="Company Website"
                name="companyWebsite"
                value={form.companyWebsite}
                onChange={handleChange}
                tooltip="Public URL of the company website"
                type="url"
              />

              <InputField
                label="Registered Address"
                name="registeredAddress"
                value={form.registeredAddress}
                onChange={handleChange}
                tooltip="Official address used for registration"
              />

              <InputField
                label="Copyright Text"
                name="copyrightText"
                value={form.copyrightText}
                onChange={handleChange}
                tooltip="Footer text for copyright or legal notice"
              />
            </div>

            <div className="col-span-2 mt-4">
              <Button onClick={handleSave} className="bg-primary">
                Save Changes
              </Button>
            </div>
          </div>
        );

      case "branches":
        return (
          <Branches
            openAddModal={openAddBranchModal}
            setOpenAddModal={setOpenAddBranchModal}
          />
        );

      case "departments":
        return (
          <Departments
            openAddModal={openAddDepartmentModal}
            setOpenAddModal={setOpenAddDepartmentModal}
          />
        );

      case "designations":
        return (
          <Designations
            openAddModal={openAddDesignationModal}
            setOpenAddModal={setOpenAddDesignationModal}
          />
        );

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
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">
          {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
        </h1>

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
      <div className="flex gap-3">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 rounded-md border transition ${
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

/* ================= Reusable Input with Tooltip ================= */

const InputField = ({
  label,
  name,
  value,
  onChange,
  tooltip,
  type = "text",
}: any) => (
  <div className="space-y-1">
    <label className="flex items-center gap-2 text-sm">
      {label}

      {tooltip && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Info size={14} className="cursor-pointer" />
            </TooltipTrigger>
            <TooltipContent side="right" className="max-w-xs break-words">
              {tooltip}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </label>

    <Input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
    />
  </div>
);
