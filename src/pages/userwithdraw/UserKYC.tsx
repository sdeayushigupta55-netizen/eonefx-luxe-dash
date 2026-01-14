import React from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, ShieldCheck, Lock, Headphones ,BadgeCheck } from "lucide-react";

const UserKYC = () => {
  return (
    <div className="p-6 bg-muted/10 min-h-screen">
      <div className="space-y-6">
        {/* KYC Verification Center */}
        <div className="bg-card p-6 rounded-xl border border-border">
          <h2 className="text-xl font-semibold mb-2">KYC Verification Center</h2>
          <p className="text-sm text-muted-foreground mb-6">
            To maintain a secure and compliant trading environment, identity verification is required. Complete your KYC steps to unlock full access including deposits, trading, and withdrawals.
          </p>

          {/* Steps */}
          <div className="flex items-center justify-center mb-6">
            <CheckCircle className="text-primary h-6 w-6" />
            <div className="w-full h-0.5 bg-primary mx-2"></div>
            <div className="h-6 w-6 border-2 border-primary rounded-full flex items-center justify-center text-muted-foreground">
              2
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Step 1 */}
            <div className="bg-muted/20 p-4 rounded-lg border border-border">
              <h3 className="text-lg font-semibold mb-2">1 - Confirm Email</h3>
              <p className="text-sm text-muted-foreground mb-4">Verify your details please</p>
              <div className="flex items-center justify-between mb-4 relative">
                <input
                  type="email"
                  value="aimanbasit0416@gmail.com"
                  readOnly
                  className="bg-muted/10 border border-border rounded-md px-3 py-2 text-sm w-full"
                />
                <span className="ml-2 text-primary absolute right-3 top-2 text-sm">Verified<BadgeCheck size={14} className="inline-block ml-1" /></span>
              </div>
              <p className="text-sm font-medium mb-4">PRIVILEGES OF ACCOUNT VERIFICATION</p>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>Update your full profile securely.</li>
                <li>Deposit funds without restrictions.</li>
                <li>Open demo and real trading accounts.</li>
                <li>Transfer funds internally.</li>
                <li>Create support ticket for assistance.</li>
              </ul>
              <Button className="mt-4 w-full bg-primary text-white">Completed</Button>
            </div>

            {/* Step 2 */}
            <div className="bg-muted/20 p-4 rounded-lg border border-border">
              <h3 className="text-lg font-semibold mb-2">2 - Verify your identity manually</h3>
              <p className="text-sm text-muted-foreground mb-4">Provide a document confirming your name</p>
              <p className="text-sm font-medium mb-4">Privileges and Benefit</p>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>Access to client's area.</li>
                <li>Open real accounts.</li>
                <li>Trade on real accounts.</li>
                <li>Internal & External transfers.</li>
                <li>Withdraw your funds.</li>
              </ul>
              <Button className="mt-4 w-full bg-primary text-white">Go To Manual Submission</Button>
            </div>
          </div>
        </div>

        {/* Why KYC Matters */}
         <div className="bg-card p-6 rounded-xl border border-border">
          <h2 className="text-xl font-semibold mb-4">Why KYC Matters</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           
          <div className="bg-card p-4 rounded-lg border border-border text-center">
            <ShieldCheck className="text-primary h-8 w-8 mx-auto mb-2" />
            <h3 className="text-lg font-semibold mb-2">Secure Your Account</h3>
            <p className="text-sm text-muted-foreground">
              Your personal information and funds are safeguarded with top-level encryption and ID checks.
            </p>
          </div>
          <div className="bg-card p-4 rounded-lg border border-border text-center">
            <Lock className="text-primary h-8 w-8 mx-auto mb-2" />
            <h3 className="text-lg font-semibold mb-2">Full Platform Access</h3>
            <p className="text-sm text-muted-foreground">
              Unlock deposits, withdrawals, real account trading, and financial transactions without limits.
            </p>
          </div>
          <div className="bg-card p-4 rounded-lg border border-border text-center">
            <Headphones className="text-primary h-8 w-8 mx-auto mb-2" />
            <h3 className="text-lg font-semibold mb-2">Priority Support</h3>
            <p className="text-sm text-muted-foreground">
              Get faster support, quicker approvals, and special attention from our client success team.
            </p>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default UserKYC;
