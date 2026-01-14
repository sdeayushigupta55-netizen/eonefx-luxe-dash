import React from 'react';
import { UserDashboardLayout } from '@/components/layout/UserDashboardLayout';
import { VerifyBanner } from '@/components/userdashboard/VerifyBanner';
import { Button } from '@/components/ui/button';

const UserTickets = () => {
  return (
    <UserDashboardLayout>
        <div className="space-y-6">
        <VerifyBanner/>
    <div className="p-6 bg-card rounded-xl border border-border space-y-6">
      {/* Ticket Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {['Total Tickets', 'Closed Tickets', 'Open Tickets', 'Resolved Tickets'].map((title, index) => (
          <div key={index} className="p-4 rounded-lg shadow-md flex items-center justify-between border border-border hover:shadow-lg transition-shadow cursor-pointer">
            <div className="flex items-center">
              <div className="text-2xl mr-2">🎟️</div>
              <div>
                <h3 className="text-lg font-semibold ">{title}</h3>
                <p className="text-sm ">0</p>
              </div>
            </div>
            <div className="text-blue-500">&gt;</div>
          </div>
        ))}
      </div>

      {/* Tickets Table */}
      <h2 className="text-lg font-semibold mb-4">Tickets</h2>
      <div className=" p-6 rounded-lg shadow-md border border-border">
        <table className="w-full border-collapse">
          <thead>
            <tr className="text-left text-gray-500">
              {['Ticket #', 'Ticket Subject', 'Requested On', 'Priority', 'Status', 'Action'].map((header, index) => (
                <th key={index} >{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={6} className="text-center py-4 text-gray-500">No Data Available In Table</td>
            </tr>
          </tbody>
        </table>
        <div className="flex justify-between items-center mt-4">
          <p className="text-sm text-gray-500">Showing 0 to 0 of 0 entries</p>
          <div className="flex items-center gap-2">
            <Button>&lt;</Button>
            <Button>&gt;</Button>
          </div>
        </div>
      </div>

      {/* Create Ticket Button */}
      <div className="flex justify-end mt-6">
        <Button>Create Ticket</Button>
      </div>
    </div>
    </div>
    </UserDashboardLayout>
  );
};

export default UserTickets;