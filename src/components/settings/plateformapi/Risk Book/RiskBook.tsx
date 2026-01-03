import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Pencil, X, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface RiskBookRow {
  id: string;
  riskBook: string;
  groups: string[];
}

const tabs = ["Meta Trader 5"] as const;

export default function RiskBook() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRiskBook, setSelectedRiskBook] = useState<RiskBookRow | null>(null);
  const [selectedGroups, setSelectedGroups] = useState<string>("");
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>("Meta Trader 5");

  const [riskBookData, setRiskBookData] = useState<RiskBookRow[]>([
    { id: "1", riskBook: "A-Book", groups: [] },
    { id: "2", riskBook: "B-Book", groups: [] },
    { id: "3", riskBook: "Hybrid", groups: [] },
    { id: "4", riskBook: "Demo", groups: [] },
    {
      id: "5",
      riskBook: "Un-Assigned",
      groups: ["DemoTest1", "RealTest1", "RealMBFX1AlSw1PrmGLOBAL_USE"],
    },
  ]);

  const availableGroups = [
    { value: "demo-test-1", label: "DemoTest1" },
    { value: "real-test-1", label: "RealTest1" },
    { value: "real-mbfx-1", label: "RealMBFX1AlSw1PrmGLOBAL_USE" },
    { value: "group-a", label: "Group A" },
    { value: "group-b", label: "Group B" },
    { value: "group-c", label: "Group C" },
  ];

  useEffect(() => {
    if (!isModalOpen) {
      setSelectedGroups("");
    }
  }, [isModalOpen]);

  const handleEdit = (riskBook: RiskBookRow) => {
    setSelectedRiskBook(riskBook);
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (selectedRiskBook) {
      const groupsArray = selectedGroups ? [selectedGroups] : [];
      setRiskBookData((prevData) =>
        prevData.map((item) =>
          item.riskBook === selectedRiskBook.riskBook
            ? { ...item, groups: groupsArray }
            : item
        )
      );
      console.log("Saved:", { riskBook: selectedRiskBook.riskBook, groups: groupsArray });
      setIsModalOpen(false);
      setSelectedRiskBook(null);
      setSelectedGroups("");
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRiskBook(null);
    setSelectedGroups("");
  };

  const renderMetaTrader5 = () => (
    <Card>
      <CardContent className="p-0 overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-muted/60 text-sm">
            <tr>
              <th className="p-3">RISK BOOK</th>
              <th className="p-3">GROUPS</th>
              <th className="p-3 text-right">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {riskBookData.map((row) => (
              <tr
                key={row.id}
                className="border-b border-border hover:bg-muted/20 transition"
              >
                <td className="p-3 font-medium">{row.riskBook}</td>
                <td className="p-3">
                  <div className="flex flex-wrap gap-2">
                    {row.groups.length > 0 ? (
                      row.groups.map((group, idx) => (
                        <Badge
                          key={idx}
                          variant="secondary"
                          className="text-xs"
                        >
                          {group}
                        </Badge>
                      ))
                    ) : (
                      <span className="text-sm text-muted-foreground">-</span>
                    )}
                  </div>
                </td>
                <td className="p-3 text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEdit(row)}
                    className="h-8 w-8"
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );

  

  const renderTabContent = () => {
    switch (activeTab) {
      case "Meta Trader 5":
        return renderMetaTrader5();
    
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">All Risk Book</h1>
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

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center">
          <div className="bg-card w-full max-w-md rounded-xl border border-border flex flex-col">
            {/* HEADER */}
            <div className="flex justify-between items-center px-6 py-4 border-border">
              <div>
                <h2 className="text-lg font-semibold">Assign Risk Book</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Enter your information to assign risk book
                </p>
              </div>
              <Button
                size="icon"
                variant="ghost"
                onClick={closeModal}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* BODY */}
            <div className="px-6 py-4 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="riskBook">Risk Book</Label>
                <Input
                  id="riskBook"
                  value={selectedRiskBook?.riskBook || ""}
                  disabled
                  className="bg-muted"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="groups">Select Groups</Label>
                <Select
                  value={selectedGroups}
                  onValueChange={setSelectedGroups}
                >
                  <SelectTrigger id="groups">
                    <SelectValue placeholder="Select an Option" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableGroups.map((group) => (
                      <SelectItem key={group.value} value={group.value}>
                        {group.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* FOOTER */}
            <div className="flex justify-end gap-3 px-6 py-4 border-border">
              <Button
                onClick={closeModal}
                variant="destructive"
              >
                
                Close
              </Button>
              <Button onClick={handleSave}>
                
                Assign Risk Book
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
