import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StaffList } from "./StaffList";
import { StaffDetails } from "./StaffDetails";
import { StaffMember, mockStaffMembers } from "./staffData";

export default function ManageStaffs() {
  const [staffMembers, setStaffMembers] = useState<StaffMember[]>(mockStaffMembers);
  const [selectedStaff, setSelectedStaff] = useState<StaffMember | null>(mockStaffMembers[0]);
  const [isNewStaff, setIsNewStaff] = useState(false);

  const handleSelectStaff = (staff: StaffMember) => {
    setSelectedStaff(staff);
    setIsNewStaff(false);
  };

  const handleAddNew = () => {
    setSelectedStaff(null);
    setIsNewStaff(true);
  };

  const handleSave = (staff: StaffMember) => {
    if (isNewStaff) {
      setStaffMembers((prev) => [...prev, staff]);
      setSelectedStaff(staff);
      setIsNewStaff(false);
    } else {
      setStaffMembers((prev) =>
        prev.map((s) => (s.id === staff.id ? staff : s))
      );
      setSelectedStaff(staff);
    }
  };

  const handleDelete = (staffId: string) => {
    setStaffMembers((prev) => prev.filter((s) => s.id !== staffId));
    setSelectedStaff(staffMembers[0] || null);
  };

  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-2xl font-semibold text-foreground mb-6">Manage Staffs</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-6">
          <StaffList
            staffMembers={staffMembers}
            selectedStaff={selectedStaff}
            onSelectStaff={handleSelectStaff}
            onAddNew={handleAddNew}
          />
          <StaffDetails
            staff={selectedStaff}
            isNewStaff={isNewStaff}
            onSave={handleSave}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </DashboardLayout>
  );
}
