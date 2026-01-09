import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { IBTabs } from "./IBTabs";
import { IBMembersTable } from "./IBMembersTable";
import { mockAllIBMembers, IBMember } from "./ibData";

export function AllIBLogs() {
  const [members, setMembers] = useState<IBMember[]>(mockAllIBMembers);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold">All IB Members</h1>
        
        <IBTabs />
        
        <IBMembersTable 
          members={members} 
          onMembersChange={setMembers}
        />
      </div>
    </DashboardLayout>
  );
}
