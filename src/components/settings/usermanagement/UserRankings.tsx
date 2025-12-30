import { useState } from "react";
import { Pencil, Trash2, Plus, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { InputField } from "@/components/form/InputField";
import RichTextEditor from "@/components/form/RichTextEditor";
import { Badge } from "@/components/ui/badge";
import { StatusToggle } from "@/components/form/Status";

type Ranking = {
  id: number;
  ranking: string;
  icon?: string;
  name: string;
  minEarning: string;
  bonus: string;
  description: string;
  status: boolean;
};
const statusClasses: Record<string, string> = {
  Active: "bg-[#0d2e1e] text-[#4ade80] border border-[#1a5e41]",
  Disabled: "bg-[#2e0f0f] text-[#f87171] border border-[#7f1d1d]",
};
const initialRankings: Ranking[] = [
  { id: 1, ranking: "Bronze", icon: "icon", name: "Bronze", minEarning: "0 USD", bonus: "0 USD", description: "Gain Points On Every Activity", status: true },
  { id: 2, ranking: "Silver", icon: "icon", name: "Silver", minEarning: "100 USD", bonus: "10 USD", description: "Gain More With Silver Rank", status: true },
  { id: 3, ranking: "Gold", icon: "icon", name: "Gold", minEarning: "200 USD", bonus: "20 USD", description: "Exclusive Perks With Gold Rank", status: true },
  { id: 4, ranking: "Platinum", icon: "icon", name: "Platinum", minEarning: "2000 USD", bonus: "50 USD", description: "Highest Level Of Benefits With Platinum Rank", status: true },
];

// Helper function to strip HTML tags
const stripHtml = (html: string): string => {
  const tmp = document.createElement("DIV");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || "";
};

export default function UserRankings() {
  const [rankings, setRankings] = useState<Ranking[]>(initialRankings);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedRanking, setSelectedRanking] = useState<Ranking | null>(null);
  const [mode, setMode] = useState<"add" | "edit">("add");

  // Form state
  const [form, setForm] = useState<any>({
    icon: "",
    ranking: "",
    name: "",
    minDeposit: "",
    minInvest: "",
    minReferral: "",
    minReferralDeposit: "",
    minReferralInvest: "",
    minEarning: "",
    bonus: "",
    description: "",
    status: false,
  });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRichText = (value: string) => {
    setForm({ ...form, description: value });
  };

  const handleStatus = (checked: boolean) => {
    setForm({ ...form, status: checked });
  };

  const handleIconUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setForm({ ...form, icon: URL.createObjectURL(e.target.files[0]) });
    }
  };

  const handleAddRanking = () => {
    // Strip HTML tags from description for display in table
    const cleanDescription = stripHtml(form.description);
    
    if (mode === "edit" && selectedRanking) {
      setRankings(rankings.map(r => 
        r.id === selectedRanking.id 
          ? {
              ...r,
              ranking: form.ranking,
              icon: form.icon,
              name: form.name,
              minEarning: form.minEarning + " USD",
              bonus: form.bonus + " USD",
              description: cleanDescription,
              status: form.status,
            }
          : r
      ));
    } else {
      setRankings([
        ...rankings,
        {
          id: rankings.length + 1,
          ranking: form.ranking,
          icon: form.icon,
          name: form.name,
          minEarning: form.minEarning + " USD",
          bonus: form.bonus + " USD",
          description: cleanDescription,
          status: form.status,
        },
      ]);
    }
    setModalOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setForm({
      icon: "",
      ranking: "",
      name: "",
      minDeposit: "",
      minInvest: "",
      minReferral: "",
      minReferralDeposit: "",
      minReferralInvest: "",
      minEarning: "",
      bonus: "",
      description: "",
      status: false,
    });
    setSelectedRanking(null);
    setMode("add");
  };

  const openAddModal = () => {
    resetForm();
    setMode("add");
    setModalOpen(true);
  };

  const openEditModal = (ranking: Ranking) => {
    setMode("edit");
    setSelectedRanking(ranking);
    setForm({
      icon: ranking.icon || "",
      ranking: ranking.ranking,
      name: ranking.name,
      minDeposit: "",
      minInvest: "",
      minReferral: "",
      minReferralDeposit: "",
      minReferralInvest: "",
      minEarning: ranking.minEarning.replace(" USD", ""),
      bonus: ranking.bonus.replace(" USD", ""),
      description: ranking.description, // Keep plain text
      status: ranking.status,
    });
    setModalOpen(true);
  };

  const openDeleteModal = (ranking: Ranking) => {
    setSelectedRanking(ranking);
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (selectedRanking) {
      setRankings(rankings.filter(r => r.id !== selectedRanking.id));
    }
    setDeleteModalOpen(false);
    setSelectedRanking(null);
  };

  return (
    <div className="space-y-6 h-full flex flex-col overflow-hidden">
      {/* HEADER */}
      <div className="flex items-center justify-between flex-shrink-0">
        <h1 className="text-xl font-semibold">User Rankings</h1>
        <Button onClick={openAddModal} className="flex gap-2">
          <Plus size={16} />
          Add New
        </Button>
      </div>

         {/* TABLE */}
    <Card className="flex-1 flex flex-col overflow-hidden">
      <CardContent className="p-0 flex-1 flex flex-col overflow-hidden">
        {/* Fixed Header */}
        <div className="overflow-x-auto flex-shrink-0">
          <table className="w-full text-left">
            <thead className="bg-muted/60 text-sm">
              <tr>
                <th className="px-6 py-4">RANKING</th>
                <th className="px-6 py-4">RANKING ICON</th>
                <th className="px-6 py-4">RANKING NAME</th>
                <th className="px-6 py-4">MINIMUM EARNING</th>
                <th className="px-6 py-4">BONUS</th>
                <th className="px-6 py-4">DESCRIPTION</th>
                <th className="px-6 py-4">STATUS</th>
                <th className="px-6 py-4">ACTION</th>
              </tr>
            </thead>
          </table>
        </div>
    
        {/* Scrollable Body */}
        <div className="overflow-auto flex-1">
          <table className="w-full text-left">
            <tbody>
              {rankings.map((r) => (
                <tr key={r.id} className="border-t">
                  <td className="px-6 py-4">{r.ranking}</td>
                  <td className="px-6 py-4">
                    {r.icon && r.icon.startsWith("data:") ? (
                      <img src={r.icon} alt="icon" className="w-8 h-8 object-contain" />
                    ) : (
                      r.icon
                    )}
                  </td>
                  <td className="px-6 py-4">{r.name}</td>
                  <td className="px-6 py-4">{r.minEarning}</td>
                  <td className="px-6 py-4">{r.bonus}</td>
                  <td className="px-6 py-4">{r.description}</td>
                  <td className="px-6 py-4">
                    <Badge
                      variant="outline"
                      className={`${statusClasses[r.status ? "Active" : "Disabled"]} rounded-md`}
                    >
                      {r.status ? "Active" : "Disabled"}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => openEditModal(r)}
                      >
                        <Pencil size={14} />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="destructive"
                        onClick={() => openDeleteModal(r)}
                      >
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Fixed Footer */}
        <div className="px-6 py-4 text-sm text-muted-foreground border-t flex-shrink-0">
          Showing 1 to {rankings.length} of {rankings.length} results
        </div>
      </CardContent>
    </Card>
    

      {/* ================= ADD/EDIT MODAL ================= */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <Card className="w-full max-w-4xl bg-card">
            <div className="max-h-[90vh] overflow-y-auto">
              <CardContent className="p-6 space-y-6">
                {/* HEADER */}
                <div className="flex items-center justify-between sticky top-0 bg-card pb-4 border-b z-10">
                  <h2 className="text-2xl font-semibold">
                    {mode === "add" ? "Add New Ranking" : "Edit Ranking"}
                  </h2>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => {
                      setModalOpen(false);
                      resetForm();
                    }}
                  >
                    <X size={20} />
                  </Button>
                </div>

                {/* ICON UPLOAD */}
                <div className="flex flex-col items-center border-2 border-dashed rounded-lg p-8 hover:border-primary/50 transition-colors">
                  <label htmlFor="icon-upload" className="flex flex-col items-center cursor-pointer w-full">
                    {form.icon ? (
                      <div className="relative">
                        <img src={form.icon} alt="icon" className="w-20 h-20 object-contain mb-3 rounded-lg" />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition-opacity rounded-lg">
                          <span className="text-white text-sm">Change Icon</span>
                        </div>
                      </div>
                    ) : (
                      <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                        <Plus size={32} className="text-primary" />
                      </div>
                    )}
                    <span className="text-base font-medium">Upload Ranking Icon</span>
                    <span className="text-sm text-muted-foreground mt-1">PNG, JPG or SVG (max. 2MB)</span>
                    <input 
                      id="icon-upload" 
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      onChange={handleIconUpload} 
                    />
                  </label>
                </div>

                {/* FORM FIELDS */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputField
                    label="Ranking"
                    name="ranking"
                    value={form.ranking}
                    onChange={handleInput}
                    placeholder="Eg: Bronze, Silver, Gold"
                    tooltip="Enter ranking level"
                    required
                  />
                  <InputField
                    label="Ranking Name"
                    name="name"
                    value={form.name}
                    onChange={handleInput}
                    placeholder="Display Name"
                    tooltip="Enter ranking display name"
                    required
                  />
                  <InputField
                    label="Minimum Deposit"
                    name="minDeposit"
                    type="number"
                    value={form.minDeposit}
                    onChange={handleInput}
                    placeholder="0.00"
                    tooltip="Minimum deposit in USD"
                  />
                  <InputField
                    label="Minimum Invest"
                    name="minInvest"
                    type="number"
                    value={form.minInvest}
                    onChange={handleInput}
                    placeholder="0.00"
                    tooltip="Minimum invest in USD"
                  />
                  <InputField
                    label="Minimum Referral"
                    name="minReferral"
                    type="number"
                    value={form.minReferral}
                    onChange={handleInput}
                    placeholder="0"
                    tooltip="Minimum referral count"
                  />
                  <InputField
                    label="Minimum Referral Deposit"
                    name="minReferralDeposit"
                    type="number"
                    value={form.minReferralDeposit}
                    onChange={handleInput}
                    placeholder="0.00"
                    tooltip="Minimum referral deposit in USD"
                  />
                  <InputField
                    label="Minimum Referral Invest"
                    name="minReferralInvest"
                    type="number"
                    value={form.minReferralInvest}
                    onChange={handleInput}
                    placeholder="0.00"
                    tooltip="Minimum referral invest in USD"
                  />
                  <InputField
                    label="Minimum Earning"
                    name="minEarning"
                    type="number"
                    value={form.minEarning}
                    onChange={handleInput}
                    placeholder="0.00"
                    tooltip="Minimum earning in USD"
                    required
                  />
                  <InputField
                    label="Bonus"
                    name="bonus"
                    type="number"
                    value={form.bonus}
                    onChange={handleInput}
                    placeholder="0.00"
                    tooltip="Bonus in USD"
                    required
                  />
                </div>

                {/* DESCRIPTION */}
                <div className="col-span-2">
                  <RichTextEditor 
                    label="Description" 
                    value={form.description} 
                    onChange={handleRichText} 
                  />
                </div>

                {/* STATUS */}
                <div className="border rounded-lg p-4">
                  <StatusToggle
                    label="Status"
                    status={form.status ? "Active" : "Disabled"}
                    onChange={(s) => handleStatus(s === "Active")}
                    tooltip="Enable or disable this ranking"
                  />
                </div>

                {/* ACTIONS */}
                <div className="flex justify-end gap-3 pt-4 border-t sticky bottom-0 bg-card">
                  <Button
                    variant="destructive"
                    onClick={() => {
                      setModalOpen(false);
                      resetForm();
                    }}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleAddRanking}>
                    {mode === "add" ? "Add Ranking" : "Save Changes"}
                  </Button>
                </div>
              </CardContent>
            </div>
          </Card>
        </div>
      )}

      {/* ================= DELETE CONFIRM MODAL ================= */}
      {deleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <Card className="w-full max-w-md">
            <CardContent className="p-8 text-center space-y-6">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-900/30 ring-4 ring-red-900/20">
                <Trash2 className="text-red-500" size={32} />
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl font-semibold">Delete Ranking?</h2>
                <p className="text-muted-foreground">
                  Are you sure you want to delete <span className="font-semibold text-foreground">"{selectedRanking?.name}"</span>? This action cannot be undone.
                </p>
              </div>

              <div className="flex justify-center gap-3 pt-2">
                <Button 
                  variant="outline"
                  onClick={() => setDeleteModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button 
                  variant="destructive" 
                  onClick={confirmDelete}
                >
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}