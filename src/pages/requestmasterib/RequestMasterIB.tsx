import React from 'react';
import { UserDashboardLayout } from '@/components/layout/UserDashboardLayout';
import { VerifyBanner } from '@/components/userdashboard/VerifyBanner';
import { Button } from '@/components/ui/button';

const RequestMasterIB = () => {
  return (
    <UserDashboardLayout>
         
   <div className="space-y-6">
         <VerifyBanner/>
          <div className="flex items-center justify-center min-h-screen border border-border rounded-lg bg-card">
      <div className=" text-center">
      
        <div className="text-yellow-500 text-6xl mb-4">⏳</div>
        <h2 className="text-2xl font-semibold mb-2">Partner Request Pending</h2>
        <p className="text-gray-600 mb-4">
          Your partnership request is under review and we'll confirm with you shortly. Stay tuned!
        </p>
        <Button className="py-2 px-4 rounded-md mb-4">
          Read Partner Agreement
        </Button>
        <p className="text-sm text-gray-500">
          If you face any issue, please visit our <a href="#" className="text-blue-600">Customer Support</a> or Email us at <a href="mailto:support@yourbroker.com" className="text-blue-600">support@yourbroker.com</a>.
        </p>
      </div>
    </div>
    </div>
    </UserDashboardLayout>
  );
};

export default RequestMasterIB;