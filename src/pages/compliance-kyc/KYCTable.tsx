import { useState } from "react";
import { Eye, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { KYCRecord } from "./complianceData";
import { KYCDetailsModal } from "./KYCDetailsModal";

interface KYCTableProps {
  records: KYCRecord[];
  modalVariant?: "single" | "double";
}

export function KYCTable({ records, modalVariant = "double" }: KYCTableProps) {
  const [selectedRecord, setSelectedRecord] = useState<KYCRecord | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewDetails = (record: KYCRecord) => {
    setSelectedRecord(record);
    setIsModalOpen(true);
  };
  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      Verified: "bg-green-500/20 text-green-400 border-green-500/30",
      Rejected: "bg-red-500/20 text-red-400 border-red-500/30",
      Pending: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    };
    return (
      <span
        className={cn(
          "px-2.5 py-1 rounded text-xs font-medium border",
          styles[status] || "bg-muted text-muted-foreground"
        )}
      >
        {status}
      </span>
    );
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getAvatarColor = (name: string) => {
    const colors = [
      "bg-blue-500",
      "bg-green-500",
      "bg-yellow-500",
      "bg-purple-500",
      "bg-pink-500",
      "bg-indigo-500",
      "bg-teal-500",
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  return (
    <div className="bg-card rounded-xl border border-border">
      <Table>
        <TableHeader>
          <TableRow className="border-border hover:bg-transparent">
            <TableHead className="text-muted-foreground font-medium">
              DATE
            </TableHead>
            <TableHead className="text-muted-foreground font-medium">
              USER
            </TableHead>
            <TableHead className="text-muted-foreground font-medium">
              TYPE
            </TableHead>
            <TableHead className="text-muted-foreground font-medium">
              STATUS
            </TableHead>
            <TableHead className="text-muted-foreground font-medium">
              ACTION
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {records.length === 0 ? (
            <TableRow className="border-border hover:bg-muted/50">
              <TableCell
                colSpan={5}
                className="text-center text-muted-foreground py-12"
              >
                No Data Available In Table
              </TableCell>
            </TableRow>
          ) : (
            records.map((record) => (
              <TableRow
                key={record.id}
                className="border-border hover:bg-muted/50"
              >
                <TableCell className="text-foreground">{record.date}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-medium",
                        getAvatarColor(record.userName)
                      )}
                    >
                      {getInitials(record.userName)}
                    </div>
                    <div>
                      <div className="font-medium text-foreground">
                        {record.userName}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {record.userEmail}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-foreground">{record.type}</TableCell>
                <TableCell>{getStatusBadge(record.status)}</TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-foreground"
                    onClick={() => handleViewDetails(record)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {/* Pagination */}
      <div className="flex items-center justify-between px-4 py-3 border-t border-border">
        <div className="text-sm text-muted-foreground">
          Showing {records.length > 0 ? 1 : 0} to {records.length} of{" "}
          {records.length} entries
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            disabled={true}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          {records.length > 0 && (
            <Button
              variant="default"
              size="icon"
              className="h-8 w-8 bg-primary text-primary-foreground"
            >
              1
            </Button>
          )}
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            disabled={true}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* KYC Details Modal */}
      <KYCDetailsModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        record={selectedRecord}
        variant={modalVariant}
      />
    </div>
  );
}
