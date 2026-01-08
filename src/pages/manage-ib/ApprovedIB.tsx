import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { IBTabs } from "./IBTabs";
import { IBMembersTable } from "./IBMembersTable";
import { mockApprovedIBMembers, IBMember } from "./ibData";

export function ApprovedIB() {
  const [members, setMembers] = useState<IBMember[]>(mockApprovedIBMembers);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold text-primary">Approved IB Members</h1>
        
        <IBTabs />
        
        <IBMembersTable 
          members={members} 
          onMembersChange={setMembers}
        />
      </div>
    </DashboardLayout>
  );
}
