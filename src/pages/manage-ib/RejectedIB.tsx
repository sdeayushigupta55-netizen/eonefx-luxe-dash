import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { IBTabs } from "./IBTabs";
import { IBMembersTable } from "./IBMembersTable";
import { mockRejectedIBMembers, IBMember } from "./ibData";

export function RejectedIB() {
  const [members, setMembers] = useState<IBMember[]>(mockRejectedIBMembers);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold ">Rejected IB Members</h1>
        
        <IBTabs />
        
        <IBMembersTable 
          members={members} 
          showDelete={false} 
          onMembersChange={setMembers}
        />
      </div>
    </DashboardLayout>
  );
}
