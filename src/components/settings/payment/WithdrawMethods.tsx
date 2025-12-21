


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

const tabs = ["Automatic", "Manual", "Schedule", "Notification Tune", "Misc"];

const AutodepositMethods = [
  {
    provider: "BridgerPay",
    title: "BridgerPay",
    status: "Active",
    processing: "Instant",
    fee: "0",
    limits: "5 - USD",
    branches: "N/A",
  }
  
];
const MenualdepositMethods = [
  {
    provider: "Bank Transfer - PKR",
    title: "Bank Transfer - PKR",
    status: "Active",
    processing: "Instant",
    fee: "0",
    limits: "10 USD",
    branches: "N/A",
  }
];
const dayswithdrawMethods = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const notificationTunesData = [
  { name: "Bewitched", icon: "🎵", mode: "Play", status: "Inactive" },
  { name: "Crunchy", icon: "🎷", mode: "Stop", status: "Inactive" },
  { name: "Expert Notification", mode: "Play", icon: "🥁", status: "Active" },
  { name: "knock knock", icon: "🎼", mode: "Play", status: "Active" },
  { name: "Silencer", icon: "📼", mode: "Play", status: "Inactive" },
  { name: "Sticky", icon: "📻", mode: "Play", status: "Inactive" },
  { name: "Vopvoopvvoop", icon: "💿", mode: "Play", status: "Inactive" },
];

const statusClasses: Record<string, string> = {
  Active: "bg-[#0d2e1e] text-[#4ade80] border border-[#1a5e41]",
  Inactive: "bg-[#2e0f0f] text-[#f87171] border border-[#7f1d1d]",
};

/* -------------------- COMPONENT -------------------- */

