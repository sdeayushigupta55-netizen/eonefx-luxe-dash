import { useState } from "react";
import { Button } from "@/components/ui/button";
import { InputField } from "@/components/form/InputField";
import { StatusToggle } from "@/components/form/Status";
import { Info } from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

export default function MiscWithdraw() {
    const [pendingWithdrawLimit, setPendingWithdrawLimit] = useState("3");
    const [minIBWalletWithdrawLimit, setMinIBWalletWithdrawLimit] = useState("10");
    const [withdrawOTPExpires, setWithdrawOTPExpires] = useState("5");
    const [withdrawOTP, setWithdrawOTP] = useState<"Active" | "Disabled">("Active");
    const [userWithdrawAccountOTP, setUserWithdrawAccountOTP] = useState<"Active" | "Disabled">("Active");
    const [withdrawAccountApproval, setWithdrawAccountApproval] = useState<"Active" | "Disabled">("Active");

    const handleSave = () => {
        console.log("Saving settings...", {
            pendingWithdrawLimit,
            minIBWalletWithdrawLimit,
            withdrawOTPExpires,
            withdrawOTP,
            userWithdrawAccountOTP,
            withdrawAccountApproval,
        });
    };

    return (
        <TooltipProvider>
            <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Pending Withdraw Limit */}
                    <div>

                        <InputField
                            label="Pending Withdraw Limit"
                            tooltip="Maximum number of withdrawal requests allowed to remain pending at a time"
                            type="number"
                            value={pendingWithdrawLimit}
                            onChange={(e) => setPendingWithdrawLimit(e.target.value)}
                            className="w-full px-3 py-2 rounded-md border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                        />
                    </div>

                    {/* Min IB Wallet Withdraw Limit */}
                    <div>

                        <InputField
                            label="Min IB Wallet Withdraw Limit"
                            tooltip="Minimum amount an IB user must have to withdraw from their wallet"
                            type="number"
                            value={minIBWalletWithdrawLimit}
                            onChange={(e) => setMinIBWalletWithdrawLimit(e.target.value)}
                            className="w-full px-3 py-2 rounded-md border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                        />
                    </div>

                    {/* Withdraw OTP Expires */}
                    <div>

                        <InputField
                            label="Withdraw OTP Expires(In Minutes)"
                            type="number"
                            value={withdrawOTPExpires}
                            onChange={(e) => setWithdrawOTPExpires(e.target.value)}
                            className="w-full px-3 py-2 rounded-md border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                            tooltip="Time (in minutes) before the OTP for withdrawals becomes invalid"
                        />
                    </div>

                    {/* Withdraw OTP Toggle */}
                    <div className="flex items-end">
                        <div className="w-full">

                            <StatusToggle
                                label="Withdraw OTP"
                                status={withdrawOTP}
                                onChange={setWithdrawOTP}
                                tooltip="Enable this to require an OTP (One-Time Password) for withdrawals"
                            />
                        </div>
                    </div>

                    {/* User Withdraw Account Creation OTP */}
                    <div className="md:col-span-2 space-y-4">
                        <div className="flex items-center justify-between">

                            <StatusToggle
                                label="User Withdraw Account Creation OTP"
                                status={userWithdrawAccountOTP}
                                onChange={setUserWithdrawAccountOTP}
                                tooltip="Enable this to require an OTP for creating withdraw accounts"
                            />
                            <StatusToggle
                                label="Withdraw Account Manual Approval"
                                status={withdrawAccountApproval}
                                onChange={setWithdrawAccountApproval}
                                tooltip="Enable this to require manual admin approval for withdraw account creation even if withdraw account creation otp is enabled or disabled"
                            />
                        </div>

                    </div>


                </div>

                {/* Save Button */}
                <div className="mt-10">
                    <Button onClick={handleSave} className="inline-flex items-center justify-center">
                        Save Changes
                    </Button>
                </div>
            </div>
        </TooltipProvider>
    );
}