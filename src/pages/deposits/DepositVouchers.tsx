import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Plus, Pencil, Trash2, Copy, Check, X } from "lucide-react";

const vouchers = [
  { id: 1, title: "Test", subtitle: "N9EXO9CLFICJ6Z0hg", code: "QPHYOPXX0QLVGNHR", amount: "20.00", expiryDate: "2025-10-10 00:00", status: "Used", usedBy: "Racheal R", usedByEmail: "rachealjameel@gmail.com", usedByAvatar: "R" },
  { id: 2, title: "Test", subtitle: "", code: "N9EXO9CLFICJ6Z0L", amount: "10,000.00", expiryDate: "2025-08-31 00:00", status: "Expired", usedBy: "", usedByEmail: "", usedByAvatar: "" },
  { id: 3, title: "DEPOSIT VOUCHER TEST", subtitle: "DV", code: "9XYO1Y5CVEOXPOKH", amount: "20.00", expiryDate: "2025-07-03 00:00", status: "Used", usedBy: "", usedByEmail: "", usedByAvatar: "" },
  { id: 4, title: "DEPOSIT USER TEST", subtitle: "DV", code: "PGSQ3B9IAJ9XNDZZ", amount: "10.00", expiryDate: "2025-07-01 00:00", status: "Used", usedBy: "", usedByEmail: "", usedByAvatar: "" },
  { id: 5, title: "Test-1", subtitle: "Test", code: "T4YAGDa223dsf1pQ176de", amount: "20.00", expiryDate: "2025-06-30 00:00", status: "Used", usedBy: "User Brokeret", usedByEmail: "user@brokeret.com", usedByAvatar: "U" },
  { id: 6, title: "Testt", subtitle: "Deposit", code: "56W7HO", amount: "10.00", expiryDate: "2025-06-28 12:00", status: "Used", usedBy: "", usedByEmail: "", usedByAvatar: "" },
  { id: 7, title: "T-2", subtitle: "DEPOSIT", code: "JFJYOJ", amount: "20.00", expiryDate: "2025-06-28 00:00", status: "Used", usedBy: "Sufyan Aslam", usedByEmail: "sufyanhashmi931@gmail.com", usedByAvatar: "S" },
  { id: 8, title: "Test-2", subtitle: "Test", code: "34IPICUJUXKKULLC", amount: "10.00", expiryDate: "2025-06-28 00:00", status: "Expired", usedBy: "", usedByEmail: "", usedByAvatar: "" },
];

export default function DepositVouchers() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Used': return 'bg-muted text-muted-foreground';
      case 'Expired': return 'bg-red-500/20 text-red-400';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold text-foreground">Deposit Vouchers</h1>
          <Button 
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
            onClick={() => setIsCreateModalOpen(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Voucher
          </Button>
        </div>

        {/* Vouchers Table */}
        <div className="bg-card rounded-lg overflow-hidden border border-border">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-xs text-muted-foreground uppercase border-b border-border">
                  <th className="px-4 py-3 font-medium">Title</th>
                  <th className="px-4 py-3 font-medium">Voucher Code</th>
                  <th className="px-4 py-3 font-medium">Amount</th>
                  <th className="px-4 py-3 font-medium">Expiry Date</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Used By</th>
                  <th className="px-4 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {vouchers.map((voucher) => (
                  <tr key={voucher.id} className="border-b border-border/50 text-sm hover:bg-muted/30">
                    <td className="px-4 py-3">
                      <div>
                        <div className="font-medium text-foreground">{voucher.title}</div>
                        {voucher.subtitle && (
                          <div className="text-xs text-cyan-400">{voucher.subtitle}</div>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className="text-cyan-400 font-mono text-xs">{voucher.code}</span>
                        <button className="text-muted-foreground hover:text-foreground">
                          <Copy className="h-3 w-3" />
                        </button>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{voucher.amount}</td>
                    <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">{voucher.expiryDate}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 text-xs rounded ${getStatusColor(voucher.status)}`}>
                        {voucher.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {voucher.usedBy ? (
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="text-white text-xs bg-amber-500">
                              {voucher.usedByAvatar}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium text-foreground">{voucher.usedBy}</div>
                            <div className="text-xs text-muted-foreground">{voucher.usedByEmail}</div>
                          </div>
                        </div>
                      ) : (
                        <span className="text-muted-foreground">N/A</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground">
                          <Pencil className="h-4 w-4" />
                        </Button>
                        {voucher.status === 'Expired' && (
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-muted-foreground hover:text-red-500">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between px-4 py-3 border-t border-border">
            <div className="text-sm text-muted-foreground">
              Showing 1 to 8 of 8 entries
            </div>
            <div className="flex items-center gap-1">
              <Button variant="outline" size="sm" className="h-8 w-8 p-0 border-border text-muted-foreground">
                &lt;
              </Button>
              <Button size="sm" className="h-8 w-8 p-0 bg-primary hover:bg-primary/90 text-primary-foreground">1</Button>
              <Button variant="outline" size="sm" className="h-8 w-8 p-0 border-border text-muted-foreground">
                &gt;
              </Button>
            </div>
          </div>
        </div>

        {/* Create Voucher Modal */}
        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
          <DialogContent className="sm:max-w-md bg-card border-border">
            <DialogHeader>
              <DialogTitle className="text-foreground">Create Voucher</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label className="text-foreground">Title</Label>
                <Input className="mt-1.5 bg-background border-border text-foreground" placeholder="Enter voucher title" />
              </div>
              <div>
                <Label className="text-foreground">Amount</Label>
                <Input className="mt-1.5 bg-background border-border text-foreground" type="number" placeholder="Enter amount" />
              </div>
              <div>
                <Label className="text-foreground">Expiry Date</Label>
                <Input 
                  className="mt-1.5 bg-background border-border text-foreground" 
                  type="text" 
                  defaultValue="2025-12-19 00:00"
                  placeholder="YYYY-MM-DD HH:MM"
                />
              </div>
              <div>
                <Label className="text-foreground">Description</Label>
                <Textarea className="mt-1.5 min-h-[100px] bg-background border-border text-foreground" placeholder="Enter description" />
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  <Check className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
                <Button 
                  variant="destructive" 
                  onClick={() => setIsCreateModalOpen(false)}
                >
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}