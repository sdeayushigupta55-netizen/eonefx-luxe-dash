import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MoreVertical, Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { InputField } from "@/components/form/InputField";
import { SelectField } from "@/components/form/SelectField";
import { StatusToggle } from "@/components/form/Status";
import RichTextEditor from "@/components/form/RichTextEditor";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from "lucide-react";
import { Input } from "@/components/ui/input";

/* -------------------- TYPES -------------------- */

const tabs = ["Bonuses", "Setting"] as const;

type BonusStatus = "Active" | "Disabled";


const statusClasses: Record<string, string> = {
  Active: "bg-[#0d2e1e] text-[#4ade80] border border-[#1a5e41]",
  Disabled: "bg-[#2e0f0f] text-[#f87171] border border-[#7f1d1d]",
};

export default function Bonuses() {
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>("Bonuses");
  const [openAddBonusesModal, setOpenAddBonusesModal] = useState(false);
  const [page, setPage] = useState(1);

  // Form state for the modal
  const [bonusName, setBonusName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [bonusType, setBonusType] = useState("");
  const [bonusValue, setBonusValue] = useState("");
  const [process, setProcess] = useState("");
  const [applicableBy, setApplicableBy] = useState("");
  const [bonusRemovalType, setBonusRemovalType] = useState("");
  const [bonusRemovalValue, setBonusRemovalValue] = useState("");
  const [forexAccountTypes, setForexAccountTypes] = useState<string[]>([]);
  const [description, setDescription] = useState("");
  const [termsLink, setTermsLink] = useState("");
  const [kycLevel, setKycLevel] = useState("");
  const [depositTerms, setDepositTerms] = useState("");
  const [status, setStatus] = useState<"Active" | "Disabled">("Active");
  interface Bonus {
    id: number;
    title: string;
    type: string;
    process: string;
    applicableBy: string;
    startDate: string;
    endDate: string;
    accountTypes: string;
    status: BonusStatus;
  }


  const bonusData: Bonus[] = [
    {
      id: 1,
      title: "200% Deposit Bonus",
      type: "In Percentage",
      process: "On Deposit",
      applicableBy: "Auto Apply",
      startDate: "01-01-2025",
      endDate: "05-01-2025",
      accountTypes: "Standard Account",
      status: "Active",
    },
    {
      id: 2,
      title: "500$ Birthday Bonus",
      type: "Fixed",
      process: "On Birthday",
      applicableBy: "Manually by Admin",
      startDate: "01-01-2025",
      endDate: "31-12-2025",
      accountTypes: "All Accounts",
      status: "Active",
    },
    {
      id: 3,
      title: "100% First Deposit",
      type: "In Percentage",
      process: "On Deposit",
      applicableBy: "Auto Apply",
      startDate: "15-02-2025",
      endDate: "15-03-2025",
      accountTypes: "ECN Account, Standard Account",
      status: "Disabled",
    },
    {
      id: 4,
      title: "50$ Welcome Bonus",
      type: "Fixed",
      process: "On Registration",
      applicableBy: "Auto Apply",
      startDate: "01-01-2025",
      endDate: "31-12-2025",
      accountTypes: "All Accounts",
      status: "Active",
    }
  ];

  /* -------------------- PAGINATION -------------------- */
  const ITEMS_PER_PAGE = 10;
  const totalPages = Math.ceil(bonusData.length / ITEMS_PER_PAGE);

  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentData = bonusData.slice(startIndex, endIndex);

  /* -------------------- RENDER BONUSES -------------------- */

  const renderBonuses = () => (

    <Card >
      <CardContent className="p-0 overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-muted/60 text-sm">
            <tr>
              <th className="p-3 ">TITLE</th>
              <th className="p-3 ">TYPE</th>
              <th className="p-3 ">PROCESS</th>
              <th className="p-3 ">APPLICABLE BY</th>
              <th className="p-3 ">START DATE</th>
              <th className="p-3 ">LAST DATE</th>
              <th className="p-3 ">ACCOUNT TYPES</th>
              <th className="p-3 ">STATUS</th>

            </tr>
          </thead>

          <tbody>
            {currentData.map((bonus) => (
              <tr
                key={bonus.id}
                className="border-b border-border hover:bg-muted/20 transition"
              >
                <td className="p-3 font-medium">{bonus.title}</td>
                <td className="p-3">{bonus.type}</td>
                <td className="p-3">{bonus.process}</td>
                <td className="p-3">{bonus.applicableBy}</td>
                <td className="p-3">{bonus.startDate}</td>
                <td className="p-3">{bonus.endDate}</td>
                <td className="p-3">{bonus.accountTypes}</td>

                <td className="p-3">
                  <Badge
                    variant="outline"
                    className={cn(
                      "px-3 py-1 rounded-full text-xs font-medium",
                      statusClasses[bonus.status]
                    )}
                  >
                    {bonus.status}
                  </Badge>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex items-center justify-between px-4 py-3 text-sm">
          {/* LEFT TEXT */}
          <span>
            Showing {startIndex + 1} to{" "}
            {Math.min(endIndex, bonusData.length)} of {bonusData.length}{" "}
            results
          </span>

          {/* RIGHT CONTROLS */}
          <div className="flex items-center gap-3">
            <Button
              size="icon"
              variant="ghost"
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
            >
              ‹
            </Button>

            <span className="text-foreground">
              {page} / {totalPages}
            </span>

            <Button
              size="icon"
              variant="ghost"
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
            >
              ›
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>

  );

  const renderSetting = () => (
    <Card className="bg-card border border-border">
      <CardContent className="p-6 space-y-6">
        {/* Referral Bonus */}
        <div className="space-y-2 max-w-md">

          <InputField
            label="Referral Bonus"
            type="number"
            defaultValue={3}
            className="bg-background border-border"
            tooltip=" Amount awarded to a user for referring a new customer"
          />
          <InputField
            label="Sign up Bonus"
            type="number"
            defaultValue={3}
            className="bg-background border-border"
            tooltip="Bonus credited to users upon successful registration"
          />
 </div>
 {/* Save Button */}
        <Button className="px-6">Save Changes</Button>
      </CardContent>
    </Card>
  );

  /* -------------------- TAB SWITCH -------------------- */

  const renderTabContent = () => {
    switch (activeTab) {
      case "Bonuses":
        return renderBonuses();

      case "Setting":
        return renderSetting();
      default:
        return null;
    }
  };

  /* -------------------- JSX -------------------- */

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        {/* Dynamic Title */}
        <h1 className="text-xl font-semibold">
          {activeTab === "Bonuses" && "All Bonuses"}
          {activeTab === "Setting" && "Bonuse Settings"}
        </h1>

        {/* ADD NEW button only for Bonuses */}
        {activeTab === "Bonuses" && (
          <Button
            onClick={() => setOpenAddBonusesModal(true)}
            className="gap-2"
          >
            <Plus size={16} />
            ADD NEW
          </Button>
        )}
      </div>

      {/* TABS */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center bg-muted/30 p-4 rounded-xl border">
        {tabs.map((tab) => (
          <Button
            key={tab}
            variant="ghost"
            onClick={() => setActiveTab(tab)}
            className={cn(
              "px-4 py-2 border rounded-md",
              activeTab === tab && "bg-primary text-primary-foreground"
            )}
          >
            {tab}
          </Button>
        ))}
      </div>

      {/* CONTENT */}
      {renderTabContent()}

      {/* ADD BONUSES NEW MODAL */}
      {openAddBonusesModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center">
          <div className="bg-card w-full max-w-6xl max-h-[90vh] rounded-xl border border-border flex flex-col">
            {/* HEADER */}
            <div className="flex justify-between items-center px-6 py-4 border-b border-border">
              <h2 className="text-lg font-semibold">Create New Bonus</h2>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => setOpenAddBonusesModal(false)}
              >
                <X size={18} />
              </Button>
            </div>

            {/* BODY */}
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 overflow-y-auto">
              {/* Bonus Name */}
              <div className="col-span-2">
                <InputField
                  label="Bonus Name"
                  tooltip="Enter a descriptive name for the bonus (e.g., '$200 on first deposit')"
                  placeholder="$200 on first deposit"
                  value={bonusName}
                  onChange={(e) => setBonusName(e.target.value)}
                />
              </div>

              {/* Start Date */}
              <InputField
                label="Start Date"
                tooltip="Date when the bonus becomes available"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />

              {/* End Date */}
              <InputField
                label="Last Date"
                tooltip="Date when the bonus expires"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />

              {/* Type */}
              <SelectField
                label="Type"
                tooltip="Choose whether bonus is calculated as percentage or fixed amount"
                options={[
                  { label: "In Percentage", value: "percentage" },
                  { label: "Fixed", value: "fixed" },
                ]}
                value={bonusType}
                onChange={setBonusType}
                placeholder="Select bonus type"
              />

              {/* Bonus Value */}
              <InputField
                label="Bonus Value"
                tooltip="Enter the bonus amount or percentage value"
                type="number"
                placeholder="Enter value"
                value={bonusValue}
                onChange={(e) => setBonusValue(e.target.value)}
              />

              {/* Process */}
              <SelectField
                label="Process"
                tooltip="Select when the bonus should be triggered"
                options={[
                  { label: "On Deposit", value: "deposit" },
                  { label: "On Birthday", value: "birthday" },
                  { label: "On Low Balance", value: "low_balance" },
                  { label: "Manual", value: "manual" },
                ]}
                value={process}
                onChange={setProcess}
                placeholder="Select process"
              />

              {/* Applicable By */}
              <SelectField
                label="Applicable By"
                tooltip="Choose if bonus is applied automatically or requires manual approval"
                options={[
                  { label: "Auto Apply", value: "auto" },
                  { label: "Manually by Admin", value: "manual" },
                ]}
                value={applicableBy}
                onChange={setApplicableBy}
                placeholder="Select application method"
              />

              {/* Bonus Removal Type */}
              <SelectField
                label="Bonus Removal"
                tooltip="Choose how bonus is calculated for removal"
                options={[
                  { label: "In Percentage", value: "percentage" },
                  { label: "Fixed", value: "fixed" },
                ]}
                value={bonusRemovalType}
                onChange={setBonusRemovalType}
                placeholder="Select removal type"
              />

              {/* Bonus Removal Value */}
              <InputField
                label="Bonus Removal Value"
                tooltip="Enter the value to be removed from bonus"
                type="number"
                placeholder="Enter removal value"
                value={bonusRemovalValue}
                onChange={(e) => setBonusRemovalValue(e.target.value)}
              />

              {/* Forex Account Types */}
              <div className="col-span-2">
                <SelectField
                  label="Select Forex Account Types"
                  tooltip="Select which account types are eligible for this bonus"
                  isMulti
                  options={[
                    { label: "Standard Account", value: "standard" },
                    { label: "ECN Account", value: "ecn" },
                    { label: "Premium Account", value: "premium" },
                    { label: "VIP Account", value: "vip" },
                  ]}
                  values={forexAccountTypes}
                  onValuesChange={setForexAccountTypes}
                  placeholder="Select account types"
                />
              </div>

              {/* Description */}
              <div className="col-span-2">
                <RichTextEditor
                  label="Description"
                  tooltip="Provide a detailed description of the bonus terms and conditions"
                  value={description}
                  onChange={setDescription}
                />
              </div>

              {/* Terms Link */}
              <div className="col-span-2">
                <InputField
                  label="Terms & Condition Link"
                  tooltip="URL to full terms and conditions page"
                  type="url"
                  placeholder="https://example.com/terms"
                  value={termsLink}
                  onChange={(e) => setTermsLink(e.target.value)}
                />
              </div>

              {/* KYC Level */}
              <SelectField
                label="KYC Verified Upto"
                tooltip="Minimum KYC verification level required to claim bonus"
                options={[
                  { label: "Level 1", value: "level1" },
                  { label: "Level 2", value: "level2" },
                  { label: "Level 3", value: "level3" },
                ]}
                value={kycLevel}
                onChange={setKycLevel}
                placeholder="Select KYC level"
              />

              {/* Deposit Terms */}
              <SelectField
                label="Deposit Terms"
                tooltip="Specify if bonus applies to first deposit only or all deposits"
                options={[
                  { label: "On Every Deposit", value: "every" },
                  { label: "First Deposit Only", value: "first" },
                ]}
                value={depositTerms}
                onChange={setDepositTerms}
                placeholder="Select deposit terms"
              />

              {/* Status */}
              <div className="col-span-2">
                <StatusToggle
                  label="Status"
                  tooltip="Enable or disable this bonus"
                  status={status}
                  onChange={setStatus}
                />
              </div>
            </div>

            {/* FOOTER */}
            <div className="flex justify-end px-6 py-4 gap-3 border-t border-border">
              <Button variant="destructive" onClick={() => setOpenAddBonusesModal(false)}>Cancel</Button>
              <Button className="px-8">Save Changes</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}