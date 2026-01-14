import { Button } from "@/components/ui/button";
import { MoreVertical, CreditCard, DollarSign } from "lucide-react";

const accounts = [
  {
    id: "E-8651346183",
    currency: "USD",
    type: "Standard",
    balance: 0,
    canDeposit: true,
    canWithdraw: true,
  },
  {
    id: "IB-7362933200",
    currency: "USD",
    type: "Standard",
    balance: 0,
    canDeposit: true,
    canWithdraw: true,
  },
];

export default function AccountDetails() {
  return (
    <div className="rounded-2xl bg-muted/30 p-6">
      <h2 className="text-xl font-semibold text-foreground mb-6">Account Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {accounts.map((acc, idx) => (
          <div key={acc.id} className=" gap-2 shadow-sm relative bg-muted rounded-lg p-6 flex flex-col justify-between min-h-[180px]">
            <div className="flex gap-2">
              <span className="px-3 py-1 rounded-lg bg-muted text-xs font-medium text-foreground">{acc.currency}</span>
              <span className="px-3 py-1 rounded-lg bg-muted text-xs font-medium text-foreground">{acc.type}</span>
            </div>
            <Button variant="ghost" size="icon" className="absolute top-4 right-4">
              <MoreVertical className="h-5 w-5 text-muted-foreground hover:bg-primary" />
            </Button>
            <div className="text-lg font-medium text-muted-foreground">{acc.id}</div>
            <div className="text-xl text-foreground">{acc.balance} USD</div>
            <div className="flex gap-3 mt-2">
              {acc.canDeposit && (
                <Button variant="outline" className="flex-1 flex gap-2 items-center justify-center hover:bg-primary">
                  <CreditCard className="h-5 w-5 mr-1" /> Deposit
                </Button>
              )}
              {acc.canWithdraw && (
                <Button variant="outline" className="flex-1 flex gap-2 items-center justify-center hover:bg-primary">
                  <DollarSign className="h-5 w-5 mr-1" /> Withdraw
                </Button>
              )}
            </div>
          </div>
        ))}
        {/* Open Additional Account Card */}
        <div className="bg-card rounded-xl p-6 flex flex-col items-center justify-center gap-4 shadow-sm">
          <div className="flex flex-col items-center justify-center gap-2">
            <svg width="32" height="32" fill="none" stroke="#2A3547" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="2"/><rect x="14" y="14" width="7" height="7" rx="2"/><rect x="3" y="14" width="7" height="7" rx="2"/><path d="M12 12v2m0-2V10m0 2h2m-2 0H10"/></svg>
            <a href="#" className="text-lg font-semibold text-primary underline">Open Additional Account</a>
          </div>
        </div>
      </div>
    </div>
  );
}
