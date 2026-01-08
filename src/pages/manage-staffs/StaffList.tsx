import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StaffMember } from "./staffData";

interface StaffListProps {
  staffMembers: StaffMember[];
  selectedStaff: StaffMember | null;
  onSelectStaff: (staff: StaffMember) => void;
  onAddNew: () => void;
}

export function StaffList({ staffMembers, selectedStaff, onSelectStaff, onAddNew }: StaffListProps) {
  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName[0]}${lastName[0]}`.toUpperCase();
  };

  const getAvatarColor = (name: string) => {
    const colors = [
      "bg-amber-500",
      "bg-blue-500",
      "bg-green-500",
      "bg-purple-500",
      "bg-pink-500",
      "bg-indigo-500",
      "bg-teal-500",
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  const getRoleBadgeStyle = (role: string) => {
    switch (role) {
      case "Super-Admin":
        return "bg-blue-600 text-white";
      case "Manager":
        return "bg-green-600 text-white";
      case "Staff":
        return "bg-yellow-600 text-white";
      case "Support":
        return "bg-purple-600 text-white";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="bg-card rounded-xl border border-border p-4 h-fit">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 mb-4">
        <Select defaultValue="active">
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Filter staff" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="active">Active Staff ({staffMembers.length})</SelectItem>
            <SelectItem value="inactive">Inactive Staff</SelectItem>
            <SelectItem value="all">All Staff</SelectItem>
          </SelectContent>
        </Select>

        <Button onClick={onAddNew} className="gap-2">
          <Plus className="h-4 w-4" />
          Add New Staff
        </Button>
      </div>

      {/* Staff List */}
      <div className="space-y-2">
        {staffMembers.map((staff) => (
          <div
            key={staff.id}
            onClick={() => onSelectStaff(staff)}
            className={cn(
              "flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors",
              selectedStaff?.id === staff.id
                ? "bg-muted"
                : "hover:bg-muted/50"
            )}
          >
            <div
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-medium",
                getAvatarColor(staff.firstName)
              )}
            >
              {getInitials(staff.firstName, staff.lastName)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-medium text-foreground truncate">
                  {staff.firstName} {staff.lastName}
                </span>
                <span className={cn("px-2 py-0.5 rounded text-xs font-medium", getRoleBadgeStyle(staff.role))}>
                  {staff.role}
                </span>
              </div>
              <div className="text-sm text-muted-foreground truncate">{staff.email}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
