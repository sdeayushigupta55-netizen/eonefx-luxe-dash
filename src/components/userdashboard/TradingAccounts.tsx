import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
export function TradingAccounts() {
  const navigate = useNavigate();
  return (
    <div className="rounded-2xl bg-muted/30 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-foreground">Trading Accounts</h3>
        <button className="text-2xl text-muted-foreground">⋯</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Live Accounts */}
        <div className="bg-muted rounded-lg p-6 flex flex-col justify-between min-h-[180px]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-lg font-medium text-foreground">Live Accounts:</span>
            <Link to="/user/accounts" className="text-sm font-medium underline text-foreground flex items-center gap-1">
              See All <span aria-hidden>›</span>
            </Link>
          </div>
           <div className="flex items-center justify-between mb-2">
            <p className="text-3xl font-bold text-foreground ">0</p>
            <Button className="w-fit" navigation="/user/new-account">Create Account</Button>
          </div>
        </div>
        {/* Demo Accounts */}
        <div className="bg-muted rounded-lg p-6 flex flex-col justify-between min-h-[180px]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-lg font-medium text-foreground">Demo Accounts:</span>
            <Link to="/user/accounts" className="text-sm font-medium underline text-foreground flex items-center gap-1">
              See All <span aria-hidden>›</span>
            </Link>
          </div>

          <div className="flex items-center justify-between mb-2">
            <p className="text-3xl font-bold text-foreground ">0</p>
            <Button className="w-fit" navigation="/user/new-account">Create Account</Button>
          </div>
        </div>
      </div>

    </div>
  );
}