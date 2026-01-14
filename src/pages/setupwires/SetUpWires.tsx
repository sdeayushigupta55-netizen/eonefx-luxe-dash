import React from 'react';
import { Button } from '@/components/ui/button';
import { VerifyBanner } from '@/components/userdashboard/VerifyBanner';
import { UserDashboardLayout } from '@/components/layout/UserDashboardLayout';

const SetUpWires = () => {
  return (
    <UserDashboardLayout>
        <VerifyBanner/>
    <div className="p-6 bg-card rounded-xl border border-border mt-4">
        
      <h2 className="text-xl font-semibold mb-2">Request Custom Payment Account</h2>
      <p className="text-sm text-muted-foreground mb-6">
        Submit your payment deposit request and receive bank details from our team for secure transactions.
      </p>

      <form className="space-y-6">
        {/* Type Of Account Required */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Type Of Account Required:</label>
          <input
            type="file"
            className="block w-full text-sm border border-border rounded-lg p-2 bg-muted/30"
          />
          <p className="text-xs text-muted-foreground mt-1">
            Allowed file types: images, PDF, DOC, DOCX, TXT. Maximum size: 5MB
          </p>
        </div>

        {/* Expected Monthly Deposit Amount */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Expected Monthly Deposit Amount:</label>
          <input
            type="file"
            className="block w-full text-sm border border-border rounded-lg p-2 bg-muted/30"
          />
          <p className="text-xs text-muted-foreground mt-1">
            Allowed file types: images, PDF, DOC, DOCX, TXT. Maximum size: 5MB
          </p>
        </div>

        {/* Preferred Deposit Method */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Preferred Deposit Method:</label>
          <select className="block w-full text-sm border border-border rounded-lg p-2 bg-muted/30">
            <option>Select an Option</option>
            <option>Bank Transfer</option>
            <option>Credit Card</option>
            <option>PayPal</option>
          </select>
        </div>

        {/* Do You Require Multi-Currency Account */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Do You Require Multi-Currency Account:</label>
          <input
            type="file"
            className="block w-full text-sm border border-border rounded-lg p-2 bg-muted/30"
          />
          <p className="text-xs text-muted-foreground mt-1">
            Allowed file types: images, PDF, DOC, DOCX, TXT. Maximum size: 5MB
          </p>
        </div>

        {/* Terms and Conditions */}
        <div className="flex items-center gap-2">
          <input type="checkbox" className="h-4 w-4 border border-border rounded" />
          <label className="text-sm text-muted-foreground">
            I have read and agree to the terms and conditions
          </label>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <Button className="bg-primary text-primary-foreground">Submit Request</Button>
        </div>
      </form>
    </div>
    </UserDashboardLayout>
  );
};

export default SetUpWires;