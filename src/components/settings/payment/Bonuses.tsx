


import { useState } from "react";
import { Plus, MoreVertical, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { Play, Pause, Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";


/* -------------------- CONSTANTS -------------------- */

const tabs = ["Bonuses", "Setting"];



const statusClasses: Record<string, string> = {
  Active: "bg-[#0d2e1e] text-[#4ade80] border border-[#1a5e41]",
  Inactive: "bg-[#2e0f0f] text-[#f87171] border border-[#7f1d1d]",
};

/* -------------------- COMPONENT -------------------- */

export default function DepositMethods() {
  const [activeTab, setActiveTab] = useState("Bonuses");
  const [openAddBonusesModal, setOpenAddBonusesModal] = useState(false);

  const [status, setStatus] = useState(true);
  



  const bonusData = Array.from({ length: 11 }).map((_, i) => ({
    id: i + 1,
    title: `Welcome Bonus ${i + 1}`,
    type: "Signup",
    process: "Automatic",
    applicableBy: "System",
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    accountTypes: "Standard, Pro",
    status: i === 2 ? "Active" : "Inactive",
  }));
  const ITEMS_PER_PAGE = 10;
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(bonusData.length / ITEMS_PER_PAGE);
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const currentData = bonusData.slice(startIndex, endIndex);

  /* -------------------- CARD RENDERERS -------------------- */

  const renderBonuses = () => (
    <div >
      <Card>
        <CardContent className="p-0">
          <table className="w-full text-left">
            <thead className=" text-gray-400">
              <tr>
                <th className="p-3 text-left">Bonus Title</th>
                <th className="p-3 text-left">Type</th>
                <th className="p-3 text-left">Process</th>
                <th className="p-3 text-left">Applicable By</th>
                <th className="p-3 text-left">Start Date</th>
                <th className="p-3 text-left">End Date</th>
                <th className="p-3 text-left">Forex Account Types</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((item) => (
                <tr
                  key={item.id}
                  className="border-t border-border text-sm"
                >
                  <td className="p-3">{item.title}</td>
                  <td className="p-3">{item.type}</td>
                  <td className="p-3">{item.process}</td>
                  <td className="p-3">{item.applicableBy}</td>
                  <td className="p-3">{item.startDate}</td>
                  <td className="p-3">{item.endDate}</td>
                  <td className="p-3">{item.accountTypes}</td>

                  <td className="p-3">
                    <span
                      className={cn(
                        "px-3 py-1 rounded-md text-xs",
                        statusClasses[item.status]
                      )}
                    >
                      {item.status}
                    </span>
                  </td>

                  <td className="p-3">
                    <Button size="icon" variant="ghost">
                      <MoreVertical size={16} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
          <div className="flex items-center justify-between px-4 py-3 text-sm text-muted-foreground">
            {/* LEFT TEXT */}
            <span>
              Showing {startIndex + 1} to{" "}
              {Math.min(endIndex, bonusData.length)} of{" "}
              {bonusData.length} results
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
    </div>
  );



  const renderSetting = () => (
    <Card className="bg-card border border-border">
      <CardContent className="p-6 space-y-6">
        {/* Pending Deposit Limit */}
        <div className="space-y-2 max-w-md">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">
              Referral Bonus
            </label>

            <Tooltip>
              <TooltipTrigger>
                <Info size={14} className="text-muted-foreground cursor-pointer" />
              </TooltipTrigger>
              <TooltipContent>
                Amount awarded to a user for referring a new customer
              </TooltipContent>
            </Tooltip>
          </div>

          <Input
            type="number"
            defaultValue={3}
            className="bg-background border-border"
          />
        </div>
        <div className="space-y-2 max-w-md">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">
              Sign up Bonus
            </label>

            <Tooltip>
              <TooltipTrigger>
                <Info size={14} className="text-muted-foreground cursor-pointer" />
              </TooltipTrigger>
              <TooltipContent>
                Bonus credited to users upon successful registration
              </TooltipContent>
            </Tooltip>
          </div>

          <Input
            type="number"
            defaultValue={3}
            className="bg-background border-border"
          />
        </div>

        {/* Save Button */}
        <Button className="px-6">
          Save Changes
        </Button>
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

        {/* ADD NEW button only for Automatic & Manual */}

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
      <div className="flex gap-3">
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

      {/* ADD Bonuses NEW MODAL */}
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
                <label className="text-sm mb-1 block">Bonus Name</label>
                <Input placeholder="$200 on first deposit" />
              </div>

              {/* Start Date */}
              <div>
                <label className="text-sm mb-1 block">Start Date</label>
                <Input type="date" />
              </div>

              {/* End Date */}
              <div>
                <label className="text-sm mb-1 block">Last Date</label>
                <Input type="date" />
              </div>

              {/* Type */}
              <div>
                <label className="text-sm mb-1 block">Type</label>
                <select className="w-full bg-background border border-border rounded-md px-3 py-2">
                  <option>In Percentage</option>
                  <option>Fixed</option>
                </select>
              </div>

              {/* Bonus Value */}
              <div>
                <label className="text-sm mb-1 block">Bonus Value</label>
                <Input type="number" placeholder="Enter value" />
              </div>

              {/* Process */}
              <div>
                <label className="text-sm mb-1 block">Process</label>
                <select className="w-full bg-background border border-border rounded-md px-3 py-2">
                  <option>On Deposit</option>
                  <option>Manual</option>
                </select>
              </div>

              {/* Applicable By */}
              <div>
                <label className="text-sm mb-1 block">Applicable By</label>
                <select className="w-full bg-background border border-border rounded-md px-3 py-2">
                  <option>Auto Apply</option>
                  <option>Manual</option>
                </select>
              </div>

              {/* Bonus Removal */}
              <div>
                <label className="text-sm mb-1 block">Bonus Removal</label>
                <select className="w-full bg-background border border-border rounded-md px-3 py-2">
                  <option>In Percentage</option>
                  <option>Fixed</option>
                </select>
              </div>

              {/* Bonus Removal Value */}
              <div>
                <label className="text-sm mb-1 block">Bonus Removal Value</label>
                <Input type="number" />
              </div>

              {/* Forex Account Types */}
              <div className="col-span-2">
                <label className="text-sm mb-1 block">Select Forex Account Types</label>
                <select className="w-full bg-background border border-border rounded-md px-3 py-2">
                  <option>Select an Option</option>
                </select>
              </div>

              {/* Description */}
              <div className="col-span-2">
                <label className="text-sm mb-1 block">Description</label>
                <textarea
                  rows={6}
                  className="w-full bg-background border border-border rounded-md px-3 py-2 resize-none"
                />
              </div>

              {/* Terms Link */}
              <div className="col-span-2">
                <label className="text-sm mb-1 block">Terms & Condition Link</label>
                <Input placeholder="https://example.com/terms" />
              </div>

              {/* KYC */}
              <div>
                <label className="text-sm mb-1 block">KYC Verified Upto</label>
                <select className="w-full bg-background border border-border rounded-md px-3 py-2">
                  <option>Level 1</option>
                  <option>Level 2</option>
                </select>
              </div>

              {/* Deposit Terms */}
              <div>
                <label className="text-sm mb-1 block">Deposit Terms</label>
                <select className="w-full bg-background border border-border rounded-md px-3 py-2">
                  <option>On Every Deposit</option>
                  <option>First Deposit Only</option>
                </select>
              </div>

              {/* Status */}
              <div className="flex items-center gap-3 col-span-2">
                <label>Status</label>
                <Switch checked={status} onCheckedChange={setStatus} />
              </div>

            </div>

            {/* FOOTER */}
            <div className="flex justify-end px-6 py-4 border-t border-border">
              <Button className="px-8">Save Changes</Button>
            </div>
          </div>
        </div>
      )}


    </div>
  );
}
