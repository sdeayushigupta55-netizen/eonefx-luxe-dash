import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Switch } from "@/components/ui/switch";
import { TooltipProvider } from "@/components/ui/tooltip";
import { InputField } from "@/components/form/InputField";
import { SelectField } from "@/components/form/SelectField";
import { Pencil, Trash2, X, ChevronLeft, ChevronRight } from "lucide-react";
import RiskBook from "../Risk Book/RiskBook";

const tabs = ["Meta Trader 5", "Manual"] as const;

interface GroupData {
  id: number;
  groupId: number;
  group: string;
  currency: string;
  digits: number;
  marginCall: number;
  stopOut: number;
  enabled: boolean;
}

interface ManualGroup {
  id: number;
  group: string;
  currency: string;
  digits: number;
  platform: string;
  status: "Active" | "Disabled";
}

export default function PlatformGroups() {
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>("Meta Trader 5");
  const [showRiskBook, setShowRiskBook] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  // Form state for manual groups
  const [groupName, setGroupName] = useState("");
  const [currency, setCurrency] = useState("");
  const [digits, setDigits] = useState("");
  const [platform, setPlatform] = useState("");
  const [status, setStatus] = useState("active");

  const [mt5Groups, setMt5Groups] = useState<GroupData[]>([
    { id: 1, groupId: 1, group: "Managers\\Administrators", currency: "USD", digits: 2, marginCall: 50, stopOut: 30, enabled: false },
    { id: 2, groupId: 2, group: "Managers\\Dealers", currency: "USD", digits: 2, marginCall: 50, stopOut: 30, enabled: true },
    { id: 3, groupId: 3, group: "Preliminary", currency: "USD", digits: 2, marginCall: 50, stopOut: 30, enabled: true },
    { id: 4, groupId: 4, group: "Real\\Standard", currency: "USD", digits: 2, marginCall: 50, stopOut: 30, enabled: false },
    { id: 5, groupId: 5, group: "Real\\ECN_W", currency: "USD", digits: 2, marginCall: 50, stopOut: 30, enabled: false },
    { id: 6, groupId: 6, group: "Real\\Copytrading_W", currency: "USD", digits: 2, marginCall: 50, stopOut: 30, enabled: false },
    { id: 7, groupId: 7, group: "Real\\MBFX\\COPYTRADING_200_USD_A", currency: "USD", digits: 2, marginCall: 100, stopOut: 30, enabled: false },
    { id: 8, groupId: 8, group: "Real\\MBFX\\COPYTRADING_200_USD_B", currency: "USD", digits: 2, marginCall: 100, stopOut: 30, enabled: false },
    { id: 9, groupId: 9, group: "Real\\MBFX\\COPYTRADING_200_USD_M", currency: "USD", digits: 2, marginCall: 100, stopOut: 30, enabled: false },
    { id: 10, groupId: 10, group: "Real\\MBFX\\COPYTRADING_W", currency: "USD", digits: 2, marginCall: 100, stopOut: 30, enabled: false },
    { id: 11, groupId: 11, group: "Real\\MBFX\\COPYTRADING_fake", currency: "USD", digits: 2, marginCall: 100, stopOut: 30, enabled: false },
  ]);

  const [manualGroups, setManualGroups] = useState<ManualGroup[]>([
    { id: 1, group: "Custom Group 1", currency: "USD", digits: 2, platform: "MT5", status: "Active" },
  ]);

  // Pagination for Meta Trader 5
  const [currentPageMT5, setCurrentPageMT5] = useState(1);
  const pageSizeMT5 = 10;

  const totalItemsMT5 = mt5Groups.length;
  const totalPagesMT5 = Math.ceil(totalItemsMT5 / pageSizeMT5);
  const startIndexMT5 = (currentPageMT5 - 1) * pageSizeMT5;
  const endIndexMT5 = currentPageMT5 * pageSizeMT5;
  const paginatedMT5Data = mt5Groups.slice(startIndexMT5, endIndexMT5);

  const handleNextMT5 = () => {
    if (currentPageMT5 < totalPagesMT5) setCurrentPageMT5((p) => p + 1);
  };

  const handlePrevMT5 = () => {
    if (currentPageMT5 > 1) setCurrentPageMT5((p) => p - 1);
  };

  // Pagination for Manual
  const [currentPageManual, setCurrentPageManual] = useState(1);
  const pageSizeManual = 10;

  const totalItemsManual = manualGroups.length;
  const totalPagesManual = Math.ceil(totalItemsManual / pageSizeManual);
  const startIndexManual = (currentPageManual - 1) * pageSizeManual;
  const endIndexManual = currentPageManual * pageSizeManual;
  const paginatedManualData = manualGroups.slice(startIndexManual, endIndexManual);

  const handleNextManual = () => {
    if (currentPageManual < totalPagesManual) setCurrentPageManual((p) => p + 1);
  };

  const handlePrevManual = () => {
    if (currentPageManual > 1) setCurrentPageManual((p) => p - 1);
  };

  const toggleEnabled = (id: number) => {
    setMt5Groups(groups =>
      groups.map(g => g.id === id ? { ...g, enabled: !g.enabled } : g)
    );
  };

  const handleResetAllGroups = () => {
    // Reset all groups logic
    console.log("Reset all groups");
  };

  const currencyOptions = [
    { label: "USD", value: "usd" },
    { label: "EUR", value: "eur" },
    { label: "GBP", value: "gbp" },
  ];

  const platformOptions = [
    { label: "MT5", value: "mt5" },
    { label: "MT4", value: "mt4" },
  ];

  const statusOptions = [
    { label: "Active", value: "active" },
    { label: "Disabled", value: "disabled" },
  ];

  const resetForm = () => {
    setGroupName("");
    setCurrency("");
    setDigits("");
    setPlatform("");
    setStatus("active");
    setEditIndex(null);
  };

  const closeModal = () => {
    setOpenAddModal(false);
    resetForm();
  };

  const handleSave = () => {
    const newGroup: ManualGroup = {
      id: manualGroups.length + 1,
      group: groupName,
      currency: currency.toUpperCase(),
      digits: parseInt(digits),
      platform: platform.toUpperCase(),
      status: status === "active" ? "Active" : "Disabled",
    };

    if (editIndex !== null) {
      const updated = [...manualGroups];
      updated[editIndex] = newGroup;
      setManualGroups(updated);
    } else {
      setManualGroups([...manualGroups, newGroup]);
    }

    closeModal();
  };

  const handleDelete = (index: number) => {
    setManualGroups(manualGroups.filter((_, i) => i !== index));
  };

  const handleEdit = (index: number) => {
    const group = manualGroups[index];
    setGroupName(group.group);
    setCurrency(group.currency.toLowerCase());
    setDigits(group.digits.toString());
    setPlatform(group.platform.toLowerCase());
    setStatus(group.status === "Active" ? "active" : "disabled");
    setEditIndex(index);
    setOpenAddModal(true);
  };

  if (showRiskBook) {
    return (
      <div>
        <Button
          onClick={() => setShowRiskBook(false)}
          variant="outline"
          className="mb-4"
        >
          ← Back to Platform Groups
        </Button>
        <RiskBook />
      </div>
    );
  }

  const renderMetaTrader5 = () => (
    <Card>
      <CardContent className="p-0 overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-muted/60 text-sm">
            <tr>
              <th className="p-3">GROUP ID</th>
              <th className="p-3">GROUP</th>
              <th className="p-3">CURRENCY</th>
              <th className="p-3">DIGITS</th>
              <th className="p-3">MARGIN CALL</th>
              <th className="p-3">STOP OUT</th>
              <th className="p-3">ENABLE</th>
            </tr>
          </thead>
          <tbody>
            {paginatedMT5Data.map((group) => (
              <tr
                key={group.id}
                className="border-b border-border hover:bg-muted/20 transition"
              >
                <td className="p-3">{group.groupId}</td>
                <td className="p-3 font-medium">{group.group}</td>
                <td className="p-3">{group.currency}</td>
                <td className="p-3">{group.digits}</td>
                <td className="p-3">{group.marginCall}</td>
                <td className="p-3">{group.stopOut}</td>
                <td className="p-3">
                  <Switch
                    checked={group.enabled}
                    onCheckedChange={() => toggleEnabled(group.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-between items-center mt-4 px-3 pb-4 text-muted-foreground text-sm">
          <p>Showing {startIndexMT5 + 1} to {Math.min(endIndexMT5, totalItemsMT5)} of {totalItemsMT5} Entries</p>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handlePrevMT5} disabled={currentPageMT5 === 1}>
              <ChevronLeft size={16} />
            </Button>
            <span className="text-foreground">{currentPageMT5} / {totalPagesMT5}</span>
            <Button variant="outline" size="sm" onClick={handleNextMT5} disabled={currentPageMT5 === totalPagesMT5}>
              <ChevronRight size={16} />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderManual = () => (
    <Card>
      <CardContent className="p-0 overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-muted/60 text-sm">
            <tr>
              <th className="p-3">GROUP</th>
              <th className="p-3">CURRENCY</th>
              <th className="p-3">DIGITS</th>
              <th className="p-3">PLATFORM</th>
              <th className="p-3">STATUS</th>
              <th className="p-3">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {paginatedManualData.map((group, index) => (
              <tr
                key={group.id}
                className="border-b border-border hover:bg-muted/20 transition"
              >
                <td className="p-3 font-medium">{group.group}</td>
                <td className="p-3">{group.currency}</td>
                <td className="p-3">{group.digits}</td>
                <td className="p-3">{group.platform}</td>
                <td className="p-3">{group.status}</td>
                <td className="p-3 flex gap-2">
                  <Button size="icon" variant="outline" onClick={() => handleEdit(startIndexManual + index)}>
                    <Pencil size={14} />
                  </Button>
                  <Button
                    size="icon"
                    variant="destructive"
                    onClick={() => handleDelete(startIndexManual + index)}
                  >
                    <Trash2 size={14} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-between items-center mt-4 px-3 pb-4 text-muted-foreground text-sm">
          <p>Showing {startIndexManual + 1} to {Math.min(endIndexManual, totalItemsManual)} of {totalItemsManual} Entries</p>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handlePrevManual} disabled={currentPageManual === 1}>
              <ChevronLeft size={16} />
            </Button>
            <span className="text-foreground">{currentPageManual} / {totalPagesManual}</span>
            <Button variant="outline" size="sm" onClick={handleNextManual} disabled={currentPageManual === totalPagesManual}>
              <ChevronRight size={16} />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case "Meta Trader 5":
        return renderMetaTrader5();
      case "Manual":
        return renderManual();
      default:
        return null;
    }
  };

  return (
    <TooltipProvider>
      <div className="space-y-6">
        {/* HEADER */}
        <div className="flex justify-between items-center flex-wrap gap-4">
          <h1 className="text-xl font-semibold">MT5 Platform Groups</h1>
          
          <div className="flex gap-3">
            <Button
              onClick={() => setShowRiskBook(true)}
              variant="outline"
            >
              All Risk Book
            </Button>
            <Button
              onClick={() => setOpenAddModal(true)}
              variant="default"
            >
              Add Group Manually
            </Button>
            <Button
              onClick={handleResetAllGroups}
              variant="destructive"
            >
              Reset All Groups
            </Button>
          </div>
        </div>

        {/* TABS */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center bg-muted/30 p-4 rounded-xl border">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "px-4 py-2 border rounded-md",
                activeTab === tab && "bg-primary text-primary-foreground"
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* CONTENT */}
        {renderTabContent()}

        {/* ADD GROUP MODAL */}
        {openAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
            <div className="w-full max-w-md rounded-xl bg-card border border-border p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">
                  {editIndex !== null ? "Update Group" : "Add Group Manually"}
                </h2>
                <Button size="icon" variant="ghost" onClick={closeModal}>
                  <X size={18} />
                </Button>
              </div>

              <div className="space-y-4">
                <InputField
                  label="Group Name"
                  placeholder="Enter group name"
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                  tooltip="Enter the name of the trading group"
                />
                <SelectField
                  label="Currency"
                  value={currency}
                  onChange={setCurrency}
                  placeholder="Select Currency"
                  options={currencyOptions}
                  tooltip="Select the base currency for this group"
                />
                <InputField
                  label="Digits"
                  type="number"
                  placeholder="Enter digits"
                  value={digits}
                  onChange={(e) => setDigits(e.target.value)}
                  tooltip="Number of decimal places for pricing"
                />
                <SelectField
                  label="Platform"
                  value={platform}
                  onChange={setPlatform}
                  placeholder="Select Platform"
                  options={platformOptions}
                  tooltip="Select the trading platform for this group"
                />
                <SelectField
                  label="Status"
                  value={status}
                  onChange={setStatus}
                  placeholder="Select Status"
                  options={statusOptions}
                  tooltip="Enable or disable this group"
                />
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <Button variant="destructive" className="px-4" onClick={closeModal}>
                  Cancel
                </Button>
                <Button onClick={handleSave}>{editIndex !== null ? "Update" : "Add"}</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </TooltipProvider>
  );
}
