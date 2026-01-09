import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { IBTabs } from "./IBTabs";
import { IBMembersTable } from "./IBMembersTable";
import { ApproveIBModal } from "./ApproveIBModal";
import { mockPendingIBMembers, IBMember } from "./ibData";

export function PendingIB() {
  const [members, setMembers] = useState<IBMember[]>(mockPendingIBMembers);
  const [approveModal, setApproveModal] = useState<{ open: boolean; member: IBMember | null }>({
    open: false,
    member: null,
  });

  const handleApprove = (member: IBMember) => {
    setApproveModal({ open: true, member });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold ">Pending IB Members</h1>
        
        <IBTabs />
        
        <IBMembersTable 
          members={members} 
          onApprove={handleApprove}
          onMembersChange={setMembers}
        />

        <ApproveIBModal
          open={approveModal.open}
          onClose={() => setApproveModal({ open: false, member: null })}
          member={approveModal.member}
        />
      </div>
    </DashboardLayout>
  );
}
