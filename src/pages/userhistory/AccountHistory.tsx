import React, { useState } from "react";
import { format } from "date-fns";
import { UserDashboardLayout } from "@/components/layout/UserDashboardLayout";
import { VerifyBanner } from "@/components/userdashboard/VerifyBanner";
import { ArrowDownToLine } from "lucide-react";
import { SelectField } from "@/components/form/SelectField";
import { TriangleAlert } from "lucide-react";
import DateSelectField from "@/components/form/DateSelectField";
import { Button } from "@/components/ui/button";

const AccountHistory = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const formatDate = (date) => format(date, "yy-dd-MM");

  return (
    <div className="p-6 bg-card rounded-xl border border-border space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-foreground">Account History</h3>
        <div className="flex gap-2">
          <SelectField
            options={[{ label: "Select Type", value: "select-type" }]}
            placeholder="Select Type"
          />
          <SelectField
            options={[{ label: "Select Account", value: "select-account" }]}
            placeholder="Select Account"
          />
          <DateSelectField
            selectedDate={startDate}
            onDateChange={(date) => setStartDate(date)}
            placeholder="Start Date"
            formatDate={formatDate}
          />
          <DateSelectField
            selectedDate={endDate}
            onDateChange={(date) => setEndDate(date)}
            placeholder="End Date"
            formatDate={formatDate}
          />
          <Button>Export</Button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="text-center">
          <div className="icon mb-4 flex justify-center">
            <span className="text-red-500 "><TriangleAlert size={50} /></span>
          </div>
          <p className="text-lg font-semibold mb-2">Kindly select the account to view the orders history.</p>
        </div>
      </div>
    </div>
  );
};

export default AccountHistory;