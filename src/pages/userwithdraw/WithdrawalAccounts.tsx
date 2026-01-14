import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { TriangleAlert ,ArrowLeft} from "lucide-react";
import { SelectField } from "@/components/form/SelectField";

const WithdrawalAccounts = () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState("");
  const [error, setError] = useState("");

  return (
    <div className="text-center py-10 mx-auto space-y-5 border border-border rounded-xl bg-card px-6">
      {!showForm ? (
        <div className="text-center">
          <div className="icon mb-4 flex justify-center">
            <span className="text-red-500">
              <TriangleAlert size={50} />
            </span>
          </div>
          <h2 className="text-xl font-semibold mb-2">You're almost ready to withdraw!</h2>
          <p className="text-sm text-gray-600 mb-6">
            To make a withdraw, please add a withdraw account from your profile (withdraw accounts).
          </p>
          <Button
            className="bg-primary text-white hover:bg-primary-dark"
            onClick={() => setShowForm(true)}
          >
            Add Withdraw Account
          </Button>
        </div>
      ) : (
        <div className="text-left">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Withdraw Account Create</h2>
            <Button className="flex items-center gap-2" onClick={() => setShowForm(false)}>
              <ArrowLeft /> Withdraw Accounts
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            <span className="flex items-center mb-2">
              <span className="text-primary mr-2">•</span> Two-Factor Authentication Required
            </span>
            For security purposes, you will receive a verification code via email after submitting this form. Please verify the OTP to complete your withdraw account creation.
          </p>
          <p className="text-sm text-muted-foreground mb-4">
            <span className="flex items-center mb-2">
              <span className="text-primary mr-2">•</span> Manual Approval Required
            </span>
            Your withdraw account will be reviewed by our admin team before approval. You will be notified once the review is complete.
          </p>
          <div className="mb-4">
             <SelectField
                                label="Account To Withdraw:"
                                options={[
                                    {label:"BridgerPay(Auto)" ,value:"BridgerPay(Auto)"},
                                    {label: "Bank Transfer - PKR(Manual)", value: "Bank Transfer - PKR(Manual)" },
                                ]}
                                placeholder="Select Method"
                            />
          </div>
          <Button >
            ✓ Add New Withdraw Account
          </Button>
        </div>
      )}
    </div>
  );
};

export default WithdrawalAccounts;
