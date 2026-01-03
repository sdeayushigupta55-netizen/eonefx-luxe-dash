import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from "lucide-react";
import { cn } from "@/lib/utils";

export default function RegistrationSettings() {
  const [username, setUsername] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(false);
  const [country, setCountry] = useState(true);
  const [referralCode, setReferralCode] = useState(true);
  const [privacyPolicy, setPrivacyPolicy] = useState(true);
  const [clientAgreement, setClientAgreement] = useState(true);
  const [privacyPolicyTitle, setPrivacyPolicyTitle] = useState("");
  const [clientAgreementTitle, setClientAgreementTitle] = useState("");

  function PermissionItem({
    label,
    tooltip,
    checked,
    onChange,
  }: {
    label: string;
    tooltip: string;
    checked: boolean;
    onChange: () => void;
  }) {
    return (
      <div className="flex items-center justify-between rounded-lg border border-border bg-muted/30 px-4 py-3">
        <div className="flex items-center gap-2 text-sm">
          <span>{label}</span>

          <Tooltip>
            <TooltipTrigger>
              <Info className="w-4 h-4 cursor-pointer" />
            </TooltipTrigger>
            <TooltipContent>{tooltip}</TooltipContent>
          </Tooltip>
        </div>

        <button
          type="button"
          onClick={onChange}
          className={cn(
            "w-11 h-6 rounded-full relative transition",
          checked ? "bg-primary" : "bg-gray-400"
          )}
        >
          <span
            className={cn(
              "absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition",
              checked && "translate-x-5"
            )}
          />
        </button>
      </div>
    );
  }

  const InputWithToggle = ({
    label,
    tooltip,
    placeholder,
    value,
    onChange,
    checked,
    onCheckedChange
  }: {
    label: string;
    tooltip: string;
    placeholder: string;
    value: string;
    onChange: (value: string) => void;
    checked: boolean;
    onCheckedChange: () => void;
  }) => (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <label className="text-sm font-medium">
          {label}
        </label>
        <Tooltip>
          <TooltipTrigger>
            <Info className="w-4 h-4 cursor-pointer" />
          </TooltipTrigger>
          <TooltipContent>{tooltip}</TooltipContent>
        </Tooltip>
      </div>
      <div className="relative">
        <Input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-[42px] pr-16"
        />
        <div className="absolute right-0 top-1/2 px-3 -translate-y-1/2 h-full flex items-center justify-center">
          <button
            type="button"
            onClick={onCheckedChange}
            className={cn(
              "w-11 h-6 rounded-full relative transition",
              
              checked ? "bg-primary" : "bg-gray-400"
            )}
          >
            <span
              className={cn(
                "absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition",
                checked && "translate-x-5"
              )}
            />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <TooltipProvider>
      <div className="space-y-6">
        <div>

          
          <Card className="shadow-card border border-border bg-card">
            <CardContent className="p-4 sm:p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Username */}
                <PermissionItem
                  label="Username"
                  tooltip="Show or require a username field"
                  checked={username}
                  onChange={() => setUsername(!username)}
                />

                {/* Phone Number */}
                <PermissionItem
                  label="Phone Number"
                  tooltip="Enable phone number entry during signup"
                  checked={phoneNumber}
                  onChange={() => setPhoneNumber(!phoneNumber)}
                />

                {/* Country */}
                <PermissionItem
                  label="Country"
                  tooltip="Show or require country selection"
                  checked={country}
                  onChange={() => setCountry(!country)}
                />

                {/* Referral Code */}
                <PermissionItem
                  label="Referral Code"
                  tooltip="Allow users to enter a referral code"
                  checked={referralCode}
                  onChange={() => setReferralCode(!referralCode)}
                />
              </div>

              {/* Privacy & Policy */}
              <InputWithToggle
                label="Privacy & Policy"
                tooltip="Toggle to show/hide the link. Edit the title shown to users"
                placeholder="Privacy & Policy"
                value={privacyPolicyTitle}
                onChange={setPrivacyPolicyTitle}
                checked={privacyPolicy}
                onCheckedChange={() => setPrivacyPolicy(!privacyPolicy)}
              />

              {/* Client Agreement */}
              <InputWithToggle
                label="Client Agreement"
                tooltip="Toggle to show/hide the link. Edit the title shown to users"
                placeholder="Client Agreement"
                value={clientAgreementTitle}
                onChange={setClientAgreementTitle}
                checked={clientAgreement}
                onCheckedChange={() => setClientAgreement(!clientAgreement)}
              />

              {/* Save Button */}
              <Button variant="default" className="w-auto">
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </TooltipProvider>
  );
}
