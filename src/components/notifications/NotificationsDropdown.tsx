import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FileText, ArrowUpFromLine, ArrowDownToLine, UserPlus } from "lucide-react";
import { cn } from "@/lib/utils";

interface NotificationItem {
  id: string;
  icon: React.ElementType;
  message: string;
  timestamp: string;
  type: "deposit" | "withdraw" | "ib" | "general";
}

interface NotificationsDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

const notificationsData: NotificationItem[] = [
  {
    id: "1",
    icon: UserPlus,
    message: "Test Account submitted an Introducing Broker application for kumarfx47@gmail.com.",
    timestamp: "3 days ago",
    type: "ib",
  },
  {
    id: "2",
    icon: ArrowUpFromLine,
    message: "Withdraw Request details: TRXORBMI00MKI Bank Transfer - PKR 10.00",
    timestamp: "2 weeks ago",
    type: "withdraw",
  },
  {
    id: "3",
    icon: ArrowDownToLine,
    message: "The manual deposit request details: TRXB2G0ALWZ97 System 10.00",
    timestamp: "2 weeks ago",
    type: "deposit",
  },
  {
    id: "4",
    icon: ArrowUpFromLine,
    message: "Withdraw Request details: TRXORBMI00MKI Bank Transfer - PKR 10.00",
    timestamp: "2 weeks ago",
    type: "withdraw",
  },
];

export function NotificationsDropdown({ isOpen, onClose }: NotificationsDropdownProps) {
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleSeeAll = () => {
    navigate("/notifications");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      ref={dropdownRef}
      className="absolute right-0 top-12 w-80 sm:w-96 bg-card border border-border rounded-lg shadow-xl z-50 overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/30">
        <h3 className="text-sm font-semibold text-foreground">Notifications</h3>
        <button
          onClick={handleSeeAll}
          className="text-xs text-primary hover:text-primary/80 font-medium transition-colors"
        >
          See All
        </button>
      </div>

      {/* Notifications List */}
      <div className="max-h-80 overflow-y-auto">
        {notificationsData.map((notification) => (
          <div
            key={notification.id}
            className="flex items-start gap-3 px-4 py-3 hover:bg-muted/50 transition-colors cursor-pointer border-b border-border/50 last:border-b-0"
          >
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-muted flex items-center justify-center">
              <notification.icon className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-foreground leading-snug line-clamp-2">
                {notification.message}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {notification.timestamp}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
