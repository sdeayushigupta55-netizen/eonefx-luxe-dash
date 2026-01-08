import { useState } from "react";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { IBMember } from "./ibData";
import { ViewIBModal } from "./ViewIBModal";
import { EditIBModal } from "./EditIBModal";
import { DeleteIBModal } from "./DeleteIBModal";
import { cn } from "@/lib/utils";

interface IBMembersTableProps {
  members: IBMember[];
  showDelete?: boolean;
  onApprove?: (member: IBMember) => void;
  onMembersChange?: (members: IBMember[]) => void;
}

const getStatusStyles = (status: IBMember['status']) => {
  switch (status) {
    case 'Pending':
      return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
    case 'Approved':
      return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
    case 'Rejected':
      return 'bg-red-500/20 text-red-400 border-red-500/30';
    case 'Unprocessed':
      return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    default:
      return 'bg-muted text-muted-foreground';
  }
};

const getAvatarColor = (name: string) => {
  const colors = [
    'bg-amber-500',
    'bg-emerald-500',
    'bg-blue-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-red-500',
    'bg-cyan-500',
  ];
  const index = name.charCodeAt(0) % colors.length;
  return colors[index];
};

export function IBMembersTable({ members, showDelete = true, onApprove, onMembersChange }: IBMembersTableProps) {
  const [viewModal, setViewModal] = useState<{ open: boolean; member: IBMember | null }>({
    open: false,
    member: null,
  });
  const [editModal, setEditModal] = useState<{ open: boolean; member: IBMember | null }>({
    open: false,
    member: null,
  });
  const [deleteModal, setDeleteModal] = useState<{ open: boolean; member: IBMember | null }>({
    open: false,
    member: null,
  });

  const handleView = (member: IBMember) => {
    setViewModal({ open: true, member });
  };

  const handleEdit = (member: IBMember) => {
    setEditModal({ open: true, member });
  };

  const handleDelete = (member: IBMember) => {
    setDeleteModal({ open: true, member });
  };

  const handleSaveEdit = (updatedMember: IBMember) => {
    const updatedMembers = members.map((m) =>
      m.id === updatedMember.id ? updatedMember : m
    );
    onMembersChange?.(updatedMembers);
  };

  const handleConfirmDelete = (id: string) => {
    const updatedMembers = members.filter((m) => m.id !== id);
    onMembersChange?.(updatedMembers);
  };

  return (
    <>
      <div className="bg-card rounded-lg border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50 hover:bg-muted/50">
              <TableHead className="text-xs font-medium text-muted-foreground uppercase">
                User
              </TableHead>
              <TableHead className="text-xs font-medium text-muted-foreground uppercase">
                IB Group
              </TableHead>
              <TableHead className="text-xs font-medium text-muted-foreground uppercase">
                {members.some(m => m.status === 'Approved' || m.status === 'Rejected') ? 'IB Status' : 'Status'}
              </TableHead>
              <TableHead className="text-xs font-medium text-muted-foreground uppercase">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {members.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="h-32 text-center text-muted-foreground">
                  No IB members found
                </TableCell>
              </TableRow>
            ) : (
              members.map((member) => (
                <TableRow key={member.id} className="hover:bg-muted/30">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className={cn("text-white text-xs", getAvatarColor(member.name))}>
                          {member.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="text-sm font-medium text-foreground">{member.name}</div>
                        <div className="text-xs text-primary">{member.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-foreground">{member.ibGroup}</TableCell>
                  <TableCell>
                    <span className={cn(
                      "px-2.5 py-1 rounded text-xs font-medium border",
                      getStatusStyles(member.status)
                    )}>
                      {member.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-blue-400 hover:text-blue-300 hover:bg-blue-500/10"
                            onClick={() => handleView(member)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>View Details</p>
                        </TooltipContent>
                      </Tooltip>
                      
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-orange-400 hover:text-orange-300 hover:bg-orange-500/10"
                            onClick={() => handleEdit(member)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Edit</p>
                        </TooltipContent>
                      </Tooltip>
                      
                      {showDelete && (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8 text-red-400 hover:text-red-300 hover:bg-red-500/10"
                              onClick={() => handleDelete(member)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Delete</p>
                          </TooltipContent>
                        </Tooltip>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
        <div className="px-4 py-3 border-t border-border flex items-center justify-between text-sm text-muted-foreground">
          <span>Showing 1 to {members.length} of {members.length} entries</span>
          <div className="flex items-center gap-1">
            <Button variant="outline" size="sm" disabled className="text-xs">
              Previous
            </Button>
            <Button variant="default" size="sm" className="text-xs h-8 w-8 p-0">
              1
            </Button>
            <Button variant="outline" size="sm" disabled className="text-xs">
              Next
            </Button>
          </div>
        </div>
      </div>

      <ViewIBModal
        open={viewModal.open}
        onClose={() => setViewModal({ open: false, member: null })}
        member={viewModal.member}
      />

      <EditIBModal
        open={editModal.open}
        onClose={() => setEditModal({ open: false, member: null })}
        member={editModal.member}
        onSave={handleSaveEdit}
      />

      <DeleteIBModal
        open={deleteModal.open}
        onClose={() => setDeleteModal({ open: false, member: null })}
        member={deleteModal.member}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
}
