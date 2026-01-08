import { useState } from "react";
import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { ActivityLog } from "./activityLogsData";
import { ActivityDetailsModal } from "./ActivityDetailsModal";

interface ActivityLogsTableProps {
  data: ActivityLog[];
  showActorType?: boolean;
  userLabel?: string;
}

export function ActivityLogsTable({ 
  data, 
  showActorType = true,
  userLabel = "USER"
}: ActivityLogsTableProps) {
  const [selectedActivity, setSelectedActivity] = useState<ActivityLog | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewDetails = (activity: ActivityLog) => {
    setSelectedActivity(activity);
    setIsModalOpen(true);
  };

  const getActivityBadgeClass = (type: ActivityLog["activityType"]) => {
    switch (type) {
      case "success":
        return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
      case "warning":
        return "bg-amber-500/20 text-amber-400 border-amber-500/30";
      case "info":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      default:
        return "bg-muted text-muted-foreground border-border";
    }
  };

  return (
    <>
      <div className="bg-card rounded-lg border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="text-muted-foreground font-medium">
                {userLabel}
              </TableHead>
              {showActorType && (
                <TableHead className="text-muted-foreground font-medium">
                  ACTOR TYPE
                </TableHead>
              )}
              <TableHead className="text-muted-foreground font-medium">
                ACTIVITY
              </TableHead>
              <TableHead className="text-muted-foreground font-medium">
                LOCATION
              </TableHead>
              <TableHead className="text-muted-foreground font-medium">
                TIME
              </TableHead>
              <TableHead className="text-muted-foreground font-medium text-right">
                ACTION
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((log) => (
              <TableRow key={log.id} className="border-border hover:bg-muted/30">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium",
                        log.user.avatarColor || "bg-amber-500"
                      )}
                    >
                      {log.user.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="font-medium text-foreground">
                        {log.user.name}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {log.user.email}
                      </div>
                    </div>
                  </div>
                </TableCell>
                {showActorType && (
                  <TableCell className="text-muted-foreground">
                    {log.actorType}
                  </TableCell>
                )}
                <TableCell>
                  <span
                    className={cn(
                      "px-3 py-1 rounded-md text-sm font-medium border",
                      getActivityBadgeClass(log.activityType)
                    )}
                  >
                    {log.activity}
                  </span>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {log.location}
                </TableCell>
                <TableCell className="text-muted-foreground">{log.time}</TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-foreground"
                    onClick={() => handleViewDetails(log)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-border">
          <div className="text-sm text-muted-foreground">
            Showing 1 to {data.length} of {data.length} entries
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="sm"
              className="bg-card border-border text-muted-foreground hover:text-foreground"
            >
              &lt;
            </Button>
            {[1, 2, 3, 4, 5].map((page) => (
              <Button
                key={page}
                variant={page === 1 ? "default" : "outline"}
                size="sm"
                className={cn(
                  "min-w-[32px]",
                  page === 1
                    ? "bg-primary text-primary-foreground"
                    : "bg-card border-border text-muted-foreground hover:text-foreground"
                )}
              >
                {page}
              </Button>
            ))}
            <Button
              variant="outline"
              size="sm"
              className="bg-card border-border text-muted-foreground hover:text-foreground"
            >
              &gt;
            </Button>
          </div>
        </div>
      </div>

      <ActivityDetailsModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        activity={selectedActivity}
      />
    </>
  );
}