export default function WithdrawMethods() {
  const [activeTab, setActiveTab] = useState("Automatic");
  const [openAddAutoModal, setOpenAddAutoModal] = useState(false);
  const [openAddManualModal, setOpenAddManualModal] = useState(false);
  const [status, setStatus] = useState(true);
  const [globalAccess, setGlobalAccess] = useState(false);
  const [fields, setFields] = useState([]);
  const [customBank, setCustomBank] = useState(false);
  const [tunes, setTunes] = useState(notificationTunesData);

  // Add a new dynamic field
  const handleAddField = () => {
    setFields([...fields, { name: "", type: "Input Text", required: "Required" }]);
  };

  // Remove a field by index
  const handleRemoveField = (index) => {
    const updatedFields = [...fields];
    updatedFields.splice(index, 1);
    setFields(updatedFields);
  };


  const toggleStatus = (index: number) => {
    const updated = [...tunes];
    updated[index].status = updated[index].status === "Active" ? "Inactive" : "Active";
    setTunes(updated);
  };
  const togglePlay = (index: number) => {
    const updated = [...tunes];
    updated[index].mode = updated[index].mode === "Play" ? "Stop" : "Play";
    setTunes(updated);
  };

  /* -------------------- CARD RENDERERS -------------------- */

  const renderAutoDepositCard = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {AutodepositMethods.map((item, index) => (
        <Card key={index} className="border border-border bg-card">
          <CardContent className="p-6 space-y-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground font-semibold">
                {item.provider}
              </span>
              <Button size="icon" variant="ghost">
                <MoreVertical size={16} />
              </Button>
            </div>

            <div className="flex justify-between items-center">
              <h2 className="font-semibold">{item.title}</h2>
              <span
                className={`px-3 py-1 rounded-md text-xs ${statusClasses[item.status]}`}
              >
                {item.status}
              </span>
            </div>

            <div className="text-sm text-muted-foreground space-y-2">
              <div className="flex justify-between">
                <span>Processing Time</span>
                <span>{item.processing}</span>
              </div>
              <div className="flex justify-between">
                <span>Fee</span>
                <span>{item.fee}</span>
              </div>
              <div className="flex justify-between">
                <span>Limits</span>
                <span>{item.limits}</span>
              </div>
              <div className="flex justify-between">
                <span>Branches</span>
                <span>{item.branches}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const renderManualDepositCard = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {MenualdepositMethods.map((item, index) => (
        <Card key={index} className="border border-border bg-card">
          <CardContent className="p-6 space-y-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground font-semibold">
                {item.provider}
              </span>
              <Button size="icon" variant="ghost">
                <MoreVertical size={16} />
              </Button>
            </div>

            <div className="flex justify-between items-center">
              <h2 className="font-semibold">{item.title}</h2>
              <span
                className={`px-3 py-1 rounded-md text-xs ${statusClasses[item.status]}`}
              >
                {item.status}
              </span>
            </div>

            <div className="text-sm text-muted-foreground space-y-2">
              <div className="flex justify-between">
                <span>Processing Time</span>
                <span>Manual Approval</span>
              </div>
              <div className="flex justify-between">
                <span>Fee</span>
                <span>{item.fee}</span>
              </div>
              <div className="flex justify-between">
                <span>Limits</span>
                <span>{item.limits}</span>
              </div>
              <div className="flex justify-between">
                <span>Branches</span>
                <span>{item.branches}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
  const renderScheduleDepositCard = () => (   
   <div className="rounded-xl border border-[#1f2937] p-6">
      {/* Days Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {dayswithdrawMethods.map((day) => (
          <div
            key={day}
            className="flex items-center justify-between rounded-lg border border-[#1f2937]  px-5 py-4"
          >
            <span className="text-sm font-medium text-gray-200">
              {day}
            </span>

            <Switch />
          </div>
        ))}
      </div>

      {/* Save Button */}
      <div className="mt-6">
        <Button className="px-6">
          Save Changes
        </Button>
      </div>
    </div>
  );
  const renderNotificationTune = () => (
    <div className="space-y-4">
      {tunes.map((tune, index) => (
        <div
          key={index}
          className="flex justify-between items-center border border-border rounded-md p-4 bg-card"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">{tune.icon}</span>
            <span className="font-medium">{tune.name}</span>
          </div>

          <div className="flex gap-2">
            <Button
              size="sm"
              variant="normal"
              className="flex items-center gap-2"
              onClick={() => togglePlay(index)}
            >
              {tune.mode === "Play" ? (
                <>
                  <Play size={16} /> Play
                </>
              ) : (
                <>
                  <Pause size={16} /> Stop
                </>
              )}
            </Button>
            <Button
              size="sm"
              variant="normal"
              className={`flex items-center gap-2 ${statusClasses[tune.status]}`}
              onClick={() => toggleStatus(index)}
            >
              {tune.status === "Active" ? "✔ Active" : "✖ Inactive"}
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
  const renderMisc = () => (
    <Card className="bg-card border border-border">
      <CardContent className="p-6 space-y-6">
        {/* Pending Deposit Limit */}
        <div className="space-y-2 max-w-md">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">
              Pending Deposit Limit
            </label>

            <Tooltip>
              <TooltipTrigger>
                <Info size={14} className="text-muted-foreground cursor-pointer" />
              </TooltipTrigger>
              <TooltipContent>
                Max pending deposits allowed per user
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
      case "Automatic":
        return renderAutoDepositCard();
      case "Manual":
        return renderManualDepositCard();
      case "Notification Tune":
        return renderNotificationTune();
      case "Misc":
        return renderMisc();
      case "Schedule":    
        return renderScheduleDepositCard();
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
          {activeTab === "Automatic" && "Automatic Withdraw Method"}
          {activeTab === "Manual" && "Manual Withdraw Method"}
          {activeTab === "Schedule" && "Schedule Withdraw Method"}
          {activeTab === "Notification Tune" && "Notification Tune Settings"}
          {activeTab === "Misc" && "Misc Settings"}
        </h1>

        {/* ADD NEW button only for Automatic & Manual */}
        {(activeTab === "Automatic" || activeTab === "Manual") && (
          <Button
            onClick={() =>
              activeTab === "Manual"
                ? setOpenAddManualModal(true)
                : setOpenAddAutoModal(true)
            }
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

      {/* ADD Auto NEW MODAL */}
      {openAddAutoModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center">
          <div className="bg-card w-full max-w-5xl max-h-[90vh] rounded-xl border border-border flex flex-col">

            {/* MODAL HEADER */}
            <div className="flex justify-between items-center px-6 py-4 border-b border-border">
              <h2 className="text-lg font-semibold">Add Deposit Method</h2>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => setOpenAddAutoModal(false)}
              >
                <X size={18} />
              </Button>
            </div>

            {/* BODY */}
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 overflow-y-auto">


              {/* LOGO */}
              <div className="col-span-2">
                <label className="text-sm text-muted-foreground mb-2 block">
                  Add Method Logo
                </label>
                <div className="h-28 border border-dashed border-border rounded-lg flex flex-col items-center justify-center text-muted-foreground cursor-pointer hover:bg-muted/20">
                  <Plus />
                  <span className="text-sm mt-1">Upload Logo</span>
                </div>
              </div>

              {/* AUTOMATIC GATEWAY */}
              <div>
                <label className="text-sm mb-1 block">Automatic Gateway</label>
                <select className="w-full bg-background border border-border rounded-md px-3 py-2">
                  <option>Select Gateway</option>
                </select>
              </div>

              {/* SUPPORTED CURRENCY */}
              <div>
                <label className="text-sm mb-1 block">
                  Gateway Supported Currency
                </label>
                <select className="w-full bg-background border border-border rounded-md px-3 py-2">
                  <option>Select Currency</option>
                </select>
              </div>

              {/* NAME */}
              <div>
                <label className="text-sm mb-1 block">Name</label>
                <input
                  className="w-full bg-background border border-border rounded-md px-3 py-2"
                  placeholder="Method name"
                />
              </div>

              {/* CHARGES */}
              <div>
                <label className="text-sm mb-1 block">Charges (%)</label>
                <input
                  type="number"
                  className="w-full bg-background border border-border rounded-md px-3 py-2"
                  placeholder="0"
                />
              </div>

              {/* MANUAL RATE */}
              <div className="flex items-center gap-3">
                <label className="text-sm">Manual Conversion Rate</label>
                <Switch checked={status} onCheckedChange={setStatus} />
              </div>

              <div>
                <label className="text-sm mb-1 block">Conversion Rate</label>
                <input
                  className="w-full bg-muted border border-border rounded-md px-3 py-2"
                  placeholder="1 USD ="
                  disabled
                />
              </div>

              {/* SYMBOL */}
              <div>
                <label className="text-sm mb-1 block">Currency Symbol</label>
                <input className="w-full bg-background border border-border rounded-md px-3 py-2" />
              </div>

              {/* MIN */}
              <div>
                <label className="text-sm mb-1 block">Minimum Deposit</label>
                <input className="w-full bg-background border border-border rounded-md px-3 py-2" />
              </div>

              {/* MAX */}
              <div>
                <label className="text-sm mb-1 block">Maximum Deposit</label>
                <input className="w-full bg-background border border-border rounded-md px-3 py-2" />
              </div>

              {/* PROCESSING */}
              <div>
                <label className="text-sm mb-1 block">Processing Time</label>
                <input className="w-full bg-background border border-border rounded-md px-3 py-2" />
              </div>

              {/* COUNTRIES */}
              <div className="col-span-2">
                <label className="text-sm mb-1 block">
                  Select Countries Authorized To Use
                </label>
                <select className="w-full bg-background border border-border rounded-md px-3 py-2">
                  <option>Select an Option</option>
                </select>
              </div>

              {/* BRANCH */}
              <div className="col-span-2">
                <label className="text-sm mb-1 block">Assign Branches</label>
                <select className="w-full bg-background border border-border rounded-md px-3 py-2">
                  <option>Select an Option</option>
                </select>
                <p className="text-xs text-muted-foreground mt-1">
                  Leave empty to make available for all branches.
                </p>
              </div>

              {/* TOGGLES */}
              <div className="flex items-center gap-3">
                <label>Status</label>
                <Switch checked={status} onCheckedChange={setStatus} />
              </div>

              <div className="flex items-center gap-3">
                <label>Global Access</label>
                <Switch checked={globalAccess} onCheckedChange={setGlobalAccess} />
              </div>

            </div>

            {/* MODAL FOOTER */}
            <div className="flex justify-end gap-3 px-6 py-4 border-t border-border">
              <Button variant="outline" onClick={() => setOpenAddAutoModal(false)}>
                Cancel
              </Button>
              <Button>Add Method</Button>
            </div>
          </div>
        </div>
      )}
      {/* ADD MANUAL NEW MODAL  */}
      {openAddManualModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center">
          <div className="bg-card w-full max-w-5xl max-h-[90vh] rounded-xl border border-border flex flex-col">

            {/* HEADER */}
            <div className="flex justify-between items-center px-6 py-4 border-b border-border">
              <h2 className="text-lg font-semibold">Add Manual Method</h2>
              <Button size="icon" variant="ghost" onClick={() => setOpenAddManualModal(false)}>
                <X size={18} />
              </Button>
            </div>

            {/* BODY */}
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 overflow-y-auto">

              {/* Other fields */}
              <div>
                <label className="text-sm mb-1 block">Name</label>
                <input className="w-full bg-background border border-border rounded-md px-3 py-2" />
              </div>
              <div>
                <label className="text-sm mb-1 block">Code Name</label>
                <input className="w-full bg-background border border-border rounded-md px-3 py-2" />
              </div>
              <div>
                <label className="text-sm mb-1 block">Currency</label>
                <select className="w-full bg-background border border-border rounded-md px-3 py-2">
                  <option>Select an Option</option>
                </select>
              </div>
              <div>
                <label className="text-sm mb-1 block">Charges (%)</label>
                <input type="number" className="w-full bg-background border border-border rounded-md px-3 py-2" />
              </div>

              <div className="flex items-center gap-3">
                <label className="text-sm">Manual Conversion Rate</label>
                <Switch checked={status} onCheckedChange={setStatus} />
              </div>

              <div>
                <label className="text-sm mb-1 block">Conversion Rate</label>
                <input disabled className="w-full bg-muted border border-border rounded-md px-3 py-2" placeholder="1 USD =" />
              </div>

              <div>
                <label className="text-sm mb-1 block">Minimum Deposit</label>
                <input className="w-full bg-background border border-border rounded-md px-3 py-2" />
              </div>

              <div>
                <label className="text-sm mb-1 block">Maximum Deposit</label>
                <input className="w-full bg-background border border-border rounded-md px-3 py-2" />
              </div>

              <div>
                <label className="text-sm mb-1 block">Processing Time</label>
                <input className="w-full bg-background border border-border rounded-md px-3 py-2" />
              </div>

              <div>
                <label className="text-sm mb-1 block">Select Countries Authorized To Use</label>
                <select className="w-full bg-background border border-border rounded-md px-3 py-2">
                  <option>Select an Option</option>
                </select>
              </div>

              {/* Add Field Option button */}
              <div className="col-span-2">
                <Button variant="outline" onClick={handleAddField}>Add Field Option</Button>
              </div>

              {/* Dynamic fields */}
              {fields.map((field, index) => (
                <div key={index} className="col-span-2 flex gap-2 items-center">
                  <input
                    className="w-1/3 bg-background border border-border rounded-md px-3 py-2"
                    placeholder="Field Name"
                    value={field.name}
                    onChange={(e) => {
                      const newFields = [...fields];
                      newFields[index].name = e.target.value;
                      setFields(newFields);
                    }}
                  />
                  <select
                    className="w-1/3 bg-background border border-border rounded-md px-3 py-2"
                    value={field.type}
                    onChange={(e) => {
                      const newFields = [...fields];
                      newFields[index].type = e.target.value;
                      setFields(newFields);
                    }}
                  >
                    <option>Input Text</option>
                    <option>Textarea</option>
                    <option>Dropdown</option>
                  </select>
                  <select
                    className="w-1/3 bg-background border border-border rounded-md px-3 py-2"
                    value={field.required}
                    onChange={(e) => {
                      const newFields = [...fields];
                      newFields[index].required = e.target.value;
                      setFields(newFields);
                    }}
                  >
                    <option>Required</option>
                    <option>Optional</option>
                  </select>
                  <Button size="icon" variant="ghost" onClick={() => handleRemoveField(index)}>
                    <X size={18} />
                  </Button>
                </div>
              ))}

              {/* Payment Details */}
              <div className="col-span-2">
                <label className="text-sm mb-1 block">Payment Details</label>
                <div className="h-48 border border-border rounded-md bg-background p-3 text-muted-foreground">
                  Rich text editor here
                </div>
              </div>

              {/* Assign Branches */}
              <div className="col-span-2">
                <label className="text-sm mb-1 block">Assign Branches</label>
                <select className="w-full bg-background border border-border rounded-md px-3 py-2">
                  <option>Select an Option</option>
                </select>
              </div>

              {/* Toggles */}
              <div className="flex items-center gap-3">
                <label>Status</label>
                <Switch checked={status} onCheckedChange={setStatus} />
              </div>

              <div className="flex items-center gap-3">
                <label>Global Access</label>
                <Switch checked={globalAccess} onCheckedChange={setGlobalAccess} />
              </div>

              <div className="flex items-center gap-3">
                <label>Is Custom Requested Bank Details</label>
                <Switch checked={customBank} onCheckedChange={setCustomBank} />
              </div>
            </div>

            {/* FOOTER */}
            <div className="flex justify-end gap-3 px-6 py-4 border-t border-border">
              <Button variant="outline" onClick={() => setOpenAddManualModal(false)}>Cancel</Button>
              <Button>Save Changes</Button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
